import { MigrationInterface, QueryRunner } from "typeorm";

export class GameTable1726332533697 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
    await queryRunner.query(
      `CREATE TABLE game (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        name varchar(256) NOT NULL,
        platforms varchar(256)[] NOT NULL,
        CONSTRAINT game_pk PRIMARY KEY (id),
        CONSTRAINT game_un_name UNIQUE (name)
      );`
    );
  }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP TABLE IF EXISTS game;`);
    }
}
