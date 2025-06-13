import Link from "next/link"
import { Logo } from "@/components/logo"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="h-8 w-auto" />
              <span className="text-xl font-bold text-primary">SwasthyaSetu</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">Connecting Lives Through Healthcare Access</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">Platform</h3>
              <Link href="#" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                ICU Beds
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                Blood Banks
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                Ambulance Services
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                Hospital Network
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">Company</h3>
              <Link href="#" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                About
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                Careers
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                Contact
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                Partners
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">Legal</h3>
              <Link href="#" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                Data Policy
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} SwasthyaSetu. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
              <span className="sr-only">Twitter</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
              <span className="sr-only">Instagram</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
              <span className="sr-only">LinkedIn</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
