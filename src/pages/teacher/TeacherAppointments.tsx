
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import MainLayout from "@/components/layout/MainLayout";
import { Calendar, Clock, FileText, User } from "lucide-react";

interface Appointment {
  id: string;
  projectTitle: string;
  projectId: string;
  student: {
    id: string;
    name: string;
  };
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
}

const TeacherAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch appointments
    setTimeout(() => {
      const mockAppointments: Appointment[] = [
        {
          id: "apt1",
          projectTitle: "Machine Learning Algorithm Implementation",
          projectId: "proj5",
          student: { id: "s5", name: "David Wilson" },
          date: "2023-10-25",
          time: "2:00 PM",
          status: "upcoming"
        },
        {
          id: "apt2",
          projectTitle: "Mobile App Development",
          projectId: "proj2",
          student: { id: "s2", name: "Sarah Williams" },
          date: "2023-10-27",
          time: "10:30 AM",
          status: "upcoming"
        },
        {
          id: "apt3",
          projectTitle: "Web Application for Student Management",
          projectId: "proj1",
          student: { id: "s1", name: "Alex Johnson" },
          date: "2023-11-02",
          time: "3:00 PM",
          status: "upcoming"
        },
        {
          id: "apt4",
          projectTitle: "IoT Home Automation System",
          projectId: "proj6",
          student: { id: "s6", name: "Jessica Martinez" },
          date: "2023-10-10",
          time: "1:15 PM",
          status: "completed"
        },
        {
          id: "apt5",
          projectTitle: "Database Design Project",
          projectId: "proj3",
          student: { id: "s3", name: "Michael Brown" },
          date: "2023-10-12",
          time: "11:00 AM",
          status: "completed"
        },
      ];
      
      setAppointments(mockAppointments);
      setIsLoading(false);
    }, 1000);
  }, []);

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
            <h1 className="text-3xl font-bold tracking-tight">Scheduled Appointments</h1>
            <p className="text-muted-foreground">
              Manage your upcoming and past appointments with students
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="animate-fade-in">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {appointments.filter(apt => apt.status === "upcoming").map((appointment) => (
                <Card key={appointment.id} className="glass-card hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{appointment.projectTitle}</CardTitle>
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        Upcoming
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      <span>{appointment.student.name}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-sm">{appointment.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm">{appointment.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm">
                          <a href={`/teacher/projects/${appointment.projectId}`} className="text-primary hover:underline">
                            View Project
                          </a>
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {appointments.filter(apt => apt.status === "upcoming").length === 0 && (
                <div className="col-span-full text-center p-8 border rounded-lg bg-secondary/20">
                  <p className="text-muted-foreground">You don't have any upcoming appointments.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="past" className="animate-fade-in">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {appointments.filter(apt => apt.status === "completed").map((appointment) => (
                <Card key={appointment.id} className="glass-card opacity-75">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{appointment.projectTitle}</CardTitle>
                      <Badge variant="outline" className="bg-muted text-muted-foreground">
                        Completed
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      <span>{appointment.student.name}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-sm">{appointment.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm">{appointment.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm">
                          <a href={`/teacher/projects/${appointment.projectId}`} className="text-primary hover:underline">
                            View Project
                          </a>
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {appointments.filter(apt => apt.status === "completed").length === 0 && (
                <div className="col-span-full text-center p-8 border rounded-lg bg-secondary/20">
                  <p className="text-muted-foreground">You don't have any past appointments.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default TeacherAppointments;
