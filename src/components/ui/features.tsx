import { features } from "@/lib/constants";

export default function Features() {
  return (
    <section
      className="max-w-7xl mx-auto px-6 py-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
      role="list"
    >
      {features.map(({ Icon, title, desc, color }, idx) => (
        <div
          key={idx}
          role="listitem"
          tabIndex={0}
          className="bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer
              focus:outline-none focus:ring-4 focus:ring-indigo-300
              hover:shadow-xl hover:scale-105 transition-transform duration-300"
        >
          <Icon
            aria-hidden="true"
            className={`w-10 h-10 mx-auto mb-4 ${color}`}
          />
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{desc}</p>
        </div>
      ))}
    </section>
  );
}
