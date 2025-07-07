import styled from 'styled-components';
import { Logo } from './Logo';
import { Filter } from '../filter';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <Filter />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: space-between;

  @media (max-width: 930px) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
`;
