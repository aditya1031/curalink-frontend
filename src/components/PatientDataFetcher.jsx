import React, { useState, useEffect } from "react";
import axios from "axios";

const PatientDataFetcher = ({ query = "diabetes" }) => {
  const [data, setData] = useState({
    pubmed: [],
    scholar: [],
    trials: [],
    orcid: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, [query]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [pubmedRes, scholarRes, trialsRes, orcidRes] = await Promise.allSettled([
        axios.get(`/api/patient-data/pubmed?query=${query}`),
        axios.get(`/api/patient-data/scholar?topic=${query}`),
        axios.get(`/api/patient-data/trials?condition=${query}`),
        axios.get(`/api/patient-data/orcid?name=${query}`),
      ]);

      setData({
        pubmed: pubmedRes.value?.data || [],
        scholar: scholarRes.value?.data || [],
        trials: trialsRes.value?.data || [],
        orcid: orcidRes.value?.data?.result || [],
      });
    } catch (err) {
      console.error("⚠️ Data fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center text-gray-500 mt-10">Loading data...</div>;

  return (
    <div className="space-y-12">
      {/* === PubMed === */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-600 mb-3">🔬 PubMed Research</h2>
        {data.pubmed.length ? (
          <ul className="grid gap-4">
            {data.pubmed.slice(0, 5).map((a, i) => (
              <li key={i} className="bg-white p-4 rounded-lg shadow">
                <p className="font-medium">{a.title}</p>
                <p className="text-sm text-gray-600">{a.source}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No PubMed results.</p>
        )}
      </section>

      {/* === Scholar === */}
      <section>
        <h2 className="text-2xl font-semibold text-green-600 mb-3">📘 Google Scholar</h2>
        {data.scholar.length ? (
          <ul className="grid gap-4">
            {data.scholar.slice(0, 5).map((p, i) => (
              <li key={i} className="bg-white p-4 rounded-lg shadow">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-blue-600 hover:underline"
                >
                  {p.title}
                </a>
                <p className="text-sm text-gray-600">{p.publication_info?.summary}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No Scholar data.</p>
        )}
      </section>

      {/* === Clinical Trials === */}
      <section>
        <h2 className="text-2xl font-semibold text-purple-600 mb-3">🧪 Clinical Trials</h2>
        {data.trials.length ? (
          <ul className="grid gap-4">
            {data.trials.slice(0, 5).map((t, i) => (
              <li key={i} className="bg-white p-4 rounded-lg shadow">
                <p className="font-medium">{t.BriefTitle}</p>
                <p className="text-sm text-gray-600">{t.Condition}</p>
                <p className="text-xs text-gray-400">{t.OverallStatus}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No clinical trials found.</p>
        )}
      </section>

      {/* === ORCID === */}
      <section>
        <h2 className="text-2xl font-semibold text-orange-600 mb-3">🧑‍🔬 ORCID Researchers</h2>
        {data.orcid.length ? (
          <ul className="grid gap-4">
            {data.orcid.slice(0, 5).map((r, i) => (
              <li key={i} className="bg-white p-4 rounded-lg shadow">
                <p className="font-medium">{r["orcid-identifier"]?.path}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No ORCID researchers found.</p>
        )}
      </section>
    </div>
  );
};

export default PatientDataFetcher;
