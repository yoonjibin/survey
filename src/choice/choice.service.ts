import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChoiceEntity } from 'src/entities/choice.entity';
import { QuestionUtil } from 'src/question/utils/question.util';
import { Repository } from 'typeorm';

@Injectable()
export class ChoiceService {
  constructor(
    private readonly questionUtil: QuestionUtil,
    @InjectRepository(ChoiceEntity)
    private readonly choiceRepository: Repository<ChoiceEntity>,
  ) {}

  async createChoice(text: string, score: number, questionId: number) {
    const question = await this.questionUtil.getQuestionById(questionId);
    const createdChoice = await this.choiceRepository.create({
      text: text,
      score: score,
      question: question,
    });
    return await this.choiceRepository.save(createdChoice);
  }
}
