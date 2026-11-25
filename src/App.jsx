import { Routes, Route } from "react-router-dom";
import Background from "./components/Background";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import Project from "./pages/Project";
import Cursor from "./components/Cursor";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";

function App() {

const { dark } = useContext(ThemeContext);


return (

<div
className={`
relative
min-h-screen
overflow-hidden

${dark
?
"bg-[#070b18] text-white"
:
"bg-[#efebe3] text-[#141414]"
}

`}
>


{/* Fond : papier (clair) / aurore (sombre) */}
<Background />



{/* Contenu devant */}
<div
className="
relative
z-10
"
>

<Cursor />

<Loader />

<Routes>
<Route path="/" element={<Home />} />
<Route path="/project/:id" element={<Project />} />
</Routes>

</div>


</div>

)

}
export default App;