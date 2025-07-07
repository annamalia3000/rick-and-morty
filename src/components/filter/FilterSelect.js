import styled from 'styled-components';
import { useCallback, useState, useRef, useEffect } from 'react';
import { ReactComponent as ChevronIcon } from './../../assets/select-icons/chevron.svg';
import { ReactComponent as CrossIcon } from './../../assets/select-icons/cross.svg';

export function FilterSelect({ value, placeholder, onChange, options = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const handleSelect = useCallback(
    (optionValue) => {
      onChange(optionValue);
      setIsOpen(false);
    },
    [onChange]
  );

  const handleOptionClick = useCallback(
    (optionValue) => () => {
      handleSelect(optionValue);
    },
    [handleSelect]
  );

  const removeSelect = useCallback(
    (e) => {
      e.stopPropagation();
      onChange('');
    },
    [onChange]
  );

  const toggleIsOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <Wrapper ref={wrapperRef}>
      <SelectBox
        onClick={toggleIsOpen}
        isOpen={isOpen}
        $selectedOption={!!selectedOption}
      >
        {selectedOption?.label || placeholder}
        {selectedOption ? (
          <RemoveButton onClick={removeSelect}>
            <Cross />
          </RemoveButton>
        ) : (
          <Chevron $isOpen={isOpen} />
        )}
      </SelectBox>
      {isOpen && (
        <Dropdown>
          {options.map(({ value: optionValue, label }) => (
            <Option
              key={optionValue}
              onClick={handleOptionClick(optionValue)}
              $selected={optionValue === value}
            >
              {label}
            </Option>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  min-width: 180px;
  width: 100%;
  max-width: 240px;
`;

const SelectBox = styled.div`
  position: relative;
  width: 100%;
  min-height: 40px;
  box-sizing: border-box;
  background-color: #263750;
  color: ${({ $selectedOption }) =>
    $selectedOption ? 'rgba(245, 245, 245, 1)' : 'rgba(179, 179, 179, 1)'};
  font-size: 16px;
  font-weight: 400;
  border: 1px solid rgba(131, 191, 70, 1);
  border-radius: 8px;
  padding: 10px 12px 10px 16px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    cursor: pointer;
    background-color: rgba(51, 68, 102, 1);
  }
  &:active {
    background-color: rgba(51, 68, 102, 1);
  }
`;

const Chevron = styled(ChevronIcon)`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: ${({ $isOpen }) =>
    $isOpen ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)'};
  width: 16px;
  height: 16px;
  stroke: ${({ $isOpen }) =>
    $isOpen ? 'rgba(255, 255, 255, 1)' : 'rgba(178, 178, 178, 1)'};
  transition: transform 0.2s ease;
  pointer-events: none;
`;

const RemoveButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: rgba(245, 245, 245, 1);

  & :hover {
    color: rgba(131, 191, 70, 1);
  }
`;

const Cross = styled(CrossIcon)`
  width: 16px;
  height: 16px;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  width: 100%;
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(217, 217, 217, 1);
  border-radius: 8px;
  z-index: 999;
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
`;

const Option = styled.li`
  padding: 10px 16px;
  color: rgba(30, 30, 30, 1);
  font-weight: ${({ $selected }) => ($selected ? '600' : '400')};
  background-color: rgba(255, 255, 255, 1);
  cursor: pointer;

  &:hover {
    background-color: rgba(131, 191, 70, 0.2);
  }
`;
