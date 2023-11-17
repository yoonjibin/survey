import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AnswerService } from './answer.service';

@Resolver()
export class AnswerResolver {
  constructor(private answerService: AnswerService) {}
  @Query('getAllAnswer')
  async getAllAnswer() {
    return await this.answerService.getAllAnswer();
  }

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

  @Mutation('updateAnswer')
  async updateAnswer(
    @Args('answerId', { type: () => Int }) answerId: number,
    @Args('choiceId', { type: () => Int }) choiceId: number,
  ) {
    return await this.answerService.updateAnswer(answerId, choiceId);
  }

  @Mutation('deleteAnswer')
  async deleteAnswer(@Args('answerId', { type: () => Int }) answerId: number) {
    return await this.answerService.deleteAnswer(answerId);
  }
}
