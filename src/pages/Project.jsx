import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import projects from "../data/projects";
import IACollections from "../components/IACollections";



export default function Project(){


const {id}=useParams();


const project =
projects.find(
p=>p.id===Number(id)
);


const [selectedImage,setSelectedImage] = useState(null);


// Échap ferme l'image agrandie
useEffect(()=>{

if(!selectedImage) return;

const onKey = (e)=>{ if(e.key === "Escape") setSelectedImage(null); };

window.addEventListener("keydown", onKey);

return ()=>window.removeEventListener("keydown", onKey);

},[selectedImage]);



return(

<section
id="projects"
className="
relative
z-10
max-w-6xl
mx-auto
py-32
px-6
"
>


<h1 className="
text-6xl
font-bold
">

{project.title}

</h1>



<p className="
text-gray-400
mt-8
text-xl
">

{project.description}

</p>




{
project.localVideos && project.localVideos.length > 0 && (

<div className="
grid
md:grid-cols-2
gap-8
mt-12
items-start
">

{
project.localVideos.map(video=>(

<figure
key={video.src}
className={video.format === "horizontal" ? "md:col-span-2" : ""}
>

<video

className={`
w-full
rounded-2xl
bg-black
object-cover
${video.format === "square" ? "aspect-square" : "aspect-video"}
`}

src={video.src}
poster={video.poster}
controls
playsInline
preload="metadata"

/>

<figcaption className="
text-sm
text-gray-400
mt-3
">
{video.title}
</figcaption>

</figure>

))
}

</div>

)
}


<div className={
project.imagesLayout === "posts"
?
"grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 items-start"
:
"grid md:grid-cols-2 gap-8 mt-12"
}>


{
project.video && (

<div className="mt-10">

<h2 className="
text-3xl
font-bold
mb-6
">
Vidéo
</h2>


<iframe

className="
w-full
aspect-video
rounded-2xl
"

src={
project.video.replace(
"watch?v=",
"embed/"
)
}

allowFullScreen

/>

</div>

)

}


{
project.images.map((img)=>(

<motion.img

key={img}

src={img}

onClick={()=>{
setSelectedImage(img);
}}

whileHover={{
scale:1.05
}}

transition={{
duration:0.3
}}

className="
rounded-xl
cursor-pointer
"

/>

))
}


</div>





{
project.collections && (

<IACollections collections={project.collections} />

)
}


<div className="
flex
gap-3
mt-10
flex-wrap
">

{

project.tools.map(tool=>(

<span

className="
bg-white/10
px-4
py-2
rounded-full
"

key={tool}

>

{tool}

</span>


))

}

</div>





{/* Image agrandie : une seule fenêtre, sans flou (fluide avec le curseur) */}
<AnimatePresence>

{
selectedImage && (

<motion.div

key="lightbox"

initial={{ opacity:0 }}
animate={{ opacity:1 }}
exit={{ opacity:0 }}
transition={{ duration:0.2 }}

onClick={()=>setSelectedImage(null)}

className="
fixed
inset-0
z-[9999]
bg-black/90
flex
items-center
justify-center
p-8
"

>

<motion.img

src={selectedImage}

alt=""

decoding="async"

initial={{ scale:0.95 }}
animate={{ scale:1 }}
exit={{ scale:0.95 }}
transition={{ duration:0.2 }}

onClick={(e)=>e.stopPropagation()}

className="
max-h-[90vh]
max-w-[90vw]
object-contain
rounded-2xl
"

/>

<button

aria-label="Fermer"

onClick={()=>setSelectedImage(null)}

className="
absolute
top-5
right-8
text-white
text-5xl
leading-none
"

>
×
</button>

</motion.div>

)
}

</AnimatePresence>

</section>

)

}