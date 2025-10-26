import { features } from "@/lib/constants";
import { Card, CardContent } from "@/components/UI";

export default function Features() {
  return (
    <section className="px-3 sm:px-6 py-8 sm:py-16">
      <div
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8"
        role="list"
      >
        {features.map(({ Icon, title, desc, color }, idx) => (
          <Card
            key={idx}
            role="listitem"
            tabIndex={0}
            className="hover:scale-105 hover:-translate-y-1 transition-transform duration-300"
          >
            <CardContent>
              <Icon
                aria-hidden="true"
                className={`w-10 h-10 mx-auto mb-4 ${color}`}
              />
              <h3 className="text-lg text-center font-semibold mb-2">
                {title}
              </h3>
              <p className="text-muted-foreground text-center">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
