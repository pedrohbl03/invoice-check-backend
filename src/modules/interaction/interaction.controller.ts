import { Controller, Get } from '@nestjs/common';
import { InteractionService } from './application/services';

@Controller('interactions')
export class InteractionController {
  constructor(private readonly interactionService: InteractionService) {}

  @Get()
  getHello(): string {
    return this.interactionService.getHello();
  }
}
