export interface ColumnImpl {
  // TODO Various logic here... This will be implemented in
  // 'col' component, which is delegated by column class
  focus(): void,
}

export class Column {
  impl: ColumnImpl | null;

  constructor(impl: ColumnImpl | null) {
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
