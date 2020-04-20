import React from 'react';
import { Sheet } from '../models/sheet';

export interface SheetContextValue {
  sheet: Sheet | null,
}

export const SheetContext = React.createContext<SheetContextValue>({
  sheet: null,
});
