import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddDiscountFieldToCustomers1598314813885
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'customers',
      new TableColumn({
        name: 'discount',
        type: 'float',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('customers', 'discount');
  }
}
