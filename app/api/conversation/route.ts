import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const intructionMessage: OpenAI.ChatCompletionSystemMessageParam = {
  role: "system",
  content:
    "You're name is S-AI and you are an AI assistant that will answer users questions, if user asks you any code related question tell them to use 'Code Generator' Menu instead",
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

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [intructionMessage, ...messages],
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("[Conversaton_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
