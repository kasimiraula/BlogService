import React from 'react'
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import {initializeBlogs, likeBlog} from './reducers/blogReducer'
import {initializeLoggedUser, login, logout} from './reducers/loginReducer'
import {initializeUsers} from './reducers/userReducer'
import {notify} from './reducers/notificationReducer'

import User from './components/User'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import './index.css'

class App extends React.Component {

  componentWillMount = async () => {
    await this.props.initializeBlogs()
    await this.props.initializeUsers()
    await this.props.initializeLoggedUser()
  }


  render() {
    if (this.props.loggedUser === null || this.props.loggedUser === undefined) {
     return (
       <div className='container'>
       <h2>blog app</h2>
       <Notification/>
       <LoginForm loginHandler={this.login}/>
       </div>
     )
   }

   const userById = (id) =>
     (this.props.users.find(u => u.id === id))

     const blogById = (id) =>
       (this.props.blogs.find(bl => bl.id === id))

   return (
     <div className='container'>
     <Router>
     <div>
     <h2>blog app</h2>
     <Notification/>
        <div>
        <Menu/>
        <p>You are logged in as {this.props.loggedUser.username} <button onClick={this.logout}>kirjaudu ulos</button></p>
          <Togglable buttonLabel="Add new blog">
            <BlogForm/>
          </Togglable>
          <Route exact path="/" render={() => <BlogList/>} />
          <Route exact path="/users" render={() => <UserList/>} />
          <Route exact path="/blogs/:id" render={({match}) => <Blog key={match.params.id} blog={blogById(match.params.id)} likeHandler={() => this.props.likeBlog(blogById(match.params.id))} />}/>
          <Route exact path="/users/:id" render={({match}) => <User key={match.params.id} user={userById(match.params.id)} />}/>
        </div>
        </div>
      </Router>
    </div>
  )
}

login = async(e) => {
    e.preventDefault()
    try {
      await this.props.login({
      username: e.target.username.value,
      password: e.target.password.value})
      const notification = `Succesfully logged in as ${this.props.loggedUser.username}`
      this.props.notify(notification, 'general', 5)
    } catch(exception) {
        const error = 'username or password was incorrect'
        this.props.notify(error, 'error', 5)
    }
}

  logout = (e) => {
    e.preventDefault()
    this.props.logout()
    const notification = 'Succesfully logged out'
    this.props.notify(notification, 'general', 4)
  }
}

const Menu = () => {
  const style = {
    background: 'lightblue',
    borderRadius: 6,
    padding: 15,
    margin: 15,
    width: 250
  }
  const selected = {
    background: 'white',
    padding: 2,
    paddingTop: 16,
    paddingBottom: 18,
  }

  return(
    <div style={style}>
      <NavLink activeStyle={selected} exact to="/">blogs</NavLink> &nbsp;
      <NavLink activeStyle={selected} exact to="/users">users</NavLink>
    </div>
  )
}

/*const Blog = ({ blog }) => {
  if(blog === undefined) {
    return <div></div>
  }

  const like = (blog) => this.props.likeBlog(blog)

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>likes: {blog.likes} <button onClick={like}>like</button></p>
      <p>added by {blog.user.name ? blog.user.name : `a user ${blog.user.username}`}</p>
    </div>
  )
}*/

const mapStateToProps = (state) => {
    return {
      loggedUser: state.loggedUser,
      users : state.users,
      blogs : state.blogs,
      notification: state.notification
    }
}

export default connect(
  mapStateToProps,
  {initializeBlogs,
  initializeUsers,
  likeBlog,
  login,
  logout,
  initializeLoggedUser,
  notify}
)(App)
