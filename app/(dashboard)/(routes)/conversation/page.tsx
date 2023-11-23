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
import { formSchema } from "@/lib/formSchema";
import UserAvatar from "@/components/userAvatar";
import BotAvatar from "@/components/botAvatar";
import Empty from "@/components/empty";
import LoadingState from "@/components/loadingState";
import MessageBar from "@/components/messageBar";
import { useProModal } from "@/hooks/useProModal";
import { useToast } from "@/components/ui/use-toast";

const ConversationPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [messages, setMessages] = useState<OpenAI.ChatCompletionMessageParam[]>(
    []
  );

  const proModal = useProModal();

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
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: `${error.message}`,
        });
      }
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
        bgColor="bg-emerald-800/10"
        margin="m-4"
      />

      <div className=" flex-1 border-2 border-slate-600/20 rounded-xl p-4 m-4 flex flex-col gap-4 overflow-scroll">
        {messages.length === 0 && <Empty />}

        {messages.map((message, index) => (
          <div key={index} className={` flex items-start gap-4`}>
            {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
            <p className="mt-2">{message.content?.toString()}</p>
          </div>
        ))}

        {isLoading && <LoadingState />}
      </div>

      <MessageBar form={form} onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
};

export default ConversationPage;
