import {Readable} from 'node:stream';
import tar from 'tar-stream';
import {createGunzip} from 'zlib';

// TODO: cli-tools
export const gunzipFile = async ({source}: {source: Buffer}): Promise<Buffer> =>
  await new Promise<Buffer>((resolve, reject) => {
    const sourceStream = Readable.from(source);

    const chunks: Uint8Array[] = [];

    const gzip = createGunzip();

    sourceStream.pipe(gzip);

    gzip.on('data', (chunk: Uint8Array) => chunks.push(chunk));
    gzip.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
    gzip.on('error', reject);
  });

export interface UntarOutputFile {
  name: string;
  content: Uint8Array[];
}

export const untarFile = async ({source}: {source: Buffer}): Promise<UntarOutputFile[]> =>
  await new Promise<UntarOutputFile[]>((resolve, reject) => {
    // Create an extract stream
    const extractor = tar.extract();

    const output: UntarOutputFile[] = [];

    extractor.on('entry', ({name}, stream, next) => {
      const chunks: Uint8Array[] = [];
      stream.on('data', (chunk: Uint8Array) => chunks.push(chunk));

      stream.on('end', () => {
        output.push({
          name,
          content: chunks
        });

        next(); // Move to the next entry
      });

      // Important: You must consume the stream, even if you do nothing with it.
      stream.resume();
    });

    extractor.on('finish', () => {
      console.log('Extraction complete');
      resolve(output);
    });

    // Handle any errors during extraction
    extractor.on('error', (error) => {
      console.error('Extraction error:', error);
      reject(error);
    });

    Readable.from(source).pipe(extractor);
  });
