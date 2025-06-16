
import React, { RefObject } from 'react';
import WishCard from '../WishCard';
import ShareAgeStats from '../ShareAgeStats';
interface WishCardSectionProps {
  name: string;
  wishes: string[];
  isDarkMode: boolean;
  photoUrl?: string;
  voiceMessageRef: RefObject<HTMLButtonElement>;
}

export function WishCardSection({ name, wishes, isDarkMode, photoUrl, voiceMessageRef }: WishCardSectionProps) {
  return (
    <WishCard 
      name={name}
      wishes={wishes}
      isDarkMode={isDarkMode}
      photoUrl={photoUrl}
      voiceMessageRef={voiceMessageRef}
    />
  );
}
