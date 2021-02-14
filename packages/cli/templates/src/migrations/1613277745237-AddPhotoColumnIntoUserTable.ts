import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPhotoColumnIntoUserTable1613277745237 implements MigrationInterface {
    name = 'AddPhotoColumnIntoUserTable1613277745237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "photo" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photo"`);
    }

}
