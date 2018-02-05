import React from 'react'
import { BrowserRouter as Link } from 'react-router-dom'

class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: props.users
    }
  }

  render() {
    console.log(this.state.users)
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
}
//<Link to={`/users/${user.id}`}></Link>
export default UserList
