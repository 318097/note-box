import React, { useState, useEffect } from "react";
import "./App.scss";
import Home from "./components/Home";
import About from "./components/About";
import Notes from "./components/Notes";
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
    notes.forEach((note) => {
      const { url } = note;
      if (!_data[url]) _data[url] = [];

      _data[url].push(note);
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

  const splitNotes = () => {
    const result = {
      notes: [],
      exactNotes: [],
      totalCount: 0,
    };

    const list = data[activeDomain] || [];
    list.forEach((item) => {
      if (item.absUrl && item.absUrl === absUrl) result.exactNotes.push(item);
      else result.notes.push(item);
    });

    result.totalCount = result.notes.length + result.exactNotes.length;
    return result;
  };

  return (
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
          data={data}
          setActiveDomain={setActiveDomain}
          setActivePage={setActivePage}
          clearNotes={clearNotes}
        />
      )}
    </div>
  );
};

export default App;
