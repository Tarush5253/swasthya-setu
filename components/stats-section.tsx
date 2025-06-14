export function StatsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40 bg-gradient-to-br to-[#FFE8F4] from-[#FFFFFF] ">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Impact</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              SwasthyaSetu is making healthcare more accessible across the country
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-4">
          <div className="flex flex-col justify-center space-y-2 text-center">
            <div className="text-3xl font-bold text-primary">250+</div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Hospitals Registered</div>
          </div>
          <div className="flex flex-col justify-center space-y-2 text-center">
            <div className="text-3xl font-bold text-primary">5,000+</div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">ICU Beds Tracked</div>
          </div>
          <div className="flex flex-col justify-center space-y-2 text-center">
            <div className="text-3xl font-bold text-primary">100+</div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Blood Banks Connected</div>
          </div>
          <div className="flex flex-col justify-center space-y-2 text-center">
            <div className="text-3xl font-bold text-primary">10,000+</div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Lives Impacted</div>
          </div>
        </div>
      </div>
    </section>
  )
}
