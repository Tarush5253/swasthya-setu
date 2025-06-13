import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NotFoundIllustration } from "@/components/not-found-illustration"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <div className="mx-auto flex max-w-[600px] flex-col items-center justify-center space-y-4 text-center">
        <NotFoundIllustration className="w-full max-w-[400px]" />
        <h1 className="text-4xl font-bold">Page Not Found</h1>
        <p className="text-muted-foreground">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/search">Find Hospitals</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
