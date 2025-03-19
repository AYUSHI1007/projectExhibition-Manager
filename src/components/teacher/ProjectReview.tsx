
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Calendar, Download, FileText, User } from "lucide-react";

interface ProjectReviewProps {
  projectId: string;
}

const ProjectReview = ({ projectId }: ProjectReviewProps) => {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Mock project data
  const project = {
    id: projectId,
    title: "Machine Learning Algorithm Implementation",
    subject: "Artificial Intelligence",
    description: "Implementation of a neural network for image classification using TensorFlow. The project includes a detailed report on the architecture chosen, the dataset used for training and testing, and performance metrics. The implementation is done in Python using TensorFlow and Keras libraries.",
    status: "pending",
    submittedAt: "2023-10-15T10:30:00Z",
    student: {
      id: "s123",
      name: "Alex Johnson",
      email: "alex.johnson@example.com"
    },
    files: [
      { name: "project_report.pdf", size: "2.4 MB" },
      { name: "source_code.zip", size: "1.8 MB" },
      { name: "presentation.pptx", size: "4.2 MB" }
    ]
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

  const handleApprove = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Project approved",
        description: "Feedback has been sent to the student",
      });
      setLoading(false);
      navigate("/teacher/projects");
    }, 1000);
  };

  const handleReject = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Project needs revision",
        description: "Feedback has been sent to the student",
      });
      setLoading(false);
      navigate("/teacher/projects");
    }, 1000);
  };

  const handleSchedule = () => {
    navigate(`/teacher/schedule/${projectId}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{project.title}</CardTitle>
              <CardDescription className="mt-1">
                <span className="font-medium text-primary">{project.subject}</span> • Submitted {formatDate(project.submittedAt)}
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
              Pending Review
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-lg">
            <User className="w-5 h-5 mt-1 text-primary" />
            <div>
              <h4 className="text-sm font-medium">Student Information</h4>
              <p className="text-sm mt-1">{project.student.name}</p>
              <p className="text-sm text-muted-foreground">{project.student.email}</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Project Description</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-line">{project.description}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Attached Files</h4>
            <div className="space-y-2">
              {project.files.map((file, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 bg-secondary/40 rounded-md hover:bg-secondary/60 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="text-sm">{file.name}</span>
                    <span className="text-xs text-muted-foreground">({file.size})</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Feedback to Student</h4>
            <Textarea
              placeholder="Provide feedback or comments about the project..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="resize-none min-h-[120px]"
            />
          </div>
        </CardContent>
        <CardFooter className="border-t bg-secondary/20 flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/teacher/projects")}>
              Back to Projects
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={handleSchedule}
            >
              <Calendar className="h-4 w-4" />
              Schedule Discussion
            </Button>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="destructive" 
              className="flex items-center gap-1"
              onClick={handleReject}
              disabled={loading || !feedback}
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <>
                  <XCircle className="h-4 w-4" />
                  Needs Revision
                </>
              )}
            </Button>
            <Button 
              variant="default" 
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
              onClick={handleApprove}
              disabled={loading}
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Approve
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProjectReview;
