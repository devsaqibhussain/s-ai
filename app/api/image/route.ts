import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

import { CheckApiCount, IncrementCount } from "@/lib/db/databaseFunctions";
import { isSubscribed } from "@/lib/subscription";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OPENAI API key not found", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 });
    }

    const freeTrial = await CheckApiCount()
    const isPro = await isSubscribed()

    if(!freeTrial && !isPro){
      return new NextResponse("Free Trial has expired!", {status: 403})
    }

    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt,
      size: resolution,
      n: parseInt(amount, 10),
    });

    if(!isPro){
      await IncrementCount()
    }

    return NextResponse.json(response.data);
  } catch (error) {
    console.log("[Image_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
