import {auth} from "@clerk/nextjs"

import prisma from "@/lib/db/prisma";

const DAY_IN_MS = 86_400_000

export const isSubscribed = async()=>{
    const {userId} = auth();

    if(!userId) return false;

    const subscribed = await prisma.userSubscription.findUnique({
        where:{
            userId
        },
        select:{
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripePriceId: true,
        }
    })
    if(!subscribed) return false;

    const isValid = subscribed?.stripePriceId && (subscribed.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now())

    return !!isValid;
}