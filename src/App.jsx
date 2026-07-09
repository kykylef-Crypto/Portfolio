import { Routes, Route } from "react-router-dom";

import Scene3D from "./components/Scene3D";
import Loader from "./components/Loader";

import Home from "./pages/Home";
import Project from "./pages/Project";
import Cursor from "./components/Cursor";

function App() {
  return (
    <div className="relative min-h-screen bg-[#050816] text-white overflow-hidden">

      {/* Fond 3D */}
      <Scene3D />

      {/* Contenu du site */}
      <div className="relative z-10">

        <Cursor />

        <Loader />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>

      </div>

    </div>
  );
}

export default App;