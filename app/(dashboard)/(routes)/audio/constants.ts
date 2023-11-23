import * as z from "zod";
export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Audio prompt cannot be empty!",
  }),
  voice: z.string().min(1),
  format: z.string().min(1),
});

export const voiceOptions = [
  {
    value: "alloy",
    lable: "Alloy",
  },
  {
    value: "echo",
    lable: "Echo",
  },
  {
    value: "fable",
    lable: "Fable",
  },
  {
    value: "onyx",
    lable: "Onyx",
  },
  {
    value: "nova",
    lable: "Nova",
  },
  {
    value: "shimmer",
    lable: "Shimmer",
  },
];

export const formatOption = [
  {
    value: "mp3",
    label: "MP3",
  },
  {
    value: "opus",
    label: "Opus",
  },
  {
    value: "aac",
    label: "AAC",
  },
  {
    value: "flac",
    label: "FLAC",
  },
];
