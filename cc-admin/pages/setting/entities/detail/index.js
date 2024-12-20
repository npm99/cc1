import React, { PureComponent } from 'react'
import { SettingEntityDetail } from '@shopstack/cc-admin-lib'


class EntitiesDetailEdit extends PureComponent {

  render() {
    return (
      <SettingEntityDetail {...this.props} />
    )
  }
}

export default EntitiesDetailEdit
