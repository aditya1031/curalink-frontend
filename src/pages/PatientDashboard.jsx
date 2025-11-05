import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const sections = [
  "dashboard",
  "experts",
  "trials",
  "publications",
  "forums",
  "favorites",
];

const PatientDashboard = () => {
  const [query, setQuery] = useState("cancer");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ref for AI textarea
  const textareaRef = useRef(null);

  // AI Summary States
  const [symptomsInput, setSymptomsInput] = useState("");
  const [aiSummary, setAiSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);

  const [data, setData] = useState({
    pubmed: [],
    trials: [],
    scholar: [],
    orcid: [],
    researchGate: [],
  });

  const [patient, setPatient] = useState(null);
  const [patientLoading, setPatientLoading] = useState(true);

  // Fetch patient details
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        if (!email) {
          setPatientLoading(false);
          return;
        }

        const res = await axios.get(`https://curalink-server-production.up.railway.app/api/patient/${email}`);
        setPatient(res.data);
      } catch (err) {
        console.error("❌ Patient fetch failed:", err);
      } finally {
        setPatientLoading(false);
      }
    };

    fetchPatient();
  }, []);

  // Fetch all backend data
  const fetchAllData = async (q) => {
    try {
      setLoading(true);

      const [pubmedRes, trialsRes, scholarRes, orcidRes, rgRes] = await Promise.allSettled([
        axios.get(`https://curalink-server-production.up.railway.app/api/patient-data/pubmed?query=${encodeURIComponent(q)}`),
        axios.get(`https://curalink-server-production.up.railway.app/api/patient-data/trials?condition=${encodeURIComponent(q)}`),
        axios.get(`https://curalink-server-production.up.railway.app/api/patient-data/scholar?topic=${encodeURIComponent(q)}`),
        axios.get(`https://curalink-server-production.up.railway.app/api/patient-data/orcid?name=${encodeURIComponent(q)}`),
        axios.get(`https://curalink-server-production.up.railway.app/api/patient-data/researchgate?topic=${encodeURIComponent(q)}`),
      ]);

      setData((prev) => ({
        pubmed: pubmedRes.status === "fulfilled" ? pubmedRes.value.data.results || prev.pubmed : prev.pubmed,
        trials: trialsRes.status === "fulfilled" ? trialsRes.value.data.results || prev.trials : prev.trials,
        scholar: scholarRes.status === "fulfilled" ? scholarRes.value.data || prev.scholar : prev.scholar,
        orcid: orcidRes.status === "fulfilled" ? orcidRes.value.data.result || prev.orcid : prev.orcid,
        researchGate: rgRes.status === "fulfilled" ? rgRes.value.data.results || prev.researchGate : prev.researchGate,
      }));
    } catch (err) {
      console.error("❌ Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData(query);
  }, []);

  // AI Summary generator
  const generateSummary = async () => {
    if (!symptomsInput.trim()) return;

    try {
      setSummaryLoading(true);
      const res = await axios.post("https://curalink-server-production.up.railway.app/api/ai-summary", {
        symptoms: symptomsInput,
      });
      setAiSummary(res.data.summary);
      textareaRef.current?.focus();
    } catch (err) {
      console.error("❌ AI Summary generation failed:", err);
      setAiSummary("OnenAI API not responding try again later ");
    } finally {
      setSummaryLoading(false);
    }
  };

  const addToFavorites = (item) =>
    setFavorites((prev) =>
      prev.find((f) => f.title === item.title) ? prev : [...prev, item]
    );

  const renderList = (items, renderItem) => (
    <div className="space-y-3 text-gray-800">
      {Array.isArray(items) && items.length > 0 ? (
        items.slice(0, 5).map(renderItem)
      ) : (
        <p className="text-gray-500">No data found.</p>
      )}
    </div>
  );

  const handleSectionChange = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const Card = ({ title, color, children }) => (
    <motion.div
      className="rounded-2xl shadow-md p-6 bg-white/90 backdrop-blur-md hover:shadow-lg transition-all border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <h3 className={`font-semibold text-lg mb-3 ${color}`}>{title}</h3>
      {children}
    </motion.div>
  );

  return (
    <div className="flex mt-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen px-6 text-gray-800 pt-10">
      {/* Sidebar */}
      <aside className="w-1/4 sticky top-20 h-fit bg-white/90 backdrop-blur-md shadow-x1 rounded-2xl p-6 mr-8">
        <h2 className="text-xl font-bold text-blue-700 mb-4">👤 Patient Profile</h2>
        {patientLoading ? (
          <p className="text-gray-500">Loading patient data...</p>
        ) : patient ? (
          <div className="space-y-2 text-sm">
            <p><b>Name:</b> {patient.firstName} {patient.lastName}</p>
            <p><b>Age:</b> {patient.age || "N/A"}</p>
            <p><b>Gender:</b> {patient.gender}</p>
            <p><b>Condition:</b> {patient.condition || "N/A"}</p>
            <p><b>Allergies:</b> {patient.allergies || "None"}</p>
          </div>
        ) : (
          <p className="text-gray-500">No patient data found.</p>
        )}
        <button
          onClick={() => alert("Profile editing coming soon...")}
          className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Edit Profile
        </button>

        <div className="mt-8 border-t pt-4 space-y-2">
          <h3 className="font-semibold text-gray-600 mb-2">Sections</h3>
          {sections.map((sec) => (
            <button
              key={sec}
              onClick={() => handleSectionChange(sec)}
              className={`block w-full text-left px-3 py-1.5 rounded-md text-sm transition ${activeSection === sec
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto scroll-smooth space-y-24 pr-10 pb-32">
        {/* Search */}
        <div className="sticky top-0 z-10 bg-white/70 backdrop-blur-md py-3 px-4 rounded-xl shadow mb-5">
          <input
            type="text"
            defaultValue={query}
            placeholder="🔍 Search condition, trial, or paper..."
            onKeyDown={(e) => {
              if (e.key === "Enter") fetchAllData(e.target.value);
            }}
            className="border rounded-lg px-4 py-2 w-full focus:ring focus:ring-blue-200 outline-none"
          />
        </div>

        {/* AI Summarization Dashboard */}
        <section id="dashboard" className="mb-10">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">🤖 AI Summarization Dashboard</h1>
          <p className="text-gray-600 mb-6">
            Enter the patient’s symptoms or condition details below, then generate an AI summary
            of related research, clinical trials, and expert insights.
          </p>

          <Card title="AI Insights Summary" color="text-indigo-600">
            <div className="mb-4 bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-sm text-indigo-700">
              💡 <b>Tip:</b> Describe key patient symptoms in detail. Click <b>Generate Summary</b> when ready.
            </div>

            {/* AI Textarea */}
            <div className="mb-4">
              <textarea
                ref={textareaRef}
                rows={4}
                value={symptomsInput}        // controlled
                onChange={(e) => setSymptomsInput(e.target.value)}
                placeholder="Enter patient symptoms here..."
                className="border rounded-lg px-4 py-2 w-full focus:ring focus:ring-blue-200 outline-none"
              />

            </div>

            <button
              onClick={() => {
                const text = textareaRef.current.value.trim();
                if (text) generateSummary(text); // send the current value
              }}
              disabled={summaryLoading}
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 disabled:opacity-60 transition-all"
            >
              {summaryLoading ? "Generating..." : "✨ Generate Summary"}
            </button>

            {aiSummary && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-6 p-5 bg-indigo-50 border border-indigo-200 rounded-xl shadow-sm"
              >
                <h3 className="font-semibold text-indigo-800 mb-2">🩺 AI-Generated Summary:</h3>
                <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                  {aiSummary}
                </p>
              </motion.div>
            )}
          </Card>
        </section>

        {/* === Experts === */}
        <section id="experts">
          <h1 className="text-2xl font-semibold text-purple-700 mb-4">🧑‍🔬 Experts</h1>
          {loading ? (
            <p>Loading experts...</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              <Card title="ORCID Researchers" color="text-purple-600">
                <div className="max-h-120 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100">
                  {renderList(data.orcid, (r, i) => (
                    <div key={i} className="border-b py-2">
                      <a
                        href={`https://orcid.org/${r.id || r["orcid-identifier"]?.path}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {r.name || r["orcid-identifier"]?.path}
                      </a>
                      {r.biography && (
                        <p className="text-sm text-gray-600 mt-1">{r.biography}</p>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="ResearchGate" color="text-cyan-600">
                {renderList(data.researchGate, (r, i) => (
                  <div key={i} className="border-b py-2">
                    <a
                      href={r.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {r.title}
                    </a>
                    <p className="text-sm text-gray-600">{r.authors}</p>
                  </div>
                ))}
              </Card>
            </div>
          )}
        </section>

        {/* === Trials === */}
        <section id="trials">
          <h1 className="text-2xl font-semibold text-indigo-700 mb-4">🧪 Clinical Trials</h1>
          <Card title="Recent Trials" color="text-indigo-600">
            <button
              onClick={() => fetchAllData(query)}
              className="mb-3 bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition"
            >
              🔄 Refresh
            </button>

            <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
              {Array.isArray(data.trials) && data.trials.length > 0 ? (
                data.trials.map((t, i) => (
                  <div key={i} className="border-b py-2 last:border-none">
                    <p className="font-medium text-gray-900">{t.title || "Untitled Trial"}</p>
                    {t.condition && <p className="text-sm text-gray-600">Condition: {t.condition}</p>}
                    {t.status && <p className="text-sm text-gray-600">Status: {t.status}</p>}
                    {t.location && <p className="text-sm text-gray-600">Location: {t.location}</p>}
                    <a
                      href={t.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 text-sm hover:underline font-medium"
                    >
                      View →
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No trials found.</p>
              )}
            </div>
          </Card>
        </section>

        {/* === Publications === */}
        <section id="publications">
          <h1 className="text-2xl font-semibold text-green-700 mb-4">📘 Publications</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <Card title="PubMed" color="text-blue-600">
              {renderList(data.pubmed, (p, i) => (
                <div key={i} className="border-b py-1">
                  <a href={p.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                    {p.title}
                  </a>
                  <p className="text-sm text-gray-600">{p.journal}</p>
                </div>
              ))}
            </Card>

            <Card title="Google Scholar" color="text-green-600">
              {renderList(data.scholar, (p, i) => (
                <div key={i} className="border-b py-1">
                  <a href={p.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                    {p.title}
                  </a>
                  <p className="text-sm text-gray-600">{p.publication_info?.summary || "No summary"}</p>
                </div>
              ))}
            </Card>
          </div>
        </section>

        {/* === Forums === */}
        <section id="forums">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">Community</h1>
          <Card title="Community Forums" color="text-pink-700">
            <p>Community discussions coming soon...</p>
          </Card>
        </section>

        {/* === Favorites === */}
        <section id="favorites">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">Favorites</h1>
          <Card title="⭐ Favorites" color="text-yellow-600">
            {favorites.length ? (
              <ul className="space-y-1">
                {favorites.map((f, i) => (
                  <li key={i} className="border-b pb-1">
                    {f.title || f.name || "Unnamed Resource"}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No favorites yet.</p>
            )}
          </Card>
        </section>
      </main>
    </div>
  );
};

export default PatientDashboard;
