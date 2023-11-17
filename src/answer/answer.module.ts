import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerEntity } from 'src/entities/answer.entity';
import { ChoiceEntity } from 'src/entities/choice.entity';
import { ChoiceUtil } from 'src/choice/utils/choice.util';
import { QuestionEntity } from 'src/entities/question.entity';
import { QuestionUtil } from 'src/question/utils/question.util';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnswerEntity, ChoiceEntity, QuestionEntity]),
  ],
  providers: [AnswerService, AnswerResolver, ChoiceUtil, QuestionUtil],
})
export class AnswerModule {}
