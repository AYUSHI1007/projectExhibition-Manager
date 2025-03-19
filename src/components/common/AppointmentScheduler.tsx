
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Clock } from "lucide-react";

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface AppointmentSchedulerProps {
  projectId?: string;
  studentId?: string;
  teacherId?: string;
  onScheduled?: () => void;
}

const AppointmentScheduler = ({ 
  projectId,
  studentId,
  teacherId,
  onScheduled
}: AppointmentSchedulerProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Generate mock available time slots
  const generateTimeSlots = (selectedDate: Date | undefined): TimeSlot[] => {
    if (!selectedDate) return [];
    
    // Mock time slots - in a real app, these would come from an API
    return [
      { id: "1", time: "09:00 AM", available: true },
      { id: "2", time: "10:00 AM", available: true },
      { id: "3", time: "11:00 AM", available: false },
      { id: "4", time: "01:00 PM", available: true },
      { id: "5", time: "02:00 PM", available: true },
      { id: "6", time: "03:00 PM", available: false },
      { id: "7", time: "04:00 PM", available: true },
    ];
  };

  const timeSlots = generateTimeSlots(date);

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    setSelectedTimeSlot(null);
  };

  const handleTimeSelect = (slotId: string) => {
    setSelectedTimeSlot(slotId);
  };

  const handleSchedule = () => {
    if (!date || !selectedTimeSlot) return;
    
    setIsLoading(true);
    
    // Simulate API call to schedule appointment
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Appointment scheduled",
        description: `Your appointment has been scheduled for ${date.toLocaleDateString()} at ${timeSlots.find(slot => slot.id === selectedTimeSlot)?.time}`,
      });
      
      // Reset form
      setDate(undefined);
      setSelectedTimeSlot(null);
      
      // Callback if provided
      if (onScheduled) {
        onScheduled();
      }
    }, 1500);
  };

  return (
    <Card className="max-w-md mx-auto glass-card animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Schedule an Appointment</CardTitle>
        <CardDescription>
          Select a date and time to schedule a discussion
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="rounded-md border"
            disabled={{ before: new Date() }}
          />
          <div className="text-sm text-muted-foreground flex items-center gap-1 pt-2">
            <CalendarIcon className="h-4 w-4" />
            <span>{date ? date.toLocaleDateString() : "Select a date"}</span>
          </div>
        </div>
        
        {date && (
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-sm font-medium">
              <Clock className="h-4 w-4" />
              <span>Available Time Slots</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 pt-2">
              {timeSlots.map((slot) => (
                <Button
                  key={slot.id}
                  variant={selectedTimeSlot === slot.id ? "default" : "outline"}
                  className={`w-full justify-center ${!slot.available && "opacity-50 cursor-not-allowed"}`}
                  disabled={!slot.available}
                  onClick={() => handleTimeSelect(slot.id)}
                >
                  {slot.time}
                </Button>
              ))}
            </div>
            
            {timeSlots.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No available time slots for the selected date.
              </p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end border-t bg-secondary/20 pt-4">
        <Button
          onClick={handleSchedule}
          disabled={!date || !selectedTimeSlot || isLoading}
        >
          {isLoading ? (
            <>
              <span className="mr-2">Scheduling</span>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            </>
          ) : (
            "Schedule Appointment"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AppointmentScheduler;
