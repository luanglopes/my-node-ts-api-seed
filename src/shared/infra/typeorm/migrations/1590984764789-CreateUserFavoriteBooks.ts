import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export default class CreateUserFavoriteBooks1590984764789
implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_favorite_books',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'integer',
            unsigned: true,
          },
          {
            name: 'book_id',
            type: 'integer',
            unsigned: true,
          },
        ],
      }),
    )

    await queryRunner.createForeignKeys('user_favorite_books', [
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['book_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'books',
        onDelete: 'CASCADE',
      }),
    ])
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_favorite_books')
  }
}
