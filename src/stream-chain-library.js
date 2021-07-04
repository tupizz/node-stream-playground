// const { parser } = require('stream-json');
// const { streamValues } = require('stream-json/streamers/StreamValues');
const Batch = require('stream-json/utils/Batch');
const StreamArray = require('stream-json/streamers/StreamArray');

const fs = require('fs');
const path = require('path');

// Reading each 1000 items
// With this we can create a bulk write pausing the stream while we're adding

const pipe = fs
  .createReadStream(path.resolve(__dirname, 'data', 'products.json'), { encoding: 'utf-8' })
  .pipe(StreamArray.withParser())
  .pipe(new Batch({ batchSize: 1000 }));

pipe.on('data', (data) => {
  console.log('Batch size:', data);
});

// const pipeline = chain([
//   fs
//     .createReadStream(path.resolve(__dirname, 'data', 'products.json'), { encoding: 'utf-8' }),
//   parser(),
//   streamValues(),
//   (data) => {
//     const { value } = data;
//     console.log(value);
//     // keep data only for the accounting department
//     return value && value.department === 'accounting' ? data : null;
//   },
// ]);
