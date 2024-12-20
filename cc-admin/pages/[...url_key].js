
import React from 'react'
import _get from 'lodash/get'
import _nth from 'lodash/nth'
import { DetailPage, ListPage } from '@shopstack/cc-admin-lib'

class UrlKey extends React.PureComponent {

  render() {
    const urlKeys = _get(this.props, 'query.url_key', [])
    const lastUrl = _nth(urlKeys, -1)

    if (lastUrl !== 'detail') {
      return <ListPage {...this.props} />
    } else {
      return <DetailPage {...this.props} />
    }
  }
}

export default UrlKey