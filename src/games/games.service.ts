import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGameDto } from './dtos/create-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from 'src/db/entities/game.entity';
import { Repository } from 'typeorm';

global.games = [];

@Injectable()
export class GamesService {

  constructor(
    @InjectRepository(GameEntity)
    private readonly gamesRepository: Repository<GameEntity>
  ) {}
  
  async findAll(): Promise<CreateGameDto[]> {
    const games = await this.gamesRepository.find();

    return games;
  }

  async findByGameName(name: string): Promise<CreateGameDto | null> {
    const gameFound = await this.gamesRepository.findOne({
      where: { name }
    })

    if (!gameFound) { return null }

    return {
      id: gameFound.id,
      name: gameFound.name,
      platforms: gameFound.platforms
    }
  }

  async create(newGame: CreateGameDto) {
    const isGameRegistered = await this.findByGameName(newGame.name);

    if(isGameRegistered) {
      throw new ConflictException(`${newGame.name} já foi cadastrado!`)
    }

    const dbGame = new GameEntity();
    dbGame.name = newGame.name
    dbGame.platforms = newGame.platforms

    const { id, name, platforms } = await this.gamesRepository.save(dbGame);

    return { id , name, platforms };
  }

  async remove(id: string) {
    const gameDeleted = await this.gamesRepository.delete(id)

    if(!gameDeleted.affected) {
      throw new HttpException(`Nenhum game com o id "${id}" foi encontrado!`, HttpStatus.BAD_REQUEST)
    }

    return
  }
}
