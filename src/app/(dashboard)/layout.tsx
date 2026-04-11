import Sidebar from "@/components/common/Sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      {" "}
      <TooltipProvider>
        <Sidebar>{children}</Sidebar>
      </TooltipProvider>
    </>
  );
};
export default DashboardLayout;
