import { getepg, showcanals } from "./preview.js";


const full_scren = document.getElementById("screen");
const chines = document.getElementById("chanls");
const canal = JSON.parse(localStorage.getItem("channls"));
const epg = document.getElementById("epg");
const favori = document.getElementById("favorite");
const bkliste = document.getElementById("blacklist");
const Ajouterchine = document.getElementById("Ajoutercannal")




Ajouterchine.addEventListener("click", function (e) {
  e.target;
  const Ajouterpopup = document.createElement("div");
  Ajouterpopup.id = "popup";
  Ajouterpopup.classList = "hidden flex justify-center items-center  bg-black-100  fixed inset-0"
  Ajouterpopup.innerHTML += `
          <form action="" class="bg-white p-6 w-96 rounded shadow">

      <h1 class="text-2xl font-bold text-center mb-4">ADD NEW channel</h1>

      <div class="mb-3">
        <label for="id" class="block">numéro</label>
        <input id="id" type="text" placeholder="numéro" class="border w-full p-2">
      </div>

      <div class="mb-3">
        <label for="nom" class="block"> nom</label>
        <input id="nom" type="text" placeholder="nom" class="border w-full p-2">
      </div>

      <div class="mb-3">
        <label for="prix" class="block">catégorie</label>
        <input id="prix" type="text" placeholder="catégorie" class="border w-full p-2">
      </div>

      <div class="mb-3">
        <label for="img" class="block">logo</label>
        <input id="img" type="text" placeholder="logo" class="border w-full p-2">
      </div>
       
      <div class="flex gap-2">
        <button id="btnAjouter" type="submit" class="bg-red-600 text-white p-2 w-full rounded">AJOUTER</button>
        <button id="btnfermer" type="button" class="bg-gray-300 p-2 w-full rounded">ANNULLER</button>
      </div>

    </form>
       `
  document.body.appendChild(Ajouterpopup);

  const popup = document.getElementById("popup");
const close = document.getElementById("btnfermer");

Ajouterchine.addEventListener("click", () => {
  popup.classList.remove("hidden")
  popup.classList.add("fixed");
});

close.addEventListener("click", () => {
  popup.classList.add("hidden")
  popup.classList.remove("fixed")
});

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