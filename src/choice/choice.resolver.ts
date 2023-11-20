import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChoiceService } from './choice.service';

@Resolver()
export class ChoiceResolver {
  constructor(private choiceService: ChoiceService) {}

  @Query('getAllChoice')
  async getAllChoice() {
    return await this.choiceService.getAllChoice();
  }

  @Query('getAllChoiceByQuestionId')
  async getAllChoiceByQuestionId(
    @Args('questionId', { type: () => Int }) questionId: number,
  ) {
    return await this.choiceService.getAllChoiceByQuestionId(questionId);
  }

  @Query('getChoiceByChoiceId')
  async getChoiceByChoiceId(
    @Args('choiceId', { type: () => Int }) choiceId: number,
  ) {
    return await this.choiceService.getChoiceByChoiceId(choiceId);
  }

  @Mutation('createChoice')
  async createChoice(
    @Args('text') text: string,
    @Args('score') score: number,
    @Args('questionId', { type: () => Int }) questionId: number,
  ) {
    return await this.choiceService.createChoice(text, score, questionId);
  }

  @Mutation('updateChoice')
  async updateChoice(
    @Args('text') text: string,
    @Args('score') score: number,
    @Args('choiceId', { type: () => Int }) choiceId: number,
  ) {
    return await this.choiceService.updateChoice(text, score, choiceId);
  }

  @Mutation('deleteChoice')
  async deleteChoice(@Args('choiceId', { type: () => Int }) choiceId: number) {
    return await this.choiceService.deleteChoice(choiceId);
  }
}
