import React from 'react'
import { LoginForm } from '@shopstack/cc-admin-lib'

class Login extends React.Component {

  render() {
    return (
      <LoginForm {...this.props} />
    )
  }
}

export default Login