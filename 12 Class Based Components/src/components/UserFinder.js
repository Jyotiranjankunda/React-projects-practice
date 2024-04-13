import { Fragment, Component } from 'react';
import Users from './Users';
import classes from './UserFinder.module.css';
import UsersContext from '../store/users-context';
import ErrorBoundary from './ErrorBoundary';

class UserFinder extends Component {
  // In class based components, we can consume the context by using the static keyword contextType, and then user where ever we want by writing this.context.propertyName

  // In class based components, there can be only one context per class, we can't have multiple contexts.
  static contextType = UsersContext;

  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: '',
    };
  }

  // componentDidMount will run only once, when the app is loaded for the first time.
  // After then for every updated, componentDidUpdate will run.

  componentDidMount(){
    this.setState({
      filteredUsers: this.context.users
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((user) =>
          user.name.includes(this.state.searchTerm),
        ),
      });
    }
  }

  searchChangeHandler(event) {
    this.setState({
      searchTerm: event.target.value,
    });
  }

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input
            type='search'
            onChange={this.searchChangeHandler.bind(this)}
            placeholder='Search...'
          />
        </div>

        {/* We can't wrap the jsx code inside try catch block, so we have to wrap it inside an error boundary. */}
        <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    );
  }
}

export default UserFinder;
