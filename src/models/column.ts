export interface ColumnImpl {
  // TODO Various logic here... This will be implemented in
  // 'col' component, which is delegated by column class
  focus(): void,
}

export class Column {
  id: string | number;
  impl: ColumnImpl | null;

  constructor(id: string | number, impl: ColumnImpl | null) {
    this.id = id;
    this.impl = impl;
  }

  reportFocus(): void {

  }
  
  reportBlur(): void {

  }

  setImpl(impl: ColumnImpl): void {
    this.impl = impl;
  }

  focus(): void {

  }
}
