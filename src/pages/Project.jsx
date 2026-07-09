import {useParams} from "react-router-dom";

import projects from "../data/projects";



export default function Project(){


const {id}=useParams();


const project =
projects.find(
p=>p.id===Number(id)
);



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
project.images.map(img=>(

<img

key={img}

src={img}

className="
rounded-xl
"

/>

))

}


</div>



<div className="
flex
gap-3
mt-10
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


</section>

)

}