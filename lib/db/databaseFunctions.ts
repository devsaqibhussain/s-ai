import { auth } from "@clerk/nextjs";

import { MAX_FREE_LIMIT } from "@/lib/constants";
import prisma from "@/lib/db/prisma";

export const IncrementCount = async () => {
  const { userId } = auth();

  if (!userId) return;

  const userExist = await prisma.user.findUnique({
    where: {
      userId,
    },
  });

  if (!userExist) {
    await prisma.user.create({
      data: {
        userId,
        apiCount: 1,
      },
    });
  } else {
    await prisma.user.update({
      where: {
        userId,
      },
      data: {
        apiCount: { increment: 1 },
      },
    });
  }
};

export const CheckApiCount = async () => {
  const { userId } = auth();

  if (!userId) return;

  const CheckLimit = await prisma.user.findUnique({
    where: {
      userId,
    },
  });

  if (!CheckLimit || CheckLimit.apiCount < MAX_FREE_LIMIT) {
    return true;
  } else {
    return false;
  }
};

export const GetApiCount = async ()=>{
    const {userId} = auth()

    if(!userId) return 0;

    const user = await prisma.user.findUnique({
        where:{
            userId
        }
    })
    
    if(!user) return 0;

    return user.apiCount

}