import { CheckCircle, Clock, Droplet, HeartPulse, MapPin, Shield } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32" id="features">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How SwasthyaSetu Helps</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our platform provides critical healthcare information when you need it most
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
          <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <HeartPulse className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Real-time ICU Tracking</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Find available ICU beds across multiple hospitals in real-time with live updates.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Droplet className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Blood Stock Availability</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Check blood stock levels at nearby blood banks and get notified when your required blood type is
                available.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Hospital Locator</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Find the nearest hospitals with available resources using our advanced location-based search.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Emergency Requests</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Submit emergency requests for beds, blood, or ambulances with priority indicators.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Hospital Management</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Dedicated dashboard for hospitals to update bed availability and manage patient requests.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Real-time Notifications</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get instant alerts about request status changes, bed availability, and blood stock updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
