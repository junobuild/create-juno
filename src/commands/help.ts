import {grey} from 'kleur';
import {version} from '../../package.json';

const JUNO_LOGO = `  __  __ __  __  _  ____ 
__) ||  |  ||  \\| |/    \\
\\___/ \\___/ |_|\\__|\\____/`;

export const TITLE = `${JUNO_LOGO} create ${grey(`v${version}`)}\n`;
