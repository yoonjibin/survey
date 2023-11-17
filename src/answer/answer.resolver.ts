import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AnswerService } from './answer.service';

@Resolver()
export class AnswerResolver {
  constructor(private answerService: AnswerService) {}

  @Query('getAnswerByQuestionId')
  async getAnswerByQuestionId(
    @Args('questionId', { type: () => Int }) questionId: number,
  ) {
    return await this.answerService.getAnswerByQuestionId(questionId);
  }

  @Mutation('createAnswer')
  async createAnswer(@Args('choiceId', { type: () => Int }) choiceId: number) {
    return await this.answerService.createAnswer(choiceId);
  }
}
