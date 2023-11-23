import PageHeading from "@/components/pageHeading";
import SubscriptionButton from "@/components/subscriptionBtn";
import { Badge } from "@/components/ui/badge";
import { isSubscribed } from "@/lib/subscription";
import { LucideSettings } from "lucide-react";

const SettingsPage = async () => {
  const isPro = await isSubscribed();

  return (
    <div className="p-4">
      <PageHeading
        title="Settings"
        description="Manage your Subscriptions."
        icon={LucideSettings}
        margin="mb-2"
      />
      {isPro ? (
        <div className=" flex items-center gap-2">
          <p className=" text-sm text-muted-foreground font-bold ml-2">
            You are currently using S-AI
          </p>
          <Badge variant="premium">Pro</Badge>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <p className=" text-sm text-muted-foreground font-bold ml-2">
            You are currently using free prompts, Upgrade to S-AI
          </p>
          <Badge variant="premium">Pro</Badge>
        </div>
      )}
      <SubscriptionButton isPro={isPro} />
    </div>
  );
};

export default SettingsPage;
