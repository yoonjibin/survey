import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SurveyService } from './survey.service';

@Resolver()
export class SurveyResolver {
  constructor(private surveyService: SurveyService) {}

  @Query('getAllSurvey')
  async getAllSurvey() {
    return this.surveyService.getAllSurvey();
  }

  @Query('getSurveyById')
  async getSurveyById(@Args('surveyId', { type: () => Int }) surveyId: number) {
    const survey = await this.surveyService.getSurveyById(surveyId);
    const totalScore = await this.surveyService.getTotalScoreBySurveyId(
      surveyId,
    );

    return { survey, totalScore };
  }

  @Query('getTotalScoreBySurveyId')
  async getTotalScoreBySurveyId(
    @Args('surveyId', { type: () => Int }) surveyId: number,
  ) {
    const survey = await this.surveyService.getSurveyById(surveyId);
    const totalScore = await this.surveyService.getTotalScoreBySurveyId(
      surveyId,
    );

    return { survey, totalScore };
  }

  @Query('getCompletedSurvey')
  async getCompletedSurvey(
    @Args('surveyId', { type: () => Int }) surveyId: number,
  ) {
    const survey = await this.surveyService.getCompletedSurvey(surveyId);
    const totalScore = await this.surveyService.getTotalScoreBySurveyId(
      surveyId,
    );

    return { survey, totalScore };
  }

  @Mutation('createSurvey')
  async createSurvey(@Args('title') title: string) {
    return this.surveyService.createSurvey(title);
  }

  @Mutation('updateSurvey')
  async updateSurvey(
    @Args('surveyId', { type: () => Int }) surveyId: number,
    @Args('title') title: string,
  ) {
    return this.surveyService.updateSurvey(surveyId, title);
  }

  @Mutation('updateSurveyCompleted')
  async updateSurveyCompleted(
    @Args('surveyId', { type: () => Int }) surveyId: number,
  ) {
    return this.surveyService.updateSurveyCompleted(surveyId);
  }

  @Mutation('deleteSurvey')
  async deleteSurvey(@Args('surveyId', { type: () => Int }) surveyId: number) {
    this.surveyService.deleteSurvey(surveyId);
  }
}
