import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dtos/create-game.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  async findAll() {
    return await this.gamesService.findAll();
  }

  @Post()
  async create(@Body() game: CreateGameDto) {
    if (!game.name || !game.platforms)
      throw new BadRequestException('Dados insuficientes!');
    return await this.gamesService.create(game);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.gamesService.remove(id);
  }
}
