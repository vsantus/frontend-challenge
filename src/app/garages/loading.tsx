import { GaragesPageSkeleton } from "@/src/components/feedback/page-skeletons";
import { ShellFrame } from "@/src/components/shell/shell-frame";

export default function GaragesLoading() {
  return (
    <ShellFrame>
      <GaragesPageSkeleton />
    </ShellFrame>
  );
}
