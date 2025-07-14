"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import TemplateSelector from "@/components/templates/TemplateSelector";
import {
  FaUserTie,
  FaGraduationCap,
  FaCode,
  FaBriefcase,
  FaCertificate,
  FaTrophy,
  FaLanguage,
  FaHandsHelping,
  FaHeart,
  FaProjectDiagram,
  FaAward,
  FaUserFriends,
} from "react-icons/fa";
import {
  MdWork,
  MdVolunteerActivism,
  MdOutlineSummarize,
} from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";

const sectionIcons: Record<string, React.JSX.Element> = {
  "Personal Details": (
    <FaUserTie className="inline-block mr-2 text-indigo-500" />
  ),
  "Summary / Objective": (
    <MdOutlineSummarize className="inline-block mr-2 text-pink-500" />
  ),
  Skills: <FaCode className="inline-block mr-2 text-green-500" />,
  "Work Experience": (
    <FaBriefcase className="inline-block mr-2 text-yellow-500" />
  ),
  Education: <FaGraduationCap className="inline-block mr-2 text-blue-500" />,
  Projects: <FaProjectDiagram className="inline-block mr-2 text-violet-500" />,
  Certifications: (
    <FaCertificate className="inline-block mr-2 text-orange-500" />
  ),
  Languages: <FaLanguage className="inline-block mr-2 text-emerald-500" />,
  "Achievements / Awards": (
    <FaAward className="inline-block mr-2 text-fuchsia-500" />
  ),
  Internships: <MdWork className="inline-block mr-2 text-amber-500" />,
  "Volunteering / Extracurricular": (
    <MdVolunteerActivism className="inline-block mr-2 text-teal-500" />
  ),
  "Hobbies / Interests": (
    <FaHeart className="inline-block mr-2 text-rose-500" />
  ),
  References: (
    <BsFillPersonLinesFill className="inline-block mr-2 text-gray-500" />
  ),
};

const sections = [
  "Personal Details",
  "Summary / Objective",
  "Skills",
  "Work Experience",
  "Education",
  "Projects",
  "Certifications",
  "Languages",
  "Achievements / Awards",
  "Internships",
  "Volunteering / Extracurricular",
  "Hobbies / Interests",
  "References",
];

export default function ResumeFormPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    personal: {
      fullName: "",
      professionalTitle: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      portfolio: "",
      profilePicture: "",
    },
    summary: "",
    skills: {
      technical: "",
      soft: "",
    },
    experience: [
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        techStack: "",
      },
    ],
    education: [
      {
        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
        score: "",
      },
    ],
    projects: [
      {
        title: "",
        description: "",
        techStack: "",
        link: "",
      },
    ],
    certifications: [
      {
        name: "",
        org: "",
        date: "",
        credentialUrl: "",
      },
    ],
    languages: [
      {
        name: "",
        proficiency: "",
      },
    ],
    achievements: [
      {
        title: "",
        description: "",
        date: "",
      },
    ],
    internships: [
      {
        role: "",
        company: "",
        duration: "",
        contributions: "",
      },
    ],
    volunteering: [
      {
        event: "",
        organization: "",
        role: "",
        impact: "",
      },
    ],
    hobbies: "",
    references: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [currentSection, setCurrentSection] = useState(0);

  // Helper for handling nested changes
  const handleChange = (e: any) => {
    const keys = e.target.name.split(".");
    setFormData((prev: any) => {
      const updated = { ...prev };
      let curr = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        if (Array.isArray(curr[keys[i]])) {
          const idx = parseInt(keys[i + 1]);
          curr[keys[i]] = [...curr[keys[i]]];
          curr = curr[keys[i]];
          i++;
          curr[idx] = { ...curr[idx] };
          curr = curr[idx];
        } else {
          curr[keys[i]] = { ...curr[keys[i]] };
          curr = curr[keys[i]];
        }
      }
      curr[keys[keys.length - 1]] = e.target.value;
      return updated;
    });
  };

  // Helpers for dynamic array fields
  const handleAdd = (section: string) => {
    setFormData((prev: any) => {
      const updated = { ...prev };
      switch (section) {
        case "experience":
          updated.experience.push({
            title: "",
            company: "",
            location: "",
            startDate: "",
            endDate: "",
            description: "",
            techStack: "",
          });
          break;
        case "education":
          updated.education.push({
            degree: "",
            institution: "",
            location: "",
            startDate: "",
            endDate: "",
            score: "",
          });
          break;
        case "projects":
          updated.projects.push({
            title: "",
            description: "",
            techStack: "",
            link: "",
          });
          break;
        case "certifications":
          updated.certifications.push({
            name: "",
            org: "",
            date: "",
            credentialUrl: "",
          });
          break;
        case "languages":
          updated.languages.push({
            name: "",
            proficiency: "",
          });
          break;
        case "achievements":
          updated.achievements.push({
            title: "",
            description: "",
            date: "",
          });
          break;
        case "internships":
          updated.internships.push({
            role: "",
            company: "",
            duration: "",
            contributions: "",
          });
          break;
        case "volunteering":
          updated.volunteering.push({
            event: "",
            organization: "",
            role: "",
            impact: "",
          });
          break;
      }
      return updated;
    });
  };

  const handleRemove = (section: string, idx: number) => {
    setFormData((prev: any) => {
      const updated = { ...prev };
      updated[section] = updated[section].filter(
        (_: any, i: number) => i !== idx
      );
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
        body: JSON.stringify({ ...formData, selectedTemplate }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "API Error");

      localStorage.setItem(
        "generated_resume",
        JSON.stringify({ ...data.generated_resume, selectedTemplate })
      );

      router.push("/resume-view");
    } catch (err: any) {
      setError("❌ Failed to generate resume");
      console.error("❌ API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Progress bar calculation
  const progress = Math.round(((currentSection + 1) / sections.length) * 100);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-200 via-pink-100 to-blue-100 px-2 py-8 md:px-0">
      <div className="max-w-3xl mx-auto relative">
        {/* Progress Bar */}
        <div className="sticky top-0 z-10 mb-8">
          <div className="w-full bg-white/40 rounded-full h-4 shadow-inner backdrop-blur-lg border border-indigo-100">
            <div
              className="h-4 rounded-full bg-gradient-to-r from-indigo-500 via-pink-400 to-purple-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs font-semibold mt-1 px-1 text-indigo-600">
            <span>
              {sectionIcons[sections[currentSection]]}
              {sections[currentSection]}
            </span>
            <span>{progress}%</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8" autoComplete="off">
          {/* Section Navigation */}
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {sections.map((sec, idx) => (
              <button
                key={sec}
                type="button"
                onClick={() => setCurrentSection(idx)}
                className={`px-3 py-1 rounded-full font-medium transition-all duration-200
                  ${
                    idx === currentSection
                      ? "bg-gradient-to-r from-indigo-500 to-pink-400 text-white shadow-lg scale-105"
                      : "bg-white/70 text-indigo-700 hover:bg-indigo-100"
                  }`}
              >
                {sectionIcons[sec]}
                <span className="hidden md:inline">{sec}</span>
              </button>
            ))}
          </div>

          {/* Section Cards */}
          <div className="relative">
            {/* Only render the current section */}
            {currentSection === 0 && (
              <GlassCard
                title="Personal Details"
                icon={sectionIcons["Personal Details"]}
              >
                <Input
                  label="Full Name"
                  name="personal.fullName"
                  value={formData.personal.fullName}
                  onChange={handleChange}
                />
                <Input
                  label="Professional Title"
                  name="personal.professionalTitle"
                  value={formData.personal.professionalTitle}
                  onChange={handleChange}
                />
                <Input
                  label="Email"
                  name="personal.email"
                  value={formData.personal.email}
                  onChange={handleChange}
                />
                <Input
                  label="Phone"
                  name="personal.phone"
                  value={formData.personal.phone}
                  onChange={handleChange}
                />
                <Input
                  label="Location (City, Country)"
                  name="personal.location"
                  value={formData.personal.location}
                  onChange={handleChange}
                />
                <Input
                  label="LinkedIn"
                  name="personal.linkedin"
                  value={formData.personal.linkedin}
                  onChange={handleChange}
                />
                <Input
                  label="GitHub"
                  name="personal.github"
                  value={formData.personal.github}
                  onChange={handleChange}
                />
                <Input
                  label="Portfolio/Website"
                  name="personal.portfolio"
                  value={formData.personal.portfolio}
                  onChange={handleChange}
                />
                <Input
                  label="Profile Picture URL"
                  name="personal.profilePicture"
                  value={formData.personal.profilePicture}
                  onChange={handleChange}
                />
              </GlassCard>
            )}

            {currentSection === 1 && (
              <GlassCard
                title="Summary / Objective"
                icon={sectionIcons["Summary / Objective"]}
              >
                <Textarea
                  label="Write a short career summary or objective (2–4 lines)"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                />
              </GlassCard>
            )}

            {currentSection === 2 && (
              <GlassCard title="Skills" icon={sectionIcons["Skills"]}>
                <Input
                  label="Technical Skills (comma separated)"
                  name="skills.technical"
                  value={formData.skills.technical}
                  onChange={handleChange}
                />
                <Input
                  label="Soft Skills (comma separated)"
                  name="skills.soft"
                  value={formData.skills.soft}
                  onChange={handleChange}
                />
              </GlassCard>
            )}

            {currentSection === 3 && (
              <GlassCard
                title="Work Experience"
                icon={sectionIcons["Work Experience"]}
              >
                {formData.experience.map((exp, i) => (
                  <div key={i} className="mb-4 border-b border-indigo-100 pb-4">
                    <Input
                      label="Job Title"
                      name={`experience.${i}.title`}
                      value={exp.title}
                      onChange={handleChange}
                    />
                    <Input
                      label="Company"
                      name={`experience.${i}.company`}
                      value={exp.company}
                      onChange={handleChange}
                    />
                    <Input
                      label="Location"
                      name={`experience.${i}.location`}
                      value={exp.location}
                      onChange={handleChange}
                    />
                    <Input
                      label="Start Date"
                      name={`experience.${i}.startDate`}
                      value={exp.startDate}
                      onChange={handleChange}
                      type="month"
                    />
                    <Input
                      label="End Date"
                      name={`experience.${i}.endDate`}
                      value={exp.endDate}
                      onChange={handleChange}
                      type="month"
                    />
                    <Textarea
                      label="Description (Achievements, Responsibilities)"
                      name={`experience.${i}.description`}
                      value={exp.description}
                      onChange={handleChange}
                    />
                    <Input
                      label="Tech Stack Used"
                      name={`experience.${i}.techStack`}
                      value={exp.techStack}
                      onChange={handleChange}
                    />
                    {formData.experience.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemove("experience", i)}
                        className="text-xs text-red-500 hover:underline mt-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => handleAdd("experience")}
                  className="mt-2 bg-pink-200 text-pink-700"
                >
                  + Add Experience
                </Button>
              </GlassCard>
            )}

            {currentSection === 4 && (
              <GlassCard title="Education" icon={sectionIcons["Education"]}>
                {formData.education.map((edu, i) => (
                  <div key={i} className="mb-4 border-b border-indigo-100 pb-4">
                    <Input
                      label="Degree"
                      name={`education.${i}.degree`}
                      value={edu.degree}
                      onChange={handleChange}
                    />
                    <Input
                      label="Institution"
                      name={`education.${i}.institution`}
                      value={edu.institution}
                      onChange={handleChange}
                    />
                    <Input
                      label="Location"
                      name={`education.${i}.location`}
                      value={edu.location}
                      onChange={handleChange}
                    />
                    <Input
                      label="Start Date"
                      name={`education.${i}.startDate`}
                      value={edu.startDate}
                      onChange={handleChange}
                      type="month"
                    />
                    <Input
                      label="End Date"
                      name={`education.${i}.endDate`}
                      value={edu.endDate}
                      onChange={handleChange}
                      type="month"
                    />
                    <Input
                      label="Grade/CGPA"
                      name={`education.${i}.score`}
                      value={edu.score}
                      onChange={handleChange}
                    />
                    {formData.education.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemove("education", i)}
                        className="text-xs text-red-500 hover:underline mt-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => handleAdd("education")}
                  className="mt-2 bg-blue-200 text-blue-700"
                >
                  + Add Education
                </Button>
              </GlassCard>
            )}

            {currentSection === 5 && (
              <GlassCard title="Projects" icon={sectionIcons["Projects"]}>
                {formData.projects.map((proj, i) => (
                  <div key={i} className="mb-4 border-b border-indigo-100 pb-4">
                    <Input
                      label="Project Title"
                      name={`projects.${i}.title`}
                      value={proj.title}
                      onChange={handleChange}
                    />
                    <Textarea
                      label="Description (What it does, your role)"
                      name={`projects.${i}.description`}
                      value={proj.description}
                      onChange={handleChange}
                    />
                    <Input
                      label="Tech Stack Used"
                      name={`projects.${i}.techStack`}
                      value={proj.techStack}
                      onChange={handleChange}
                    />
                    <Input
                      label="GitHub/Live Demo Link"
                      name={`projects.${i}.link`}
                      value={proj.link}
                      onChange={handleChange}
                    />
                    {formData.projects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemove("projects", i)}
                        className="text-xs text-red-500 hover:underline mt-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => handleAdd("projects")}
                  className="mt-2 bg-violet-200 text-violet-700"
                >
                  + Add Project
                </Button>
              </GlassCard>
            )}

            {currentSection === 6 && (
              <GlassCard
                title="Certifications"
                icon={sectionIcons["Certifications"]}
              >
                {formData.certifications.map((cert, i) => (
                  <div key={i} className="mb-4 border-b border-indigo-100 pb-4">
                    <Input
                      label="Certification Name"
                      name={`certifications.${i}.name`}
                      value={cert.name}
                      onChange={handleChange}
                    />
                    <Input
                      label="Issuing Organization"
                      name={`certifications.${i}.org`}
                      value={cert.org}
                      onChange={handleChange}
                    />
                    <Input
                      label="Date of Completion"
                      name={`certifications.${i}.date`}
                      value={cert.date}
                      onChange={handleChange}
                      type="month"
                    />
                    <Input
                      label="Credential URL"
                      name={`certifications.${i}.credentialUrl`}
                      value={cert.credentialUrl}
                      onChange={handleChange}
                    />
                    {formData.certifications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemove("certifications", i)}
                        className="text-xs text-red-500 hover:underline mt-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => handleAdd("certifications")}
                  className="mt-2 bg-orange-200 text-orange-700"
                >
                  + Add Certification
                </Button>
              </GlassCard>
            )}

            {currentSection === 7 && (
              <GlassCard title="Languages" icon={sectionIcons["Languages"]}>
                {formData.languages.map((lang, i) => (
                  <div key={i} className="mb-4 border-b border-indigo-100 pb-4">
                    <Input
                      label="Language"
                      name={`languages.${i}.name`}
                      value={lang.name}
                      onChange={handleChange}
                    />
                    <Input
                      label="Proficiency (e.g., Fluent)"
                      name={`languages.${i}.proficiency`}
                      value={lang.proficiency}
                      onChange={handleChange}
                    />
                    {formData.languages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemove("languages", i)}
                        className="text-xs text-red-500 hover:underline mt-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => handleAdd("languages")}
                  className="mt-2 bg-emerald-200 text-emerald-700"
                >
                  + Add Language
                </Button>
              </GlassCard>
            )}

            {currentSection === 8 && (
              <GlassCard
                title="Achievements / Awards"
                icon={sectionIcons["Achievements / Awards"]}
              >
                {formData.achievements.map((ach, i) => (
                  <div key={i} className="mb-4 border-b border-indigo-100 pb-4">
                    <Input
                      label="Title"
                      name={`achievements.${i}.title`}
                      value={ach.title}
                      onChange={handleChange}
                    />
                    <Textarea
                      label="Description"
                      name={`achievements.${i}.description`}
                      value={ach.description}
                      onChange={handleChange}
                    />
                    <Input
                      label="Date"
                      name={`achievements.${i}.date`}
                      value={ach.date}
                      onChange={handleChange}
                      type="month"
                    />
                    {formData.achievements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemove("achievements", i)}
                        className="text-xs text-red-500 hover:underline mt-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => handleAdd("achievements")}
                  className="mt-2 bg-fuchsia-200 text-fuchsia-700"
                >
                  + Add Achievement
                </Button>
              </GlassCard>
            )}

            {currentSection === 9 && (
              <GlassCard title="Internships" icon={sectionIcons["Internships"]}>
                {formData.internships.map((intern, i) => (
                  <div key={i} className="mb-4 border-b border-indigo-100 pb-4">
                    <Input
                      label="Role"
                      name={`internships.${i}.role`}
                      value={intern.role}
                      onChange={handleChange}
                    />
                    <Input
                      label="Company"
                      name={`internships.${i}.company`}
                      value={intern.company}
                      onChange={handleChange}
                    />
                    <Input
                      label="Duration"
                      name={`internships.${i}.duration`}
                      value={intern.duration}
                      onChange={handleChange}
                    />
                    <Textarea
                      label="Key Learnings / Contributions"
                      name={`internships.${i}.contributions`}
                      value={intern.contributions}
                      onChange={handleChange}
                    />
                    {formData.internships.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemove("internships", i)}
                        className="text-xs text-red-500 hover:underline mt-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => handleAdd("internships")}
                  className="mt-2 bg-amber-200 text-amber-700"
                >
                  + Add Internship
                </Button>
              </GlassCard>
            )}

            {currentSection === 10 && (
              <GlassCard
                title="Volunteering / Extracurricular"
                icon={sectionIcons["Volunteering / Extracurricular"]}
              >
                {formData.volunteering.map((vol, i) => (
                  <div key={i} className="mb-4 border-b border-indigo-100 pb-4">
                    <Input
                      label="Event/Organization"
                      name={`volunteering.${i}.event`}
                      value={vol.event}
                      onChange={handleChange}
                    />
                    <Input
                      label="Role"
                      name={`volunteering.${i}.role`}
                      value={vol.role}
                      onChange={handleChange}
                    />
                    <Input
                      label="Organization"
                      name={`volunteering.${i}.organization`}
                      value={vol.organization}
                      onChange={handleChange}
                    />
                    <Textarea
                      label="Impact"
                      name={`volunteering.${i}.impact`}
                      value={vol.impact}
                      onChange={handleChange}
                    />
                    {formData.volunteering.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemove("volunteering", i)}
                        className="text-xs text-red-500 hover:underline mt-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => handleAdd("volunteering")}
                  className="mt-2 bg-teal-200 text-teal-700"
                >
                  + Add Volunteering
                </Button>
              </GlassCard>
            )}

            {currentSection === 11 && (
              <GlassCard
                title="Hobbies / Interests"
                icon={sectionIcons["Hobbies / Interests"]}
              >
                <Textarea
                  label="List your hobbies or interests (optional)"
                  name="hobbies"
                  value={formData.hobbies}
                  onChange={handleChange}
                />
              </GlassCard>
            )}

            {currentSection === 12 && (
              <GlassCard title="References" icon={sectionIcons["References"]}>
                <Textarea
                  label='References (e.g., "Available on request" or list referees)'
                  name="references"
                  value={formData.references}
                  onChange={handleChange}
                />
              </GlassCard>
            )}
          </div>

          {/* Navigation Buttons - show above template selector unless on last section */}
          {currentSection < sections.length - 1 && (
            <NavigationButtons
              currentSection={currentSection}
              setCurrentSection={setCurrentSection}
              sections={sections}
              loading={loading}
            />
          )}

          <GlassCard
            title="Choose a Template"
            icon={<FaUserFriends className="inline-block mr-2 text-cyan-500" />}
          >
            <TemplateSelector
              selected={selectedTemplate}
              setSelected={setSelectedTemplate}
            />
          </GlassCard>

          {/* Navigation Buttons - show below template selector only on last section */}
          {currentSection === sections.length - 1 && (
            <NavigationButtons
              currentSection={currentSection}
              setCurrentSection={setCurrentSection}
              sections={sections}
              loading={loading}
            />
          )}

          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        </form>
      </div>
    </main>
  );
}

function NavigationButtons({
  currentSection,
  setCurrentSection,
  sections,
  loading,
}: {
  currentSection: number;
  setCurrentSection: React.Dispatch<React.SetStateAction<number>>;
  sections: string[];
  loading: boolean;
}) {
  return (
    <div className="flex justify-between items-center gap-2 mt-4">
      <Button
        type="button"
        className="bg-white/70 text-indigo-700 border border-indigo-200 shadow hover:bg-indigo-100"
        disabled={currentSection === 0}
        onClick={() => setCurrentSection((s) => Math.max(0, s - 1))}
      >
        Previous
      </Button>
      {currentSection < sections.length - 1 ? (
        <Button
          type="button"
          className="bg-gradient-to-r from-indigo-500 to-pink-400 text-white shadow-lg"
          onClick={() =>
            setCurrentSection((s) => Math.min(sections.length - 1, s + 1))
          }
        >
          Next
        </Button>
      ) : (
        <Button
          type="submit"
          className="bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-700 hover:to-purple-600 text-white rounded-xl shadow-xl text-lg py-5 w-[85%]"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Resume"}
        </Button>
      )}
    </div>
  );
}

// Glassmorphism Card
function GlassCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.JSX.Element;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white/60 rounded-2xl shadow-2xl p-6 border border-white/40 backdrop-blur-lg mb-4 transition-all duration-300">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 tracking-tight">
        {icon} <span>{title}</span>
      </h2>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}

// Input
function Input({
  label,
  ...props
}: {
  label: string;
  name: string;
  value: any;
  onChange: any;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-indigo-800 mb-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full p-3 border border-indigo-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/80"
      />
    </div>
  );
}

// Textarea
function Textarea({
  label,
  ...props
}: {
  label: string;
  name: string;
  value: any;
  onChange: any;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-indigo-800 mb-1">
        {label}
      </label>
      <textarea
        {...props}
        rows={3}
        className="w-full p-3 border border-indigo-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/80"
      />
    </div>
  );
}
