import React from 'react'
import { DynamicSetting } from '@shopstack/cc-admin-lib'

class SettingUrlKey extends React.PureComponent {

  render() {
    return (
      <DynamicSetting {...this.props} />
    )
  }
}

export default SettingUrlKey