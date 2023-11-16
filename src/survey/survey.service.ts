import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import { SurveyEntity } from 'src/entities/survey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(SurveyEntity)
    private surveyRepository: Repository<SurveyEntity>,
  ) {}

  async getAllSurvey() {
    return this.surveyRepository.find();
  }

  async createSurvey(title: string) {
    const survey = this.surveyRepository.create({ title: title });
    return await this.surveyRepository.save(survey);
  }

  async updateSurvey(id: number, title: string) {
    this.checkSurveyIsExist(id);
    await this.surveyRepository.update({ id: id }, { title: title });
    return await this.surveyRepository.findOne({ where: { id: id } });
  }

  async deleteSurvey(id: number) {
    this.checkSurveyIsExist(id);
    await this.surveyRepository.delete({ id: id });
  }

  private async checkSurveyIsExist(id: number) {
    const existingSurvey = await this.surveyRepository.exist({
      where: { id: id },
    });
    if (!existingSurvey) {
      throw new ApolloError('존재하지 않는 설문지입니다.', 'SURVEY_NOT_FOUND', {
        customErrorCode: 404,
        pamiteter: 'id',
      });
    }
  }
}
