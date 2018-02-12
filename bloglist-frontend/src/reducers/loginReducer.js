import loginService from './../services/login'
import blogService from './../services/blogs'

const loginReducer = (state=JSON.parse(localStorage.getItem('loggedUser')), action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const login = (credentials) => {
  return async(dispatch) => {
    const user = await loginService.login(credentials)
    if(user) {
      localStorage.setItem('loggedUser', JSON.stringify(user))
      await blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user
      })
    }
  }
}

export const logout = () => {
  return async(dispatch) => {
  localStorage.removeItem('loggedUser')
  blogService.setToken(null)
  dispatch({
    type : 'LOGOUT'
  })
  }
}

export const initializeLoggedUser = () => {
  return async(dispatch) => {
    const loggedUserJSON = await localStorage.getItem('loggedUser')
    if(loggedUserJSON) {
      const user = await JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user
      })
    }
  }
}

export default loginReducer
