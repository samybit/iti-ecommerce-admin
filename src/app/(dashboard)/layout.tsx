import Sidebar from "@/components/common/Sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <TooltipProvider>
        <Sidebar>
          {children}
          <Toaster position="bottom-right" />
        </Sidebar>
      </TooltipProvider>
    </>
  );
};
export default DashboardLayout;
