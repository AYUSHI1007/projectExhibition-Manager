
import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Clock, Calendar, FileText, CheckCircle, AlertCircle, Users } from "lucide-react";

interface DashboardStat {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
}

interface PendingProject {
  id: string;
  title: string;
  subject: string;
  studentName: string;
  submittedAt: string;
}

const TeacherDashboard = () => {
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [pendingProjects, setPendingProjects] = useState<PendingProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    setTimeout(() => {
      setStats([
        {
          title: "Total Projects",
          value: 24,
          description: "Projects to review",
          icon: <FileText className="h-5 w-5 text-primary" />,
        },
        {
          title: "Pending Review",
          value: 8,
          description: "Awaiting your feedback",
          icon: <Clock className="h-5 w-5 text-yellow-500" />,
        },
        {
          title: "Approved",
          value: 14,
          description: "Projects approved",
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        },
        {
          title: "Needs Revision",
          value: 2,
          description: "Sent back for changes",
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
        },
      ]);

      setPendingProjects([
        {
          id: "proj1",
          title: "Web Application for Student Management",
          subject: "Web Development",
          studentName: "Alex Johnson",
          submittedAt: "2023-10-20T09:15:00Z",
        },
        {
          id: "proj2",
          title: "Mobile App Development",
          subject: "Mobile Computing",
          studentName: "Sarah Williams",
          submittedAt: "2023-10-19T14:30:00Z",
        },
        {
          id: "proj3",
          title: "Database Design Project",
          subject: "Database Systems",
          studentName: "Michael Brown",
          submittedAt: "2023-10-18T11:45:00Z",
        },
        {
          id: "proj4",
          title: "Network Security Implementation",
          subject: "Cybersecurity",
          studentName: "Emily Davis",
          submittedAt: "2023-10-17T16:20:00Z",
        },
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
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
            <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of projects and upcoming appointments
            </p>
          </div>
          <Button onClick={() => navigate("/teacher/projects")}>
            Review Projects
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, i) => (
            <Card key={i} className="glass-card animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <div className="col-span-2">
            <Card className="glass-card h-full animate-slide-up">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Pending Reviews</CardTitle>
                  <CardDescription>
                    Projects waiting for your approval
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/teacher/projects")}>
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {pendingProjects.map((project) => (
                    <div 
                      key={project.id}
                      className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <p className="text-sm font-medium">{project.title}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {project.subject} • Submitted on {formatDate(project.submittedAt)}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">{project.studentName}</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => navigate(`/teacher/projects/${project.id}`)}
                        className="shrink-0"
                      >
                        Review
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="glass-card h-full animate-slide-up">
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>
                  Your scheduled meetings with students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-accent/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <p className="text-sm font-medium">Alex Johnson</p>
                    </div>
                    <p className="text-xs mb-1">Machine Learning Project Discussion</p>
                    <p className="text-xs text-muted-foreground">October 25, 2023 • 2:00 PM</p>
                  </div>
                  
                  <div className="p-3 bg-accent/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <p className="text-sm font-medium">Sarah Williams</p>
                    </div>
                    <p className="text-xs mb-1">Mobile App Development Review</p>
                    <p className="text-xs text-muted-foreground">October 27, 2023 • 10:30 AM</p>
                  </div>
                  
                  <Button variant="outline" className="w-full" size="sm" onClick={() => navigate("/teacher/appointments")}>
                    View All Appointments
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TeacherDashboard;
