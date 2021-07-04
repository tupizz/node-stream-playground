/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

(async () => {
  const readable = fs
    .createReadStream(path.resolve(__dirname, 'data', 'consumer_complaints.csv'), { encoding: 'utf-8' })
    .pipe(csv());

  for await (const chunk of readable) {
    console.log(chunk);
  }
})();
