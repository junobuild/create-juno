import {Readable} from 'node:stream';
import tar from 'tar-stream';

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

        next();
      });

      stream.resume();
    });

    extractor.on('finish', () => {
      resolve(output);
    });

    extractor.on('error', (error: Error) => {
      reject(error);
    });

    Readable.from(source).pipe(extractor);
  });
