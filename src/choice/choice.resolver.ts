import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { ChoiceService } from './choice.service';

@Resolver()
export class ChoiceResolver {
  constructor(private choiceService: ChoiceService) {}

  @Mutation('createChoice')
  async createChoice(
    @Args('text') text: string,
    @Args('score') score: number,
    @Args('questionId', { type: () => Int }) questionId: number,
  ) {
    return await this.choiceService.createChoice(text, score, questionId);
  }
}
