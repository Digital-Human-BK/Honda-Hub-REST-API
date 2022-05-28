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

  const PORT = process.env.PORT || 3030;

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
