import PropTypes from 'prop-types';

export const Backdrop = ({spinner = false}) => (
  <div className="fixed inset-0 z-40 bg-white/30 dark:bg-lavender-blue-200/40 flex items-center justify-center backdrop-blur-xl">
    {spinner && (
      <div
        className="w-12 h-12 rounded-full animate-spin
                    border-[3px] border-solid border-lavender-blue-600 border-t-transparent"></div>
    )}
  </div>
);

Backdrop.propTypes = {
  spinner: PropTypes.bool
};
