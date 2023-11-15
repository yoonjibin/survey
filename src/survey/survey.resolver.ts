import { Resolver } from '@nestjs/graphql';
import { SurveyService } from './survey.service';

@Resolver()
export class SurveyResolver {
  constructor(private surveyService: SurveyService) {}
}
