import Button from './Button';
import Dialog from './Dialog';

export default function Confirm({ open, onClose, title, children, onConfirm }) {
  if (!open) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <h2 className="text-xl">{title}</h2>
      <div className="py-5">{children}</div>
      <div className="flex justify-end">
        <div className="p-1">
          <Button
            onClick={() => onClose()}
            className="bg-secondary hover:bg-secondary-light">
            No
          </Button>
        </div>
        <div className="p-1">
          <Button
            onClick={() => {
              onClose();
              onConfirm();
            }}>
            Yes
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
