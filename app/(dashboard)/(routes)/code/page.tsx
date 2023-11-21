"use client";
import { CodeIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import OpenAI from "openai";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import Markdown from "react-markdown";

import PageHeading from "@/components/pageHeading";
import { formSchema } from "@/lib/formSchema";
import UserAvatar from "@/components/userAvatar";
import BotAvatar from "@/components/botAvatar";
import Empty from "@/components/empty";
import LoadingState from "@/components/loadingState";
import MessageBar from "@/components/messageBar";

const CodeGeneration = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<OpenAI.ChatCompletionMessageParam[]>(
    []
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: OpenAI.ChatCompletionUserMessageParam = {
        role: "user",
        content: values.message,
      };

      const newMessages = [...messages, userMessage];
      setMessages((current) => [...current, userMessage]);
      const response = await axios.post("/api/code", {
        messages: newMessages,
      });
      setMessages((current) => [...current, response.data]);
      console.log(messages);
      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };
  return (
    <div className="h-[94%] flex flex-col">
      <PageHeading
        title="Code Generation"
        description="Solution to all your coding problems."
        icon={CodeIcon}
        bgColor="bg-violet-500/10"
        color="text-violet-500"
        margin="m-4"
      />

      <div className=" flex-1 border-2 border-slate-600/20 rounded-xl p-4 m-4 flex flex-col gap-4 overflow-scroll">
        {messages.length === 0 && <Empty />}

        {messages.map((message, index) => (
          <div key={index} className={` flex items-start gap-4`}>
            {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
            <Markdown
              components={{
                pre: ({ node, ...props }) => (
                  <div className=" overflow-auto w-full bg-slate-600/20 p-2 rounded-lg my-2">
                    <pre {...props} />
                  </div>
                ),
                code: ({ node, ...props }) => (
                  <code className="bg-slate-600/20 rounded-lg p-1" {...props} />
                ),
              }}
              className="text-sm overflow-hidden leading-7 mt-2"
            >
              {message.content?.toString() || ""}
            </Markdown>
          </div>
        ))}
        {isLoading && <LoadingState />}
      </div>

      <MessageBar form={form} onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
};

export default CodeGeneration;
