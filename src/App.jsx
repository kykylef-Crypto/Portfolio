import { Routes, Route } from "react-router-dom";
import Scene3D from "./components/Scene3D";
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
"bg-[#050816] text-white"
:
"bg-white text-black"
}

`}
>


{/* Fond + sphère 3D derrière */}
<div
className="
absolute
inset-0
z-0
"
>

<Scene3D />

</div>



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