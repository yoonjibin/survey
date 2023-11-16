import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/entities/question.entity';
import { SurveyUtil } from 'src/survey/utils/survey.util';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    private readonly surveyUtil: SurveyUtil,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) {}

  async createQuestion(question: string, survey_id: number) {
    const survey = await this.surveyUtil.getSurveyById(survey_id);
    const createdQuestion = await this.questionRepository.create({
      question: question,
      survey: survey,
    });
    return await this.questionRepository.save(createdQuestion);
  }
}
