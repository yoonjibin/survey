import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';

@Module({
  providers: [SurveyService],
})
export class SurveyModule {}
