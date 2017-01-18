# [karshina-youscan-test.surge.sh](https://karshina-youscan-test.surge.sh)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

NOTE:
Due to security purposes I don't want to store the API KEY in source code. As a quick and dirty solution I decided to use localStorage within the local browser session

To make the application work (even in production) you need to open Web Inspector and run the following command in web console:

```javascript
localStorage.setItem("api_key", "API_KEY")
```

Where `"API_KEY"` would be the key you obtain from these guys https://themoviedb.org

--------------

# Run locally

First, clone the repo. Also, you will need [create-react-app](https://github.com/facebookincubator/create-react-app) toolset in order to get started.

```bash
npm install -g create-react-app
```

To run local dev server:

```bash
npm install
npm start
```

# Deploy

(make sure you committed everything before deploying)
```bash
npm run build
npm run deploy
```

[surge.sh](https://surge.sh) is used to publish the website. It's getter than GH Pages because they give you a root path.

--------------

TODO: write readme about implementation details
