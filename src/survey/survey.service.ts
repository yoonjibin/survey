import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import { SurveyEntity } from 'src/entities/survey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SurveyService {
  private readonly logger = new Logger(SurveyService.name);
  constructor(
    @InjectRepository(SurveyEntity)
    private surveyRepository: Repository<SurveyEntity>,
  ) {}

  async getAllSurvey() {
    return this.surveyRepository.find();
  }

  async getSurveyById(id: number) {
    await this.checkSurveyExist(id);
    return await this.surveyRepository.findOne({ where: { id: id } });
  }

  async createSurvey(title: string) {
    const survey = this.surveyRepository.create({ title: title });
    return await this.surveyRepository.save(survey);
  }

  async updateSurvey(id: number, title: string) {
    await this.checkSurveyExist(id);
    return await this.surveyRepository.update({ id: id }, { title: title });
  }

  async deleteSurvey(id: number) {
    await this.checkSurveyExist(id);
    await this.surveyRepository.delete({ id: id });
  }

  private async checkSurveyExist(id: number) {
    const existingSurvey = await this.surveyRepository.exist({
      where: { id: id },
    });
    if (!existingSurvey) {
      this.logger.error(`Survey with ID ${id} not found`);
      throw new ApolloError('존재하지 않는 설문지입니다.', 'SURVEY_NOT_FOUND', {
        customErrorCode: 404,
        parameter: 'id',
      });
    }
  }
}
