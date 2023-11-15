import { Module } from '@nestjs/common';
import { ChoiceService } from './choice.service';
import { ChoiceResolver } from './choice.resolver';

@Module({
  providers: [ChoiceService, ChoiceResolver],
})
export class ChoiceModule {}
