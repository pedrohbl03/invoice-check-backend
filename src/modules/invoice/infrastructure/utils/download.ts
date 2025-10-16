import fs from 'fs';
import axios from 'axios';

const download = (url, destination) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    const file = fs.createWriteStream(destination);

    const response = await axios.get(url, {
      responseType: 'stream',
    });

    response.data.pipe(file);

    file.on('finish', () => {
      file.close(() => {
        resolve(destination);
      });
    });

    file.on('error', (error) => {
      fs.unlink(destination, (e) => {
        console.error(e, e?.message);
      });

      // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
      reject(error.message);
    });
  });

export default download;
