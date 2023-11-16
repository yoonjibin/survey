import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { AnswerService } from './answer.service';

@Resolver()
export class AnswerResolver {
  constructor(private answerService: AnswerService) {}

  @Mutation('createAnswer')
  async createAnswer(@Args('choiceId', { type: () => Int }) choiceId: number) {
    return await this.answerService.createAnswer(choiceId);
  }
}
