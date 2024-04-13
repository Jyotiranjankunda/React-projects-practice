import { Component } from 'react';
import User from './User';

import classes from './Users.module.css';

class Users extends Component{
  constructor(){
    super();

    // state is always an object in class components, and we can have only one state object, that must be names as 'state' only.
    this.state = {
      showUsers: true
    };
  }

  componentDidUpdate(){
    if(this.props.users.length === 0){
      throw new Error("No users provided");
    }
  }

  toggleUsersHandler(){
    // this.setState function is used to update the state.

    // In this, whichever state we update, only that will be merged with the original state object, not like hooks, in which the state updating function will overwrite the whole state. So, we need the rest operator in that

    this.setState((currState) => {
      return{
        showUsers: !currState.showUsers
      }
    });
  }

  render(){
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );

    /*
    <button onClick={this.toggleUsersHandler.bind(this)}>

    In this line, if we write something like this : 
    <button onClick={this.toggleUsersHandler}>  : Then it won't work

    because this.toggleUsersHandler fails here.

    'this' is not defined to refer to the object that encloses it when you write your code. Instead, 'this' refers to "whoever called the code in which it's being used". And in this case, the button is responsible for executing toggleUsersHandler.

    If we log the value of this inside the toggleUsersHandler function, then it will be <button>...</button>

    So this is now referring to the <button> element to which we attached the click event listener. That is actually the default JavaScript behavior. this refers to whoever called a method that uses this. Obviously, this is not the behavior we want here - and thankfully, you can change it. You can bind this inside of toggleUsersHandler to something else than the button. You can bind it to the surrounding class/ object by using bind function:

    this.toggleUsersHandler.bind(this)

    bind() is a default JavaScript method which you can call on functions/ methods. It allows you to bind 'this' inside of the "to-be-executed function/ method" to any value of your choice. 
    In the above snippet, we bind 'this' inside of toggleUsersHandler to the same value this refers to in the constructor.
    
    In that constructor, 'this' will refer to the class/ object because we execute that code on our own. The constructor essentially is always executed by the object itself you could say, hence this inside of the constructor also refers to that object.
    */
  }
}

export default Users;
