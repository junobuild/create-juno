import {nonNullish} from '@junobuild/utils';
import {get, type RequestOptions} from 'https';

// TODO: cli-tools
export const downloadFromURL = async (url: string | RequestOptions): Promise<Buffer> => {
  return await new Promise((resolve, reject) => {
    get(url, async (res) => {
      if (nonNullish(res.statusCode) && [301, 302].includes(res.statusCode)) {
        await downloadFromURL(res.headers.location!).then(resolve, reject);
      }

      const expectedLength = res.headers['content-length'];

      const data: any[] = [];

      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(data);

        if(expectedLength && buffer.length.toString() !== expectedLength) {
          reject(new Error('Downloaded data size does not match the expected data size.'));
        } else {
          resolve(buffer);
        }
      });
      res.on('error', reject);
    });
  });
};
