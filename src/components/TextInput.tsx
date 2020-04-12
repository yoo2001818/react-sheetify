import React from 'react';

import styles from './TextInput.module.css';

export interface TextInputProps {
  value: string | undefined,
  onChange: () => void,
}

export function TextInput(props: TextInputProps): React.ReactElement {
  const { value, onChange } = props;
  return (
    <input
      className={styles.input}
      value={value}
      onChange={onChange}
    />
  );
}
