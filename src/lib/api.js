
// Due to security purposes I don't want to store the API KEY in source code.
// As a quick and dirty solution I decided to use local Storage within the local browser session
export function apiUrl(path) {
  const apiKey = localStorage.getItem('api_key')
  if (apiKey === null) {
    throw new Error(`api_key is not defined.
    Please, run the following in your console: localStorage.setItem("api_key", "API_KEY")`)
  }
  return 'https://api.themoviedb.org/3' + path + '?api_key=' + apiKey
}
