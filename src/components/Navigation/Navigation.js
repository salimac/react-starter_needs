import React from "react";
import { IndexLink, Link } from "react-router";
import Notifications from "react-notification-system";
const style = {
    Containers: {
        DefaultStyle: {
            position: "fixed",
            padding:"0",
            width:"100%"
        }
    },
    NotificationItem:{
        DefaultStyle: {
            position: "fixed",
            bottom: 0
        },
        success: {
            padding: "2.4rem",
            borderTop: "none",
            backgroundColor: "#389A6E"
        },
        error: {
            padding: "2.4rem",
            borderTop: "none",
            backgroundColor: "#DA4747"
        }
    },
    Title: {
        DefaultStyle: {
            fontSize: "1.6rem",
            fontWeight: 500,
            color: "#fff"
        }
    },
    Dismiss: {
        DefaultStyle: {
            backgroundColor: "transparent",
            fontSize: "2.6rem",
            fontFamily: "Lato"
        }
    }
};
class Navigation extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
        tab : ""
      };
  }
  componentDidMount() {
      this._notificationSystem = this.refs.notificationSystem;
  }
  componentWillReceiveProps(props){
      if (Object.keys(props.notification).length && (!this.refs.notificationSystem.state.notifications.length || this.refs.notificationSystem.state.notifications.find(not=>not.uid !== props.notification.uid))){
          this.refs.notificationSystem.state.notifications.filter(not=>not.uid !== props.notification.uid).forEach((notification)=>{
              this._notificationSystem.removeNotification(notification);
          });
          this._notificationSystem.addNotification(props.notification);
      }
  }
  render () {
    const {store} = this.props;
    return (
      <div>
          <h1>React Redux Starter Kit</h1>
          <IndexLink to='/' activeClassName='page-layout__nav-item--active'>Home</IndexLink>
          <Link to='/counter' activeClassName='page-layout__nav-item--active'>Counter</Link>
          <br />
          <a onClick={this.props.tabChange}> trigger api call </a>
          <Notifications style={style} ref="notificationSystem"/>
      </div>
    )
  }
}

export default Navigation;