import type { SVGProps } from "react"

export function HeroIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" {...props}>
      {/* Hospital Building */}
      <rect x="100" y="150" width="400" height="350" rx="10" fill="#F9FAFB" stroke="#1976D2" strokeWidth="4" />
      <rect x="150" y="200" width="80" height="100" rx="5" fill="white" stroke="#1976D2" strokeWidth="2" />
      <rect x="250" y="200" width="80" height="100" rx="5" fill="white" stroke="#1976D2" strokeWidth="2" />
      <rect x="350" y="200" width="80" height="100" rx="5" fill="white" stroke="#1976D2" strokeWidth="2" />
      <rect x="200" y="350" width="200" height="100" rx="5" fill="white" stroke="#1976D2" strokeWidth="2" />
      <rect x="250" y="400" width="100" height="50" rx="5" fill="#1976D2" />
      <path d="M300 350V450" stroke="white" strokeWidth="4" />
      <path d="M250 425H350" stroke="white" strokeWidth="4" />

      {/* Ambulance */}
      <rect x="550" y="350" width="150" height="80" rx="10" fill="#E53935" />
      <rect x="550" y="400" width="150" height="30" rx="5" fill="#E53935" />
      <rect x="550" y="350" width="100" height="50" rx="5" fill="#FFFFFF" />
      <circle cx="580" cy="430" r="20" fill="#333333" />
      <circle cx="580" cy="430" r="10" fill="#FFFFFF" />
      <circle cx="670" cy="430" r="20" fill="#333333" />
      <circle cx="670" cy="430" r="10" fill="#FFFFFF" />
      <path d="M600 375H650" stroke="#E53935" strokeWidth="4" />
      <path d="M625 350V400" stroke="#E53935" strokeWidth="4" />

      {/* Blood Bag */}
      <path d="M500 150C500 130 520 130 520 150V200C520 220 500 220 500 200V150Z" fill="#E53935" />
      <path d="M500 150C500 130 520 130 520 150V170C520 190 500 190 500 170V150Z" fill="#FFFFFF" fillOpacity="0.3" />
      <rect x="495" y="130" width="30" height="10" rx="5" fill="#CCCCCC" />

      {/* Heart Monitor Line */}
      <path d="M100 100L150 100L170 50L190 150L210 100L260 100" stroke="#43A047" strokeWidth="3" />

      {/* Abstract Shapes */}
      <circle cx="700" cy="150" r="50" fill="#1976D2" fillOpacity="0.1" />
      <circle cx="650" cy="200" r="30" fill="#E53935" fillOpacity="0.1" />
      <circle cx="730" cy="220" r="20" fill="#43A047" fillOpacity="0.1" />
    </svg>
  )
}
