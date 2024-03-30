import {defineConfig} from '@junobuild/config';

export default defineConfig({
  satellite: {
    id: 'fmkjf-bqaaa-aaaal-acpza-cai',
    source: 'out',
    storage: {
      headers: [
        {
          source: '**/templates/**/*',
          headers: [['Content-Type', 'application/octet-stream']]
        }
      ]
    },
    encoding: [['**/templates/*.tar.gz', 'identity']],
    gzip: false
  }
});
