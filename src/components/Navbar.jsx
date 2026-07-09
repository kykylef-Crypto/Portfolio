import { motion } from "framer-motion";
import { useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";


export default function Navbar(){


const {
dark,
setDark
}=useContext(ThemeContext);



return (

<motion.nav

initial={{
y:-100
}}

animate={{
y:0
}}

transition={{
duration:0.8
}}

className="
fixed
top-0
w-full
z-50
backdrop-blur-xl
bg-black/20
border-b
border-white/10
"


>


<div className="
max-w-6xl
mx-auto
px-6
py-5
flex
justify-between
items-center
">


<h1 className="
text-2xl
font-bold
">

Kyllian

</h1>



<div className="
flex
items-center
gap-8
">


<div className="
hidden
md:flex
gap-8
text-gray-300
">


<a href="#about">
À propos
</a>

<a href="#skills">
Compétences
</a>

<a href="#projects">
Projets
</a>

<a href="#contact">
Contact
</a>


</div>



<button

onClick={()=>setDark(!dark)}

className="
text-xl
"

>

{dark ? "☀️" : "🌙"}

</button>


</div>


</div>


</motion.nav>

)

}