import { testimonials } from "@/lib/constants";
import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/UI";

export default function Testimonials() {
  return (
    <div className="w-full px-4 py-16">
      <Carousel className="w-full max-w-lg mx-auto">
        <CarouselContent>
          {Array.from(testimonials).map((_, idx) => (
            <CarouselItem key={idx}>
              <Card className="p-6">
                <CardContent className="flex flex-col gap-2 p-0">
                  <p>“{testimonials[idx].quote}”</p>
                  <p>{testimonials[idx].author}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
