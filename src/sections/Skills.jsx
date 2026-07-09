import {motion} from "framer-motion";


const skills=[

{
name:"Direction artistique",
level:90
},

{
name:"Motion Design",
level:85
},

{
name:"UI / UX",
level:80
},

{
name:"Développement Web",
level:75
}

];


export default function Skills(){


return(

<section
id="skills"
className="max-w-6xl mx-auto py-32 px-6"
>


<h2 className="
text-5xl
font-bold
mb-12
">

Expertise

</h2>



<div className="
space-y-8
">


{
skills.map(skill=>(


<div key={skill.name}>


<div className="
flex
justify-between
mb-2
">

<span>
{skill.name}
</span>

<span>
{skill.level}%
</span>

</div>



<div className="
h-3
bg-white/10
rounded-full
overflow-hidden
">


<motion.div

initial={{
width:0
}}

whileInView={{
width:`${skill.level}%`
}}

transition={{
duration:1
}}

className="
h-full
bg-gradient-to-r
from-blue-400
to-purple-500
"

/>


</div>


</div>


))

}


</div>


</section>

)

}