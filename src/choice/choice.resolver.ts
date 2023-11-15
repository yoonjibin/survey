import { Resolver } from '@nestjs/graphql';
import { ChoiceService } from './choice.service';

@Resolver()
export class ChoiceResolver {
  constructor(private choiceService: ChoiceService) {}
}
