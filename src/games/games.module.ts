import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity } from 'src/db/entities/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity])],
  providers: [GamesService],
  controllers: [GamesController],
})
export class GamesModule {}
