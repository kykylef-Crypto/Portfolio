import {useEffect,useState} from "react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";


export default function Cursor(){

const {dark} = useContext(ThemeContext);

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

className={`
fixed
w-6
h-6
rounded-full

border

${dark
?
"border-white"
:
"border-black"
}

pointer-events-none

z-[999]

transition-all
duration-300
`}

style={{

left:position.x-12,
top:position.y-12

}}

/>

)

}
