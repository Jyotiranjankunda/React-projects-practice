import classes from './User.module.css';
import { Component } from 'react';

// Class based component
class User extends Component {
  componentWillUnmount(){
    // When the users will be hidden, i.e, they are removed from dom, so just before that this function will execute.
    console.log("Component will unmount");
  }

  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

export default User;