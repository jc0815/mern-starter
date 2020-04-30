# Mern Starter Pack

Starter template for Mern applications.

## Installation

```bash
yarn install
yarn run install-client
```

Get MongoDB URI, and paste it into /config/keys.js
```javascript
module.exports = {
    mongoURI: "mongodb+srv://",
    secretOrKey: "secret" 
};
```

## Usage

```bash
yarn run dev
```

## Deployment (Heroku)

Add config MONGODB_URI to Heroku, under Settings (Config Vars)
DELETE any environment variables for security purposes!!