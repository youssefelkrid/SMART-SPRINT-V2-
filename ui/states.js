
import exportchaine, { Ajouterchannel } from "../service/api.js";
import { getepg, showcanals } from "./preview.js";


const full_scren = document.getElementById("screen");
const chines = document.getElementById("chanls");
const canal = JSON.parse(localStorage.getItem("channls"));
const epg = document.getElementById("epg");
const favori = document.getElementById("favorite");
const bkliste = document.getElementById("blacklist");
const Ajouterchine = document.getElementById("Ajoutercannal")
const popup = document.getElementById("popup");
const btnAjouter = document.getElementById("btnAjouter");
const form = document.getElementById("form");
const btnfermer = document.getElementById("btnfermer")

Ajouterchine.addEventListener("click", () => {
  popup.classList.remove("hidden")
  popup.classList.add("fixed");
});
btnfermer.addEventListener("click", () => {
  popup.classList.add("hidden")
  popup.classList.remove("fixed")

})





bkliste.addEventListener("click", function (e) {
  e.target
  const bklist = canal.filter(bl => bl.isBlacklisted === true)



  showcanals(bklist);
})

favori.addEventListener("click", function (e) {
  e.target
  const cannalfavori = canal.filter(fv => fv.isFavorite === true);

  showcanals(cannalfavori);
})


export function getphoto() {

  chines.addEventListener("click", function (e) {
    const id = e.target.closest("[chine-id]")?.getAttribute("chine-id");

    const affichier = canal.filter(c => c.id === id);
    full_scren.innerHTML = `

              <video controls width="100%" height="100%">
  <source src="${affichier[0].streamUrl}" type="video/webm" />
  Votre navigateur ne prend pas en charge la lecture de vidéos HTML5.
</video>

                     
            `
    getepg(affichier[0])

  });

}



form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const id = Number(document.getElementById("id").value);
  const name = document.getElementById("name").value;
  const countryId = document.getElementById("countryId").value;
  const logo = document.getElementById("logo").value;

  if (id === "" || name === "" || countryId === "" || logo === "") {
    alert(" remplire tout les champs ");
    return;
  }
  


  const chaine = {
    id: canal.length + 1,
    name: name,
    countryId: countryId,
    logo: logo ,
    isFavorite : false ,
    isBlacklisted :  false
    

  };

  try {

    const nouvelleChaine = await Ajouterchannel(chaine);
    canal.push(nouvelleChaine);


    localStorage.setItem("canal", JSON.stringify(canal));
    canal = await exportchaine();

    showcanals(canal);


    form.value = "" ;

  }


  catch (e) {
    console.log("error de surveur ", e);
  }

});