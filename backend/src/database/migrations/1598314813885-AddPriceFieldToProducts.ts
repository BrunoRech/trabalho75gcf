import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPriceFieldToProducts1598314813885
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'price',
        type: 'float',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'price');
  }
}
