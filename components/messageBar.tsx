import { LucideSend } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { formSchema } from "@/lib/formSchema";

interface MessageBarProps {
  form: UseFormReturn<{
    message: string;
  }>;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  isLoading: boolean;
}

const MessageBar = ({ form, onSubmit, isLoading }: MessageBarProps) => {
  return (
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
                  disabled={isLoading}
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
          <LucideSend className=" text-emerald-500" />
        </Button>
      </form>
    </Form>
  );
};

export default MessageBar;
