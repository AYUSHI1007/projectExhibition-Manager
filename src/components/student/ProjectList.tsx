
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Clock, FileText, CheckCircle, AlertCircle, Calendar } from "lucide-react";

interface Project {
  id: string;
  title: string;
  subject: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  reviewedAt?: string;
  teacherComments?: string;
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Machine Learning Algorithm Implementation",
    subject: "Artificial Intelligence",
    description: "Implementation of a neural network for image classification using TensorFlow.",
    status: "approved",
    submittedAt: "2023-10-15T10:30:00Z",
    reviewedAt: "2023-10-18T14:20:00Z",
    teacherComments: "Excellent implementation with good documentation. Approved."
  },
  {
    id: "2",
    title: "Web Application for Student Management",
    subject: "Web Development",
    description: "A React-based web application for managing student records and attendance.",
    status: "pending",
    submittedAt: "2023-10-20T09:15:00Z"
  },
  {
    id: "3",
    title: "Analysis of Sorting Algorithms",
    subject: "Algorithms",
    description: "Comparative analysis of different sorting algorithms and their performance metrics.",
    status: "rejected",
    submittedAt: "2023-10-10T11:45:00Z",
    reviewedAt: "2023-10-12T16:30:00Z",
    teacherComments: "The analysis lacks depth. Please include more performance metrics and visualization."
  }
];

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call to fetch projects
    setTimeout(() => {
      setProjects(mockProjects);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case "approved": return "bg-green-100 text-green-800 border-green-200";
      case "rejected": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "approved": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "rejected": return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Projects</h2>
        <Button onClick={() => navigate("/student/projects/new")}>
          Submit New Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card className="glass-card">
          <CardContent className="flex flex-col items-center justify-center h-40">
            <FileText className="h-10 w-10 text-gray-400 mb-4" />
            <p className="text-muted-foreground text-center">You haven't submitted any projects yet.</p>
            <Button variant="link" onClick={() => navigate("/student/projects/new")}>
              Create your first project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden transition-all hover:shadow-md glass-card">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <Badge 
                    variant="outline" 
                    className={`flex items-center gap-1 ${getStatusColor(project.status)}`}
                  >
                    {getStatusIcon(project.status)}
                    <span className="capitalize">{project.status}</span>
                  </Badge>
                </div>
                <CardDescription>
                  <span className="font-medium text-primary">{project.subject}</span> • Submitted {formatDate(project.submittedAt)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {project.description}
                </p>
                
                {project.reviewedAt && (
                  <div className="bg-secondary/40 p-3 rounded-md mt-2">
                    <div className="text-xs text-muted-foreground mb-1">
                      Reviewed on {formatDate(project.reviewedAt)}
                    </div>
                    {project.teacherComments && (
                      <p className="text-sm">
                        <span className="font-medium">Teacher's feedback:</span> {project.teacherComments}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t bg-secondary/20 flex justify-between">
                <Button variant="ghost" size="sm" onClick={() => navigate(`/student/projects/${project.id}`)}>
                  View Details
                </Button>
                
                {project.status === "approved" && (
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Schedule Discussion
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
