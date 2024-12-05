import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, label }) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        {label && (
          <span className="text-sm font-medium text-spotify-lightgray">{label}</span>
        )}
        <span className="text-sm font-medium text-spotify-lightgray">
          {current} of {total}
        </span>
      </div>
      <div className="w-full h-2 bg-[#404040] rounded-full overflow-hidden">
        <div
          className="h-full bg-spotify-green rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};