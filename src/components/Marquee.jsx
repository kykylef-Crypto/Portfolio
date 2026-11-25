import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";


/*
  Bandeau penché qui fait défiler les métiers.
  - mode clair  : bande noire, texte crème, étoiles orange
  - mode sombre : lettres en contour bleuté entre deux filets lumineux
*/

const items = [
"Communication 360°",
"Community management",
"Motion design",
"Montage vidéo",
"Réseaux sociaux",
"Retouche photo",
"Direction artistique",
];


export default function Marquee(){

const { dark } = useContext(ThemeContext);

return(

<section
aria-label={items.join(", ")}
className="relative py-16 overflow-hidden"
>

<div className={`
-rotate-2
-mx-8
py-5
overflow-hidden
${dark
?
"marquee-dark"
:
"bg-[#141414] text-[#efebe3]"
}
`}>

<div
aria-hidden="true"
className={`
marquee-track
flex
w-max
text-2xl
md:text-3xl
font-bold
whitespace-nowrap
${dark ? "uppercase tracking-wider" : ""}
`}
>

{
[...items, ...items].map((item, i)=>(

<span
key={i}
className="flex items-center gap-10 pr-10"
>
<span className={dark ? "outline-text" : ""}>{item}</span>
<span className={dark ? "text-[#8a5cff]" : "text-[#e2521d]"}>✦</span>
</span>

))
}

</div>

</div>


<p
aria-hidden="true"
className="
font-hand
text-3xl
max-w-6xl
mx-auto
px-6
mt-6
text-right
-rotate-2
"
>
<span className={dark ? "neon-text" : "text-[#e2521d]"}>
ce que je sais faire ↑
</span>
</p>

</section>

)

}
