import { useParams } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import projects from "../data/projects";



export default function Project(){


const {id}=useParams();


const project =
projects.find(
p=>p.id===Number(id)
);


const [selectedImage,setSelectedImage] = useState(null);



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




<div className="
grid
md:grid-cols-2
gap-8
mt-12
">


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





<AnimatePresence>

{

selectedImage && (

<motion.div

initial={{
opacity:0
}}

animate={{
opacity:1
}}

exit={{
opacity:0
}}


onClick={()=>setSelectedImage(null)}


className="
fixed
inset-0
z-[999]
bg-black/90
backdrop-blur-md

flex
items-center
justify-center

p-8
cursor-zoom-out
"

>


<motion.img

src={selectedImage}


initial={{
scale:0.8
}}

animate={{
scale:1
}}

exit={{
scale:0.8
}}


transition={{
type:"spring",
stiffness:200
}}


onClick={(e)=>e.stopPropagation()}


className="
max-h-[90vh]
max-w-[90vw]

object-contain

rounded-2xl

cursor-default
"

/>



<button

onClick={()=>setSelectedImage(null)}

className="
absolute
top-8
right-10

text-white
text-5xl

"

>

×

</button>


</motion.div>

)

}

</AnimatePresence>

{
selectedImage && (

<div

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

onClick={()=>setSelectedImage(null)}

>


<img

src={selectedImage}

className="
max-w-[90vw]
max-h-[90vh]

rounded-2xl

object-contain

"

onClick={(e)=>{
e.stopPropagation()
}}

/>


<button

className="
absolute
top-5
right-8

text-white
text-5xl

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