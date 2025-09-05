import {
  computed,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { onAuthStateChange, User } from '@junobuild/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: WritableSignal<User | undefined | null> = signal(undefined);

  readonly signedIn: Signal<boolean> = computed(
    () => this.user() !== null && this.user() !== undefined,
  );

  constructor() {
    onAuthStateChange((user) => this.user.set(user));
  }
}
