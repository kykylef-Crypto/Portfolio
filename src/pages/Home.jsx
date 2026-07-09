import Navbar from "../components/Navbar";

import Hero from "../sections/Hero";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Projects from "../sections/Projects";
import Timeline from "../sections/Timeline";
import Contact from "../sections/Contact";

import { Helmet } from "react-helmet-async";

import useGsapReveal from "../hooks/useGsapReveal";

import Footer from "../components/Footer";


export default function Home(){


useGsapReveal();


return(

<>


<Helmet>

<title>
Kyllian Lefrançois | Direction Artistique
</title>


<meta

name="description"

content="
Portfolio de Kyllian Lefrançois,
designer digital et motion designer.
"

/>

</Helmet>



<Navbar/>


<Hero/>

<About/>

<Skills/>

<Projects/>

<Timeline/>

<Contact/>


<Footer/>


</>

)

}