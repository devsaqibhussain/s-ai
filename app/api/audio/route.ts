import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

import { CheckApiCount, IncrementCount } from "@/lib/db/databaseFunctions";
import { isSubscribed } from "@/lib/subscription";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, voice = "alloy", format = "mp3" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OPENAI API key not found", { status: 500 });
    }
    if (!process.env.FILE_SAVE_PATH) {
      return new NextResponse("File pathn not found", { status: 500 });
    }
    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }
    if (!voice) {
      return new NextResponse("Amount is required", { status: 400 });
    }
    if (!format) {
      return new NextResponse("Resolution is required", { status: 400 });
    }

    const freeTrial = await CheckApiCount()
    const isPro = await isSubscribed()

    if(!freeTrial && !isPro){
      return new NextResponse("Free Trial has expired!", {status: 403})
    }

    const speechFile = path.resolve(process.env.FILE_SAVE_PATH);
    if (fs.existsSync(process.env.FILE_SAVE_PATH)) {
      await fs.promises.unlink(speechFile);
    }


    const response = await openai.audio.speech.create({
      model: "tts-1",
      voice,
      input: prompt,
      response_format: format,
    });
    
    if(!isPro){
      await IncrementCount()
    }


    const buffer = Buffer.from(await response.arrayBuffer());

    await fs.promises.writeFile(speechFile, buffer);

    return NextResponse.json({ path: "/speech.mp3" });
  } catch (error) {
    console.log("[Audio_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
