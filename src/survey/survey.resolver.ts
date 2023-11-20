import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SurveyService } from './survey.service';
import { title } from 'process';

@Resolver()
export class SurveyResolver {
  constructor(private surveyService: SurveyService) {}

  @Query('getAllSurvey')
  async getAllSurvey() {
    return this.surveyService.getAllSurvey();
  }

  @Query('getSurveyById')
  async getSurveyById(@Args('id', { type: () => Int }) id: number) {
    return this.surveyService.getSurveyById(id);
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
    return this.surveyService.getCompletedSurvey(surveyId);
  }

  @Mutation('createSurvey')
  async createSurvey(@Args('title') title: string) {
    return this.surveyService.createSurvey(title);
  }

  @Mutation('updateSurvey')
  async updateSurvey(
    @Args('id', { type: () => Int }) id: number,
    @Args('title') title: string,
  ) {
    return this.surveyService.updateSurvey(id, title);
  }

  @Mutation('updateSurveyCompleted')
  async updateSurveyCompleted(
    @Args('surveyId', { type: () => Int }) surveyId: number,
  ) {
    return this.surveyService.updateSurveyCompleted(surveyId);
  }

  @Mutation('deleteSurvey')
  async deleteSurvey(@Args('id', { type: () => Int }) id: number) {
    this.surveyService.deleteSurvey(id);
  }
}
