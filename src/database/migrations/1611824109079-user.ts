import {
  MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey, TableIndex,
} from 'typeorm';

export class user1611824109079 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'phone',
          type: 'varchar',
        },
      ],
    }), true);

    await queryRunner.createIndex('users', new TableIndex({
      name: 'ID_USERS_NAME',
      columnNames: ['name'],
    }));

    await queryRunner.addColumn('users', new TableColumn({
      name: 'auth_id',
      type: 'int',
    }));

    await queryRunner.createForeignKey('users', new TableForeignKey({
      columnNames: ['auth_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'auth',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('users');

    const foreignKeys = table?.foreignKeys.filter((fk) => fk.columnNames.indexOf('user_id') !== -1);
    if (foreignKeys?.length) {
      await queryRunner.dropForeignKeys('users', foreignKeys);
    }
    await queryRunner.dropIndex('users', 'IDX_USERS_NAME');
    await queryRunner.dropTable('users');
  }
}
