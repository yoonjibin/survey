import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyEntity } from 'src/entities/survey.entity';
import { Repository } from 'typeorm';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class SurveyUtil {
  private readonly logger = new Logger(SurveyUtil.name);
  constructor(
    @InjectRepository(SurveyEntity)
    private surveyRepository: Repository<SurveyEntity>,
  ) {}

  async checkSurveyExist(surveyId: number) {
    const existingSurvey = await this.surveyRepository.exist({
      where: { id: surveyId },
    });
    if (!existingSurvey) {
      this.logger.error(`Survey with ID ${surveyId} not found`);
      throw new ApolloError('존재하지 않는 설문지입니다.', 'SURVEY_NOT_FOUND', {
        customErrorCode: 404,
        parameter: 'surveyId',
      });
    }
  }

  async getSurveyById(surveyId: number) {
    await this.checkSurveyExist(surveyId);
    return this.surveyRepository.findOne({ where: { id: surveyId } });
  }

  async checkUnansweredQuestions(surveyId: number) {
    const unansweredQuestions = await this.surveyRepository
      .createQueryBuilder('survey')
      .leftJoinAndSelect('survey.question', 'question')
      .leftJoin('question.choice', 'choice')
      .leftJoin('choice.answer', 'answer')
      .where('survey.id = :surveyId', { surveyId })
      .andWhere('answer.id IS NULL')
      .getMany();

    const unansweredQuestionIdsList = unansweredQuestions
      .map((survey) => survey.question)
      .flat();
    if (unansweredQuestionIdsList.length > 0) {
      this.logger.error(
        `No answers found for survey with ID ${unansweredQuestionIdsList[0].id}`,
      );
      throw new ApolloError(
        `${unansweredQuestions[0].id}번 문항에 답변이 존재하지 않습니다.`,
        'ANSWER_NOT_FOUND',
        {
          customErrorCode: 404,
          parameter: 'unansweredQuestionId',
        },
      );
    }
  }

  async checkSurveyCompletion(surveyId: number) {
    const survey = await this.getSurveyById(surveyId);

    if (survey.isCompleted) {
      throw new ApolloError(
        '이미 완료된 설문지입니다.',
        'SURVEY_ALREADY_COMPLETED',
        {
          customErrorCode: 400,
          parameter: 'surveyId',
        },
      );
    }
  }
}
