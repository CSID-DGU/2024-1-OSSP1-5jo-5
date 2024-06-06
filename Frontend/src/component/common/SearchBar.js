import React from 'react';
import { SearchBarContainer,Bar, SearchInput, SearchButton, Icon, FilterIconContainer, FilterIcon } from './Style';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <SearchBarContainer>
      <Bar>
        <SearchInput type="text" placeholder="검색하고자하는 API를 입력해보세요!" />
        <SearchButton>
          <Icon as={FaSearch} />
        </SearchButton>
      </Bar>
    </SearchBarContainer>
  );
};

export default SearchBar;