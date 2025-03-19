
import MainLayout from "@/components/layout/MainLayout";
import AppointmentScheduler from "@/components/common/AppointmentScheduler";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Calendar, Clock, User } from "lucide-react";

interface Appointment {
  id: string;
  teacherName: string;
  teacherId: string;
  projectTitle: string;
  projectId: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
}

const mockAppointments: Appointment[] = [
  {
    id: "apt1",
    teacherName: "Dr. Smith",
    teacherId: "t123",
    projectTitle: "Machine Learning Algorithm Implementation",
    projectId: "1",
    date: "2023-10-25",
    time: "2:00 PM",
    status: "upcoming"
  },
  {
    id: "apt2",
    teacherName: "Prof. Johnson",
    teacherId: "t456",
    projectTitle: "Web Application for Student Management",
    projectId: "2",
    date: "2023-11-02",
    time: "10:00 AM",
    status: "upcoming"
  },
  {
    id: "apt3",
    teacherName: "Dr. Williams",
    teacherId: "t789",
    projectTitle: "Database Design Project",
    projectId: "5",
    date: "2023-10-10",
    time: "3:30 PM",
    status: "completed"
  }
];

const StudentAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showScheduler, setShowScheduler] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch appointments
    setTimeout(() => {
      setAppointments(mockAppointments);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleScheduled = () => {
    setShowScheduler(false);
    // In a real app, would refresh appointments here
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
            <h1 className="text-3xl font-bold tracking-tight">My Appointments</h1>
            <p className="text-muted-foreground">
              View and manage your scheduled discussions with teachers
            </p>
          </div>
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            onClick={() => setShowScheduler(!showScheduler)}
          >
            {showScheduler ? "Cancel" : "Schedule New"}
          </button>
        </div>

        {showScheduler ? (
          <div className="mb-8 animate-fade-in">
            <AppointmentScheduler onScheduled={handleScheduled} />
          </div>
        ) : null}

        <div className="space-y-6 animate-fade-in">
          <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {appointments.filter(apt => apt.status === "upcoming").map((appointment) => (
              <Card key={appointment.id} className="glass-card hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{appointment.projectTitle}</CardTitle>
                  <CardDescription>Discussion with {appointment.teacherName}</CardDescription>
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
                      <User className="h-4 w-4 text-primary" />
                      <span className="text-sm">{appointment.teacherName}</span>
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

          <h2 className="text-xl font-semibold pt-4">Past Appointments</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {appointments.filter(apt => apt.status === "completed").map((appointment) => (
              <Card key={appointment.id} className="glass-card opacity-75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{appointment.projectTitle}</CardTitle>
                  <CardDescription>Discussion with {appointment.teacherName}</CardDescription>
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
                      <User className="h-4 w-4 text-primary" />
                      <span className="text-sm">{appointment.teacherName}</span>
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
        </div>
      </div>
    </MainLayout>
  );
};

export default StudentAppointments;
