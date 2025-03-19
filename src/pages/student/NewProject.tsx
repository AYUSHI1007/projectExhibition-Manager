
import MainLayout from "@/components/layout/MainLayout";
import ProjectForm from "@/components/student/ProjectForm";

const NewProject = () => {
  return (
    <MainLayout allowedRole="student">
      <div className="container py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Submit New Project</h1>
        <ProjectForm />
      </div>
    </MainLayout>
  );
};

export default NewProject;
