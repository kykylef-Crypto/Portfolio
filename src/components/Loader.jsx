import {motion} from "framer-motion";


export default function Loader(){

return(

<motion.div

initial={{
opacity:1
}}

animate={{
opacity:0
}}

transition={{
duration:1,
delay:1
}}

className="
fixed
inset-0

bg-white
text-black

dark:bg-[#0d1117]
dark:text-white

z-50

pointer-events-none

flex
items-center
justify-center
"

>


<motion.h1

initial={{
scale:0
}}

animate={{
scale:1
}}

className="
text-6xl
font-bold
"

>

Kyllian

</motion.h1>


</motion.div>

)

}