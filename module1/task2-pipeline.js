const { createReadStream, createWriteStream } = require('fs');
const { pipeline } = require('stream');
const csv = require('csvtojson')

const csvFilePath = './csv/nodejs-hw1-ex1.csv';
const txtFilePath = './txt/nodejs-hw1-ex1-pipeline.txt';

(function processPipeline() {
    try {
        pipeline(
            createReadStream(csvFilePath),
            csv({ ignoreColumns: /Amount/ }),
            createWriteStream(txtFilePath),
            (err) => {
                if (err) {
                    console.error('Pipeline failed.', err);
                } else {
                    console.log('Pipeline succeeded.');
                }
            }
        )
        console.log('File processed.');
    } catch (error) {
        console.error(error);
    }
})();