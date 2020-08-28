import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class RemoveSaleUnitPriceField1598314925798
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('sales', 'unit_price');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'sales',
      new TableColumn({
        name: 'unit_price',
        type: 'float',
      }),
    );
  }
}
