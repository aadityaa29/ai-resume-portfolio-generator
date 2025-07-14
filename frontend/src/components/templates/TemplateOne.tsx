export default function TemplateOne({ data }: { data: any }) {
  return (
    <div
      id="resume-section"
      className="max-w-3xl mx-auto bg-gradient-to-br from-white to-gray-50 p-10 shadow-2xl rounded-3xl text-gray-900 border border-gray-200"
    >
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        {data.contact?.profilePicture && (
          <img
            src={data.contact.profilePicture}
            alt={data.contact.fullName}
            className="w-24 h-24 rounded-full object-cover mb-3 border-4 border-indigo-200 shadow"
          />
        )}
        <h1 className="text-4xl font-extrabold tracking-tight">{data.contact?.fullName || "Your Name"}</h1>
        {data.contact?.professionalTitle && (
          <p className="text-lg text-indigo-600 font-semibold mt-1">{data.contact.professionalTitle}</p>
        )}
        <p className="text-md text-gray-500 mt-2">
          {data.contact?.email} &bull; {data.contact?.phone} &bull; {data.contact?.location}
        </p>
        <div className="flex gap-4 mt-2">
          {data.contact?.linkedin && (
            <a
              href={data.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition underline font-medium"
            >
              LinkedIn
            </a>
          )}
          {data.contact?.github && (
            <a
              href={data.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-black transition underline font-medium"
            >
              GitHub
            </a>
          )}
          {data.contact?.portfolio && (
            <a
              href={data.contact.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 transition underline font-medium"
            >
              Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-blue-700 border-l-4 border-blue-400 pl-3 mb-2">Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Skills */}
      {data.skills && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-green-700 border-l-4 border-green-400 pl-3 mb-2">Skills</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
            {data.skills.technical?.length > 0 && (
              <li>
                <span className="font-semibold text-gray-900">Technical:</span> {Array.isArray(data.skills.technical) ? data.skills.technical.join(", ") : data.skills.technical}
              </li>
            )}
            {data.skills.soft?.length > 0 && (
              <li>
                <span className="font-semibold text-gray-900">Soft:</span> {Array.isArray(data.skills.soft) ? data.skills.soft.join(", ") : data.skills.soft}
              </li>
            )}
          </ul>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-indigo-700 border-l-4 border-indigo-400 pl-3 mb-2">Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp: any, i: number) => (
              <div key={i} className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <strong className="text-md">{exp.title}</strong>
                  <span className="text-sm text-gray-500">{exp.startDate} – {exp.endDate}</span>
                </div>
                <div className="text-gray-800">
                  <span className="font-medium">{exp.company}</span>
                  {exp.location && <span className="text-gray-500"> ({exp.location})</span>}
                </div>
                {exp.techStack && (
                  <div className="text-sm text-gray-500 mt-1">
                    <span className="font-semibold">Tech Stack:</span>{" "}
                    {Array.isArray(exp.techStack) ? exp.techStack.join(", ") : exp.techStack}
                  </div>
                )}
                <p className="mt-2 text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-pink-700 border-l-4 border-pink-400 pl-3 mb-2">Education</h2>
          <div className="space-y-6">
            {data.education.map((edu: any, i: number) => (
              <div key={i} className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <strong className="text-md">{edu.degree}</strong>
                  <span className="text-sm text-gray-500">{edu.startDate} – {edu.endDate}</span>
                </div>
                <div className="text-gray-800">
                  <span className="font-medium">{edu.institution}</span>
                  {edu.location && <span className="text-gray-500">, {edu.location}</span>}
                </div>
                {edu.score && (
                  <p className="mt-1 text-gray-600 text-sm">Score: {edu.score}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-violet-700 border-l-4 border-violet-400 pl-3 mb-2">Projects</h2>
          <div className="space-y-6">
            {data.projects.map((proj: any, i: number) => (
              <div key={i} className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <strong className="text-md">{proj.title}</strong>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 text-sm underline ml-2"
                    >
                      Demo
                    </a>
                  )}
                </div>
                <div className="text-gray-800">{proj.description}</div>
                {proj.techStack && (
                  <div className="text-sm text-gray-500 mt-1">
                    <span className="font-semibold">Tech Stack:</span> {Array.isArray(proj.techStack) ? proj.techStack.join(", ") : proj.techStack}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.certifications?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-orange-700 border-l-4 border-orange-400 pl-3 mb-2">Certifications</h2>
          <div className="space-y-6">
            {data.certifications.map((cert: any, i: number) => (
              <div key={i} className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <strong className="text-md">{cert.name}</strong>
                  <span className="text-sm text-gray-500">{cert.date}</span>
                </div>
                <div className="text-gray-800">{cert.org}</div>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline text-sm"
                  >
                    Credential
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements / Awards */}
      {data.achievements?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-fuchsia-700 border-l-4 border-fuchsia-400 pl-3 mb-2">Achievements / Awards</h2>
          <div className="space-y-6">
            {data.achievements.map((ach: any, i: number) => (
              <div key={i} className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <strong className="text-md">{ach.title}</strong>
                  <span className="text-sm text-gray-500">{ach.date}</span>
                </div>
                <div className="text-gray-800">{ach.description}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Internships */}
      {data.internships?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-amber-700 border-l-4 border-amber-400 pl-3 mb-2">Internships</h2>
          <div className="space-y-6">
            {data.internships.map((intern: any, i: number) => (
              <div key={i} className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <strong className="text-md">{intern.role}</strong>
                  <span className="text-sm text-gray-500">{intern.duration}</span>
                </div>
                <div className="text-gray-800">{intern.company}</div>
                <div className="text-gray-600 mt-1">{intern.contributions}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Volunteering / Extracurricular */}
      {data.volunteering?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-teal-700 border-l-4 border-teal-400 pl-3 mb-2">Volunteering / Extracurricular</h2>
          <div className="space-y-6">
            {data.volunteering.map((vol: any, i: number) => (
              <div key={i} className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <strong className="text-md">{vol.event}</strong>
                  <span className="text-sm text-gray-500">{vol.organization}</span>
                </div>
                <div className="text-gray-800">{vol.role}</div>
                <div className="text-gray-600 mt-1">{vol.impact}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {data.languages?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-emerald-700 border-l-4 border-emerald-400 pl-3 mb-2">Languages</h2>
          <ul className="flex flex-wrap gap-4 text-gray-700">
            {data.languages.map((lang: any, i: number) => (
              <li key={i} className="bg-emerald-50 px-3 py-1 rounded-full shadow text-emerald-900">
                {lang.name} <span className="text-gray-500">({lang.proficiency})</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Hobbies / Interests */}
      {data.hobbies && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-rose-700 border-l-4 border-rose-400 pl-3 mb-2">Hobbies / Interests</h2>
          <p className="text-gray-700">{data.hobbies}</p>
        </section>
      )}

      {/* References */}
      {data.references && (
        <section className="mb-2">
          <h2 className="text-lg font-semibold text-gray-700 border-l-4 border-gray-400 pl-3 mb-2">References</h2>
          <p className="text-gray-700">{data.references}</p>
        </section>
      )}
    </div>
  );
}
