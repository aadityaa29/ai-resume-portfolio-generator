require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Groq and Supabase
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

app.get("/", (req, res) => {
  res.send("✅ Resume Generator Backend is running.");
});

app.post("/generate-resume", async (req, res) => {
  try {
    const { personal, jobTarget, skills, education, experience, projects, certifications, languages, extras, userId } = req.body;

    const prompt = `
Generate a professional resume ONLY in well-structured raw JSON format (no markdown, no \`\`\` blocks).

Return strictly and only JSON with this structure:
{
  "summary": "...",
  "skills": [...],
  "experience": [...],
  "education": [...],
  "projects": [...],
  "certifications": [...],
  "languages": [...],
  "extras": {
    "hobbies": "...",
    "publications": "...",
    "volunteering": "...",
    "references": "..."
  },
  "contact": {
    "fullName": "...",
    "email": "...",
    "phone": "...",
    "location": "...",
    "linkedin": "...",
    "github": "...",
    "portfolio": "...",
    "profilePicture": "..."
  }
}

Now, here is the user's data:

Full Name: ${personal.fullName}
Email: ${personal.email}
Phone: ${personal.phone}
Location: ${personal.location}
LinkedIn: ${personal.linkedin}
GitHub: ${personal.github}
Portfolio: ${personal.portfolio}
Profile Picture: ${personal.profilePicture}

Job Title: ${jobTarget.jobTitle}
Experience Level: ${jobTarget.experienceLevel}
Objective: ${jobTarget.objective}

Technical Skills: ${skills.technical}
Soft Skills: ${skills.soft}
Proficiency: ${skills.proficiency}

Education:
${education.map((edu, i) => `Education ${i + 1}: ${edu.degree} at ${edu.institution}, ${edu.location} (${edu.startDate} to ${edu.endDate}), Score: ${edu.score}`).join("\n")}

Experience:
${experience.map((exp, i) => `Experience ${i + 1}: ${exp.title} at ${exp.company}, ${exp.location} (${exp.startDate} to ${exp.endDate}) - ${exp.responsibilities}`).join("\n")}

Projects:
${projects.map((p, i) => `Project ${i + 1}: ${p.title} - ${p.description} (Tech: ${p.techStack}) [${p.link}]`).join("\n")}

Certifications:
${certifications.map((c, i) => `Certificate ${i + 1}: ${c.title} from ${c.org} (${c.date}) - ${c.description}`).join("\n")}

Languages:
${languages.map((l) => `${l.name} (${l.proficiency})`).join(", ")}

Extras:
Hobbies: ${extras.hobbies}
Publications: ${extras.publications}
Volunteering: ${extras.volunteering}
References: ${extras.references}
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

    // ✅ Save to Supabase
    const { error: dbError } = await supabase.from("resumes").insert({
      user_id: userId || "anonymous",
      full_name: personal.fullName || "Unnamed",
      job_title: jobTarget.jobTitle || "",
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
