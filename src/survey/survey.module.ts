import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyResolver } from './survey.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyEntity } from 'src/entities/survey.entity';
import { SurveyUtil } from './utils/survey.util';
import { QuestionEntity } from 'src/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyEntity, QuestionEntity])],
  providers: [SurveyService, SurveyResolver, SurveyUtil],
})
export class SurveyModule {}
