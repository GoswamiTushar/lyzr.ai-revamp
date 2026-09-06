import React from 'react';
import { ArrowLeftRight } from 'lucide-react';

interface ComparatorDividerHandleProps {
  sliderPosition: number;
  isDragging: boolean;
}

export const ComparatorDividerHandle: React.FC<ComparatorDividerHandleProps> = ({
  sliderPosition,
  isDragging,
}) => {
  return (
    <div
      style={{
        left: `${sliderPosition}%`,
        transition: isDragging ? 'none' : 'left 250ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="absolute top-0 bottom-0 w-0.5 -translate-x-1/2 bg-white/90 z-30 shadow-[0_0_12px_rgba(229,254,84,0.7)] pointer-events-none"
    >
      {/* Center Handle Button */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#E5FE54] border-2 border-neutral-950 flex items-center justify-center shadow-enterprise-xl pointer-events-auto cursor-ew-resize transition-transform ${
          isDragging ? 'scale-115' : 'hover:scale-110'
        }`}
        title="Drag curtain to compare"
      >
        <ArrowLeftRight size={13} className="text-neutral-950 stroke-[2.5] sm:w-3.5 sm:h-3.5" />
      </div>
    </div>
  );
};
