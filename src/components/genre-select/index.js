import React from 'react'
import cn from 'classnames'
import Downshift from 'downshift'
import styles from './styles.css'
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
        <div {...getRootProps({ className: styles.wrapper })}>
          <button {...getToggleButtonProps({ className: styles.trigger })}>
            {selectedItem ? (
              selectedItem.name
            ) : (
              <p className={styles.placeholder}>Нажмите, чтобы выбрать жанр</p>
            )}
          </button>
          <ul
            {...getMenuProps({
              className: cn(styles.list, {
                [styles.hideList]:
                  !isOpen || !getFilteredItems(inputValue).length,
                [styles.darkList]: isDarkMode,
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
                      className: cn(styles.listItem, {
                        [styles.selectedListItem]: highlightedIndex === index,
                        [styles.darkListItem]: isDarkMode,
                      }),
                    })}
                  >
                    {item.name}
                  </li>
                ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  )
}
export default GenreSelect
