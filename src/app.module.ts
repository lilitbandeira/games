import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: '.env' }),
    GamesModule, DbModule],
  controllers: [AppController], // rotas
  providers: [AppService], // 
})
export class AppModule {}
