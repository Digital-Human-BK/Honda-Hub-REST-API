const express = require('express');
const databaseConfig = require('./config/database');
const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');

start();

async function start() {
  const app = express();

  await databaseConfig();
  expressConfig(app);
  routesConfig(app);
}

app.listen(process.env.PORT || 3030, () =>
  console.log('Server running port 3030')
);
