import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";


/*
  Curseur personnalisé, rapide et précis :
  - un petit point qui suit EXACTEMENT la souris (c'est lui qui vise)
  - un anneau qui le rejoint en douceur et grossit sur les liens / boutons
  On déplace les éléments directement (transform), sans re-rendu React,
  donc aucun ralentissement. Sur écran tactile, on garde le curseur normal.
  Les styles sont dans index.css (section CURSEUR).
*/

const CLICKABLE = 'a, button, [role="button"], input, textarea, select, label, video, summary, .cursor-pointer';

export default function Cursor(){

const { dark } = useContext(ThemeContext);

const dotRef = useRef(null);
const ringRef = useRef(null);

// uniquement avec une vraie souris (pas sur téléphone / tablette)
const [enabled] = useState(()=>
typeof window !== "undefined" &&
window.matchMedia("(hover: hover) and (pointer: fine)").matches
);


useEffect(()=>{

if(!enabled) return;

const root = document.documentElement;
root.classList.add("custom-cursor");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let mouseX = -100, mouseY = -100;
let ringX = -100, ringY = -100;
let visible = false;
let hovering = false;
let running = false;
let frame = 0;


// l'anneau rattrape le point en douceur
const loop = ()=>{

const ease = reduceMotion ? 1 : 0.3;

ringX += (mouseX - ringX) * ease;
ringY += (mouseY - ringY) * ease;

if(ringRef.current){
ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
}

// on s'arrête quand l'anneau est arrivé : pas de calcul inutile
if(Math.abs(mouseX - ringX) < 0.1 && Math.abs(mouseY - ringY) < 0.1){
running = false;
return;
}

frame = requestAnimationFrame(loop);

};


const onMove = (e)=>{

mouseX = e.clientX;
mouseY = e.clientY;

// le point suit la souris sans aucun retard
if(dotRef.current){
dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
}

if(!visible){
visible = true;
ringX = mouseX;
ringY = mouseY;
root.classList.add("cursor-visible");
}

const target = e.target instanceof Element ? e.target.closest(CLICKABLE) : null;

if(Boolean(target) !== hovering){
hovering = Boolean(target);
ringRef.current?.classList.toggle("is-hover", hovering);
}

if(!running){
running = true;
frame = requestAnimationFrame(loop);
}

};


const onLeave = ()=>{
visible = false;
root.classList.remove("cursor-visible");
};

const onDown = ()=> ringRef.current?.classList.add("is-down");
const onUp = ()=> ringRef.current?.classList.remove("is-down");


window.addEventListener("pointermove", onMove, { passive:true });
window.addEventListener("pointerdown", onDown, { passive:true });
window.addEventListener("pointerup", onUp, { passive:true });
document.documentElement.addEventListener("mouseleave", onLeave);


return ()=>{

cancelAnimationFrame(frame);

window.removeEventListener("pointermove", onMove);
window.removeEventListener("pointerdown", onDown);
window.removeEventListener("pointerup", onUp);
document.documentElement.removeEventListener("mouseleave", onLeave);

root.classList.remove("custom-cursor", "cursor-visible");

};

},[enabled]);


if(!enabled) return null;

const theme = dark ? "is-dark" : "is-light";

return(

<>

<div
ref={ringRef}
aria-hidden="true"
className={`cursor-ring ${theme}`}
>
<span className="cursor-ring-circle" />
</div>

<div
ref={dotRef}
aria-hidden="true"
className={`cursor-dot ${theme}`}
/>

</>

);

}
