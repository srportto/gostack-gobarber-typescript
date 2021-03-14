import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProfviderId1593963297352
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // para excluir uma coluna
        // param 1: tabela
        // param 2: coluna
        await queryRunner.dropColumn('appointments', 'provider');

        // para adicionar uma coluna
        // param 1: tabela
        // param 2: estrutura da coluna nova
        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'providerId',
                type: 'uuid',
                // indicando que o campo pode ser nulo
                isNullable: true,
            }),
        );

        // para criar chave estrangeira
        // param 1: tabela que receberá o relacionamento
        // param 2: estrutura da coluna nova
        await queryRunner.createForeignKey(
            'appointments',
            new TableForeignKey({
                name: 'AppointmentProvider', // nome do relacionamento/ coluna do relacionamento
                columnNames: ['providerId'], // Campo que recebera o relacionamento
                referencedColumnNames: ['id'], // campo da outra tabela que enviara o relacionamento
                referencedTableName: 'users', // nome da tabela que enviara o relacionamento
                /**
                 * O parametro abaixo descreve o que irá acontecer caso o id usurio que compoe
                 * o relacionamento seja deletado da tabela, possui as sequintes opções:
                 *
                 * RESTRICT - Não deixa o usuario ser deletado enquanto existir esse relacionamento
                 * SET NULL - Na tabela que recebe o relacionamento, esse relacionamento ficará preenchido com NULL
                 * CASCADE - Quando deletado o usuario, deletar também os relacionamentos
                 */
                onDelete: 'SET NULL',

                onUpdate: 'CASCADE', // caso o id do usuario mude, muda também no relacionamento
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Desfaz as ações do metodo acima, na ordem do ultimo para o primeiro

        // desfaz criação de chave estrangeira
        // param 1: tabela que recebeu o relacionamento
        // param 2: nome do relacionamento/coluna do relacionamento
        await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

        // desfaz criação da coluna providerId
        // param 1: tabela que recebeu a coluna
        // param 2: coluna adicionada
        await queryRunner.dropColumn('appointments', 'providerId');

        // para readicionando coluna deletada
        // param 1: tabela que teve coluna deletada
        // param 2: estrutura da coluna nova
        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'provider',
                type: 'varchar',
            }),
        );
    }
}
