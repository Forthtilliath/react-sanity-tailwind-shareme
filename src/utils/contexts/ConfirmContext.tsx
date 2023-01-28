import React, {
  ComponentProps,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

import { ConfirmDialog } from '../../components/dialog/ConfirmDialog';

type Params = Partial<
  Omit<ComponentProps<typeof ConfirmDialog>, 'open' | 'onConfirm' | 'onCancel'>
>;

const defaultFunction = (p?: Params) => Promise.resolve(true);

const defaultValue = {
  confirmRef: {
    current: defaultFunction,
  },
};

const ConfirmContext = createContext(defaultValue);

/**
 * Context of the modal which ask for confirmation
 */
export function ConfirmContextProvider({ children }: PropsWithChildren) {
  const confirmRef = useRef(defaultFunction);

  return (
    <ConfirmContext.Provider value={{ confirmRef }}>
      {children}
      <ConfirmDialogWithContext />
    </ConfirmContext.Provider>
  );
}

function ConfirmDialogWithContext() {
  const [open, setOpen] = useState(false);
  const [props, setProps] = useState<Params | undefined>({});
  const resolveRef = useRef((v: boolean) => {});
  const { confirmRef } = useContext(ConfirmContext);

  confirmRef.current = (props) =>
    new Promise((resolve) => {
      setProps(props);
      setOpen(true);
      resolveRef.current = resolve;
    });

  return (
    <ConfirmDialog
      onConfirm={() => {
        resolveRef.current(true);
        setOpen(false);
      }}
      onCancel={() => {
        resolveRef.current(false);
        setOpen(false);
      }}
      open={open}
      {...props}
    />
  );
}

/**
 * @author Grafikart.fr
 * @description [Créer un système de message de confirmation avec React](https://www.youtube.com/watch?v=FBVUaC2ZOCE)
 */
export function useConfirm() {
  const { confirmRef } = useContext(ConfirmContext);
  return {
    confirm: useCallback((p: Params) => {
      return confirmRef.current(p);
    }, []),
  };
}
