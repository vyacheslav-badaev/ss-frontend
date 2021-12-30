import React, { useState } from 'react'
import Link from 'next/link'
import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { Query } from 'react-apollo'
import Wrapper from '../components/Wrapper'
import Stories from '../components/Stories'
import Modal from '../components/modal'
import { GENRES_QUERY } from '../lib/queries'
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const SEOBlock = styled.div`
  margin-top: 64px;
  background-color: ${props => props.theme.white};
  text-align: left;
  position: relative;
  flex-basis: 100%;
  width: 100%;
  padding: 5vh 0;
  order: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-top: 2px solid ${props => props.theme.lightGrey};
  .inner {
    width: 100%;
    max-width: 1024px;
    padding: 0 24px;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }
  .text {
    flex: 2;
    h1 {
      opacity: 0;
      animation: ${fadeIn} 1s ease 0.2s 1 normal forwards running;
    }
    p {
      color: slategrey;
      opacity: 0;
      margin-top: 20px;
      font-size: 2rem;
      line-height: 1.3;
      animation: ${fadeIn} 1s ease 0.7s 1 normal forwards running;
    }
    .settings-button {
      text-transform: initial;
      color: ${props => props.theme.softViolet};
      font-weight: 700;
    }
  }
  .write {
    display: block;
    opacity: 0;
    font-size: 10rem;
    animation: ${fadeIn} 1s ease 0.8s 1 normal forwards running;
    flex: 1;
    text-align: center;
    @media (max-width: 750px) {
      display: none;
    }
  }
`
const SortWrapper = styled.div`
  h3 {
    margin-bottom: 10px;
    margin-top: 14px;
    &:first-of-type {
      margin-top: 0;
    }
  }
  .settings {
    display: flex;
    flex-wrap: wrap;
    > button {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
  .complete {
    margin-top: 14px;
    background-color: ${props => props.theme.softViolet};
    color: ${props => props.theme.white};
    border-radius: 4px;
    display: block;
    padding: 0 12px;
    height: 28px;
    line-height: 28px;
    font-weight: bold;
    font-size: 1.2rem;
    transition: background-color 0.25s ease;
    &:hover {
      background-color: #5c32d5;
    }
  }
`
const Genre = styled.button`
  border: 2px solid ${props => props.theme.softViolet};
  color: ${props => (props.selected ? props.theme.white : props.theme.black)};
  background-color: ${props =>
    props.selected ? props.theme.softViolet : props.theme.white};
  text-transform: initial;
  border-radius: 8px;
  padding: 6px 8px;
  display: inline-block;
  font-weight: bold;
  font-size: 1.2rem;
`
const Length = styled.button`
  border: 2px solid ${props => props.theme.softViolet};
  color: ${props => (props.selected ? props.theme.white : props.theme.black)};
  background-color: ${props =>
    props.selected ? props.theme.softViolet : props.theme.white};
  text-transform: initial;
  border-radius: 8px;
  padding: 6px 8px;
  display: inline-block;
  font-weight: bold;
  font-size: 1.2rem;
`
const Popular = styled.button`
  border: 2px solid ${props => props.theme.softViolet};
  color: ${props => (props.selected ? props.theme.white : props.theme.black)};
  background-color: ${props =>
    props.selected ? props.theme.softViolet : props.theme.white};
  text-transform: initial;
  border-radius: 8px;
  padding: 6px 8px;
  display: inline-block;
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 12px;
    height: 12px;
    margin-left: 4px;
  }
`
function Home() {
  const [isOpen, setOpen] = useState(false)
  const [selectedSort, selectSort] = useState({
    genres: [],
    length: null,
    popular: null,
  })
  const [sort, setSort] = useState(undefined)
  return (
    <Query query={GENRES_QUERY}>
      {({ data: { genres } }) => (
        <>
          <SEOBlock>
            <div className="inner">
              <div className="text">
                <h1>Здесь вы можете читать рассказы авторов из народа.</h1>
                <p>
                  Откройте для себя новых авторов или{' '}
                  <Link href="/create-story">
                    <a>продемонстрируйте</a>
                  </Link>{' '}
                  писательский талант и станьте лучшим.
                </p>
                <p>
                  Для удобства чтения{' '}
                  <button
                    onClick={() => {
                      setOpen(true)
                    }}
                    className="settings-button"
                    type="button"
                  >
                    настройте
                  </button>{' '}
                  ленту.
                </p>
              </div>
              <span className="write" role="img" aria-label="emoji">
                ✍️
              </span>
            </div>
          </SEOBlock>
          <Wrapper isIndex>
            <Stories sort={sort} />
          </Wrapper>
          {isOpen && (
            <Modal
              onClose={() => {
                setOpen(false)
              }}
            >
              <SortWrapper>
                <h3>Выберите жанры</h3>
                <div className="settings">
                  {genres.map(i => (
                    <Genre
                      onClick={() => {
                        selectSort({
                          ...selectedSort,
                          genres: selectedSort.genres.includes(i.id)
                            ? [...selectedSort.genres].filter(g => g !== i.id)
                            : [...selectedSort.genres, i.id],
                        })
                      }}
                      selected={selectedSort.genres.includes(i.id)}
                      className="genre"
                      type="button"
                      key={i.id}
                    >
                      {i.name}
                    </Genre>
                  ))}
                </div>
                <h3>Выберите длину рассказов</h3>
                <div className="settings">
                  <Length
                    selected={selectedSort.length === 'short'}
                    onClick={() => {
                      selectSort({
                        ...selectedSort,
                        length:
                          selectedSort.length === 'short' ? null : 'short',
                      })
                    }}
                  >
                    Короткие
                  </Length>
                  <Length
                    selected={selectedSort.length === 'middle'}
                    onClick={() => {
                      selectSort({
                        ...selectedSort,
                        length:
                          selectedSort.length === 'middle' ? null : 'middle',
                      })
                    }}
                  >
                    Средние
                  </Length>
                  <Length
                    selected={selectedSort.length === 'long'}
                    onClick={() => {
                      selectSort({
                        ...selectedSort,
                        length: selectedSort.length === 'long' ? null : 'long',
                      })
                    }}
                  >
                    Длинные
                  </Length>
                </div>
                {}
                <button
                  onClick={() => {
                    setSort(selectedSort)
                    setOpen(false)
                  }}
                  className="complete"
                  type="button"
                >
                  Применить
                </button>
              </SortWrapper>
            </Modal>
          )}
        </>
      )}
    </Query>
  )
}
export default Home
