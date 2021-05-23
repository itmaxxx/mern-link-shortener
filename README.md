# Link shortener web-site

Simple link shortener written on MERN stack with authorization using jwt tokens.

## Setup

1. Create `config` folder in root of your project directory
1. Create `default.js` in `config`'s fodler
1. Configure your app
`{
    "port": 5000,
    "mongoUri": "<YOUR_MONGODB_CONNECT_URL>",
    "jwtSecret": "<YOUR_SECRET>",
    "baseUrl": "http://localhost:5000"
}`
