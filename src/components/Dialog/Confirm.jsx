import { useEffect } from 'react';

import Button from './Button';
import Dialog from './Dialog';

export default function Confirm({ open, onClose, title, children, onConfirm }) {
  const handleConfirm = () => {
    onClose();
    onConfirm();
  };

  const handlePress = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handlePress);

    return () => {
      document.removeEventListener('keydown', handlePress);
    };
  }, [open]);

  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <h2 className="text-xl">{title}</h2>
      <div className="py-5">{children}</div>
      <div className="flex justify-end">
        <div className="p-1">
          <Button
            onClick={onClose}
            className="bg-secondary hover:bg-secondary-light">
            No
          </Button>
        </div>
        <div className="p-1">
          <Button onClick={handleConfirm}>Yes</Button>
        </div>
      </div>
    </Dialog>
  );
}
