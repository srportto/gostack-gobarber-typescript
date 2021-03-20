import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

/**
 *  Obs.: User = tabela
 *        avatar = nova coluna
 * */

export default class AddAvatarFieldToUsers1616272218017
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'avatar',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'avatar');
    }
}
