import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

import { CheckApiCount, IncrementCount } from "@/lib/db/databaseFunctions";
import { isSubscribed } from "@/lib/subscription";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const intructionMessage: OpenAI.ChatCompletionSystemMessageParam = {
  role: "system",
  content:
    "You purpose is to generate code according to users props. The code should be wrapped in proper markdown to display it correctly",
};

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OPENAI API key not found", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTrial = await CheckApiCount();
    const isPro = await isSubscribed();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free Trial has expired!", { status: 403 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [intructionMessage, ...messages],
    });

    if (!isPro) {
      await IncrementCount();
    }

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("[Conversaton_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
