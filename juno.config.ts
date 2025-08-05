import {defineConfig} from '@junobuild/config';

export default defineConfig({
  satellite: {
    ids: {
      development: 'jx5yt-yyaaa-aaaal-abzbq-cai',
      production: 'fmkjf-bqaaa-aaaal-acpza-cai'
    },
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
    gzip: false,
    collections: {
      datastore: [
        {
          collection: 'notes',
          read: 'managed',
          write: 'managed',
          memory: 'stable'
        }
      ],
      storage: [
        {
          collection: 'images',
          read: 'managed',
          write: 'managed',
          memory: 'stable'
        }
      ]
    }
  },
  emulator: {
    runner: {
      type: 'docker'
    },
    satellite: {}
  }
});
