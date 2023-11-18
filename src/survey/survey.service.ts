import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyEntity } from 'src/entities/survey.entity';
import { Repository } from 'typeorm';
import { SurveyUtil } from './utils/survey.util';
import { QuestionEntity } from 'src/entities/question.entity';

@Injectable()
export class SurveyService {
  constructor(
    private readonly surveyUtil: SurveyUtil,
    @InjectRepository(SurveyEntity)
    private surveyRepository: Repository<SurveyEntity>,
  ) {}

  async getAllSurvey() {
    return this.surveyRepository.find();
  }

  async getSurveyById(id: number) {
    await this.surveyUtil.checkSurveyExist(id);
    return await this.surveyRepository.findOne({ where: { id: id } });
  }

  async createSurvey(title: string) {
    const survey = this.surveyRepository.create({ title: title });
    return await this.surveyRepository.save(survey);
  }

  async updateSurvey(id: number, title: string) {
    await this.surveyUtil.checkSurveyExist(id);
    await this.surveyRepository.update({ id: id }, { title: title });
    return await this.surveyRepository.findOne({ where: { id: id } });
  }
  async updateSurveyCompleted(surveyId: number) {
    await this.surveyUtil.checkSurveyExist(surveyId);

    const unansweredQuestions = await this.checkUnansweredQuestions(surveyId);
    if (unansweredQuestions.length > 0) {
      throw new Error('설문 중 답변하지 않은 질문이 있습니다.');
    }
    await this.surveyRepository.update({ id: surveyId }, { isCompleted: true });
    return await this.surveyRepository.findOne({ where: { id: surveyId } });
  }

  async deleteSurvey(id: number) {
    await this.surveyUtil.checkSurveyExist(id);
    await this.surveyRepository.delete({ id: id });
  }

  async checkUnansweredQuestions(surveyId: number): Promise<QuestionEntity[]> {
    const unansweredQuestions = await this.surveyRepository
      .createQueryBuilder('survey')
      .leftJoinAndSelect('survey.question', 'question')
      .leftJoin('question.choice', 'choice')
      .leftJoin('choice.answer', 'answer')
      .where('survey.id = :surveyId', { surveyId })
      .andWhere('answer.id IS NULL')
      .getMany();

    return unansweredQuestions.map((survey) => survey.question).flat();
  }
}
