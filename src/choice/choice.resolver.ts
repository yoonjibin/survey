import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChoiceService } from './choice.service';

@Resolver()
export class ChoiceResolver {
  constructor(private choiceService: ChoiceService) {}

  @Query('getAllChoiceByQuestionId')
  async getAllChoiceByQuestionId(
    @Args('questionId', { type: () => Int }) questionId: number,
  ) {
    return await this.choiceService.getAllChoiceByQuestionId(questionId);
  }

  @Mutation('createChoice')
  async createChoice(
    @Args('text') text: string,
    @Args('score') score: number,
    @Args('questionId', { type: () => Int }) questionId: number,
  ) {
    return await this.choiceService.createChoice(text, score, questionId);
  }
}
