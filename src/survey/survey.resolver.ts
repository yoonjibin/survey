import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SurveyService } from './survey.service';
import { title } from 'process';

@Resolver()
export class SurveyResolver {
  constructor(private surveyService: SurveyService) {}

  @Query('getAllSurvey')
  async getAllSurvey() {
    return this.surveyService.getAllSurvey();
  }

  @Mutation('createSurvey')
  async createSurvey(@Args('title') title: string) {
    return this.surveyService.createSurvey(title);
  }

  @Mutation('updateSurvey')
  async updateSurvey(@Args('id') id: number, @Args('title') title: string) {
    return this.surveyService.updateSurvey(id, title);
  }
}
