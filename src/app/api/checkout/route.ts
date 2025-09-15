import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(req: Request) {
  try {
    const { plan } = await req.json();

    // You can define your plan prices here or fetch from DB
    const prices: Record<string, string> = {
      pro: "price_1S7cCECMWLUkbPNUmJPpR0eG",
      premium: "price_1S7cDmCMWLUkbPNUsqhPrZuO",
    };

    if (!plan || !prices[plan]) {
      return NextResponse.json(
        { error: "Invalid plan selected" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription", // or "payment" for one-time
      line_items: [
        {
          price: prices[plan],
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing/billing/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing/billing/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
