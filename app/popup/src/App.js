import React, { useState, useEffect, useRef } from "react";
import { orderBy, toLower, forEach, filter, get, split } from "lodash";
import queryString from "query-string";
import "./App.scss";
import Home from "./components/Home";
import About from "./components/About";
import Notes from "./components/Notes";
import ErrorBoundary from "./components/ErrorBoundary";
import { messenger, getDataFromStorage, setDataInStorage } from "./utils";
import { INITIAL_FILTER_STATE } from "./constants";
import mappings from "../config";
import * as tracking from "./tracking";

const App = () => {
  const originalDomain = useRef();
  const [activePage, _setActivePage] = useState("DOMAIN");
  const [activeDomain, setActiveDomain] = useState("others");
  const [absUrl, setAbsUrl] = useState(null);
  const [notes, setNotes] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(INITIAL_FILTER_STATE);

  const setActivePage = (page) => {
    _setActivePage(page);
    tracking.track("Viewed page", { page });
  };

  useEffect(() => {
    messenger({ action: "getURL" }, ({ url = "others", absUrl } = {}) => {
      setActiveDomain(url);
      originalDomain.current = url;
      setAbsUrl(absUrl);
      getDataFromStorage("notes", ({ notes = [] }) => {
        setNotes(notes);
        setTimeout(() => setLoading(false), 500);
        tracking.init({ totalNotes: notes.length });
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
      tracking.track("Export");
    } catch (err) {
      console.log("Err:", err);
    }
  };

  const splitNotes = () => {
    const result = {
      notes: [],
      exactNotes: [],
      totalCount: 0,
      totalDone: 0,
    };

    forEach(
      filter(
        filter(
          orderBy(notes, filters.sortField, toLower(filters.sortOrder)),
          (note) => note.url === activeDomain
        ),
        (note) => {
          if (filters.search) {
            const regex = new RegExp(filters.search, "gi");
            return regex.test(note.content);
          }
          return true;
        }
      ),
      (note) => {
        if (note.done) result.totalDone++;
        if (note.absUrl && note.absUrl === absUrl) result.exactNotes.push(note);
        else if (mappings[note.url] && note.absUrl) {
          try {
            const requiredParams = get(mappings, [note.url, "queryParams"], []);
            const notesParams = queryString.parse(
              get(split(note.absUrl, "?"), "1")
            );
            const absUrlParams = queryString.parse(
              get(split(absUrl, "?"), "1")
            );

            let matchCount = 0;

            requiredParams.forEach((param) => {
              if (notesParams[param] === absUrlParams[param]) matchCount++;
            });

            matchCount === requiredParams.length
              ? result.exactNotes.push(note)
              : result.notes.push(note);
          } catch (e) {
            result.notes.push(note);
          }
        } else result.notes.push(note);
      }
    );

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
            filters={filters}
            setFilters={setFilters}
          />
        ) : (
          <Home
            exportNotes={exportNotes}
            data={data}
            activeDomain={originalDomain.current}
            setActiveDomain={setActiveDomain}
            setActivePage={setActivePage}
            // clearNotes={clearNotes}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;
