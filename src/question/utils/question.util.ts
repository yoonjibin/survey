import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApolloError } from 'apollo-server-express';
import { QuestionEntity } from 'src/entities/question.entity';

@Injectable()
export class QuestionUtil {
  private readonly logger = new Logger(QuestionUtil.name);
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) {}

  async checkQuestionExist(id: number) {
    const existingQuestion = await this.questionRepository.exist({
      where: { id: id },
    });
    if (!existingQuestion) {
      this.logger.error(`Question with ID ${id} not found`);
      throw new ApolloError('존재하지 않는 문항입니다.', 'QUESTION_NOT_FOUND', {
        customErrorCode: 404,
        parameter: 'id',
      });
    }
  }

  async getQuestionById(id: number) {
    await this.checkQuestionExist(id);
    return this.questionRepository.findOne({ where: { id: id } });
  }
}
