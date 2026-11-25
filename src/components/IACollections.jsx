import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";


/*
  Affiches cliquables (Saison 1, Saison 2, Barrage…).
  Un clic sur une affiche ouvre toutes ses vidéos ; l'adresse prend ?serie=<slug>
  pour que le bouton « retour » du navigateur ramène aux affiches.
*/

export default function IACollections({ collections }){

const [params, setParams] = useSearchParams();
const topRef = useRef(null);

const active = collections.find(c=>c.slug===params.get("serie"));


const open = (slug)=>{
setParams({ serie: slug });
};

const close = ()=>{
setParams({});
};


useEffect(()=>{
if(active && topRef.current){
topRef.current.scrollIntoView({ behavior:"smooth", block:"start" });
}
},[active]);


// Une seule vidéo joue à la fois
const handlePlay = (e)=>{
document.querySelectorAll("video[data-ia]").forEach(v=>{
if(v!==e.target) v.pause();
});
};


return(

<div
ref={topRef}
className="mt-16 scroll-mt-28"
>

<AnimatePresence mode="wait">

{
!active ? (

<motion.div

key="posters"

initial={{ opacity:0, y:20 }}
animate={{ opacity:1, y:0 }}
exit={{ opacity:0, y:-20 }}
transition={{ duration:0.3 }}

className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-8
"

>

{
collections.map(col=>(

<motion.button

key={col.slug}

onClick={()=>open(col.slug)}

whileHover={{ y:-10, scale:1.02 }}

transition={{ type:"spring", stiffness:200 }}

className="
group
relative
aspect-[2/3]
rounded-2xl
overflow-hidden
border
border-white/10
bg-black
text-left
shadow-xl
cursor-pointer
"

>

<img

src={col.cover}

alt={`${col.title} — ${col.subtitle}`}

className="
absolute
inset-0
w-full
h-full
object-cover
transition-transform
duration-500
group-hover:scale-105
"

/>

<div className="
absolute
inset-0
bg-gradient-to-t
from-black
via-black/40
to-transparent
"/>

<div className="
absolute
bottom-0
left-0
right-0
p-6
text-white
">

<p className="
text-xs
uppercase
tracking-[0.2em]
text-red-400
">
{col.label}
</p>

<h3 className="
text-3xl
font-bold
mt-2
">
{col.title}
</h3>

<p className="
text-lg
text-white/80
mt-1
">
{col.subtitle}
</p>

<div className="
flex
items-center
justify-between
mt-4
">

<span className="
text-sm
bg-white/15
px-3
py-1
rounded-full
">
{col.count}
</span>

<span className="
text-sm
font-semibold
opacity-70
group-hover:opacity-100
transition-opacity
">
Voir les vidéos →
</span>

</div>

</div>

</motion.button>

))
}

</motion.div>

) : (

<motion.div

key={active.slug}

initial={{ opacity:0, y:20 }}
animate={{ opacity:1, y:0 }}
exit={{ opacity:0, y:-20 }}
transition={{ duration:0.3 }}

>

<button

onClick={close}

className="
px-5
py-2
rounded-full
border
border-blue-500
text-blue-500
hover:bg-blue-500
hover:text-white
transition-all
duration-300
"

>
← Toutes les vidéos I.A
</button>


<div className="mt-8">

<p className="
text-xs
uppercase
tracking-[0.2em]
text-red-400
">
{active.label} · {active.count}
</p>

<h2 className="
text-4xl
font-bold
mt-2
">
{active.title}
<span className="text-gray-400 font-normal"> — {active.subtitle}</span>
</h2>

<p className="
text-gray-400
mt-4
text-lg
">
{active.description}
</p>

</div>


{
active.sections.map((section, i)=>(

<div
key={section.title || i}
className="mt-12"
>

{
section.title && (

<h3 className="
text-2xl
font-bold
">
{section.title}
</h3>

)
}

{
section.note && (

<p className="
text-gray-400
mt-1
">
{section.note}
</p>

)
}

<div className={`
grid
gap-6
mt-6

${active.format==="vertical"
?
"grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
:
"grid-cols-1"
}
`}>

{
section.videos.map(video=>(

<figure key={video.src}>

<video

data-ia

className={`
w-full
rounded-2xl
bg-black
object-cover

${active.format==="vertical"
?
"aspect-[9/16]"
:
"aspect-video"
}
`}

src={video.src}
poster={video.poster}
controls
playsInline
preload="none"
onPlay={handlePlay}

/>

<figcaption className="
text-sm
text-gray-400
mt-2
">
{video.title}
</figcaption>

</figure>

))
}

</div>

</div>

))
}


<button

onClick={close}

className="
mt-12
px-5
py-2
rounded-full
border
border-blue-500
text-blue-500
hover:bg-blue-500
hover:text-white
transition-all
duration-300
"

>
← Toutes les vidéos I.A
</button>

</motion.div>

)
}

</AnimatePresence>

</div>

)

}
