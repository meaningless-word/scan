import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./hoc/AuthProvider.jsx";

import "./App.css";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Authorization from "./components/Authorization/Authorization.jsx";
import RequireAuth from "./hoc/RequireAuth.jsx";
import Search from "./components/Search/Search.jsx";
import Results from "./components/Results/Results.jsx";

function App() {
  const [userTariff, setUserTariff] = useState("");
  const [isSigned, setSigned] = useState(false);
  return (
    <AuthProvider>
      <Header
        setUserTariff={setUserTariff}
        isSigned={isSigned}
        setSigned={setSigned}
      />
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={<Main isSigned={isSigned} userTariff={userTariff} />}
          />
          <Route path="/login" element={<Authorization />} />
          <Route
            path="/search"
            element={
              <RequireAuth>
                <Search />
              </RequireAuth>
            }
          />
          <Route
            path="/results"
            element={
              <RequireAuth>
                <Results />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
      <Footer />
    </AuthProvider>
  );
}

export default App;
