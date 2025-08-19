import { animate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function AnimatedPrice({ price }: { price: number }) {
  const priceMotion = useMotionValue(0);
  const [displayPrice, setDisplayPrice] = useState(0);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      priceMotion.set(0);
      firstRender.current = false;
    }

    const controls = animate(priceMotion, price, {
      type: "spring",
      stiffness: 120,
      damping: 20,
      onUpdate: (latest) => {
        setDisplayPrice((prev) => {
          const next =
            price > prev ? Math.min(latest, price) : Math.max(latest, price);
          return Math.abs(next - prev) < 0.005 ? prev : Number(next.toFixed(2));
        });
      },
    });

    return () => controls.stop();
  }, [price, priceMotion]);

  return <span>${displayPrice.toFixed(2)}</span>;
}
