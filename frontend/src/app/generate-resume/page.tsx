"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ResumeFormPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    personal: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      portfolio: "",
      profilePicture: "",
    },
    jobTarget: {
      jobTitle: "",
      objective: "",
      experienceLevel: "",
    },
    education: [{ degree: "", institution: "", location: "", startDate: "", endDate: "", score: "" }],
    experience: [{ title: "", company: "", location: "", startDate: "", endDate: "", responsibilities: "" }],
    projects: [{ title: "", description: "", techStack: "", link: "" }],
    skills: {
      technical: "",
      soft: "",
      proficiency: "",
    },
    certifications: [{ title: "", org: "", date: "", description: "" }],
    languages: [{ name: "", proficiency: "" }],
    extras: {
      hobbies: "",
      publications: "",
      volunteering: "",
      references: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: any) => {
    const keys = e.target.name.split(".");
    setFormData((prev: any) => {
      const updated = { ...prev };
      let curr = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        curr[keys[i]] = { ...curr[keys[i]] };
        curr = curr[keys[i]];
      }
      curr[keys[keys.length - 1]] = e.target.value;
      return updated;
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "API Error");

      localStorage.setItem("generated_resume", JSON.stringify(data.generated_resume));
      router.push("/resume-view");
    } catch (err: any) {
      setError("❌ Failed to generate resume");
      console.error("❌ API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">AI Resume Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <SectionCard title="Personal Details">
            <Input label="Full Name" name="personal.fullName" onChange={handleChange} />
            <Input label="Email" name="personal.email" onChange={handleChange} />
            <Input label="Phone" name="personal.phone" onChange={handleChange} />
            <Input label="Location" name="personal.location" onChange={handleChange} />
            <Input label="LinkedIn URL" name="personal.linkedin" onChange={handleChange} />
            <Input label="GitHub URL" name="personal.github" onChange={handleChange} />
            <Input label="Portfolio URL" name="personal.portfolio" onChange={handleChange} />
            <Input label="Profile Picture URL" name="personal.profilePicture" onChange={handleChange} />
          </SectionCard>
          <SectionCard title="Job Objective">
            <Input label="Job Title" name="jobTarget.jobTitle" onChange={handleChange} />
            <Textarea label="Objective" name="jobTarget.objective" onChange={handleChange} />
            <Select
              label="Experience Level"
              name="jobTarget.experienceLevel"
              onChange={handleChange}
              options={[
                { value: "", label: "Select Experience Level" },
                { value: "Fresher", label: "Fresher" },
                { value: "Junior", label: "Junior (0-2 years)" },
                { value: "Mid-level", label: "Mid-level (2-5 years)" },
                { value: "Senior", label: "Senior (5+ years)" },
              ]}
            />
          </SectionCard>
        </div>

        <SectionCard title="Skills">
          <Input label="Technical Skills (comma separated)" name="skills.technical" onChange={handleChange} />
          <Input label="Soft Skills (comma separated)" name="skills.soft" onChange={handleChange} />
          <Input label="Proficiency Level" name="skills.proficiency" onChange={handleChange} />
        </SectionCard>

        <SectionCard title="Extras">
          <Input label="Hobbies & Interests" name="extras.hobbies" onChange={handleChange} />
          <Input label="Publications" name="extras.publications" onChange={handleChange} />
          <Input label="Volunteering Experience" name="extras.volunteering" onChange={handleChange} />
          <Input label="References" name="extras.references" onChange={handleChange} />
        </SectionCard>

        <div className="flex justify-center">
          <Button type="submit" className="w-full md:w-1/2 text-lg py-6" disabled={loading}>
            {loading ? "Generating..." : "Generate Resume"}
          </Button>
        </div>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </form>
    </main>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white/90 rounded-xl shadow-lg p-6 border border-gray-100 mb-2">
      <h2 className="text-xl font-bold mb-4 text-primary">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Input({ label, ...props }: { label: string; name: string; onChange: any }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        {...props}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary transition"
      />
    </div>
  );
}

function Textarea({ label, ...props }: { label: string; name: string; onChange: any }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        {...props}
        rows={3}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary transition"
      />
    </div>
  );
}

function Select({
  label,
  options,
  ...props
}: {
  label: string;
  name: string;
  onChange: any;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        {...props}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary transition"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}