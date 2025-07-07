import styled from 'styled-components';

export function FilterButton({ text, color, onClick }) {
  return (
    <Button $color={color} onClick={onClick}>
      {text}
    </Button>
  );
}

const Button = styled.button`
  min-width: 85px;
  width: 100%;
  max-width: 240px;
  height: 40px;
  box-sizing: border-box;
  background-color: transparent;
  color: ${({ $color }) => $color};
  font-size: 16px;
  font-weight: 400;
  border: 1px solid ${({ $color }) => $color};
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
    color: rgba(245, 245, 245, 1);
    background-color: ${({ $color }) => $color};
  }
`;
