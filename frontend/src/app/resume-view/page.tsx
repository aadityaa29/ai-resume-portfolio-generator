"use client";

import { useEffect, useState } from "react";
import TemplateOne from "@/components/templates/TemplateOne";
import TemplateTwo from "@/components/templates/TemplateTwo";
// Add more templates as needed

export default function ResumeViewPage() {
  const [resume, setResume] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("generated_resume");
    if (stored) {
      setResume(JSON.parse(stored));
    }
  }, []);

  if (!resume) return <p className="text-center mt-10">Loading resume...</p>;

  const selectedTemplate = resume.selectedTemplate || "template1";

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "template1":
        return <TemplateOne data={resume} />;
      case "template2":
        return <TemplateTwo data={resume} />;
      default:
        return <TemplateOne data={resume} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      {renderTemplate()}
    </div>
  );
}
