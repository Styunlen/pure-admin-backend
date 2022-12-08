import { MigrationInterface, QueryRunner } from "typeorm";

export class initDatabasets1670474610412 implements MigrationInterface {
  name = "initDatabase.ts1670474610412";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" text NOT NULL, "password" text NOT NULL, "userInfo" text NOT NULL DEFAULT ('{ enabled: true }'), "time" datetime NOT NULL DEFAULT (datetime('now')))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
