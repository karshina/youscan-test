
// Due to security purposes I don't want to store the API KEY in source code.
// As a quick and dirty solution I decided to use localStorage within the local browser session
export const apiKey = localStorage.getItem('api_key')

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
