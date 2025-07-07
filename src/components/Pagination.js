import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useData } from './providers';

export function Pagination() {
  const [pages, setPages] = useState([]);
  const { apiURL, info, activePage, setActivePage } = useData();
  const [searchParams, setSearchParams] = useSearchParams();

  const pageClickHandler = useCallback(
    (index) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });

      const newParams = new URLSearchParams(searchParams);
      newParams.set('page', index + 1);
      setSearchParams(newParams);

      setActivePage(index);
    },
    [searchParams, setSearchParams, setActivePage]
  );

  useEffect(() => {
    const createdPages = Array.from({ length: info.pages }, (_, i) => {
      const URLWithPage = new URL(apiURL);

      URLWithPage.searchParams.set('page', i + 1);

      return URLWithPage;
    });

    setPages(createdPages);
  }, [info, apiURL]);

  const getPageClickHandler = useCallback(
    (index) => () => pageClickHandler(index),
    [pageClickHandler]
  );

  if (pages.length <= 1) return null;

  return (
    <StyledPagination>
      {pages[activePage - 1] && (
        <>
          {activePage - 1 !== 0 && (
            <>
              <Page onClick={getPageClickHandler(0)}>« First</Page>
              <Ellipsis>...</Ellipsis>
            </>
          )}

          <Page onClick={getPageClickHandler(activePage - 1)}>
            {activePage}
          </Page>
        </>
      )}

      <Page active>{activePage + 1}</Page>

      {pages[activePage + 1] && (
        <>
          <Page onClick={getPageClickHandler(activePage + 1)}>
            {activePage + 2}
          </Page>

          {activePage + 1 !== pages.length - 1 && (
            <>
              <Ellipsis>...</Ellipsis>
              <Page onClick={getPageClickHandler(pages.length - 1)}>
                Last »
              </Page>
            </>
          )}
        </>
      )}
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  width: 100%;
  text-align: center;
`;

const Page = styled.span`
  color: #fff;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.2s;
  ${({ active }) => active && 'color: #83bf46'};

  &:hover {
    color: #83bf46;
  }
`;
const Ellipsis = styled(Page)`
  cursor: default;

  &:hover {
    color: #fff;
  }
`;
