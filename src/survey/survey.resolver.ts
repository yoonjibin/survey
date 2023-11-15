import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SurveyService } from './survey.service';

@Resolver()
export class SurveyResolver {
  constructor(private surveyService: SurveyService) {}

  @Query()
  async getAllSurvey() {
    return this.surveyService.getAllSurvey();
  }

  @Mutation()
  async createSurvey(@Args('title') title: string) {
    return this.surveyService.createSurvey(title);
  }
}
