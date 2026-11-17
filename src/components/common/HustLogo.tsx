import React from 'react';
import { HustOfficialLogo } from './HustOfficialLogo';

interface HustLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  textColor?: string;
}

export const HustLogo: React.FC<HustLogoProps> = ({
  size = 'md',
  showText = true,
  textColor = 'text-white',
}) => {
  return (
    <HustOfficialLogo
      size={size}
      showWordmark={showText}
      textColor={textColor}
    />
  );
};


