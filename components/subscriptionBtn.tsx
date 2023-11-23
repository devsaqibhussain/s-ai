"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { Zap } from "lucide-react";

interface SubscriptionButtonProps {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);

  const onSubscription = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.log("[Stripe_Error]", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {isPro ? (
        <Button
          disabled={loading}
          variant="default"
          className=" text-white font-bold mt-5"
          onClick={onSubscription}
        >
          Manage Subscription
        </Button>
      ) : (
        <Button
          disabled={loading}
          variant="premium"
          className=" text-white font-bold mt-5"
          onClick={onSubscription}
        >
          UPGRADE <Zap className="ml-2" />
        </Button>
      )}
    </>
  );
};

export default SubscriptionButton;
