This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

NOTE:
Due to security purposes I don't want to store the API KEY in source code. As a quick and dirty solution I decided to use local Storage within the local browser session

To make the application work (even in production) you need to open Web Inspector and run the following command in web console:

```javascript
localStorage.setItem("api_key", "API_KEY")
```

Where `"API_KEY"` would be the key you obtain from these guys https://themoviedb.org

--------------

# Deploy

(make sure you committed everything before deploying)
```bash
npm run build
npm run deploy
```

TODO: write readme about installation and other stuff
