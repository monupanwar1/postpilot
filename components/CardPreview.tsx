import Link from "next/link";

export default function CardPreview() {
  return (
    <section className="px-4 py-6 mb-18 container">
      <div className="flex items-center justify-center">
        <div className="p-1 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center mt-10 px-4 py-2 shadow-md hover:shadow-xl transition-shadow duration-200">
          <Link href="/builder" className="md:text-2xl font-bold">
            Get Started →
          </Link>
        </div>
      </div>
    </section>
  );
}
