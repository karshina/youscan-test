import { apiKey } from '../../config.js'

export function apiUrl(path, query = {}) {
  return 'https://api.themoviedb.org/3' + path + '?' + toQueryString({
    api_key: apiKey,
    ...query,
  })
}

function toQueryString(obj) {
  var parts = [];
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
    }
  }
  return parts.join("&");
}
