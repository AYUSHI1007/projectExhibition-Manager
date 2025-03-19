
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, CheckCircle, AlertCircle, Clock, Search, Filter, User } from "lucide-react";

interface Project {
  id: string;
  title: string;
  subject: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  student: {
    id: string;
    name: string;
  };
}

const TeacherProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call to fetch projects
    setTimeout(() => {
      const mockProjects: Project[] = [
        {
          id: "proj1",
          title: "Web Application for Student Management",
          subject: "Web Development",
          status: "pending",
          submittedAt: "2023-10-20T09:15:00Z",
          student: { id: "s1", name: "Alex Johnson" }
        },
        {
          id: "proj2",
          title: "Mobile App Development",
          subject: "Mobile Computing",
          status: "pending",
          submittedAt: "2023-10-19T14:30:00Z",
          student: { id: "s2", name: "Sarah Williams" }
        },
        {
          id: "proj3",
          title: "Database Design Project",
          subject: "Database Systems",
          status: "pending",
          submittedAt: "2023-10-18T11:45:00Z",
          student: { id: "s3", name: "Michael Brown" }
        },
        {
          id: "proj4",
          title: "Network Security Implementation",
          subject: "Cybersecurity",
          status: "pending",
          submittedAt: "2023-10-17T16:20:00Z",
          student: { id: "s4", name: "Emily Davis" }
        },
        {
          id: "proj5",
          title: "Machine Learning Algorithm Implementation",
          subject: "Artificial Intelligence",
          status: "approved",
          submittedAt: "2023-10-15T10:30:00Z",
          student: { id: "s5", name: "David Wilson" }
        },
        {
          id: "proj6",
          title: "IoT Home Automation System",
          subject: "Internet of Things",
          status: "approved",
          submittedAt: "2023-10-12T13:45:00Z",
          student: { id: "s6", name: "Jessica Martinez" }
        },
        {
          id: "proj7",
          title: "Analysis of Sorting Algorithms",
          subject: "Algorithms",
          status: "rejected",
          submittedAt: "2023-10-10T11:45:00Z",
          student: { id: "s7", name: "Ryan Thompson" }
        },
      ];
      
      setProjects(mockProjects);
      setFilteredProjects(mockProjects);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterProjects();
  }, [searchTerm, currentTab, projects]);

  const filterProjects = () => {
    let result = [...projects];
    
    // Filter by tab (status)
    if (currentTab !== "all") {
      result = result.filter(project => project.status === currentTab);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        project => 
          project.title.toLowerCase().includes(term) || 
          project.subject.toLowerCase().includes(term) ||
          project.student.name.toLowerCase().includes(term)
      );
    }
    
    setFilteredProjects(result);
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "approved": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "rejected": return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "approved": return "bg-green-100 text-green-800 border-green-200";
      case "rejected": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  if (isLoading) {
    return (
      <MainLayout allowedRole="teacher">
        <div className="container py-12">
          <div className="w-full flex justify-center items-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout allowedRole="teacher">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Project Reviews</h1>
            <p className="text-muted-foreground">
              Review and manage student project submissions
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by title, subject, or student..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setCurrentTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="pending">Pending Review</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="animate-fade-in">
            <RenderProjects projects={filteredProjects} navigate={navigate} />
          </TabsContent>
          
          <TabsContent value="pending" className="animate-fade-in">
            <RenderProjects projects={filteredProjects} navigate={navigate} />
          </TabsContent>
          
          <TabsContent value="approved" className="animate-fade-in">
            <RenderProjects projects={filteredProjects} navigate={navigate} />
          </TabsContent>
          
          <TabsContent value="rejected" className="animate-fade-in">
            <RenderProjects projects={filteredProjects} navigate={navigate} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

interface RenderProjectsProps {
  projects: Project[];
  navigate: (path: string) => void;
}

const RenderProjects = ({ projects, navigate }: RenderProjectsProps) => {
  const getStatusIcon = (status: string) => {
    switch(status) {
      case "approved": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "rejected": return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "approved": return "bg-green-100 text-green-800 border-green-200";
      case "rejected": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  if (projects.length === 0) {
    return (
      <div className="text-center p-12 border rounded-lg bg-secondary/20">
        <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">No projects match your search criteria.</p>
      </div>
    );
  }
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id} className="glass-card overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{project.title}</CardTitle>
              <Badge 
                variant="outline" 
                className={`flex items-center gap-1 ${getStatusColor(project.status)}`}
              >
                {getStatusIcon(project.status)}
                <span className="capitalize">{project.status}</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-primary">{project.subject}</p>
                <p className="text-xs text-muted-foreground">Submitted on {formatDate(project.submittedAt)}</p>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                {project.student.name}
              </div>
              
              <Button 
                className="w-full"
                onClick={() => navigate(`/teacher/projects/${project.id}`)}
              >
                {project.status === "pending" ? "Review Project" : "View Details"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TeacherProjects;
