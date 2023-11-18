"use client";
import { LucideMessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import OpenAI from "openai";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";

import PageHeading from "@/components/pageHeading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { formSchema } from "@/lib/formSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserAvatar from "@/components/userAvatar";
import BotAvatar from "@/components/botAvatar";
import Empty from "@/components/empty";
import LoadingState from "@/components/loadingState";

const ConversationPage = () => {
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
      const response = await axios.post("/api/conversation", {
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
        title="Conversation"
        description="Chat with your very own AI assistant "
        icon={LucideMessageSquare}
        color="text-emerald-500"
        margin="m-4"
      />

      <div className=" flex-1 border-2 border-slate-600/20 rounded-xl p-4 m-4 flex flex-col gap-4">
        {messages.length === 0 && <Empty />}

        {messages.map((message, index) => (
          <div key={index} className={` flex items-start gap-4`}>
            {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
            <p className="mt-2">{message.content?.toString()}</p>
          </div>
        ))}
        {isLoading && <LoadingState />}
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center justify-center gap-2 mx-4 mb-2"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <Input
                    placeholder="Your message here..."
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={"ghost"}
            size={"icon"}
            className="rounded-full"
            disabled={isLoading}
          >
            <LucideMessageSquare className=" text-emerald-500" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ConversationPage;
