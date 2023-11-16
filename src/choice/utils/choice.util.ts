import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApolloError } from 'apollo-server-express';
import { ChoiceEntity } from 'src/entities/choice.entity';

@Injectable()
export class ChoiceionUtil {
  private readonly logger = new Logger(ChoiceionUtil.name);
  constructor(
    @InjectRepository(ChoiceEntity)
    private readonly choiceRepository: Repository<ChoiceEntity>,
  ) {}

  async checkChoiceExist(id: number) {
    const existingChoice = await this.choiceRepository.exist({
      where: { id: id },
    });
    if (!existingChoice) {
      this.logger.error(`Choice with ID ${id} not found`);
      throw new ApolloError('존재하지 않는 선택지입니다.', 'CHOICE_NOT_FOUND', {
        customErrorCode: 404,
        parameter: 'id',
      });
    }
  }

  async getChoiceById(id: number) {
    await this.checkChoiceExist(id);
    return this.choiceRepository.findOne({ where: { id: id } });
  }
}
