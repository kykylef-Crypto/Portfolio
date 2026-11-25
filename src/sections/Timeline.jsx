import {motion} from "framer-motion";
import { Underline } from "../components/Handwritten";


const steps=[

{
year:"2023",
title:"BUT MMI",
text:"Formation Métiers du Multimédia et de l'Internet."
},


{
year:"2026",
title:"Recherche d'emploi",
text:"Chargé de communication, community manager, communication 360°."
}

];



export default function Timeline(){


return(

<section 
className="max-w-6xl mx-auto py-32 px-6"
>


<h2 className="
text-5xl
font-bold
mb-16
">

<Underline>Parcours</Underline>

</h2>



<div className="
border-l
border-white/20
space-y-12
pl-8
">


{
steps.map(step=>(


<motion.div

whileInView={{
opacity:1,
x:0
}}

initial={{
opacity:0,
x:-50
}}

transition={{
duration:.6
}}

key={step.year}

>


<div className="
text-blue-400
font-bold
text-xl
">

{step.year}

</div>


<h3 className="
text-2xl
font-bold
">

{step.title}

</h3>


<p className="
text-gray-400
mt-2
">

{step.text}

</p>


</motion.div>


))

}


</div>


</section>


)

}