import {
  MigrationInterface, QueryRunner, Table, TableIndex,
} from 'typeorm';

export class auth1611824105935 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'auth',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
        },
        {
          name: 'email',
          type: 'varchar',
        },
        {
          name: 'password',
          type: 'varchar',
        },
      ],
    }), true);

    await queryRunner.createIndex('auth', new TableIndex({
      name: 'IDX_AUTH_EMAIL',
      columnNames: ['email'],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('auth');

    const foreignKeys = table?.foreignKeys.filter((fk) => fk.columnNames.indexOf('auth_id') !== -1);
    if (foreignKeys?.length) {
      await queryRunner.dropForeignKeys('auth', foreignKeys);
    }

    await queryRunner.dropIndex('auth', 'IDX_AUTH_EMAIL');
    await queryRunner.dropTable('auth');
  }
}
