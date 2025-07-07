import styled from 'styled-components';
import { useCallback } from 'react';

export function FilterInput({ value, placeholder, onChange }) {
  const handleInputChange = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <Input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={handleInputChange}
    />
  );
}

const Input = styled.input`
  min-width: 180px;
  max-width: 240px;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  background-color: #263750;
  color: rgba(245, 245, 245, 1);
  font-size: 16px;
  font-weight: 400;
  border: 1px solid rgba(131, 191, 70, 1);
  border-radius: 8px;
  padding: 12px 12px 12px 16px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &::placeholder {
    color: rgba(179, 179, 179, 1);
  }

  &:hover {
    cursor: pointer;
    background-color: rgba(51, 68, 102, 1);
  }
  &:active {
    background-color: rgba(51, 68, 102, 1);
  }
`;
