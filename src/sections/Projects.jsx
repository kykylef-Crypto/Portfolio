import {useState} from "react";
import {motion} from "framer-motion";

import projects from "../data/projects";
import {Link} from "react-router-dom";


export default function Projects(){


const [filter,setFilter]=useState("Tous");


const categories=[
"Tous",
"Infographies",
"MotionDesign",
"3D",
"Stages",
];


const filtered =
filter==="Tous"
?
projects
:
projects.filter(
p=>p.category===filter
);


return(

<section
id="projects"
className="max-w-6xl mx-auto py-32 px-6"
>


<h2 className="
text-5xl
font-bold
mb-12
">

Mes projets

</h2>



<div className="
flex
gap-4
mb-12
flex-wrap
">


{
categories.map(cat=>(

<button

key={cat}

onClick={()=>setFilter(cat)}

className={`
px-6
py-2
rounded-full
border
border-white/20
transition-all
duration-300
hover:scale-105

${
filter === cat
? 
"bg-blue-500 text-white shadow-lg shadow-blue-500/40"
:
"bg-white/5 text-white/70 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:via-purple-500 hover:to-pink-500 hover:bg-clip-text hover:shadow-lg hover:shadow-purple-500/30"
}

`}

>

{cat}

</button>

))
}


</div>



<div className="
grid
md:grid-cols-3
gap-8
">


{
filtered.map(project=>(

<Link
key={project.id}
to={`/project/${project.id}`}
>

<motion.div

layout

whileHover={{
y:-10,
rotateX:5,
rotateY:-5
}}

transition={{
type:"spring",
stiffness:200
}}

className="
bg-white/5
rounded-2xl
overflow-hidden
border
border-white/10
"

>


<img

src={project.image}

alt={project.title}

className="
w-full
h-60
object-contain
"

/>



<div className="p-6">


<h3 className="
text-2xl
font-bold
">

{project.title}

</h3>



<p className="
text-gray-400
mt-4
">

{project.shortDescription}

</p>



<div className="
flex
flex-wrap
gap-2
mt-5
">

{

project.tools.map(tool=>(

<span

key={tool}

className="
text-sm
bg-white/10
px-3
py-1
rounded-full
"

>

{tool}

</span>

))

}

</div>


</div>


</motion.div>

</Link>


))

}


</div>



</section>

)

}