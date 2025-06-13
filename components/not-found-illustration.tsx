import type { SVGProps } from "react"

export function NotFoundIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" {...props}>
      {/* Background Elements */}
      <circle cx="400" cy="300" r="200" fill="#F9FAFB" />
      <circle cx="400" cy="300" r="150" fill="#F3F4F6" />

      {/* 404 Text */}
      <path d="M250 250H300V350H250V250Z" fill="#1976D2" />
      <circle cx="350" cy="300" r="50" fill="#1976D2" />
      <circle cx="350" cy="300" r="25" fill="#F9FAFB" />
      <path d="M400 250H450V350H400V250Z" fill="#1976D2" />

      {/* Medical Cross */}
      <path d="M500 275H550V325H500V275Z" fill="#E53935" />
      <path d="M475 300H575V300H475V300Z" fill="#E53935" />

      {/* Stethoscope */}
      <circle cx="250" cy="400" r="20" fill="#43A047" />
      <path
        d="M250 420C250 420 270 450 350 450C430 450 450 420 450 420"
        stroke="#43A047"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M450 420C450 420 450 450 480 450C510 450 510 420 510 420"
        stroke="#43A047"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Decorative Elements */}
      <circle cx="200" cy="200" r="10" fill="#1976D2" fillOpacity="0.3" />
      <circle cx="600" cy="200" r="10" fill="#1976D2" fillOpacity="0.3" />
      <circle cx="200" cy="400" r="10" fill="#1976D2" fillOpacity="0.3" />
      <circle cx="600" cy="400" r="10" fill="#1976D2" fillOpacity="0.3" />
      <circle cx="300" cy="150" r="15" fill="#E53935" fillOpacity="0.3" />
      <circle cx="500" cy="150" r="15" fill="#E53935" fillOpacity="0.3" />
      <circle cx="300" cy="450" r="15" fill="#E53935" fillOpacity="0.3" />
      <circle cx="500" cy="450" r="15" fill="#E53935" fillOpacity="0.3" />
    </svg>
  )
}
