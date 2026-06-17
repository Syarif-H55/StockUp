import { Module } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { BadgesController } from './badges.controller';
import { BadgeEvaluatorService } from './badge-evaluator.service';

@Module({
  controllers: [BadgesController],
  providers: [BadgesService, BadgeEvaluatorService],
  exports: [BadgesService, BadgeEvaluatorService],
})
export class BadgesModule {}
