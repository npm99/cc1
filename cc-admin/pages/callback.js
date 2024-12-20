import React from "react"
import { Authentication } from "@shopstack/cc-admin-lib"

class CallbackPage extends React.PureComponent {

  render() {
    return (
      <Authentication />
    )
  }
}

export default CallbackPage