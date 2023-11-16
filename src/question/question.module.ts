import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { QuestionEntity } from 'src/entities/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyUtil } from 'src/survey/utils/survey.util';
import { SurveyEntity } from 'src/entities/survey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity, SurveyEntity])],
  providers: [QuestionService, QuestionResolver, SurveyUtil],
})
export class QuestionModule {}
