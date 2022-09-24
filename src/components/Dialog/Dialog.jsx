import OutsideClickHandler from '../OutsideClickHandler';
import Button from './Button';
import ExitIcon from './ExitIcon';

export default function Dialog({ open, onClose, children }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed z-50 overflow-auto inset-0 bg-[rgba(0,0,0,0.6)]">
      <OutsideClickHandler
        onOutsideClick={() => onClose()}
        className="flex items-center justify-center w-full h-full">
        <div className="fixed flex flex-col justify-end w-full max-w-md p-8 m-auto align-top bg-white shadow-inner md:relative pin-b pin-x md:justify-center md:rounded md:h-auto md:shadow">
          <div>{children}</div>
          <span className="absolute top-0 right-0 p-4">
            <Button onClick={() => onClose()}>
              <ExitIcon />
            </Button>
          </span>
        </div>
      </OutsideClickHandler>
    </div>
  );
}
