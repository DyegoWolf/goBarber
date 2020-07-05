import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { query } from "express";

export default class CreateAppointments1593880046845 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'provider',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'date',
                        // Permitido somente no Postgres
                        type: 'timestamp with time zone',
                        isNullable: false
                    },
                    {
                        // Quando o agendamento foi criado
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        // Quando o agendamento sofreu alteração
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments');
    }
}
