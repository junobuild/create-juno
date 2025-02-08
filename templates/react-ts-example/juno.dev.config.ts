import {defineDevConfig} from '@junobuild/config';

/** @type {import('@junobuild/config').JunoDevConfig} */
export default defineDevConfig(() => ({
  satellite: {
    collections: {
      datastore: [
        {
          collection: 'notes',
          read: 'managed' as const,
          write: 'managed' as const,
          memory: 'stable' as const,
          mutablePermissions: true
        }
      ],
      storage: [
        {
          collection: 'images',
          read: 'managed' as const,
          write: 'managed' as const,
          memory: 'stable' as const,
          mutablePermissions: true
        }
      ]
    }
  }
}));
