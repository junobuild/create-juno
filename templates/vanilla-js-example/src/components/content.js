import {renderLogout} from './logout';
import {renderModal} from './modal';

export const renderContent = (app) => {
  app.innerHTML = `<div>

    ${renderModal(app)}

    ${renderLogout(app)}
</div>`;
};
