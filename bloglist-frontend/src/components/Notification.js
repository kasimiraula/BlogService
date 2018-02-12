import React from 'react'
import { connect } from 'react-redux'
import './../index.css'

class Notification extends React.Component {

  render() {
    
    if (this.props.notification === null) {
      return null
    } else {
      return (
        <div className={this.props.notification.style}>
          {this.props.notification.content}
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)
