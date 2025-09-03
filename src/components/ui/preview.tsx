import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Our dashboard is designed for simplicity and efficiency — everything
          you need is just a click away.
        </p>
        <div className="rounded-lg shadow-lg overflow-hidden">
          <Image
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapers.com%2Fimages%2Fhd%2Fgraduation-pictures-pz75cc67t4ica92t.jpg&f=1&nofb=1&ipt=31eae468326614722591fbd387aeab713f03fd920b8fc09bf919a870441c11a6"
            alt="Graduation"
            width={800}
            height={450}
            className="w-full rounded-lg shadow-md object-cover"
          />
        </div>
      </div>
    </section>
  );
}
