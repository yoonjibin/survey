import { Module } from '@nestjs/common';
import { ChoiceService } from './choice.service';
import { ChoiceResolver } from './choice.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChoiceEntity } from 'src/entities/choice.entity';
import { QuestionEntity } from 'src/entities/question.entity';
import { QuestionUtil } from 'src/question/utils/question.util';

@Module({
  imports: [TypeOrmModule.forFeature([ChoiceEntity, QuestionEntity])],
  providers: [ChoiceService, ChoiceResolver, QuestionUtil],
})
export class ChoiceModule {}
