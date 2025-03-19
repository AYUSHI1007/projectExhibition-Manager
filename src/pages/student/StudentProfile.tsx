
import MainLayout from "@/components/layout/MainLayout";
import ProfileForm from "@/components/student/ProfileForm";

const StudentProfile = () => {
  return (
    <MainLayout allowedRole="student">
      <div className="container py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-8">My Profile</h1>
        <ProfileForm />
      </div>
    </MainLayout>
  );
};

export default StudentProfile;
