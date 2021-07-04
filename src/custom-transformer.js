/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
const fs = require('fs');
const { Transform } = require('stream');
const path = require('path');

const backspaceSplitter = new Transform({
  readableObjectMode: true,

  transform(chunk, encoding, callback) {
    this.push(chunk.toString().trim()
      .replace(/^\[/g, '')
      .replace(/]$/g, '')
      .replace(/},\r?\n/g, '}\n')
      .split(/\r?\n/));
    callback();
  },
});

let aux = '';
const customTransformer = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
    for (let index = 0; index < chunk.length; index++) {
      const element = chunk[index].trim();

      if (element[0] !== '{') {
        aux += element;

        console.log(JSON.parse(aux));
        aux = '';
        continue;
      }

      if (element[element.length - 1] === '}') {
        // console.log(JSON.parse(element));
      } else {
        console.log(aux);
        aux += element;
      }
    }

    callback();
  },
});

fs
  .createReadStream(path.resolve(__dirname, 'data', 'products.json'), { encoding: 'utf-8' })
  .pipe(backspaceSplitter)
  .pipe(customTransformer)
  .pipe(process.stdout);
