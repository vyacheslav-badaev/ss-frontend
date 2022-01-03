import React, { useState } from 'react'
import styled from '@emotion/styled'
import Button from './button'
const Title = styled.p`
  margin-bottom: 12px;
  margin-top: 12px;
  font-size: 1.8rem;
  line-height: 1.8rem;
  font-weight: 400
  &:first-of-type {
    margin-top: 0;
  }
`
const Block = styled.div`
  display: flex;
  flex-wrap: wrap;
  > button {
    margin-right: 10px;
    margin-bottom: 12px;
  }
`
const LabelButton = styled.button`
  border: 1px solid ${props => props.theme.softViolet};
  color: ${({ selected, theme }) => (selected ? theme.white : theme.black)};
  background-color: ${props =>
    props.selected ? props.theme.softViolet : props.theme.white};
  text-transform: initial;
  border-radius: 25px;
  padding: 6px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 400;
  transition: all 0.2s ease;
  img {
    width: 12px;
    height: 12px;
    margin-left: 4px;
  }
  &:hover {
    background-color: ${props => props.theme.softViolet};
    color: ${props => props.theme.white};
  }
`
const AcceptButton = styled(Button)`
  margin-top: 12px;
  padding: 0 24px;
`
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
      <Title>Выберите жанры</Title>
      <Block>
        {genres.map(genre => (
          <LabelButton
            key={genre.id}
            onClick={() => {
              selectSort({
                ...selectedSort,
                genres: selectedSort.genres.includes(genre.id)
                  ? [...selectedSort.genres].filter(g => g !== genre.id)
                  : [...selectedSort.genres, genre.id],
              })
            }}
            selected={selectedSort.genres.includes(genre.id)}
            className="genre"
            type="button"
          >
            {genre.name}
          </LabelButton>
        ))}
      </Block>
      <Title>Выберите длину рассказов</Title>
      <Block>
        {lengths.map(l => (
          <LabelButton
            key={l.id}
            selected={selectedSort.length === l.id}
            type="button"
            onClick={() => {
              selectSort({
                ...selectedSort,
                length: selectedSort.length === l.id ? null : l.id,
              })
            }}
          >
            {l.name}
          </LabelButton>
        ))}
      </Block>
      <Title>Отсортируйте по популярности</Title>
      <Block>
        {popular.map(p => (
          <LabelButton
            key={p.id}
            selected={selectedSort.popular === p.id}
            onClick={() => {
              selectSort({
                ...selectedSort,
                popular: selectedSort.popular === p.id ? null : p.id,
              })
            }}
          >
            {p.name} <img src={p.icon} alt={p.name} />
          </LabelButton>
        ))}
      </Block>
      <AcceptButton
        violet
        type="button"
        onClick={() => {
          setSort(selectedSort)
          setOpen(false)
        }}
      >
        Применить
      </AcceptButton>
    </div>
  )
}
export default SettingsSort
