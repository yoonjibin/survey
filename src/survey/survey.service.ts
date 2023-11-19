import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyEntity } from 'src/entities/survey.entity';
import { Repository } from 'typeorm';
import { SurveyUtil } from './utils/survey.util';
import { QuestionEntity } from 'src/entities/question.entity';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class SurveyService {
  private readonly logger = new Logger(SurveyService.name);
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
    await this.surveyUtil.checkUnansweredQuestions(surveyId);
    await this.surveyUtil.checkSurveyCompletion(surveyId);

    await this.surveyRepository.update({ id: surveyId }, { isCompleted: true });
    return await this.surveyRepository.findOne({ where: { id: surveyId } });
  }

  async deleteSurvey(id: number) {
    await this.surveyUtil.checkSurveyExist(id);
    await this.surveyRepository.delete({ id: id });
  }
}
