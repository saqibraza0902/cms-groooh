import React from "react";

interface IProp {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, children }: IProp) => {
  const modalClasses = isOpen
    ? "fixed inset-0 z-50 overflow-auto h-full flex items-center justify-center"
    : "hidden";

  return (
    <div className={modalClasses}>
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="h-full lg:w-2/3 p-6 rounded-lg z-10">
        <div className=" flex justify-center  flex-col">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
