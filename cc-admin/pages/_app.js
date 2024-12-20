
import '../public/static/styles/style.less'
import '../public/static/styles/custom.less'
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { CustomApp } from '@shopstack/cc-admin-lib'
import { importCustomModules } from '@shopstack/cc-admin-lib';

try {
  const modules = require.context('../modules', true)
  importCustomModules(modules)
} catch (e) { }

export default CustomApp
