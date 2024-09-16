import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DB_URL'),
        entities: [__dirname + '/entities/**'],
        migrations: [__dirname + '/migrations/*.ts'],
        autoLoadEntities: true,
        synchronize: false,
      }),
  }),
  ]
})

export class DbModule {}
