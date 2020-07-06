import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateUsers1593924002440 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        // Quando o usuário foi criado
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        // Quando o usuário sofreu alteração
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }
}
