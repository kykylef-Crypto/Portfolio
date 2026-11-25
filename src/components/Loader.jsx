import {motion} from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";


export default function Loader(){

const { dark } = useContext(ThemeContext);


return(

<motion.div

initial={{
opacity:1
}}

animate={{
opacity:0
}}

transition={{
duration:1,
delay:1
}}

className={`
fixed
inset-0
${dark ? "bg-[#070b18] text-white" : "bg-[#efebe3] text-[#141414]"}
z-50
pointer-events-none
flex
items-center
justify-center
`}

>


<motion.h1

initial={{
scale:0
}}

animate={{
scale:1
}}

className="
text-6xl
font-bold
"

>

Kyllian

</motion.h1>


</motion.div>

)

}