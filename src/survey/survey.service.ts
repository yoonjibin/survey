import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    if (!this.surveyRepository.exist({ where: { id: id } })) {
      throw new HttpException(
        '존재하지 않는 설문지입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.surveyRepository.update({ id: id }, { title: title });
    return await this.surveyRepository.findOne({ where: { id: id } });
  }
}
