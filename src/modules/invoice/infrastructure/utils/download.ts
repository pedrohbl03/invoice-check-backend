import fs from 'fs';
import axios from 'axios';

const download = (url, destination) =>
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

    file.on('error', async (error) => {
      fs.unlink(destination, (e) => {
        console.error(e, e?.message);
      });

      reject(error.message);
    });
  });

export default download;