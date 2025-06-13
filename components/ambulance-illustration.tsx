import type { SVGProps } from "react"

export function AmbulanceIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" {...props}>
      {/* Road */}
      <rect x="50" y="400" width="700" height="100" fill="#E0E0E0" />
      <path d="M50 450H750" stroke="#FFFFFF" strokeWidth="5" strokeDasharray="20 20" />

      {/* Ambulance */}
      <g>
        {/* Ambulance Body */}
        <rect x="200" y="300" width="400" height="150" rx="20" fill="#FFFFFF" stroke="#1976D2" strokeWidth="4" />
        <rect x="200" y="350" width="150" height="100" rx="10" fill="#1976D2" />
        <rect x="350" y="350" width="250" height="100" rx="0" fill="#FFFFFF" stroke="#1976D2" strokeWidth="4" />

        {/* Windows */}
        <rect x="220" y="320" width="80" height="50" rx="5" fill="#B3E5FC" />
        <path d="M220 345H300" stroke="#FFFFFF" strokeWidth="2" />
        <path d="M260 320V370" stroke="#FFFFFF" strokeWidth="2" />

        {/* Wheels */}
        <circle cx="250" cy="450" r="30" fill="#333333" />
        <circle cx="250" cy="450" r="15" fill="#FFFFFF" />
        <circle cx="550" cy="450" r="30" fill="#333333" />
        <circle cx="550" cy="450" r="15" fill="#FFFFFF" />

        {/* Red Cross */}
        <rect x="400" y="320" width="150" height="60" rx="5" fill="#E53935" />
        <path d="M475 330V370" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
        <path d="M455 350H495" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />

        {/* Lights */}
        <rect x="200" y="290" width="80" height="10" rx="5" fill="#E53935" />
        <rect x="520" y="290" width="80" height="10" rx="5" fill="#1976D2" />

        {/* Details */}
        <rect x="370" y="380" width="100" height="40" rx="5" fill="#F9FAFB" stroke="#1976D2" strokeWidth="2" />
        <rect x="490" y="380" width="80" height="40" rx="5" fill="#F9FAFB" stroke="#1976D2" strokeWidth="2" />
      </g>

      {/* Hospital Building */}
      <rect x="600" y="150" width="150" height="250" rx="0" fill="#F9FAFB" stroke="#1976D2" strokeWidth="4" />
      <rect x="650" y="350" width="50" height="50" fill="#FFFFFF" stroke="#1976D2" strokeWidth="2" />
      <path d="M675 350V400" stroke="#1976D2" strokeWidth="2" />
      <path d="M650 375H700" stroke="#1976D2" strokeWidth="2" />
      <rect x="620" y="180" width="30" height="40" rx="0" fill="#B3E5FC" />
      <rect x="670" y="180" width="30" height="40" rx="0" fill="#B3E5FC" />
      <rect x="620" y="240" width="30" height="40" rx="0" fill="#B3E5FC" />
      <rect x="670" y="240" width="30" height="40" rx="0" fill="#B3E5FC" />
      <rect x="620" y="300" width="30" height="40" rx="0" fill="#B3E5FC" />
      <rect x="670" y="300" width="30" height="40" rx="0" fill="#B3E5FC" />
      <rect x="640" y="120" width="70" height="30" rx="0" fill="#1976D2" />
      <path d="M675 130V140" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
      <path d="M670 135H680" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />

      {/* Trees */}
      <circle cx="100" cy="350" r="30" fill="#43A047" />
      <rect x="95" y="350" width="10" height="50" fill="#795548" />
      <circle cx="750" cy="350" r="30" fill="#43A047" />
      <rect x="745" y="350" width="10" height="50" fill="#795548" />
    </svg>
  )
}
