import React, { useState, useEffect } from "react";
import "./App.scss";
import Home from "./components/Home";
import About from "./components/About";
import Notes from "./components/Notes";
import ErrorBoundary from "./components/ErrorBoundary";
import { messenger, getDataFromStorage, setDataInStorage } from "./utils";

const App = () => {
  const [activePage, setActivePage] = useState("DOMAIN");
  const [activeDomain, setActiveDomain] = useState("others");
  const [absUrl, setAbsUrl] = useState(null);
  const [notes, setNotes] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    messenger({ action: "getURL" }, ({ url = "others", absUrl } = {}) => {
      setActiveDomain(url);
      setAbsUrl(absUrl);
      getDataFromStorage("notes", ({ notes = [] }) => {
        setNotes(notes);
        setTimeout(() => setLoading(false), 500);
      });
    });
  }, []);

  useEffect(() => {
    if (loading && !notes.length) return;

    const _data = {};
    notes.forEach(({ url }) => {
      _data[url] = _data[url] ? _data[url] + 1 : 1;
    });
    setData(_data);
    setDataInStorage("notes", notes);
  }, [notes]);

  const showHomePage = () => {
    setActivePage("HOME");
    setActiveDomain(null);
  };

  const clearNotes = () => {
    setNotes([]);
    setData({});
    setDataInStorage("notes", []);
  };

  const exportNotes = () => {
    try {
      const data = JSON.stringify(notes, undefined, 2);
      const filename = "notebox.json";

      const element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(data)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    } catch (err) {
      console.log("Err:", err);
    }
  };

  const splitNotes = () => {
    const result = {
      notes: [],
      exactNotes: [],
      totalCount: 0,
    };

    notes.forEach((note) => {
      if (note.url === activeDomain) {
        if (note.absUrl && note.absUrl === absUrl) result.exactNotes.push(note);
        else result.notes.push(note);
      }
    });

    result.totalCount = result.notes.length + result.exactNotes.length;
    return result;
  };

  return (
    <ErrorBoundary>
      <div className="container" id="react-ui">
        {activePage === "ABOUT" ? (
          <About setActivePage={setActivePage} />
        ) : activePage === "DOMAIN" ? (
          <Notes
            notesObj={splitNotes()}
            setNotes={setNotes}
            activeDomain={activeDomain}
            absUrl={absUrl}
            showHomePage={showHomePage}
          />
        ) : (
          <Home
            exportNotes={exportNotes}
            data={data}
            setActiveDomain={setActiveDomain}
            setActivePage={setActivePage}
            clearNotes={clearNotes}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;
