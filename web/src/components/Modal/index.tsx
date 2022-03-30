import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { PropsWithChildren } from "react";
import "./styles.css";

interface ModalProps {
  header: string;
  description: string;
  isOpen: boolean;
  onDismiss: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

interface ActionsProps {
  children: React.ReactNode;
}

export function Actions({ children }: ActionsProps) {
  return <div className="modalActions">{children}</div>;
}

export function Modal({
  header,
  description,
  isOpen,
  onDismiss,
  children,
}: ModalProps) {
  return (
    <Dialog
      className="modal"
      isOpen={isOpen}
      onDismiss={() => onDismiss(false)}
    >
      <header className="modalHeader">
        <h3>{header}</h3>
        <p>{description}</p>
      </header>
      <div className="modalBody">{children}</div>
    </Dialog>
  );
}
