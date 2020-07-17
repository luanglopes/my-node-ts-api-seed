import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class CreateBooks1590731865082 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'books',
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
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'year',
            type: 'varchar',
            length: '4',
          },
          {
            name: 'ISBN',
            type: 'varchar',
          },
        ],
      }),
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('books')
  }
}
