"use client";
import axios from "axios";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProModal } from "@/hooks/useProModal";
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Check,
  CodeIcon,
  ImageIcon,
  MessageSquare,
  MusicIcon,
  Zap,
} from "lucide-react";

const tools = [
  {
    title: "Conversation",
    href: "/conversation",
    icon: MessageSquare,
    bgColor: "bg-emerald-500/10",
    color: "text-emerald-500",
  },
  {
    title: "Image Generation",
    href: "/image",
    icon: ImageIcon,
    bgColor: "bg-violet-500/10",
    color: "text-violet-500",
  },
  {
    title: "Audio Generation",
    href: "/audio",
    icon: MusicIcon,
    bgColor: "bg-red-500/10",
    color: "text-red-500",
  },
  {
    title: "Code Generation",
    href: "/code",
    icon: CodeIcon,
    bgColor: "bg-pink-500/10",
    color: "text-pink-500",
  },
];

const ProModal = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubscription = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: `${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };
  const proModal = useProModal();
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex  justify-center space-x-2 font-bold">
            <p>UPGRADE TO S-AI</p>
            <Badge variant={"premium"}>PRO</Badge>
          </DialogTitle>
          <DialogDescription>
            <div>
              {tools.map((tool, index) => (
                <Card
                  className={` mt-4 flex p-2 items-center justify-between gap-4 `}
                  key={index}
                >
                  <div
                    className={`p-1 ${tool.bgColor} ${tool.color} rounded-xl`}
                  >
                    <tool.icon className=" w-5 h-5" />
                  </div>
                  <h1 className="flex-1 text-md font-semibold">{tool.title}</h1>
                  <Check
                    className={`${tool.color} ${tool.bgColor} rounded-full p-1 w-5 h-5`}
                  />
                </Card>
              ))}
            </div>
          </DialogDescription>
          <CardFooter>
            <Button
              disabled={loading}
              variant="premium"
              className=" text-white font-bold w-full mt-5"
              onClick={onSubscription}
            >
              UPGRADE <Zap className="ml-2" />
            </Button>
          </CardFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
