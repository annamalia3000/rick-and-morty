import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterSelect } from './FilterSelect';
import { FilterInput } from './FilterInput';
import { FilterButton } from './FilterButton';
import { optionsStatus, optionsGender, optionsSpecies } from './filterOptions';

export function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    name: '',
    type: '',
    status: '',
    gender: '',
    species: ''
  });

  const setFilter = (key) => (value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    setFilters({
      name: searchParams.get('name') || '',
      type: searchParams.get('type') || '',
      status: searchParams.get('status') || '',
      gender: searchParams.get('gender') || '',
      species: searchParams.get('species') || ''
    });
  }, [searchParams]);

  const updateUrlParams = useCallback(() => {
    const params = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value) acc[key] = value;

      return acc;
    }, {});

    params.page = '1';

    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleApply = useCallback(() => {
    updateUrlParams();
  }, [updateUrlParams]);

  const handleReset = useCallback(() => {
    setFilters({
      name: '',
      type: '',
      status: '',
      gender: '',
      species: ''
    });
    setSearchParams({ page: '1' });
  }, [setSearchParams]);

  return (
    <FilterContainer>
      <FilterSelect
        value={filters.status}
        placeholder="Status"
        options={optionsStatus}
        onChange={setFilter('status')}
      />
      <FilterSelect
        value={filters.gender}
        placeholder="Gender"
        options={optionsGender}
        onChange={setFilter('gender')}
      />
      <FilterSelect
        value={filters.species}
        placeholder="Species"
        options={optionsSpecies}
        onChange={setFilter('species')}
      />
      <FilterInput
        value={filters.name}
        onChange={setFilter('name')}
        placeholder="Name"
      />
      <FilterInput
        value={filters.type}
        onChange={setFilter('type')}
        placeholder="Type"
      />
      <FilterButtonContainer>
        <FilterButton
          text="Apply"
          color="rgba(131, 191, 70, 1)"
          onClick={handleApply}
        />
        <FilterButton
          text="Reset"
          color="rgba(255, 81, 82, 1)"
          onClick={handleReset}
        />
      </FilterButtonContainer>
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  width: 100%;
  display: grid;
  gap: 15px;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  max-width: 1000px;
  margin: 0 auto;
  padding: 10px 20px;

  @media (max-width: 930px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;
const FilterButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
