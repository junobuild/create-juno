import type {Doc} from '@junobuild/core-peer';

export interface NoteData {
  text: string;
  url?: string;
}

export type Note = Doc<NoteData>;
