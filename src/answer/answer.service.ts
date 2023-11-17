import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import { ChoiceUtil } from 'src/choice/utils/choice.util';
import { AnswerEntity } from 'src/entities/answer.entity';
import { QuestionUtil } from 'src/question/utils/question.util';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerService {
  private readonly logger = new Logger(AnswerService.name);
  constructor(
    private readonly questionUtil: QuestionUtil,
    private readonly choiceUtil: ChoiceUtil,
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>,
  ) {}

  async getAnswerByQuestionId(questionId: number) {
    await this.questionUtil.checkQuestionExist(questionId);
    const answer = await this.answerRepository
      .createQueryBuilder('answer')
      .leftJoinAndSelect('answer.choice', 'choice')
      .leftJoinAndSelect('choice.question', 'question')
      .where('question.id = :questionId', { questionId })
      .getOne();
    if (!answer) {
      this.logger.error(`Answer with ID ${questionId} not found`);
      throw new ApolloError('답변이 존재하지 않습니다.', 'NOTFOUND', {
        customErrorCode: 404,
        parameter: 'id',
      });
    }
    return answer;
  }

  async createAnswer(choiceId: number) {
    const choice = await this.choiceUtil.getChoiceById(choiceId);
    const existingAnswer = await this.answerRepository.exist({
      where: { choice: { id: choiceId } },
    });
    if (existingAnswer) {
      this.logger.error(`Answer with ID ${choiceId} conflict`);
      throw new ApolloError('이미 존재하는 답변입니다.', 'CONFLICT', {
        customErrorCode: 409,
        parameter: 'id',
      });
    }

    const answer = this.answerRepository.create({ choice: choice });

    return await this.answerRepository.save(answer);
  }
}
