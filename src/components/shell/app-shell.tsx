import { Sidebar } from "../sidebar/sidebar";
import { Topbar } from "../topbar/topbar";



type Props = {
  children: React.ReactNode;
};

export function AppShell({
  children,
}: Props) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}