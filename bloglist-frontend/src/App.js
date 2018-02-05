import React from 'react'
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom'
//import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
//import userService from './services/user'
import {initializeBlogs} from './reducers/blogReducer'
//import UserList from './components/UserList'
import BlogList from './components/BlogList'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      username: '',
      password: '',
      user: null,
      users: [],
      notification: null
    }
  }

  componentWillMount = async () => {
  /*
    userService.getAll().then(users =>
    this.setState({ users })
  )
  */
    this.props.initializeBlogs()

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  }

  userById = (id) => this.state.users.find(u => u.id === id)

  render() {
    if (this.state.user === null) {
     return (
       <div>
       <h2>blog app</h2>
       <Error message = {this.state.error}/>
       <LoginForm loginHandler={this.login} fieldChangeHandler={this.handleLoginFieldChange} username={this.state.username} password={this.state.password}/>
       </div>
     )
   }

   return (
     <div className='container'>
       <h2>blog app</h2>
       <Error message = {this.state.error}/>
       <Notification message = {this.state.notification}/>
       <p>You are logged in as {this.state.user.username} <button onClick={this.logout}>kirjaudu ulos</button></p>
         <Router>
          <div>
            <Togglable buttonLabel="Add new blog">
              <BlogForm/>
            </Togglable>
            <Route exact path="/" render={() => <BlogList/>} />
            <Route exact path="/users" render={() => <UserList users={this.state.users}/>} />
            <Route exact path="/users/:id" render={({match}) => <User user={this.userById(match.params.id)} />}/>
            <Footer/>
          </div>
        </Router>
    </div>
  )
}


  login = async(e) => {
    e.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)

      const notification = `Succesfully logged in as ${user.username}`
      this.setState({ username: '', password: '', user, notification, error:null})
      setTimeout(() => {
        this.setState({ notification: null })
      }, 3000)
    } catch(exception) {
      this.setState({
        error: 'username or password was incorrect',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 3000)
    }
  }

  logout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    this.setState({ username: '', password: '', user:null, notification:'Succesfully logged out'})
    setTimeout(() => {
      this.setState({ notification: null })
    }, 3000)
  }

  handleLoginFieldChange = (e) => {
  this.setState({ [e.target.name]: e.target.value })
  }

}

const UserList = ({ users }) => {
  return (
    <div className = 'container'>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th/>
            <th>added blogs</th>
          </tr>
        </thead>
        <tbody>
          {this.state.users.map(user=>
            <tr key={user.id}>
              <td>{user.username}</td>
              <td style={{paddingLeft:20}}>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
const User = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
        <li>{blog}</li>
        )}
      </ul>
    </div>
  )
}

const Footer = () => {
  const footerStyle = {
      padding: 25,
      paddingLeft: 50
  }

  return(
    <div style = {footerStyle}>
      <NavLink exact to="/">Front page</NavLink><br/>
      <NavLink to="/users">See other blog app users</NavLink>
    </div>
  )
}

/*
const BlogList = ({ blogs, user, removeHandler }) => {
  return(
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} isByLoggedUser={user.username===blog.user.username} removeHandler={removeHandler(blog)}/>
      )}
    </div>
  )
}
*/

const LoginForm = ({ username, password, loginHandler, fieldChangeHandler }) => {
  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={loginHandler}>
        <div>
          username
          <input
            type="text"
            name="username"
            value={username}
            onChange={fieldChangeHandler}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="password"
            value={password}
            onChange={fieldChangeHandler}
          />
        </div>
        <button>log in</button>
      </form>
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

//<Route exact path="/" render={() => <BlogList blogs={this.state.blogs} user={this.state.user} removeHandler={this.removeBlog} />} />

export default connect(
  null,
  {initializeBlogs}
)(App)
