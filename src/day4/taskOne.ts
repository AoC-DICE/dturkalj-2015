import {createHash} from 'node:crypto';

for (let i = 0; i < 10000000; i++) {
    let hashed = createHash('md5').update("bgvyzdsv" + i).digest('hex');
    if (hashed.startsWith("00000")) {
        console.log(i);
        break;
    }
}