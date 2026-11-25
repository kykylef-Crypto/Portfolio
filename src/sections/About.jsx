import { Underline, Highlight } from "../components/Handwritten";
export default function About() {
  return (
    <section
      id="about"
      className=" reveal max-w-6xl mx-auto py-32 px-6"
      
    >
      <h2 className="text-4xl font-bold mb-8">
        <Underline>À propos</Underline>
      </h2>

      <p className="text-gray-400 leading-8">
        Passionné par le design, le motion design
        et le développement web, je crée des
        expériences visuelles modernes et
        immersives.

        Actuellement à la recherche d'un emploi
        en tant que <Highlight>chargé de communication</Highlight>,{" "}
        <Highlight>community manager</Highlight> ou en{" "}
        <Highlight>communication 360°</Highlight>.
      </p>
    </section>
  );
}