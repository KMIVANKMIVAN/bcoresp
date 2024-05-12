import { Controller, Get, Post } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { Public } from '../auth/public.decorator';

@Controller('seeds')
export class SeedsController {
  constructor(private readonly seedsService: SeedsService) { }

  @Public()
  @Post('ejecutarsemilla')
  ejecutarSemilla() {
    return this.seedsService.ejecutarSemilla();
  }
}
