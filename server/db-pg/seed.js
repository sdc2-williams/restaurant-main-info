// When this file is run, (i) the current `restaurant` table is cleared, (ii)
// the current `restaurants.csv` file is cleared, (iii) new content is generated
// and added to `restaurants.csv, and (iv) the contents of that file are
// copied over to the `restaurant` table. When seeding 10,000,000 items, the
// process should take less than ten minutes on a newish computer.
//
// The range of the item's ideas are specified in environment variables as START_ID
// and END_ID.

const { handleSeeding } = require('./seedHelpers.js');

handleSeeding();
