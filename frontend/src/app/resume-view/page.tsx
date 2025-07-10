"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

export default function ResumeViewPage() {
  const [resume, setResume] = useState<any>(null);
  const [html2pdf, setHtml2pdf] = useState<any>(null);

  // 1. Load resume from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("generated_resume");
    if (stored) {
      setResume(JSON.parse(stored));
    }
  }, []);

  // 2. Load html2pdf dynamically (browser only)
  useEffect(() => {
    import("html2pdf.js").then((mod) => {
      setHtml2pdf(mod.default);
    });
  }, []);

  const handleDownload = async () => {
  const element = document.getElementById("resume-section");
  if (!element) return;

  const { default: html2pdfFn } = await import("html2pdf.js");

  html2pdfFn()
    .set({
      margin: 0.5,
      filename: `${resume?.contact?.fullName || "resume"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    })
    .from(element)
    .save();
};

  if (!resume) return <p className="text-center mt-10">Loading resume...</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <div className="flex justify-end mb-4">
        <Button onClick={handleDownload}>Download PDF</Button>
      </div>

      <div id="resume-section" className="bg-white p-10 shadow-lg rounded text-black">
        <h1 className="text-3xl font-bold text-center">{resume.contact?.fullName}</h1>
        <p className="text-center text-sm">{resume.contact?.email} | {resume.contact?.phone} | {resume.contact?.location}</p>
        <p className="text-center text-sm">
          {resume.contact?.linkedin && <a href={resume.contact.linkedin} target="_blank" className="underline">LinkedIn</a>}
          {resume.contact?.github && <a href={resume.contact.github} target="_blank" className="underline ml-1">GitHub</a>}
          {resume.contact?.portfolio && <a href={resume.contact.portfolio} target="_blank" className="underline ml-1">Portfolio</a>}
        </p>

        {/* Resume Sections */}
        {resume.summary && (
          <section className="mt-6">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Summary</h2>
            <p>{resume.summary}</p>
          </section>
        )}

        {resume.skills?.length > 0 && (
          <section className="mt-6">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Skills</h2>
            <ul className="list-disc pl-5">
              {resume.skills.map((s: string, i: number) => <li key={i}>{s}</li>)}
            </ul>
          </section>
        )}

        {resume.experience?.length > 0 && (
          <section className="mt-6">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Experience</h2>
            {resume.experience.map((exp: any, i: number) => (
              <div key={i} className="mb-4">
                <strong>{exp.title}</strong> @ {exp.company} ({exp.location})<br />
                <span className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</span>
                <p>{exp.responsibilities}</p>
              </div>
            ))}
          </section>
        )}

        {resume.education?.length > 0 && (
          <section className="mt-6">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Education</h2>
            {resume.education.map((edu: any, i: number) => (
              <div key={i} className="mb-4">
                <strong>{edu.degree}</strong> - {edu.institution}, {edu.location}<br />
                <span className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</span>
                <p className="text-sm">Score: {edu.score}</p>
              </div>
            ))}
          </section>
        )}

        {resume.certifications?.length > 0 && (
          <section className="mt-6">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Certifications</h2>
            {resume.certifications.map((cert: any, i: number) => (
              <div key={i} className="mb-2">
                <strong>{cert.title}</strong> - {cert.org} ({cert.date})
                <p>{cert.description}</p>
              </div>
            ))}
          </section>
        )}

        {resume.languages?.length > 0 && (
          <section className="mt-6">
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Languages</h2>
            <ul>
              {resume.languages.map((lang: any, i: number) => (
                <li key={i}>{lang.name} - {lang.proficiency}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
