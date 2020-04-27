import { Row } from './row';
import { ColumnImpl } from './column';
import { Address } from './address';

export class Sheet {
  rows: Map<string | number, Row>;
  rowIndexes: Row[];

  constructor() {
    this.rows = new Map();
    this.rowIndexes = [];
  }

  register(
    address: Address,
    impl: ColumnImpl,
  ): void {
    let row = this.rows.get(address.row);
    if (row == null) {
      row = new Row(address.row);
      this.rows.set(address.row, row);
    }
    return row.register(address, impl);
  }

  unregister(address: Address): void {
    const row = this.rows.get(address.row);
    if (row == null) return;
    row.unregister(address);
    if (!row.isValid()) {
      this.rows.delete(address.row);
    }
  }
}
