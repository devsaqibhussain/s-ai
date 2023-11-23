"use client";
import React, { useState, useEffect } from "react";

import { Card } from "@/components/ui/card";
import { MAX_FREE_LIMIT } from "@/lib/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/useProModal";

interface CountProgressBarProps {
  counter: number;
}

const CountProgressBar = ({ counter = 0 }: CountProgressBarProps) => {
  const [mounted, setMounted] = useState(false);
  const proModal = useProModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const progress = (counter / MAX_FREE_LIMIT) * 100;
  return (
    <Card className="p-4 m-5 w-[80%] flex flex-col justify-center items-center gap-2 bg-slate-900 border-0 text-white">
      <p className=" text-sm font-bold">
        {counter}/{MAX_FREE_LIMIT} Free Generations
      </p>
      <Progress value={progress} className="h-4" />
      <Button variant={"premium"} className="w-full font-semibold" onClick={proModal.onOpen}>
        UPGRADE
        <Zap className=" ml-2" />
      </Button>
    </Card>
  );
};

export default CountProgressBar;
