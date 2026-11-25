import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";


/*
  Fond du site :
  - mode clair  : papier crème + grille fine (style éditorial)
  - mode sombre : aurore bleu / violet qui bouge lentement
  Les deux calques existent toujours et se croisent en fondu
  quand on change de mode. Les styles sont dans index.css.
*/

export default function Background(){

const { dark } = useContext(ThemeContext);

return(

<div
className="site-bg"
aria-hidden="true"
>

<div className={`bg-paper ${dark ? "is-hidden" : ""}`} />

<div className={`bg-aurora ${dark ? "" : "is-hidden"}`}>
<span className="aurora-1" />
<span className="aurora-2" />
<span className="aurora-3" />
<i className="shooting-star star-1" />
<i className="shooting-star star-2" />
<i className="shooting-star star-3" />
</div>

</div>

)

}
