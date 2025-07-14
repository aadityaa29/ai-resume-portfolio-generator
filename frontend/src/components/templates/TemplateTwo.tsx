// components/templates/TemplateTwo.tsx
export default function TemplateTwo({ data }: { data: any }) {
  return (
    <div id="resume-section" className="bg-gray-100 p-6 rounded-lg border border-gray-300">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold">{data.contact?.fullName}</h1>
        <p className="text-sm">{data.contact?.email} | {data.contact?.phone} | {data.contact?.location}</p>
        <div className="flex justify-center gap-4 mt-1">
          {data.contact?.linkedin && <a href={data.contact.linkedin} className="underline" target="_blank">LinkedIn</a>}
          {data.contact?.github && <a href={data.contact.github} className="underline" target="_blank">GitHub</a>}
          {data.contact?.portfolio && <a href={data.contact.portfolio} className="underline" target="_blank">Portfolio</a>}
        </div>
      </div>

      {data.summary && (
        <section className="mb-5">
          <h2 className="text-lg font-semibold underline">Summary</h2>
          <p className="mt-1">{data.summary}</p>
        </section>
      )}

      {data.skills && (
        <section className="mb-5">
          <h2 className="text-lg font-semibold underline">Skills</h2>
          <p><strong>Technical:</strong> {data.skills.technical}</p>
          <p><strong>Soft:</strong> {data.skills.soft}</p>
          <p><strong>Proficiency:</strong> {data.skills.proficiency}</p>
        </section>
      )}

      {data.experience?.length > 0 && (
        <section className="mb-5">
          <h2 className="text-lg font-semibold underline">Experience</h2>
          {data.experience.map((exp: any, i: number) => (
            <div key={i} className="mb-3">
              <strong>{exp.title}</strong> - {exp.company} ({exp.location})<br />
              <small>{exp.startDate} - {exp.endDate}</small>
              <p>{exp.responsibilities}</p>
            </div>
          ))}
        </section>
      )}

      {data.education?.length > 0 && (
        <section className="mb-5">
          <h2 className="text-lg font-semibold underline">Education</h2>
          {data.education.map((edu: any, i: number) => (
            <div key={i} className="mb-2">
              <strong>{edu.degree}</strong> - {edu.institution}, {edu.location}<br />
              <small>{edu.startDate} - {edu.endDate}</small>
              <p>Score: {edu.score}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
