import { useContext, useEffect, useId, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";


/*
  Effets de texte du site.
  - mode clair  : « fait main » (feutre orange, surligneur, soulignés)
  - mode sombre : « lumière » (néon, titres décodés, laser, reflets)
  Les styles associés (.neon-text, .shine, .badge-dot…) sont dans index.css.
*/

const ORANGE = "#e2521d";
const NEON = "#9cc0ff";
const NEON_GLOW = { filter:"drop-shadow(0 0 4px #4f8cff) drop-shadow(0 0 10px rgba(138,92,255,.6))" };

const prefersReducedMotion = () =>
typeof window !== "undefined" &&
window.matchMedia("(prefers-reduced-motion: reduce)").matches;


// ---------- Titre qui se « décode » (mode sombre) ----------

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@";

function Decode({ text }){

const ref = useRef(null);
const inView = useInView(ref, { once:true, amount:0.6 });
const [out, setOut] = useState(text);
const [started, setStarted] = useState(false);

useEffect(()=>{

if(!inView) return;

setStarted(true);

if(prefersReducedMotion()){
setOut(text);
return;
}

let frame = 0;

const id = setInterval(()=>{

frame++;

setOut(
text
.split("")
.map((ch, i)=>
ch === " " || i < frame / 2
? ch
: CHARS[Math.floor(Math.random() * CHARS.length)]
)
.join("")
);

if(frame > text.length * 2){
clearInterval(id);
setOut(text);
}

}, 40);

return ()=>clearInterval(id);

},[inView, text]);

return(

<span
ref={ref}
aria-label={text}
style={{ opacity: started ? 1 : 0, transition:"opacity .2s" }}
>
<span aria-hidden="true">{out}</span>
</span>

);

}


// ---------- Titres de section ----------
// clair : souligné au feutre orange · sombre : titre décodé + trait laser

export function Underline({ children }){

const { dark } = useContext(ThemeContext);
const gradientId = `laser-${useId().replace(/:/g, "")}`;

if(dark){

return(

<span className="relative inline-block">

{typeof children === "string" ? <Decode text={children} /> : children}

<svg
aria-hidden="true"
className="absolute left-0 -bottom-3 w-full h-3 overflow-visible pointer-events-none"
viewBox="0 0 200 12"
preserveAspectRatio="none"
style={NEON_GLOW}
>
<defs>
<linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="200" y2="0">
<stop offset="0" stopColor="#4f8cff" />
<stop offset="1" stopColor="#8a5cff" />
</linearGradient>
</defs>
<motion.path
d="M2 6 L198 6"
fill="none"
stroke={`url(#${gradientId})`}
strokeWidth="2.5"
strokeLinecap="round"
vectorEffect="non-scaling-stroke"
initial={{ pathLength:0 }}
whileInView={{ pathLength:1 }}
viewport={{ once:true, amount:0.8 }}
transition={{ duration:0.5, ease:"easeOut", delay:0.35 }}
/>
</svg>

</span>

);

}

return(

<span className="relative inline-block">

{children}

<svg
aria-hidden="true"
className="absolute left-0 -bottom-3 w-full h-4 overflow-visible pointer-events-none"
viewBox="0 0 200 16"
preserveAspectRatio="none"
>
<motion.path
d="M3 11 C 50 3, 120 15, 197 6"
fill="none"
stroke={ORANGE}
strokeWidth="3"
strokeLinecap="round"
vectorEffect="non-scaling-stroke"
initial={{ pathLength:0 }}
whileInView={{ pathLength:1 }}
viewport={{ once:true, amount:0.8 }}
transition={{ duration:0.8, ease:"easeInOut" }}
/>
</svg>

</span>

);

}


// ---------- Mots importants ----------
// clair : surligneur · sombre : reflet de lumière qui passe

export function Highlight({ children }){

const { dark } = useContext(ThemeContext);

if(dark){
return <span className="shine">{children}</span>;
}

return(

<motion.span

className="font-semibold text-[#141414]"

style={{
backgroundImage:"linear-gradient(#ffb48a, #ffb48a)",
backgroundRepeat:"no-repeat",
backgroundPosition:"0 88%",
boxDecorationBreak:"clone",
WebkitBoxDecorationBreak:"clone"
}}

initial={{ backgroundSize:"0% 45%" }}
whileInView={{ backgroundSize:"100% 45%" }}
viewport={{ once:true, amount:1 }}
transition={{ duration:0.7, ease:"easeOut" }}

>
{children}
</motion.span>

);

}


// ---------- Mot entouré ----------
// clair : feutre orange · sombre : tube néon

export function Circled({ children, delay = 0 }){

const { dark } = useContext(ThemeContext);

return(

<span className="relative inline-block">

{children}

<svg
aria-hidden="true"
className="absolute overflow-visible pointer-events-none"
style={{
left:"-1.1rem",
top:"-0.3rem",
width:"calc(100% + 2.2rem)",
height:"calc(100% + 0.6rem)",
...(dark ? NEON_GLOW : {})
}}
viewBox="0 0 200 60"
preserveAspectRatio="none"
>
<motion.path
key={dark ? "neon" : "ink"}
d="M150 6 C 60 -2, 4 14, 8 32 C 12 52, 120 60, 180 46 C 205 38, 198 14, 150 8 L 132 10"
fill="none"
stroke={dark ? NEON : ORANGE}
strokeWidth={dark ? 2 : 2.5}
strokeLinecap="round"
vectorEffect="non-scaling-stroke"
initial={{ pathLength:0 }}
animate={{ pathLength:1 }}
transition={{ duration:1, ease:"easeInOut", delay }}
/>
</svg>

</span>

);

}


// ---------- Note « c'est moi ! » + flèche vers le nom ----------
// clair : feutre orange · sombre : néon qui grésille en s'allumant

export function HeroNote({ delay = 0 }){

const { dark } = useContext(ThemeContext);

const color = dark ? NEON : ORANGE;

return(

<div
key={dark ? "neon" : "ink"}
aria-hidden="true"
className="hidden md:block absolute -right-48 -top-12 w-56 h-36 pointer-events-none"
>

<motion.p

className={`font-hand text-4xl absolute right-0 top-0 -rotate-6 ${dark ? "" : "text-[#e2521d]"}`}

initial={{ opacity:0, y:6 }}
animate={{ opacity:1, y:0 }}
transition={{ duration:0.5, delay: delay + 0.9 }}

>
<span
className={dark ? "neon-text neon-on" : ""}
style={dark ? { animationDelay:`${delay + 0.9}s` } : undefined}
>
c'est moi !
</span>
</motion.p>

<svg
className="absolute left-0 top-12 w-32 h-24 overflow-visible"
viewBox="0 0 120 90"
style={dark ? NEON_GLOW : undefined}
>
<motion.path
d="M112 6 C 84 4, 44 20, 18 62"
fill="none"
stroke={color}
strokeWidth={dark ? 2.5 : 3}
strokeLinecap="round"
initial={{ pathLength:0 }}
animate={{ pathLength:1 }}
transition={{ duration:0.8, ease:"easeInOut", delay }}
/>
<motion.path
d="M18 62 L 14 46 M18 62 L 32 54"
fill="none"
stroke={color}
strokeWidth={dark ? 2.5 : 3}
strokeLinecap="round"
initial={{ pathLength:0 }}
animate={{ pathLength:1 }}
transition={{ duration:0.3, ease:"easeOut", delay: delay + 0.8 }}
/>
</svg>

</div>

);

}


// ---------- Badge « Disponible » (mode sombre) ----------

export function AvailableBadge(){

const { dark } = useContext(ThemeContext);

if(!dark) return null;

return(

<motion.div

initial={{ opacity:0, y:-8 }}
animate={{ opacity:1, y:0 }}
transition={{ duration:0.6, delay:1.8 }}

className="
inline-flex
items-center
gap-3
px-5
py-2
mb-8
rounded-full
border
border-emerald-400/35
bg-emerald-400/10
text-sm
text-emerald-100
"

>
<span className="badge-dot" />
Disponible · Chargé de communication
</motion.div>

);

}
