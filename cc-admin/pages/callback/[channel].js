import React from 'react'
import { ChannelLogin } from '@shopstack/cc-admin-lib'
import _get from 'lodash/get'

class ChannelLoginPage extends React.Component {
  render() {
    return (
      <ChannelLogin {...this.props} />
    )
  }
}

export default ChannelLoginPage