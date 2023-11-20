import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/entities/question.entity';
import { SurveyUtil } from 'src/survey/utils/survey.util';
import { Repository } from 'typeorm';
import { QuestionUtil } from './utils/question.util';

@Injectable()
export class QuestionService {
  constructor(
    private readonly surveyUtil: SurveyUtil,
    private readonly questionUtil: QuestionUtil,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) {}
  async getAllQuestion() {
    return await this.questionRepository
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.choice', 'choice')
      .leftJoinAndSelect('choice.answer', 'answer')
      .orderBy('question.id', 'ASC')
      .addOrderBy('choice.id', 'ASC')
      .getMany();
  }

  async getAllQuestionBySurveyId(surveyId: number) {
    const survey = await this.surveyUtil.checkSurveyExist(surveyId);
    return await this.questionRepository
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.choice', 'choice')
      .leftJoinAndSelect('choice.answer', 'answer')
      .where('question.survey = :surveyId', { surveyId: surveyId })
      .orderBy('question.id', 'ASC')
      .addOrderBy('choice.id', 'ASC')
      .getMany();
  }

  async createQuestion(question: string, surveyId: number) {
    const survey = await this.surveyUtil.getSurveyById(surveyId);
    const createdQuestion = await this.questionRepository.create({
      question: question,
      survey: survey,
    });
    return await this.questionRepository.save(createdQuestion);
  }

  async updateQuestion(question: string, questionId: number) {
    await this.questionUtil.checkQuestionExist(questionId);
    await this.questionRepository.update(
      { id: questionId },
      { question: question },
    );
    return await this.questionRepository
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.choice', 'choice')
      .leftJoinAndSelect('choice.answer', 'answer')
      .where('question.id = :questionId', { questionId: questionId })
      .orderBy('choice.id', 'ASC')
      .getOne();
  }

  async deleteQuestion(questionId: number) {
    await this.questionUtil.checkQuestionExist(questionId);
    await this.questionRepository.delete({ id: questionId });
  }
}
