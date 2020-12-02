import React from "react";
import { gql, useMutation } from "@apollo/client"
import { isLoggedInVar } from "../utils/apollo"
import PropTypes from 'prop-types';

const SIGNIN_EVENT = gql`
  mutation SignIn($email: String!, $password: String!, $remember_me: Boolean) {
    signIn(email: $email, password: $password, rememberMe: $remember_me) {
      user {
        email
      },
      errors {
        details
      },
      success
    }
  }
`;

const loginLoading = (
  <div className="hero align-items-center justify-content-center">
    <h4>
      Loading data...
    </h4>
  </div>
);

export default function Login() {
  const [login, { loading, error }] = useMutation(
    SIGNIN_EVENT,
    {
      onCompleted({ signIn }) {
        if (signIn.success === true) {
          isLoggedInVar(true);
        }
      }
    }
  );

  if (loading) return loginLoading;
  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} />;
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', remember_me: false };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.login(
      {
        variables: {
          email: this.state.email,
          password: this.state.password,
          remember_me: this.state.remember_me
        }
      }
    );
  }

  render() {
    return (
      <div className="grid-container fluid full-height primary-color">
        <div className="grid-x full-height align-middle secondary-color">
          <div className="large-4 medium-4 small-4 float-center">
            <h1>Sign in</h1>
            <form onSubmit={(e) => this.onSubmit(e)}>
              <div className="grid-container">
                <div className="grid-x grid-padding-x">
                  <div className="cell">
                    <label>
                      E-mail:
                      <input
                        name="email"
                        type="text"
                        value={this.state.email}
                        onChange={this.handleInputChange} />
                    </label>
                  </div>
                </div>
                <div className="grid-x grid-padding-x">
                  <div className="cell">
                    <label>
                      Password:
                      <input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleInputChange} />
                    </label>
                  </div>
                </div>
                <div className="grid-x grid-padding-x">
                  <div className="cell">
                    <input
                      id="remember_me_checkbox"
                      name="remember_me"
                      type="checkbox"
                      checked={this.state.remember_me}
                      onChange={this.handleInputChange} />
                    <label htmlFor="remember_me_checkbox">Remember me</label>
                  </div>
                </div>
                <div className="grid-x grid-padding-x">
                  <div className="cell">
                    <input type="submit" className="button" value="Submit" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func
};
