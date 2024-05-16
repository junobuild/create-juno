import javascriptLogo from '../public/javascript.svg';
import viteLogo from '../public/vite.svg';
import {setupCounter} from './counter.js';
import './style.css';

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank" class="text-6xl">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card" class="text-6xl">
      <button id="counter" type="button"></button>
    </div>
    <p class="text-6xl">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector('#counter'));
