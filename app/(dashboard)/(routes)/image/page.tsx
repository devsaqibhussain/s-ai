"use client";
import { Download, LucideImage, LucideSend } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import OpenAI from "openai";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";

import PageHeading from "@/components/pageHeading";
import { amountOptions, formSchema, resolutionOption } from "./constants";
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
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

const ImagePage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [justLoaded, setJustLoaded] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setJustLoaded(false);
      setImages([]);

      const response = await axios.post("/api/image", values);

      const urls = response.data.map((image: { url: string }) => image.url);

      setImages(urls);

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
        title="Image Generation"
        description="Use prompts to generate AI images"
        icon={LucideImage}
        color="text-pink-500"
        bgColor="bg-pink-800/10"
        margin="m-4"
      />

      <div className=" flex-1 border-2 border-slate-600/20 rounded-xl p-4 m-4 flex flex-col gap-4 overflow-scroll">
        {justLoaded && <Empty />}
        <div className="grid grid-cols- sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map((src, index) => (
            <Card
              key={index}
              className="overflow-hidden flex flex-col justify-center shadow-sm hover:shadow-lg"
            >
              <div className="relative aspect-square">
                <Image src={src} alt="AI generated image" fill />
              </div>
              <CardFooter>
                <Button
                  variant="secondary"
                  className="w-full mt-2"
                  onClick={() => window.open(src)}
                >
                  <Download className="mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
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
                    placeholder="Image prompt here..."
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
            name="amount"
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
                    {amountOptions.map((options, index) => (
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
            name="resolution"
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
                    {resolutionOption.map((options, index) => (
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

export default ImagePage;
