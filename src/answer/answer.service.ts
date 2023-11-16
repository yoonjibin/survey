import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChoiceUtil } from 'src/choice/utils/choice.util';
import { AnswerEntity } from 'src/entities/answer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerService {
  constructor(
    private readonly choiceUtil: ChoiceUtil,
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>,
  ) {}

  async createAnswer(choiceId: number) {
    const choice = await this.choiceUtil.getChoiceById(choiceId);
    const answer = this.answerRepository.create({ choice: choice });

    return await this.answerRepository.save(answer);
  }
}
