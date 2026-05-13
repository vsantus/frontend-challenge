import { PlansPageSkeleton } from "@/src/components/feedback/page-skeletons";
import { ShellFrame } from "@/src/components/shell/shell-frame";

export default function PlansLoading() {
  return (
    <ShellFrame>
      <PlansPageSkeleton />
    </ShellFrame>
  );
}
