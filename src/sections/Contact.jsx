import emailjs from "@emailjs/browser";
export default function Contact() {
  return (
    <section
      id="contact"
      className="max-w-6xl mx-auto py-32 px-6"
    >
      <h2 className="text-4xl font-bold mb-12">
        Contact
      </h2>

      <form className="flex flex-col gap-4 max-w-xl">

        <input
          type="text"
          placeholder="Nom"
          className="bg-white/5 p-4 rounded-lg"
        />

        <input
          type="email"
          placeholder="Email"
          className="bg-white/5 p-4 rounded-lg"
        />

        <textarea
          rows="6"
          placeholder="Votre message"
          className="bg-white/5 p-4 rounded-lg"
        />

        <button
          className="gradient p-4 rounded-lg"
        >
          Envoyer
        </button>

      </form>
    </section>
  );
}

function sendEmail(e){

e.preventDefault();


emailjs.sendForm(

"SERVICE_ID",

"TEMPLATE_ID",

e.target,

"PUBLIC_KEY"

)


.then(()=>{

alert(
"Message envoyé !"
)

})

}

<form onSubmit={sendEmail}></form>