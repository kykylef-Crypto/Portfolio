import {motion} from "framer-motion";


export default function Hero(){


return(

<section
className="max-w-6xl mx-auto py-32 px-6"
>


<div className="text-center">


<motion.p

initial={{
opacity:0
}}

animate={{
opacity:1
}}

className="
text-blue-400
uppercase
tracking-[5px]
mb-6
"

>

Portfolio 2026

</motion.p>



<motion.h1

initial={{
opacity:0,
y:50
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:1
}}

className="
text-6xl
md:text-8xl
font-bold
"

>


Kyllian

<br/>

<span
className="
bg-gradient-to-r
from-blue-400
to-purple-500
bg-clip-text
text-transparent
">

Lefrançois

</span>


</motion.h1>
<div className="mt-24">
<motion.a

whileHover={{
  scale:1.1
}}

href="/CV-Kyllian-Lefrançois.pdf"
download

className="
inline-block
mt-10
px-10
py-4
rounded-full

border
border-white

bg-transparent
text-white

transition-all
duration-300

hover:bg-white
hover:text-black
hover:border-transparent
"

>

Télécharger mon CV

</motion.a>

<motion.p

initial={{
opacity:0
}}

animate={{
opacity:1
}}

transition={{
delay:.5
}}

className="
mt-8
text-xl
text-gray-400
"

>

Direction Artistique
<br/>
Motion Design
<br/>
Expériences Digitales

</motion.p>



<motion.a

whileHover={{
scale:1.1
}}

href="#projects"

className="
inline-block
mt-10
px-10
py-4
rounded-full
bg-blue-500
"

>

Découvrir mes créations


</motion.a>
</div>


</div>


</section>

)

}