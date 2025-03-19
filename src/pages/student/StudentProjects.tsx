
import MainLayout from "@/components/layout/MainLayout";
import ProjectList from "@/components/student/ProjectList";

const StudentProjects = () => {
  return (
    <MainLayout allowedRole="student">
      <div className="container py-8">
        <ProjectList />
      </div>
    </MainLayout>
  );
};

export default StudentProjects;
