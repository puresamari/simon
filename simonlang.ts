import { compile } from './src/compiler';

import fs from 'fs';
import path from 'path';

const version = require('./package.json').version;

const fileName = process.argv[2] as string;
const filePath = path.resolve(__dirname, fileName);

const verbose = process.argv.indexOf('--verbose') >= 0;
const outputPath = process.argv.indexOf('--output') >= 0 ? process.argv[process.argv.indexOf('--output') + 1] as string | null : null;

console.log("======SIMON LANG=======");
console.log("version:", version);

console.log("");
console.log("");

console.log("COMPILING FILE:");
console.log(filePath);

const contents = fs.readFileSync(filePath, 'utf8');

if (verbose) {
    console.log("");
    console.log("WITH CONTENTS:")
    console.log(contents);
}

console.log("");

console.log("COMPILING...");
console.log("");

const compiled = compile(contents);

if (verbose || !outputPath) {
    console.log("COMPILER RESULT:");
    console.log(compiled);
}

if (outputPath) {
    const outputPathABS = path.join(__dirname, outputPath);
    
    console.log("WRITING TO:");
    console.log(outputPathABS);

    try {
        fs.writeFileSync(outputPathABS, `/*\n  Written in simonlang v${version}.\n  Visit https://github.com/puresamari/simon for more information.\n*/\n\n` + compiled + '\n', 'utf8');
    } catch (err) {
        console.log('ERROR WHILE WRITING FILE');
        switch (err.code) {
            case 'ENOENT':
                console.log('No such file or directory', outputPathABS);
                break;
            default:
                console.log('Unknown error', err);
        }
    }
}


console.log("");
console.log("");
console.log("=======================");

// fs.readFileSync('foo.txt','utf8');