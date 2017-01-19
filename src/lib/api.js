
// is it secure?
export const apiKey = '75dda6a64c800f9602636207a2a0876d'

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
