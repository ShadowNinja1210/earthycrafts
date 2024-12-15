import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function TooltipContext({
  children,
  context,
}: Readonly<{ children: React.ReactNode; context: string }>) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="">
          <p>{context}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
