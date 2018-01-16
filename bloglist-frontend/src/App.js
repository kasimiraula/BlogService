import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      error: null,
      username: '',
      password: '',
      user: null,
      notification: null
    }
  }

  componentWillMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
}

  render() {
    if (this.state.user === null) {
     return (
       <div>
       <Error message = {this.state.error}/>
         <h2>Log in</h2>
         <form onSubmit={this.login}>
           <div>
             username
             <input
               type="text"
               name="username"
               value={this.state.username}
               onChange={this.handleLoginFieldChange}
             />
           </div>
           <div>
             password
             <input
               type="password"
               name="password"
               value={this.state.password}
               onChange={this.handleLoginFieldChange}
             />
           </div>
           <button>log in</button>
         </form>
       </div>
     )
   }

   return (
     <div>
     <Error message = {this.state.error}/>
     <Notification message = {this.state.notification}/>
      <p>Logged in as {this.state.user.username} <button onClick={this.logout}>kirjaudu ulos</button></p>
        <h2>Add new blog</h2>
        <BlogForm/>
        <h2>Blogs</h2>
          {this.state.blogs.map(blog =>
            <Blog key={blog._id} blog={blog} />
          )}
    </div>
  )
}

  login = async (e) => {
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
    this.setState({ username: '', password: '', user:null})
  }

  handleLoginFieldChange = (e) => {
  this.setState({ [e.target.name]: e.target.value })
  }

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

export default App;
