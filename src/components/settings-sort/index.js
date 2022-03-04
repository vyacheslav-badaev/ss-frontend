import React, { useState } from 'react'
import cn from 'classnames'
import Button from '../button'
import styles from './styles.css'
const lengths = [
  { id: 'short', name: 'Короткие' },
  { id: 'middle', name: 'Средние' },
  { id: 'long', name: 'Длинные' },
]
const popular = [
  {
    id: 'mostLiked',
    name: 'По лайкам',
    icon: '/static/images/icons/like-fill-grey.svg',
  },
  {
    id: 'mostViewed',
    name: 'По просмотрам',
    icon: '/static/images/icons/eye.svg',
  },
  {
    id: 'mostCommented',
    name: 'По комментам',
    icon: '/static/images/icons/comment-fill-grey.svg',
  },
]
function SettingsSort({ genres, setOpen, setSort }) {
  const [selectedSort, selectSort] = useState({
    genres: [],
    length: null,
    popular: null,
  })
  return (
    <div>
      <p className={styles.title}>Выберите жанры</p>
      <div className={styles.block}>
        {genres.map(genre => (
          <button
            className={cn(styles.label, {
              [styles.selected]: selectedSort.genres.includes(genre.id),
            })}
            key={genre.id}
            onClick={() => {
              selectSort({
                ...selectedSort,
                genres: selectedSort.genres.includes(genre.id)
                  ? [...selectedSort.genres].filter(g => g !== genre.id)
                  : [...selectedSort.genres, genre.id],
              })
            }}
            type="button"
          >
            {genre.name}
          </button>
        ))}
      </div>
      <p className={styles.title}>Выберите длину рассказов</p>
      <div className={styles.block}>
        {lengths.map(l => (
          <button
            className={cn(styles.label, {
              [styles.selected]: selectedSort.length === l.id,
            })}
            key={l.id}
            type="button"
            onClick={() => {
              selectSort({
                ...selectedSort,
                length: selectedSort.length === l.id ? null : l.id,
              })
            }}
          >
            {l.name}
          </button>
        ))}
      </div>
      <p className={styles.title}>Отсортируйте по популярности</p>
      <div className={styles.block}>
        {popular.map(p => (
          <button
            className={cn(styles.label, {
              [styles.selected]: selectedSort.popular === p.id,
            })}
            key={p.id}
            onClick={() => {
              selectSort({
                ...selectedSort,
                popular: selectedSort.popular === p.id ? null : p.id,
              })
            }}
          >
            {p.name} <img src={p.icon} alt={p.name} />
          </button>
        ))}
      </div>
      <Button
        violet
        className={styles['accept-button']}
        onClick={() => {
          setSort(selectedSort)
          setOpen(false)
        }}
      >
        Применить
      </Button>
    </div>
  )
}
export default SettingsSort
