const { once } = require('events');
const { createReadStream, createWriteStream } = require('fs');
const { createInterface } = require('readline');
var { EOL } = require('os');
const csv = require('csvtojson')

const csvFilePath = './csv/nodejs-hw1-ex1.csv';
const txtFilePath = './txt/nodejs-hw1-ex1-line.txt';

(async function processLineByLine() {
    try {
        let headers = null;
        const readStream = createReadStream(csvFilePath);
        readStream.on('error', (error) => {
            console.error(error.message);
        });

        const writeStream = createWriteStream(txtFilePath, 'utf8');
        writeStream.on('error', (error) => {
            console.error(error.message);
        });

        const rl = createInterface({
            input: readStream,
            crlfDelay: Infinity
        });

        rl.on('line', (line) => {
            csv({ noheader: true })
                .fromString(line)
                .then((jsonRow) => {
                    const rowObj = jsonRow[0];
                    if (!headers) {
                        headers = { ...rowObj };
                    } else {
                        const result = {
                            [headers.field1.toLowerCase()]: rowObj.field1,
                            [headers.field2.toLowerCase()]: rowObj.field2,
                            [headers.field4.toLowerCase()]: rowObj.field4,
                        }
                        writeStream.write(JSON.stringify(result) + EOL, 'utf8');
                    }
                })
        });

        await once(rl, 'close');
        console.log('File processed.');
    } catch (error) {
        console.error(error);
    }
})();