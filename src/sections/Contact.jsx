import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";


export default function Contact() {


const form = useRef();


const [sent,setSent] = useState(false);
const [loading,setLoading] = useState(false);



function sendEmail(e){

e.preventDefault();


if(loading || sent) return;


setLoading(true);



emailjs.sendForm(
"service_50p6lfn",
"template_f0afpog",
e.target,
"ivgqrkk1D2IiegQsj"
)

.then(()=>{


setSent(true);
setLoading(false);


// vide les champs

form.current.reset();



})

.catch(()=>{


setLoading(false);

alert(
"Une erreur est survenue, veuillez réessayer."
);


});


}



return (

<section
id="contact"
className="
max-w-6xl
mx-auto
py-32
px-6
"
>


<h2 className="
text-4xl
font-bold
mb-12
">

Contact

</h2>



<form

ref={form}

onSubmit={sendEmail}

className="
flex
flex-col
gap-4
max-w-xl
"


>


<input

name="user_name"

type="text"

placeholder="Nom"

required

className="
bg-white/5
p-4
rounded-lg
"

/>



<input

name="user_email"

type="email"

placeholder="Email"

required

className="
bg-white/5
p-4
rounded-lg
"

/>



<textarea

name="message"

rows="6"

placeholder="Votre message"

required

className="
bg-white/5
p-4
rounded-lg
"

/>



<button

type="submit"

disabled={sent || loading}


className={`

p-4
rounded-lg

transition-all
duration-500
ease-out

transform

${
sent

?

"bg-green-500 text-black cursor-default"

:

"gradient text-white hover:bg-white hover:text-black hover:scale-[1.05]"

}

`}

>


{

loading

?

"Envoi..."

:

sent

?

"Message envoyé ✓"

:

"Envoyer"

}


</button>



</form>


</section>

);

}