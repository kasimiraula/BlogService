import React from 'react'
import {connect} from 'react-redux'
import {login} from './../reducers/loginReducer'
import {notify} from './../reducers/notificationReducer'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loginHandler: this.props.loginHandler
    }
  }

  render() {
    return (
      <div>
        <h2>Log in</h2>
        <form onSubmit={this.state.loginHandler}>
          <div>
            username
            <input
              type="text"
              name="username"
            />
          </div>
          <div>
            password
            <input
              type="password"
              name="password"
              />
          </div>
          <button>log in</button>
        </form>
      </div>
    )
  }

/*  login = async(e) => {
    e.preventDefault()
    try{
      const user = this.props.login({
        username: e.target.username.value,
        password: e.target.password.value
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)

      const notification = `Succesfully logged in as ${user.username}`
      this.props.notify(notification, 'general', 5)
    } catch(exception) {
        const error = 'username or password was incorrect'
        this.props.notify(error, 'error', 5)
      }
  }*/
}

//const mapStateToProps = (state) => {
//  loggedUser: state.loggedUser
//}

export default connect(
  null,
  {login,notify}
)(LoginForm)
