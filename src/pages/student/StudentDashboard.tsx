
import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Clock, Calendar, Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";

interface DashboardStat {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
}

interface RecentActivity {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "submission" | "feedback" | "appointment";
}

const StudentDashboard = () => {
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    setTimeout(() => {
      setStats([
        {
          title: "Total Projects",
          value: 5,
          description: "Projects submitted",
          icon: <FileText className="h-5 w-5 text-primary" />,
        },
        {
          title: "Pending Review",
          value: 2,
          description: "Awaiting teacher feedback",
          icon: <Clock className="h-5 w-5 text-yellow-500" />,
        },
        {
          title: "Approved",
          value: 2,
          description: "Projects approved",
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        },
        {
          title: "Needs Revision",
          value: 1,
          description: "Requires updates",
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
        },
      ]);

      setActivities([
        {
          id: "act1",
          title: "New Project Submitted",
          description: "You submitted 'Web Application for Student Management' for review",
          date: "2023-10-20T09:15:00Z",
          type: "submission",
        },
        {
          id: "act2",
          title: "Feedback Received",
          description: "Dr. Smith provided feedback on 'Machine Learning Algorithm Implementation'",
          date: "2023-10-18T14:20:00Z",
          type: "feedback",
        },
        {
          id: "act3",
          title: "Appointment Scheduled",
          description: "Discussion scheduled with Prof. Johnson on October 25, 2023 at 2:00 PM",
          date: "2023-10-17T10:10:00Z",
          type: "appointment",
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

  const getActivityIcon = (type: string) => {
    switch(type) {
      case "submission": return <Upload className="h-5 w-5 text-primary" />;
      case "feedback": return <FileText className="h-5 w-5 text-yellow-500" />;
      case "appointment": return <Calendar className="h-5 w-5 text-green-500" />;
      default: return null;
    }
  };

  if (isLoading) {
    return (
      <MainLayout allowedRole="student">
        <div className="container py-12">
          <div className="w-full flex justify-center items-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout allowedRole="student">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your projects and activities
            </p>
          </div>
          <Button onClick={() => navigate("/student/projects/new")}>
            Submit New Project
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
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your recent project submissions and interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {activities.map((activity, i) => (
                    <div 
                      key={activity.id}
                      className="flex gap-4 items-start border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(activity.date)}
                        </p>
                      </div>
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
                  Your scheduled meetings with teachers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-accent/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <p className="text-sm font-medium">Dr. Smith</p>
                    </div>
                    <p className="text-xs mb-1">Machine Learning Project Discussion</p>
                    <p className="text-xs text-muted-foreground">October 25, 2023 • 2:00 PM</p>
                  </div>
                  
                  <Button variant="outline" className="w-full" size="sm" onClick={() => navigate("/student/appointments")}>
                    View All Appointments
                  </Button>
                  
                  <Button variant="outline" className="w-full" size="sm" onClick={() => navigate("/student/appointments/schedule")}>
                    Schedule New
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

export default StudentDashboard;
