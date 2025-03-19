
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import MainNavbar from "@/components/layout/MainNavbar";
import { useToast } from "@/hooks/use-toast";

interface MainLayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
  allowedRole?: "student" | "teacher" | "both";
}

const MainLayout = ({ 
  children, 
  requireAuth = true,
  allowedRole = "both" 
}: MainLayoutProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const userString = localStorage.getItem("user");
    
    if (requireAuth && !isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please log in to access this page",
      });
      navigate("/auth");
      return;
    }
    
    if (requireAuth && isAuthenticated && allowedRole !== "both") {
      const user = userString ? JSON.parse(userString) : null;
      if (user && user.role !== allowedRole) {
        toast({
          variant: "destructive",
          title: "Access denied",
          description: `This page is only accessible to ${allowedRole}s`,
        });
        navigate(user.role === "student" ? "/student/dashboard" : "/teacher/dashboard");
      }
    }
  }, [navigate, requireAuth, allowedRole, toast]);

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full">
        <MainNavbar />
        <main className="animate-fade-in">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
