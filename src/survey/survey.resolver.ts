import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SurveyService } from './survey.service';

@Resolver()
export class SurveyResolver {
  constructor(private surveyService: SurveyService) {}

  @Mutation()
  async createSurvey(@Args('title') title: string) {
    return this.surveyService.createSurvey(title);
  }
}
