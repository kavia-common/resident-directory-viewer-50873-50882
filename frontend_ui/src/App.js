import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import "./theme/global.css";
import { applyThemeToDocument } from "./theme/theme";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import ResidentList from "./components/ResidentList";
import ResidentDetail from "./components/ResidentDetail";
import Footer from "./components/Footer";
import residentsData from "./data/residents.json";

/**
 * PUBLIC_INTERFACE
 * useQuery
 * A small hook to parse and set query params.
 */
function useQuery() {
  const location = useLocation();
  return useMemo(() => new URLSearchParams(location.search), [location.search]);
}

/**
 * PUBLIC_INTERFACE
 * AppContent
 * Main app content with routing-aware state.
 */
function AppContent() {
  const navigate = useNavigate();
  const query = useQuery();
  const [search, setSearch] = useState(query.get("q") || "");
  const [selectedId, setSelectedId] = useState(query.get("residentId") || "");

  useEffect(() => {
    applyThemeToDocument(document);
  }, []);

  // Sync state to URL when changed
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (selectedId) params.set("residentId", selectedId);
    navigate({ search: params.toString() }, { replace: true });
  }, [search, selectedId, navigate]);

  // Filtered residents by name (case-insensitive)
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return residentsData;
    return residentsData.filter((r) => r.name.toLowerCase().includes(term));
  }, [search]);

  const selectedResident = useMemo(
    () => residentsData.find((r) => String(r.id) === String(selectedId)),
    [selectedId]
  );

  // Responsive: use modal on small screens
  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    const onResize = () => setIsSmall(window.innerWidth < 980);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleSelect = (resident) => {
    setSelectedId(resident?.id || "");
  };

  const handleCloseDetail = () => {
    setSelectedId("");
  };

  return (
    <div className="app-shell">
      <header className="navbar">
        <NavBar title="Resident Directory" />
      </header>

      <main className="main">
        <div className={`container list-layout ${selectedResident && !isSmall ? "with-detail" : ""}`}>
          <section aria-label="Search and results" className="left-col">
            <SearchBar defaultValue={search} onSearch={setSearch} />
            <ResidentList
              residents={filtered}
              selectedId={selectedId}
              onSelect={handleSelect}
              totalCount={residentsData.length}
            />
          </section>
          {!isSmall && selectedResident && (
            <section className="right-col">
              <ResidentDetail
                resident={selectedResident}
                onClose={handleCloseDetail}
                isModal={false}
              />
            </section>
          )}
        </div>

        {isSmall && selectedResident && (
          <ResidentDetail
            resident={selectedResident}
            onClose={handleCloseDetail}
            isModal={true}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * App
 * App entry that wraps AppContent with BrowserRouter
 */
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
