import { auth, currentUser } from "@clerk/nextjs";

import prisma from "@/lib/db/prisma";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { AbsolutePath } from "@/lib/utils";

const settingUrl = AbsolutePath("/setting");

export const GET = async () => {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Un Authorized", { status: 401 });
    }

    const userSubscription = await prisma.userSubscription.findUnique({
      where: { userId },
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      const StripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingUrl,
      });

      return new NextResponse(JSON.stringify({ url: StripeSession.url }));
    }

    const StripeSession = await stripe.checkout.sessions.create({
      success_url: settingUrl,
      cancel_url: settingUrl,
      payment_method_types: ["card"],
      customer_email: user.emailAddresses[0].emailAddress,
      mode: "subscription",
      billing_address_collection: "auto",
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "S-AI PRO",
              description: " Unlimited AI Generation",
            },
            recurring: {
              interval: "month",
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });
    return new NextResponse(JSON.stringify({ url: StripeSession.url }));
  } catch (error) {
    console.log("[Stripe_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
