import React from 'react';
import AgeStats from '../AgeStats';
import ShareAgeStats from '../ShareAgeStats';

interface AgeStatsSectionProps {
  dob: Date;
  isDarkMode: boolean;
  ageStatsRef: React.RefObject<HTMLDivElement>;
}

export function AgeStatsSection({ dob, isDarkMode, ageStatsRef }: AgeStatsSectionProps) {
  return (
    <div ref={ageStatsRef} className="relative">
      <AgeStats dob={dob} isDarkMode={isDarkMode} />
      <div className="mt-2">
        <ShareAgeStats 
          elementRef={ageStatsRef}
          isDarkMode={isDarkMode}
          filename="snigdha-18th-birthday-stats"
        />
      </div>
    </div>
  );
}
