import { Column } from './column';
import { ColumnImpl } from './column';
import { Address } from './address';

export class Row {
  id: string | number;
  columns: Map<string | number, Column>;
  columnIndexes: Column[];

  constructor(id: string | number) {
    this.id = id;
    this.columns = new Map();
    this.columnIndexes = [];
  }

  register(
    address: Address,
    impl: ColumnImpl,
  ): void {
    let col = this.columns.get(address.col);
    if (col == null) {
      col = new Column(impl);
      this.columns.set(address.col, col);
    }
    col.setImpl(impl);
  }

  unregister(address: Address): void {
    const col = this.columns.get(address.col);
    if (col == null) return;
    this.columns.delete(address.col);
  }

  isValid(): boolean {
    return this.columns.size > 0;
  }
}
