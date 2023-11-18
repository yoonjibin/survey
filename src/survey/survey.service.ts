import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import { SurveyEntity } from 'src/entities/survey.entity';
import { Repository } from 'typeorm';
import { SurveyUtil } from './utils/survey.util';
import { AnswerEntity } from 'src/entities/answer.entity';

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
    const questionsWithoutAnswer = await this.surveyRepository
      .createQueryBuilder('question')
      .leftJoin(AnswerEntity, 'answer', 'answer.questionId = question.id')
      .where('question.surveyId = :surveyId', { surveyId })
      .andWhere('answer.id IS NULL')
      .getMany();
    if (questionsWithoutAnswer.length > 0) {
      console.log(questionsWithoutAnswer[0].id);
    }
    await this.surveyRepository.update({ id: surveyId }, { isCompleted: true });
    return await this.surveyRepository.findOne({ where: { id: surveyId } });
  }

  async deleteSurvey(id: number) {
    await this.surveyUtil.checkSurveyExist(id);
    await this.surveyRepository.delete({ id: id });
  }
}
