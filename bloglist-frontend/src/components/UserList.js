import React from 'react'
//import { BrowserRouter as Link } from 'react-router-dom'
import {Table} from 'react-bootstrap'
import {connect} from 'react-redux'

class UserList extends React.Component {

  render() {
    if(this.props.users.length === 0) {
      return <div></div>
    }
    return (
      <div className = 'container'>
        <h2>Users</h2>
        <Table striped>
          <thead>
            <tr>
              <th/>
              <th>added blogs</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map(user=>
                <tr key={user.id}>
                  <td><a href={`/users/${user.id}`}>{user.username}</a></td>
                  <td style={{paddingLeft:20}}>{user.blogs.length}</td>
                </tr>
            )}
          </tbody>
        </Table>
      </div>
    )
  }
}
// <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>

const mapStateToProps = (state) => {
  return {
    users : state.users
  }
}

export default connect(
  mapStateToProps
)(UserList)
