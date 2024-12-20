import React, { PureComponent } from 'react'
import { IndexPage } from '@shopstack/cc-admin-lib'

class Index extends PureComponent {

  render() {
    return (
      <IndexPage {...this.props} />
    )
  }
}

export default Index
