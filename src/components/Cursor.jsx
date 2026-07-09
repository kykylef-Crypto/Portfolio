import {useEffect,useState} from "react";


export default function Cursor(){


const [position,setPosition]=useState({
x:0,
y:0
});


useEffect(()=>{


const move=(e)=>{

setPosition({
x:e.clientX,
y:e.clientY
});

}


window.addEventListener(
"mousemove",
move
);


return()=>{

window.removeEventListener(
"mousemove",
move
)

}


},[]);



return(

<div

className="fixed w-6 h-6 rounded-full border border-white pointer-events-none z-[999] transition-transform duration-100"

style={{

left:position.x-12,
top:position.y-12

}}

/>

)

}
