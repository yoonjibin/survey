import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerEntity } from 'src/entities/answer.entity';
import { ChoiceEntity } from 'src/entities/choice.entity';
import { ChoiceUtil } from 'src/choice/utils/choice.util';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerEntity, ChoiceEntity])],
  providers: [AnswerService, AnswerResolver, ChoiceUtil],
})
export class AnswerModule {}
