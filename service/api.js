 import { showcanals } from "../ui/preview.js";


let channls = [] ;
export default async function exportchaine() {
    document.querySelector("#chanls").innerHTML = "Chargement...";
    try{
          let response = await fetch('https://6afad648730c1d152f329614.mockapi.io/api/v1/cannal')
        let data = await response.json();
        channls = data ;
         localStorage.setItem("channls" , JSON.stringify(channls))
       
    }
    catch {
       console.log("erreur de serveur");
    }
    
}

let cuntry = [] ;
    async function exportcuntry(){
    try{
        let resultat = await fetch('https://6afad648730c1d152f329614.mockapi.io/api/v1/catigorie');
        let  datas = await resultat.json();
        cuntry = datas ;
        localStorage.setItem("cuntry" , JSON.stringify(cuntry))
    }
    catch{

        console.log("erreur de serveur"); 
    }
}
exportcuntry();


export async function updatefavoriseandisBlacklisted(id, changes) {

    const response = await fetch(
        `https://6afad648730c1d152f329614.mockapi.io/api/v1/cannal/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(changes)
        }
    );

    if (!response.ok) {
        throw new Error("Erreur serveur");
    }

    return await response.json();
}

