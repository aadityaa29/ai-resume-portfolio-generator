require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Initialize Supabase with Service Role Key
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // <-- Use service key to bypass RLS
);

// ✅ Initialize Groq
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.get("/", (req, res) => {
  res.send("✅ Resume Generator Backend is running.");
});

app.post("/generate-resume", async (req, res) => {
  try {
    // Destructure all possible fields, providing defaults for arrays/strings
    const {
      personal = {},
      summary = "",
      skills = {},
      education = [],
      experience = [],
      projects = [],
      certifications = [],
      languages = [],
      achievements = [],
      internships = [],
      volunteering = [],
      hobbies = "",
      references = "",
      userId
    } = req.body;

    const prompt = `
You are a professional resume writer and career coach.

Your task:
- Take the raw user input below and automatically rewrite, improve, and professionally enhance the following sections:
    - "summary" (professional summary/objective)
    - "achievements" (make concise and achievement-oriented)
    - "experience" descriptions (make them accomplishment-focused and impactful)
    - "projects" descriptions (make them clear, results-focused, and highlight technologies)
- Use correct grammar, active voice, and industry-appropriate language.
- Do NOT invent experience or skills not provided by the user.
- Keep all other fields as provided, but you may rephrase for clarity and professionalism.

Generate a professional resume ONLY in well-structured raw JSON format (no markdown, no \`\`\` blocks).

Return strictly and only JSON with this structure:
{
  "summary": "string",
  "skills": {
    "technical": [ "string" ],
    "soft": [ "string" ]
  },
  "experience": [
    {
      "title": "string",
      "company": "string",
      "location": "string",
      "startDate": "string",
      "endDate": "string",
      "description": "string",
      "techStack": [ "string" ]
    }
  ],
  "education": [
    {
      "degree": "string",
      "institution": "string",
      "location": "string",
      "startDate": "string",
      "endDate": "string",
      "score": "string"
    }
  ],
  "projects": [
    {
      "title": "string",
      "description": "string",
      "techStack": [ "string" ],
      "link": "string"
    }
  ],
  "certifications": [
    {
      "name": "string",
      "org": "string",
      "date": "string",
      "credentialUrl": "string"
    }
  ],
  "languages": [
    {
      "name": "string",
      "proficiency": "string"
    }
  ],
  "achievements": [
    {
      "title": "string",
      "description": "string",
      "date": "string"
    }
  ],
  "internships": [
    {
      "role": "string",
      "company": "string",
      "duration": "string",
      "contributions": "string"
    }
  ],
  "volunteering": [
    {
      "event": "string",
      "organization": "string",
      "role": "string",
      "impact": "string"
    }
  ],
  "hobbies": "string",
  "references": "string",
  "contact": {
    "fullName": "string",
    "professionalTitle": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "linkedin": "string",
    "github": "string",
    "portfolio": "string",
    "profilePicture": "string"
  }
}

Fill every field, even if empty, and use empty strings or empty arrays where no data is available.

Now, here is the user's raw data:

Full Name: ${personal.fullName || ""}
Professional Title: ${personal.professionalTitle || ""}
Email: ${personal.email || ""}
Phone: ${personal.phone || ""}
Location: ${personal.location || ""}
LinkedIn: ${personal.linkedin || ""}
GitHub: ${personal.github || ""}
Portfolio: ${personal.portfolio || ""}
Profile Picture: ${personal.profilePicture || ""}

Summary / Objective: ${summary}

Technical Skills: ${skills.technical || ""}
Soft Skills: ${skills.soft || ""}

Education:
${education.map((edu, i) => `Education ${i + 1}: ${edu.degree} at ${edu.institution}, ${edu.location} (${edu.startDate} to ${edu.endDate}), Score: ${edu.score}`).join("\n")}

Experience:
${experience.map((exp, i) => `Experience ${i + 1}: ${exp.title} at ${exp.company}, ${exp.location} (${exp.startDate} to ${exp.endDate}) - ${exp.description} (Tech Stack: ${exp.techStack})`).join("\n")}

Projects:
${projects.map((p, i) => `Project ${i + 1}: ${p.title} - ${p.description} (Tech: ${p.techStack}) [${p.link}]`).join("\n")}

Certifications:
${certifications.map((c, i) => `Certificate ${i + 1}: ${c.name} from ${c.org} (${c.date}) - ${c.credentialUrl}`).join("\n")}

Languages:
${languages.map((l) => `${l.name} (${l.proficiency})`).join(", ")}

Achievements:
${achievements.map((a, i) => `Achievement ${i + 1}: ${a.title} - ${a.description} (${a.date})`).join("\n")}

Internships:
${internships.map((intern, i) => `Internship ${i + 1}: ${intern.role} at ${intern.company} (${intern.duration}) - ${intern.contributions}`).join("\n")}

Volunteering:
${volunteering.map((v, i) => `Volunteering ${i + 1}: ${v.event} at ${v.organization} as ${v.role} - ${v.impact}`).join("\n")}

Hobbies: ${hobbies}
References: ${references}
`;


    const response = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [{ role: "user", content: prompt }],
    });

    const rawText = response.choices?.[0]?.message?.content?.trim() || "";
    const jsonStart = rawText.indexOf("{");
    const jsonEnd = rawText.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("JSON block not found in response");
    }

    const cleanJsonString = rawText.slice(jsonStart, jsonEnd + 1).trim();

    let parsed;
    try {
      parsed = JSON.parse(cleanJsonString);
    } catch (err) {
      console.error("❌ Failed to parse JSON:\n", cleanJsonString);
      return res.status(500).json({ error: "❌ Failed to parse response", raw: cleanJsonString });
    }

    // ✅ Save to Supabase with service role
    const { error: dbError } = await supabase.from("resumes").insert({
      user_id: userId || "anonymous",
      full_name: personal.fullName || "Unnamed",
      job_title: personal.professionalTitle || "",
      resume_data: parsed,
    });

    if (dbError) {
      console.error("❌ Supabase error:", dbError.message);
      return res.status(500).json({ error: "❌ Failed to save resume", details: dbError.message });
    }

    res.json({ generated_resume: parsed });
  } catch (err) {
    console.error("❌ API Error:", err.message);
    res.status(500).json({ error: "❌ Resume generation failed", details: err.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
