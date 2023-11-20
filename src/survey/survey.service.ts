import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyEntity } from 'src/entities/survey.entity';
import { Repository } from 'typeorm';
import { SurveyUtil } from './utils/survey.util';

@Injectable()
export class SurveyService {
  private readonly logger = new Logger(SurveyService.name);
  constructor(
    private readonly surveyUtil: SurveyUtil,
    @InjectRepository(SurveyEntity)
    private surveyRepository: Repository<SurveyEntity>,
  ) {}

  async getAllSurvey() {
    return this.surveyRepository.find({
      relations: ['question', 'question.choice', 'question.choice.answer'],
      order: { id: 'ASC' },
    });
  }

  async getSurveyById(surveyId: number) {
    await this.surveyUtil.checkSurveyExist(surveyId);
    return await this.surveyRepository.findOne({
      where: { id: surveyId },
      relations: ['question', 'question.choice', 'question.choice.answer'],
      order: { id: 'ASC' },
    });
  }

  async getTotalScoreBySurveyId(surveyId: number) {
    await this.surveyUtil.checkSurveyExist(surveyId);

    const totalScoreQuery = await this.surveyRepository
      .createQueryBuilder('survey')
      .leftJoinAndSelect('survey.question', 'question')
      .leftJoinAndSelect('question.choice', 'choice')
      .leftJoinAndSelect('choice.answer', 'answer')
      .where('survey.id = :surveyId', { surveyId })
      .getOne();

    const totalScore = totalScoreQuery.question.reduce((acc, question) => {
      return (
        acc +
        question.choice.reduce((choiceScore, choice) => {
          return choiceScore + (choice.answer[0] ? choice.score : 0);
        }, 0)
      );
    }, 0);

    return totalScore;
  }

  async getCompletedSurvey(surveyId: number) {
    await this.surveyUtil.checkSurveyExist(surveyId);

    return await this.surveyRepository
      .createQueryBuilder('survey')
      .leftJoinAndSelect('survey.question', 'question')
      .leftJoinAndSelect('question.choice', 'choice')
      .leftJoinAndSelect('choice.answer', 'answer')
      .where('survey.id = :surveyId', { surveyId })
      .andWhere('survey.isCompleted = :isCompleted', { isCompleted: true })
      .orderBy('question.id', 'ASC')
      .addOrderBy('choice.id', 'ASC')
      .getOne();
  }

  async createSurvey(title: string) {
    const survey = this.surveyRepository.create({ title: title });
    return await this.surveyRepository.save(survey);
  }

  async updateSurvey(surveyId: number, title: string) {
    await this.surveyUtil.checkSurveyExist(surveyId);
    await this.surveyRepository.update({ id: surveyId }, { title: title });
    return await this.surveyRepository.findOne({ where: { id: surveyId } });
  }
  async updateSurveyCompleted(surveyId: number) {
    await this.surveyUtil.checkSurveyExist(surveyId);
    await this.surveyUtil.checkUnansweredQuestions(surveyId);
    await this.surveyUtil.checkSurveyCompletion(surveyId);

    await this.surveyRepository.update({ id: surveyId }, { isCompleted: true });
    return await this.surveyRepository.findOne({ where: { id: surveyId } });
  }

  async deleteSurvey(surveyId: number) {
    await this.surveyUtil.checkSurveyExist(surveyId);
    await this.surveyRepository.delete({ id: surveyId });
  }
}
