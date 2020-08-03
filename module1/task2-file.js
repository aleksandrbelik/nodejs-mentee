import { createWriteStream } from 'fs';
import { EOL } from 'os';
import csv from 'csvtojson';

const csvFilePath = './csv/nodejs-hw1-ex1.csv';
const txtFilePath = './txt/nodejs-hw1-ex1-file.txt';

function processFile() {
    try {
        const writeStream = createWriteStream(txtFilePath);
        writeStream.on('error', (error) => {
            console.error(error.message);
        });

        csv({
            ignoreColumns: /Amount/
        })
            .fromFile(csvFilePath)
            .then((jsonObj) => {
                jsonObj.forEach((jsonRow) => {
                    writeStream.write(JSON.stringify(jsonRow) + EOL);
                })
                writeStream.end();
            })
    } catch (error) {
        console.error(error);
    }
};

processFile();