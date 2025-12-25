import React, { ReactNode } from "react";

const FramDialog = ({
  children,
  close,
}: {
  children: ReactNode;
  close: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-300"
        onClick={close}
      ></div>

      <div className="relative  w-full max-w-lg rounded-[2.5rem]overflow-hidden transform transition-all  animate-in zoom-in-95 duration-300 ease-out">
        {children}
      </div>
    </div>
  );
};

export default FramDialog;
