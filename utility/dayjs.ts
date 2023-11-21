import dayjs from 'dayjs';
import 'dayjs/locale/fa';

// FIXME: Persian Numbers Are Not Supported?! --> https://github.com/iamkun/dayjs/issues/1706

// import 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';

// const localizedFormat = require('dayjs/plugin/localizedFormat');
// const preParsePostFormat = require('dayjs/plugin/preParsePostFormat');
// const updateLocale = require('dayjs/plugin/updateLocale')

dayjs.extend(relativeTime);
// dayjs.extend(localizedFormat);
// dayjs.extend(preParsePostFormat);
// dayjs.extend(updateLocale);

export default dayjs;
