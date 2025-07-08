import Link from "next/link";

export default function CardPreview() {
  return (
    <section className="px-4 py-6 mb-18 container">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Profile Preview
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          See how your AI-generated profile will appear on various platforms.
          Customize details like bio, username, and style before you copy or
          download.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {/* LinkedIn Profile */}
          <div className="bg-card border rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-200">
            <h3 className="font-semibold mb-4 text-blue-600 text-lg">
              LinkedIn Profile
            </h3>
            <div className="bg-[#f3f2ef] rounded-lg p-4 text-left space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-600 rounded-full" />
                <div>
                  <div className="h-3 w-24 bg-gray-400 rounded mb-1" />
                  <div className="h-2 w-32 bg-gray-300 rounded" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-gray-300 rounded" />
                <div className="h-2 w-3/4 bg-gray-300 rounded" />
                <div className="h-2 w-2/5 bg-gray-300 rounded" />
              </div>
            </div>
          </div>

          {/* X (Twitter) Profile */}
          <div className="bg-card border rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
            <h3 className="font-semibold mb-4 text-neutral-800 dark:text-white text-lg">
              X (Twitter) Profile
            </h3>
            <div className="bg-black rounded-lg p-4 text-left space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gray-700 rounded-full" />
                <div>
                  <div className="h-3 w-24 bg-gray-500 rounded mb-1" />
                  <div className="h-2 w-28 bg-gray-600 rounded" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-gray-600 rounded" />
                <div className="h-2 w-3/5 bg-gray-600 rounded" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="p-1 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center mt-10 px-4 py-2 shadow-md hover:shadow-xl transition-shadow duration-200">
            <Link href="/builder" className="md:text-2xl font-bold">
              Get Started →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
