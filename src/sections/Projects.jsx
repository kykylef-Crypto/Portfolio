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


// Ordre d'affichage des catégories (et des boutons de filtre)
const CATEGORY_ORDER = ["Stages", "I.A", "MotionDesign", "Infographies", "3D"];

const CATEGORY_LABELS = {
"MotionDesign":"Motion design",
};

const label = (cat)=> CATEGORY_LABELS[cat] || cat;

// Ordre des projets à l'intérieur de chaque catégorie (par id).
// Pour changer l'ordre, il suffit de déplacer les numéros ici.
const PROJECT_ORDER = [15, 14, 8, 9, 12, 11, 10, 13, 2, 6, 7, 5, 4, 3, 1];

const rank = (p)=>{
const i = PROJECT_ORDER.indexOf(p.id);
return i === -1 ? 999 : i;
};

const sorted = [...projects].sort((a, b)=>
(CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category))
|| (rank(a) - rank(b))
);

const categories = ["Tous", ...CATEGORY_ORDER];

const count = (cat)=>
cat === "Tous"
? projects.length
: projects.filter(p=>p.category===cat).length;


// Sous-parties des stages
const STAGE_GROUPS = [
{
client:"ECCF Normandie",
title:"Stage · ECCF Normandie",
subtitle:"2024 · Community manager"
},
{
client:"Golf de Saint-Lô",
title:"Stage · Golf de Saint-Lô",
subtitle:"2025 · Chargé de communication"
},
];


// Projets découpés en groupes (un titre par groupe)
const groups = [];
let start = 0;

const addGroup = (group)=>{
if(group.items.length === 0) return;
groups.push({ ...group, start });
start += group.items.length;
};

CATEGORY_ORDER
.filter(cat=> filter === "Tous" || filter === cat)
.forEach(cat=>{

const items = sorted.filter(p=>p.category===cat);

if(cat === "Stages"){

STAGE_GROUPS.forEach(g=>addGroup({
key:g.client,
title:g.title,
subtitle:g.subtitle,
items:items.filter(p=>p.client===g.client)
}));

addGroup({
key:"stages-autres",
title:"Stages",
items:items.filter(p=>!STAGE_GROUPS.some(g=>g.client===p.client))
});

}else{

addGroup({ key:cat, title:label(cat), items });

}

});


// Une carte projet (même taille pour toutes)
const renderCard = (project, index)=>{


const tag = project.client
? `Stage · ${project.client}`
: label(project.category);

const tools = project.tools.slice(0, 3);
const moreTools = project.tools.length - tools.length;

return dark

?

(

<Link
key={project.id}
to={`/project/${project.id}`}
className="block h-full"
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
h-full
flex
flex-col
bg-white/[0.06]
rounded-2xl
overflow-hidden
border
border-white/15
"

>

<div className="h-60 bg-black/25 shrink-0">

<img

src={project.image}

alt={project.title}

loading="lazy"

className="
w-full
h-full
object-contain
"

/>

</div>


<div className="p-6 flex flex-col flex-1">

<p className="
text-xs
uppercase
tracking-[0.15em]
text-blue-400
truncate
">
{tag}
</p>

<h3 className="
text-2xl
font-bold
mt-2
leading-tight
line-clamp-2
min-h-[3.75rem]
">

{project.title}

</h3>

<p className="
text-gray-400
mt-3
line-clamp-2
min-h-[3rem]
">

{project.shortDescription}

</p>

<div className="
flex
flex-wrap
gap-2
mt-auto
pt-5
h-[3.25rem]
overflow-hidden
">

{
tools.map(tool=>(

<span

key={tool}

className="
text-sm
bg-white/10
px-3
py-1
rounded-full
whitespace-nowrap
"

>

{tool}

</span>

))
}

{
moreTools > 0 && (

<span className="
text-sm
text-gray-400
px-2
py-1
">
+{moreTools}
</span>

)
}

</div>

</div>

</motion.div>

</Link>

)

:

(

<Link
key={project.id}
to={`/project/${project.id}`}
className="block h-full"
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
h-full
flex
flex-col
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

<div className="h-60 bg-[#f4f1ea] shrink-0">

<img

src={project.image}

alt={project.title}

loading="lazy"

className="
w-full
h-full
object-contain
"

/>

</div>

<p className="
text-xs
uppercase
tracking-[0.15em]
text-[#e2521d]
mt-4
px-1
truncate
">
{tag}
</p>

<h3 className="
font-hand
text-4xl
text-[#141414]
mt-1
px-1
leading-none
line-clamp-2
min-h-[4.5rem]
">

{project.title}

</h3>

<p className="
text-sm
text-[#555]
mt-2
px-1
line-clamp-2
min-h-[2.5rem]
">

{project.shortDescription}

</p>

</motion.div>

</Link>

);


};





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

{label(cat)}
<span className="ml-2 text-xs opacity-60">{count(cat)}</span>

</button>

))
}


</div>



{
groups.map(group=>(

<div
key={group.key}
className="mb-20 last:mb-0"
>

<div className="
flex
items-center
gap-4
mb-8
">

<h3 className="
text-2xl
font-bold
whitespace-nowrap
">
{group.title}
</h3>

{
group.subtitle && (

<span className="
text-gray-400
whitespace-nowrap
hidden
sm:inline
">
{group.subtitle}
</span>

)
}

<span className={`
flex-1
h-px
${dark ? "bg-white/15" : "bg-black/15"}
`} />

</div>


<div className={`
grid
md:grid-cols-3
${dark ? "gap-8" : "gap-x-10 gap-y-14 pt-4"}
`}>

{
group.items.map(project=>renderCard(project, group.start + group.items.indexOf(project)))
}

</div>

</div>

))
}


{
selectedImage && (

<div

className="
fixed
inset-0
z-[999]
bg-black/80

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