import debounce from 'lodash.debounce'
export const isEmpty = (value, error) => {
  if (!value) return error
}
export const storyLength = value => {
  if (!value) return 'Напишите рассказ (минимум 1800 символов)'
  if (value.length < 1800) return 'Слишком короткая история'
  if (value.length > 40000) return 'Слишком длинная история'
}
export const withoutGenre = value => {
  if (!value) return 'Выберите жанр'
  if (!value.id) return 'Выберите жанр'
}
const checkUnique = async (loginValue, check) => {
  if (!loginValue) return
  const promise = await check({ variables: { login: loginValue } })
  return promise
}
export const username = debounce(async (value, check) => {
  if (!value) return 'Введите псевдоним.'
  if (value.length < 3) return 'Слишком короткий псевдоним.'
  if (value.length > 50) return 'Слишком длинный псевдоним.'
  const { data } = await checkUnique(value, check)
  if (data.checkUserExist) return 'Псевдоним занят.'
}, 250)
export const isEmail = debounce(async (value, check) => {
  if (!value) return 'Введите имэйл.'
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
    return 'Некорректный имэйл.'
  const { data } = await checkUnique(value, check)
  if (data.checkUserExist) return 'Имэйл занят.'
}, 250)
export const password = value => {
  if (!value) return 'Введите пароль.'
  if (value.length < 6) return 'Слишком короткий пароль.'
}
export const confirmationPassword = (value, passwordValue) => {
  if (!passwordValue) return 'Сначала введите пароль'
  if (!value) return 'Подтвердите пароль.'
  if (value !== passwordValue) return 'Пароли не совпадают.'
}
export const login = debounce(async (value, check) => {
  if (!value) return 'Введите логин.'
  const { data } = await checkUnique(value, check)
  if (!data.checkUserExist) return 'Аккаунт не найден.'
}, 250)
export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)
