import React from 'react';
import ReactFocusLock from 'react-focus-lock';
import { MdClose } from 'react-icons/md';

import { DialogType } from '../../@types';
import OutsideClickHandler from '../OutsideClickHandler';
import Button from './Button';

const Dialog: DialogType = ({ open, onClose, children }) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-60">
      <OutsideClickHandler
        onOutsideClick={onClose}
        className="grid content-center w-full h-full">
        <ReactFocusLock>
          <div className="fixed flex flex-col justify-end w-full max-w-md p-8 m-auto align-top bg-white shadow-inner md:relative md:justify-center md:rounded md:h-auto md:shadow">
            <div>{children}</div>
            <span className="absolute top-0 right-0 p-4">
              <Button aria-label="Close" onClick={onClose}>
                <MdClose />
              </Button>
            </span>
          </div>
        </ReactFocusLock>
      </OutsideClickHandler>
    </div>
  );
};

export default Dialog;
