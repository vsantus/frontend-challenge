import { DashboardPageSkeleton } from "@/src/components/feedback/page-skeletons";
import { ShellFrame } from "@/src/components/shell/shell-frame";

export default function DashboardLoading() {
  return (
    <ShellFrame>
      <DashboardPageSkeleton />
    </ShellFrame>
  );
}
