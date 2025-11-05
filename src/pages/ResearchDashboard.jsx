import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const sections = ["overview", "papers", "grants", "collaborations", "favorites"];

const ResearchDashboard = () => {
  const [query, setQuery] = useState("oncology");
  const [activeSection, setActiveSection] = useState("overview");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [researcher, setResearcher] = useState(null);
  const [data, setData] = useState({ papers: [], grants: [], collabs: [] });
  const [researcherLoading, setResearcherLoading] = useState(true);

  // ✅ Fetch researcher info
  useEffect(() => {
    const fetchResearcher = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        if (!email) return;
        const res = await axios.get(`http://localhost:5000/api/researcher/${email}`);
        setResearcher(res.data);
      } catch (err) {
        console.error("Researcher fetch failed:", err);
      } finally {
        setResearcherLoading(false);
      }
    };
    fetchResearcher();
  }, []);

  // ✅ Fetch all data (papers, grants, collaborations)
  useEffect(() => {
    fetchAllData(query);
  }, [query]);

  const fetchAllData = async (topic) => {
    setLoading(true);
    try {
      const [papersRes, grantsRes, collabRes] = await Promise.allSettled([
        axios.get(`http://localhost:5000/api/research-data/papers?topic=${encodeURIComponent(topic)}`),
        axios.get(`http://localhost:5000/api/research-data/grants?query=${encodeURIComponent(topic)}`),
        axios.get(`http://localhost:5000/api/research-data/collaborations?query=${encodeURIComponent(topic)}`),
      ]);

      setData({
        papers: papersRes.value?.data?.results || [],
        grants: grantsRes.value?.data?.results || [],
        collabs: collabRes.value?.data?.results || [],
      });
    } catch (err) {
      console.error("Data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (item) =>
    setFavorites((prev) =>
      prev.find((f) => f.title === item.title) ? prev : [...prev, item]
    );

  const handleSectionChange = (sec) => {
    setActiveSection(sec);
    document.getElementById(sec)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const Card = ({ title, color, children }) => (
    <motion.div
      className="rounded-2xl shadow-md p-6 bg-white hover:shadow-xl transition-all"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <h3 className={`font-semibold text-lg mb-3 ${color}`}>{title}</h3>
      <div className="text-gray-800">{children}</div>
    </motion.div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 pt-24 px-8">
      {/* === Sidebar === */}
      <aside className="w-1/4 sticky top-24 self-start h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-lg p-6 border border-blue-100 overflow-y-auto">
        <h2 className="text-xl font-bold text-blue-700 mb-3">👨‍🔬 Researcher Profile</h2>
        {researcherLoading ? (
          <p className="text-gray-500">Loading researcher data...</p>
        ) : researcher ? (
          <div className="space-y-2 text-gray-700 text-sm">
            <p><b>Name:</b> {researcher.firstName} {researcher.lastName}</p>
            <p><b>Field:</b> {researcher.field || "N/A"}</p>
            <p><b>Institution:</b> {researcher.institution || "N/A"}</p>
            <p><b>Specialization:</b> {researcher.specialization || "N/A"}</p>
          </div>
        ) : (
          <p className="text-gray-500">No researcher data found.</p>
        )}

        <div className="mt-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="🔍 Search topic..."
            className="border rounded-lg px-3 py-2 w-full focus:ring focus:ring-blue-200 outline-none"
          />
        </div>

        <div className="mt-8 border-t pt-4 space-y-2">
          <h3 className="font-semibold text-gray-600 mb-2">Sections</h3>
          {sections.map((sec) => (
            <button
              key={sec}
              onClick={() => handleSectionChange(sec)}
              className={`block w-full text-left px-3 py-1.5 rounded-md text-sm transition ${
                activeSection === sec
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </button>
          ))}
        </div>
      </aside>

      {/* === Main Content === */}
      <main className="flex-1 ml-10 overflow-y-auto space-y-20 pb-24 text-gray-800">
        {/* === Overview === */}
        <section id="overview">
          <h1 className="text-3xl font-bold text-blue-700 mb-6">Overview</h1>
          <div className="grid md:grid-cols-3 gap-6">
            <Card title="Welcome" color="text-blue-700">
              <p>
                Welcome, <b>{researcher?.firstName || "Researcher"}</b>. Explore latest
                papers, grants, and collaborations for <b>{query}</b>.
              </p>
            </Card>
            <Card title="Quick Stats" color="text-indigo-600">
              <ul className="text-sm">
                <li>📄 Papers: {data.papers.length}</li>
                <li>💰 Grants: {data.grants.length}</li>
                <li>🤝 Collaborations: {data.collabs.length}</li>
              </ul>
            </Card>
            <Card title="Favorites" color="text-yellow-600">
              <p>{favorites.length} saved items</p>
            </Card>
          </div>
        </section>

        {/* === Papers === */}
        <section id="papers">
          <h1 className="text-2xl font-semibold text-indigo-700 mb-4">📄 Research Papers</h1>
          <Card title="Recent Papers" color="text-indigo-600">
            {loading ? (
              <p>Loading papers...</p>
            ) : data.papers.length ? (
              data.papers.slice(0, 6).map((p, i) => (
                <div key={i} className="border-b border-gray-200 py-2">
                  <a href={p.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                    {p.title}
                  </a>
                  <p className="text-sm text-gray-600">{p.authors || "Unknown authors"}</p>
                  <button
                    onClick={() => addToFavorites(p)}
                    className="text-yellow-500 text-sm hover:underline"
                  >
                    ★ Save
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No papers found.</p>
            )}
          </Card>
        </section>

        {/* === Grants === */}
        <section id="grants">
          <h1 className="text-2xl font-semibold text-purple-700 mb-4">💰 Grants</h1>
          <Card title="Funding Opportunities" color="text-purple-600">
            {loading ? (
  <p>Loading grants...</p>
) : data.grants.length ? (
  data.grants.slice(0, 6).map((g, i) => (
    <div key={i} className="border-b border-gray-200 py-2">
      <p className="font-medium text-gray-800">{g.title}</p>
      <p className="text-sm text-gray-600">
        {g.organization} — {g.agency}
      </p>
      <p className="text-sm text-gray-500">
        PI: {g.pi} | Funding: {g.amount}
      </p>
      <a
        href={g.url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 text-sm hover:underline"
      >
        View →
      </a>
    </div>
  ))
) : (
  <p className="text-gray-500">No grants available.</p>
)}

          </Card>
        </section>

        {/* === Collaborations === */}
        <section id="collaborations">
          <h1 className="text-2xl font-semibold text-green-700 mb-4">🤝 Collaborations</h1>
          <Card title="Partner Researchers" color="text-green-600">
            {loading ? (
              <p>Loading collaborations...</p>
            ) : data.collabs.length ? (
              data.collabs.slice(0, 8).map((c, i) => (
                <div key={i} className="border-b border-gray-200 py-2">
                  <p className="font-semibold text-gray-800">{c.name}</p>
                  <p className="text-sm text-gray-600">{c.institution}</p>
                  <a
                    href={c.profileUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 text-sm hover:underline"
                  >
                    View Profile →
                  </a>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No collaborations found.</p>
            )}
          </Card>
        </section>

        {/* === Favorites === */}
        <section id="favorites">
          <h1 className="text-2xl font-bold text-yellow-600 mb-4">⭐ Favorites</h1>
          <Card title="Saved Items" color="text-yellow-600">
            {favorites.length ? (
              <ul className="space-y-2 text-gray-700 text-sm">
                {favorites.map((f, i) => (
                  <li key={i} className="border-b pb-1">{f.title || f.name || "Unnamed"}</li>
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

export default ResearchDashboard;
