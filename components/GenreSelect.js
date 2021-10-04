import React from 'react'
import styled from '@emotion/styled'
import cn from 'classnames'
import Downshift from 'downshift'
import { array, func, bool, object } from 'prop-types'
const Wrapper = styled.div`
  position: relative;
  .input {
    font-size: 2.1rem;
    line-height: 1.4;
  }
  .list {
    font-size: 2.1rem;
    line-height: 1.4;
    font-family: ${props => props.theme.textFont};
    position: absolute;
    display: block;
    margin-top: 12px;
    border-radius: 4px;
    width: 100%;
    padding: 10px 0;
    box-shadow: ${props => props.theme.boxShadow};
    background-color: ${props => props.theme.white};
    &.hideList {
      display: none !important;
    }
    &.darkList {
      background-color: ${props => props.theme.nightGrey} !important;
    }
  }
  .listItem {
    cursor: pointer;
    padding: 10px;
    margin: 0 10px;
    background-color: ${props => props.theme.white};
    color: ${props => props.theme.black};
    border-radius: 4px;
    transition: all 0.2s ease;
    &:hover {
      background-color: ${props => props.theme.softViolet};
      color: ${props => props.theme.white};
    }
    &.darkListItem {
      background-color: ${props => props.theme.nightGrey};
    }
    &.selectedListItem {
      background-color: ${props => props.theme.softViolet};
      color: ${props => props.theme.white};
    }
  }
`
const filterResult = (item, inputValue) =>
  !inputValue || item.name.toLowerCase().includes(inputValue.toLowerCase())
function GenreSelect({
  items,
  onSelect,
  isDarkMode,
  initialSelectedItem = null,
}) {
  const getFilteredItems = inputValue =>
    items.filter(item => filterResult(item, inputValue))
  return (
    <Downshift
      onChange={onSelect}
      itemToString={item => (item ? item.name : '')}
      initialSelectedItem={initialSelectedItem}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        getRootProps,
        isOpen,
        inputValue,
        highlightedIndex,
      }) => (
        <Wrapper {...getRootProps()}>
          <input
            {...getInputProps({
              className: 'input',
              placeholder: 'Выберите жанр',
            })}
          />
          <ul
            {...getMenuProps({
              className: cn('list', {
                hideList: !isOpen || !getFilteredItems(inputValue).length,
                darkList: isDarkMode,
              }),
            })}
          >
            {isOpen
              ? getFilteredItems(inputValue).map((item, index) => (
                  <li
                    {...getItemProps({
                      key: item.name,
                      index,
                      item,
                      className: cn('listItem', {
                        selectedListItem: highlightedIndex === index,
                        darkListItem: isDarkMode,
                      }),
                    })}
                  >
                    {item.name}
                  </li>
                ))
              : null}
          </ul>
        </Wrapper>
      )}
    </Downshift>
  )
}
GenreSelect.propTypes = {
  items: array.isRequired,
  onSelect: func.isRequired,
  isDarkMode: bool.isRequired,
  initialSelectedItem: object,
}
export default GenreSelect
