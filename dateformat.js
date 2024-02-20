// dateformat.js

import moment from "moment";

export default ({ Vue }) => {
  Vue.filter("dateformat", function (value, format) {
    if (!value) return "";
    return moment(value).format(format);
  });
};
