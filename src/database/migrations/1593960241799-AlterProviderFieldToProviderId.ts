import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey
} from "typeorm";

export default class AlterProviderFieldToProviderId1593960241799 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'provider');

        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'provider_id',
            type: 'uuid',
            isNullable: true, // Se o provider for deletado, os logs de atendimento não serão excluídos!

        }));

        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            name: 'AppointmentProvider',
            columnNames: ['provider_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL', // Ao deletar um provider, as colunas com esse campo possuirão valor NULL
            onUpdate: 'CASCADE' // Se o provider tiver seu id atualizado, refletir essa mudança em todos os seus relacionamentos
        }));
    }

    // As alterações devem ser desfeitas de baixo para cima!
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

        await queryRunner.dropColumn('appointments', 'provider_id');

        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'provider',
            type: 'varchar',
            isNullable: false
        }));
    }

}
