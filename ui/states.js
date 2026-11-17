import { getepg, showcanals } from "./preview.js";


const full_scren = document.getElementById("screen");
const chines = document.getElementById("chanls");
const canal = JSON.parse(localStorage.getItem("channls"));
const epg = document.getElementById("epg");
const favori = document.getElementById("favorite");
const bkliste = document.getElementById("blacklist");

bkliste.addEventListener("click" , function(e){
  e.target
   const bklist = canal.filter(bl => bl.isBlacklisted === true)
   showcanals(bklist);
})

favori.addEventListener("click",function(e){
  e.target
  const cannalfavori = canal.filter(fv => fv.isFavorite === true);
         
       showcanals(cannalfavori);
})


export function getphoto() {

    chines.addEventListener("click", function (e) {
       const id = e.target.closest("[chine-id]")?.getAttribute("chine-id");
       
           const affichier = canal.filter(c => c.id === id);
            full_scren.innerHTML  = `

              <video controls width="100%" height="100%">
  <source src="${affichier[0].streamUrl}" type="video/webm" />
  Votre navigateur ne prend pas en charge la lecture de vidéos HTML5.
</video>

                     
            `
            getepg(affichier[0])
             
    });
      
}