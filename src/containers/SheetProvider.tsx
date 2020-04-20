import React, { useRef } from 'react';

import { SheetContext } from './SheetContext';
import { Sheet } from '../models/sheet';

export interface SheetProviderProps {
  children: React.ReactNode,
}

export function SheetProvider(props: SheetProviderProps): React.ReactElement {
  const { children } = props;
  const sheetRef = useRef<Sheet | null>(null);
  if (sheetRef.current == null) {
    sheetRef.current = new Sheet();
  }
  return (
    <SheetContext.Provider value={{ sheet: sheetRef.current }}>
      { children }
    </SheetContext.Provider>
  );
}
