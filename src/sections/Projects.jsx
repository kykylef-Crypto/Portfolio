import {useState} from "react";
import {motion} from "framer-motion";
import projects from "../data/projects";
import {Link} from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Underline } from "../components/Handwritten";


// inclinaisons des polaroïds et de leurs scotchs (mode clair)
const TILTS = [-3, 2, -1.5, 2.5, -2, 1.5];
const TAPES = [4, -6, 3, -3, 6, -4];


export default function Projects(){

const { dark } = useContext(ThemeContext);
const [filter,setFilter]=useState("Tous");
const [selectedImage, setSelectedImage] = useState(null);


const categories=[
"Tous",
"Infographies",
"MotionDesign",
"3D",
"Stages",
"I.A",
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
className="
relative
max-w-6xl
mx-auto
py-32
px-6
overflow-visible
"
>
<div
className={`
absolute
top-20
left-1/2
-translate-x-1/2

w-[500px]
h-[200px]

rounded-full

blur-[100px]

pointer-events-none

${dark
?
"bg-blue-500/30"
:
"bg-blue-400/20"
}

`}
/>
    


<h2 className="
text-5xl
font-bold
mb-12
">

<Underline>Mes projets</Underline>

</h2>

<div className="relative">

<div
className={`
absolute
inset-0
blur-3xl
rounded-full
opacity-40
-translate-y-4
pointer-events-none

${dark
?
"bg-blue-500/30"
:
"bg-blue-400/20"
}

`}
/>

</div>


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

transition-all
duration-300

hover:scale-105


${filter===cat

?

`
bg-blue-500
text-white
border-blue-500
shadow-lg
shadow-blue-500/40
`

:

dark

?

`
text-white
border-white/20
bg-white/5
`

:

`
text-black
border-black/20
bg-black/5
`

}


`}


>

{cat}

</button>

))
}


</div>



<div className={`
grid
md:grid-cols-3
${dark ? "gap-8" : "gap-x-10 gap-y-14 pt-4"}
`}>


{
filtered.map((project, index)=>(

dark
?

(<Link
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
glow-card
relative
bg-white/[0.06]
backdrop-blur-xl
rounded-2xl
overflow-hidden
border
border-white/15
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

</Link>)

:

(

<Link
key={project.id}
to={`/project/${project.id}`}
>

<motion.div

layout

initial={false}

animate={{
rotate: TILTS[index % TILTS.length]
}}

whileHover={{
rotate:0,
y:-8,
scale:1.03
}}

transition={{
type:"spring",
stiffness:200,
damping:18
}}

className="
polaroid
relative
bg-white
p-3
pb-5
shadow-[0_10px_25px_rgba(20,20,20,0.15)]
"

>

{/* morceau de scotch */}
<span
aria-hidden="true"
className="polaroid-tape"
style={{
transform:`translateX(-50%) rotate(${TAPES[index % TAPES.length]}deg)`,
background: index % 2 ? "rgba(20,20,20,.16)" : undefined
}}
/>

<img

src={project.image}

alt={project.title}

className="
w-full
h-60
object-contain
bg-[#f4f1ea]
"

/>

<h3 className="
font-hand
text-4xl
text-[#141414]
mt-4
px-1
">

{project.title}

</h3>

<p className="
text-sm
text-[#555]
mt-2
px-1
">

{project.shortDescription}

</p>

</motion.div>

</Link>

)

))

}


</div>


{
selectedImage && (

<div

className="
fixed
inset-0
z-[999]
bg-black/80
backdrop-blur-sm

flex
items-center
justify-center

p-6
"

onClick={()=>setSelectedImage(null)}

>


<img

src={selectedImage}

className="
max-h-[90vh]
max-w-[90vw]

rounded-2xl

shadow-2xl

object-contain
"

onClick={(e)=>e.stopPropagation()}

/>


<button

className="
absolute
top-8
right-8

text-white
text-4xl

"

onClick={()=>setSelectedImage(null)}

>

×


</button>


</div>

)
}
</section>

)

}