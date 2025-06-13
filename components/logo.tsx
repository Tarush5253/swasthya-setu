import type { SVGProps } from "react"

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" {...props}>
      <rect width="100" height="100" rx="12" fill="#1976D2" />
      <path
        d="M20 50C20 35.5 30 25 50 25C70 25 80 35.5 80 50C80 64.5 70 75 50 75C30 75 20 64.5 20 50Z"
        fill="white"
        fillOpacity="0.2"
      />
      <path d="M30 50H70" stroke="white" strokeWidth="6" strokeLinecap="round" />
      <path d="M50 30V70" stroke="#E53935" strokeWidth="6" strokeLinecap="round" />
      <circle cx="50" cy="50" r="10" fill="#E53935" />
    </svg>
  )
}
