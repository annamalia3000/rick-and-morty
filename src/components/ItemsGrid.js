import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Popup } from './popup';
import { Card } from './card';
import { useData } from './providers';

const defaultPopupSettings = {
  visible: false,
  content: {}
};

export function ItemsGrid() {
  const { characters } = useData();
  const [popupSettings, setPopupSettings] = useState(defaultPopupSettings);

  const handleCardClick = useCallback(
    (id) => {
      const character = characters.find((char) => char.id === id);
      if (character) {
        setPopupSettings({
          visible: true,
          content: { ...character }
        });
      }
    },
    [characters]
  );

  if (!characters.length) {
    return null;
  }

  return (
    <Container>
      {characters.map((character) => (
        <Card
          key={character.id}
          id={character.id}
          onClickHandler={handleCardClick}
          {...character}
        />
      ))}

      <Popup settings={popupSettings} setSettings={setPopupSettings} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  gap: 30px;
`;
