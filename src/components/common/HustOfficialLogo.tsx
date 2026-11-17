import React from 'react';

interface HustOfficialLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  textColor?: string;
  subTextColor?: string;
}

export const HustOfficialLogo: React.FC<HustOfficialLogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = false,
  textColor = 'text-[#18202B]',
  subTextColor = 'text-[#667085]',
}) => {

  const sizeMap = {
    xs: { h: 'h-8', w: 'w-5', text: 'text-sm' },
    sm: { h: 'h-10', w: 'w-7', text: 'text-base' },
    md: { h: 'h-14', w: 'w-9', text: 'text-lg' },
    lg: { h: 'h-20', w: 'w-14', text: 'text-2xl' },
    xl: { h: 'h-32', w: 'w-22', text: 'text-3xl' },
  };

  const cur = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official HUST Crest Logo SVG */}
      <div className={`${cur.h} ${cur.w} relative flex-shrink-0 drop-shadow-sm hover:scale-105 transition-transform`}>
        <svg
          viewBox="0 0 200 300"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Red & Gold official shades */}
            <clipPath id="hust-crest-clip">
              <rect x="0" y="0" width="200" height="240" />
            </clipPath>
          </defs>

          {/* Outer Border */}
          <rect
            x="1.5"
            y="1.5"
            width="197"
            height="297"
            fill="none"
            stroke="#C4121B"
            strokeWidth="3"
          />

          {/* Upper Crest (Split: Left Red, Right White) */}
          <g clipPath="url(#hust-crest-clip)">
            {/* Left Red Half */}
            <rect x="0" y="0" width="100" height="240" fill="#C4121B" />
            {/* Right White Half */}
            <rect x="100" y="0" width="100" height="240" fill="#FFFFFF" />

            {/* Golden Star in Upper Left */}
            {/* Center around (50, 45) */}
            <polygon
              points="50,22 58,40 78,40 62,52 68,70 50,59 32,70 38,52 22,40 42,40"
              fill="#F5B800"
            />

            {/* "ĐẠI HỌC" Text in Upper Right */}
            <text
              x="150"
              y="48"
              fill="#C4121B"
              fontFamily="'Be Vietnam Pro', Impact, sans-serif"
              fontSize="24"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="1"
            >
              ĐẠI HỌC
            </text>

            {/* Golden Gear (Cogwheel) Center-Bottom */}
            {/* Gear Center at (100, 175), radius ~45 */}
            <g id="gear">
              {/* Outer Gear Ring & Teeth */}
              <circle cx="100" cy="175" r="42" fill="#F5B800" />
              {/* 8 Gear Teeth */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                <rect
                  key={idx}
                  x="92"
                  y="126"
                  width="16"
                  height="16"
                  fill="#F5B800"
                  transform={`rotate(${angle} 100 175)`}
                />
              ))}

              {/* Inner cutout split: left half red, right half white */}
              <path
                d="M100,147 A28,28 0 0,0 100,203 Z"
                fill="#C4121B"
              />
              <path
                d="M100,147 A28,28 0 0,1 100,203 Z"
                fill="#FFFFFF"
              />
            </g>

            {/* Golden Compass (Compa) */}
            {/* Compass Pivot Head at top-right (150, 68) */}
            <circle cx="150" cy="68" r="14" fill="#F5B800" stroke="#C4121B" strokeWidth="2.5" />

            {/* Compass Right Arm: from (150, 68) pointing down-left through (100, 175) */}
            <polygon
              points="145,63 155,73 103,178 99,173"
              fill="#F5B800"
              stroke="#C4121B"
              strokeWidth="2"
            />

            {/* Compass Left Arm: opening outwards to the left */}
            <polygon
              points="143,65 149,60 52,126 56,131"
              fill="#F5B800"
              stroke="#C4121B"
              strokeWidth="2"
            />
          </g>

          {/* Lower Open Book Banner (Golden Yellow) */}
          {/* Top curve of open book */}
          <path
            d="M0,240 Q50,232 100,246 Q150,232 200,240 L200,300 L0,300 Z"
            fill="#F5B800"
          />

          {/* Center Book Spine Notch */}
          <path
            d="M96,245 Q100,241 104,245 L100,252 Z"
            fill="#C4121B"
          />

          {/* "BÁCH KHOA" Text in Bottom Book Banner */}
          <text
            x="100"
            y="284"
            fill="#C4121B"
            fontFamily="'Be Vietnam Pro', Impact, sans-serif"
            fontSize="30"
            fontWeight="900"
            textAnchor="middle"
            letterSpacing="2"
          >
            BÁCH KHOA
          </text>
        </svg>
      </div>

      {showWordmark && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-tight">
            <span className={`font-black tracking-tight ${textColor} ${cur.text}`}>
              Hust<span className="text-[#C4121B]">Mess</span>
            </span>
            <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-[#C4121B]/15 text-[#C4121B] border border-[#C4121B]/30">
              HUST
            </span>
          </div>
          <span className={`text-[11px] font-semibold ${subTextColor}`}>
            Đại học Bách khoa Hà Nội
          </span>
        </div>
      )}
    </div>
  );
};
