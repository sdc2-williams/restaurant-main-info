const { handleSeeding } = require('./seedHelpers.js');

handleSeeding()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
