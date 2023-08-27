import React from 'react';

function Button(children: React.ReactNode) {
  return (
    <button className="rounded-[10px] bg-[#1f2124] px-4 py-2 font-semibold">
      {children}
    </button>
  );
}

export default Button;
