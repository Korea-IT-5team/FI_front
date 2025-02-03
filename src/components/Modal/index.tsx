import React, { PropsWithChildren } from "react";
import "./style.css"

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

export default function Modal({
  onClickToggleModal,
  children,
}: PropsWithChildren<ModalDefaultType>) {
  return (
    <div className='modal-container'>
      <dialog className='dialog-box'>{children}</dialog>
      <div className='backdrop'
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </div>
  );
}