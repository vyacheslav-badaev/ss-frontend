import React from 'react'
import styled from '@emotion/styled'
import cn from 'classnames'
import Downshift from 'downshift'
const Wrapper = styled.div`
  position: relative;
  .list {
    font-size: 2rem;
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
    z-index: 2;
    &.hideList {
      display: none !important;
    }
    &.darkList {
      background-color: ${props => props.theme.nightGrey} !important;
    }
  }
  .listItem {
    cursor: pointer;
    padding: 4px 8px;
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
const Trigger = styled.button`
  width: 100%;
  height: 46px;
  margin: 0;
  text-align: left;
  font-family: ${props => props.theme.textFont};
  font-size: 2rem;
  border: 1px solid #eee;
  padding-left: 14px;
  border-radius: 8px;
  .placeholder {
    color: #aaa;
  }
`
const filterResult = (item, inputValue) =>
  !inputValue || item.name.toLowerCase().includes(inputValue.toLowerCase())
function GenreSelect({ items, onSelect, isDarkMode, input }) {
  const getFilteredItems = inputValue =>
    items.filter(item => filterResult(item, inputValue))
  return (
    <Downshift
      {...input}
      onChange={onSelect}
      itemToString={item => (item ? item.name : '')}
      onInputValueChange={inputValue => {
        input.onChange(inputValue)
      }}
      initialSelectedItem={input.value}
    >
      {({
        getToggleButtonProps,
        getItemProps,
        getMenuProps,
        getRootProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
      }) => (
        <Wrapper {...getRootProps({ refKey: 'ref' })}>
          <Trigger {...getToggleButtonProps()}>
            {selectedItem ? (
              selectedItem.name
            ) : (
              <p className="placeholder">Нажмите, чтобы выбрать жанр</p>
            )}
          </Trigger>
          <ul
            {...getMenuProps({
              className: cn('list', {
                hideList: !isOpen || !getFilteredItems(inputValue).length,
                darkList: isDarkMode,
              }),
            })}
          >
            {isOpen
              ? items.map((item, index) => (
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
export default GenreSelect
