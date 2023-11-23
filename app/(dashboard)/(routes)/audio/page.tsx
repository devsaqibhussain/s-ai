"use client";
import { LucideMusic, LucideSend } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";

import PageHeading from "@/components/pageHeading";
import { formSchema, formatOption, voiceOptions } from "./constants";
import Empty from "@/components/empty";
import LoadingState from "@/components/loadingState";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProModal } from "@/hooks/useProModal";
import { useToast } from "@/components/ui/use-toast";

const AudioPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [audio, setAudio] = useState();
  const [justLoaded, setJustLoaded] = useState(true);
  const proModal = useProModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      voice: "alloy",
      format: "mp3",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setJustLoaded(false);

      const response = await axios.post("/api/audio", values);

      setAudio(response.data.path);

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
        title="Audio Generation"
        description="Use AI for text-to-speech"
        icon={LucideMusic}
        color="text-red-500"
        bgColor="bg-red-500/10"
        margin="m-4"
      />

      <div className=" flex-1 border-2 border-slate-600/20 rounded-xl p-4 m-4 flex flex-col gap-4 overflow-scroll">
        <p className=" text-muted-foreground text-center text-sm">
          Note: We currently allow only one text-to-speech command, if you want
          to create multiple audio files you will have to reload the application
        </p>
        {justLoaded && <Empty />}
        {audio && (
          <div>
            <audio controls className="rounded-lg w-full mt-10">
              <source src={audio} />
            </audio>
          </div>
        )}
        {isLoading && <LoadingState />}
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-12 gap-2 m-4"
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className=" col-span-12 lg:col-span-7">
                <FormControl>
                  <Input
                    placeholder="Audio prompt here..."
                    disabled={isLoading}
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="voice"
            render={({ field }) => (
              <FormItem className="col-span-6 lg:col-span-2">
                <Select
                  onValueChange={field.onChange}
                  disabled={isLoading}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {voiceOptions.map((options, index) => (
                      <SelectItem key={index} value={options.value}>
                        {options.lable}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="format"
            render={({ field }) => (
              <FormItem className=" col-span-6 lg:col-span-2">
                <Select
                  onValueChange={field.onChange}
                  disabled={isLoading}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {formatOption.map((options, index) => (
                      <SelectItem key={index} value={options.value}>
                        {options.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant={"ghost"}
            size={"icon"}
            className="rounded-full col-span-12 lg:col-span-1 bg-green-500/10 w-full"
            disabled={isLoading}
          >
            <LucideSend className=" text-emerald-500" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AudioPage;
