import {useEffect} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";


gsap.registerPlugin(
ScrollTrigger
);



export default function useGsapReveal(){


useEffect(()=>{


gsap.utils.toArray(".reveal")
.forEach((element)=>{


gsap.from(element,{

opacity:0,

y:80,

duration:1,

scrollTrigger:{
trigger:element,
start:"top 80%"
}

})


})


},[])

}