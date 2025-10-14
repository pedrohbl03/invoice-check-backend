import { Module } from '@nestjs/common';
import { OpenAIService } from './application/services';

@Module({
  imports: [],
  providers: [OpenAIService],
  exports: [OpenAIService],
})
export class OpenAIModule {}
