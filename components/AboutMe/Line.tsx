import React from 'react';

function Line({ open = false }: { open?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="circle text-center"></span>
      <div className={open ? 'verticalLineOpen' : 'verticalLine'}></div>
      {open ? null : <span className="circle text-center"></span>}
    </div>
  );
}

export default Line;
