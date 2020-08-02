import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCustomers1596308542787
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customers',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'cpf',
            type: 'text',
          },
          {
            name: 'address',
            type: 'text',
          },
          {
            name: 'number',
            type: 'text',
          },
          {
            name: 'district',
            type: 'text',
          },
          {
            name: 'city',
            type: 'text',
          },
          {
            name: 'cep',
            type: 'text',
          },
          {
            name: 'state',
            type: 'text',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customers');
  }
}