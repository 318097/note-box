import React, { useState, useEffect } from "react";
import "./App.scss";
import Home from "./components/Home";
import About from "./components/About";
import Notes from "./components/Notes";
import { messenger, getDataFromStorage, setDataInStorage } from "./utils";

const App = () => {
  const [activePage, setActivePage] = useState("DOMAIN");
  const [activeDomain, setActiveDomain] = useState("others");
  const [notes, setNotes] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    messenger({ action: "getURL" }, (url = "others") => {
      setActiveDomain(url);
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

  return (
    <div className="container" id="react-ui">
      {activePage === "ABOUT" ? (
        <About setActivePage={setActivePage} />
      ) : activePage === "DOMAIN" ? (
        <Notes
          notes={data[activeDomain] || []}
          setNotes={setNotes}
          activeDomain={activeDomain}
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
