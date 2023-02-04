import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigrate1675448664604 implements MigrationInterface {
    name = 'initialMigrate1675448664604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "isAdm"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ADD "isAdm" boolean NOT NULL DEFAULT false`);
    }

}
