import { MigrationInterface, QueryRunner, Table } from 'typeorm';

/**
 * Metodo up: tem o que a migration irá fazer
 * metodo down: acao caso de algum problema na invocacao do metodo up (rollback)
 *
 */

export default class CreateAppointments1591543065685
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'provider',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'date',
                        // o tipo abaixo so existe no postgres, demais bancos usar apenas timestamp
                        type: 'timestamp with time zone',
                        isNullable: false,
                    },
                    {
                        // data de criação
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        // data de atualização
                        name: 'updateAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments');
    }
}
