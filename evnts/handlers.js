import { deleteChannel, updatefavoriseandisBlacklisted } from "../service/api.js";

import { showcanals, showcountries } from "../ui/preview.js";




let search = document.getElementById("search");
let search_ch = document.getElementById("search-ch");
let channls = JSON.parse(localStorage.getItem("channls"));
let countries = JSON.parse(localStorage.getItem("cuntry"));


export function getinput() {
    search.addEventListener("input", function (e) {

        let input = search.value;

        const catigorie = countries.filter(catalog => {
            return catalog.countryCode.toUpperCase().includes(input.toUpperCase());
        })

        showcountries(catigorie);

    })
}

export function getchanls() {
    search_ch.addEventListener("input", function (e) {

        let chins = search_ch.value;

        const chines = channls.filter(chain => {
            return chain.name.toUpperCase().includes(chins.toUpperCase());

        })

        showcanals(chines);

    })
}
export function favoriteChannels() {

    document.getElementById("chanls").addEventListener("click", async function (e) {

        const button = e.target.closest('[data-action="favorite"]');
               
        if(!button) return ;



        const id = button.dataset.id;


        const channel = channls.find(ch => (ch.id) === id);



        const newValue = !channel.isFavorite;

        try {
            const updatedChannel = await updatefavoriseandisBlacklisted(id, {
                isFavorite: newValue
            });

            channel.isFavorite = updatedChannel.isFavorite;

            localStorage.setItem("channls", JSON.stringify(channls));

            showcanals(channls);

        } catch (error) {
            console.log("Erreur lors de la mise à jour du favori :", error);
        }
    });
}

favoriteChannels();


export function BlacklistChannels() {

    document.getElementById("chanls").addEventListener("click", async function (e) {

        const buttons = e.target.closest('[data-action="blacklist"]');

            if(!buttons) return ;

        const id = buttons.dataset.id



        const channel = channls.find(ch => (ch.id) === id);



        const newValue = !channel.isBlacklisted;

        try {
            const updatedChannel = await updatefavoriseandisBlacklisted(id, {
                isBlacklisted: newValue
            });

            channel.isBlacklisted = updatedChannel.isBlacklisted;

            localStorage.setItem("channls", JSON.stringify(channls));

            showcanals(channls);

        } catch (error) {
            console.log("Erreur lors de la mise à jour du favori :", error);
        }
    });
}
BlacklistChannels();


export function supprimerchannel() {
    document.getElementById("chanls").addEventListener("click", async function (e) {
        const button = e.target.closest('[ data-action="delete"]');
        if (!button) return
        const id = button.dataset.id;

        try {
            await deleteChannel(id)
            const supprimercannal = channls.filter(sp => sp.id !== id);

            channls = supprimercannal;

            localStorage.setItem("channls", JSON.stringify(channls));
            showcanals(channls);
        } catch (error) {
            console.log("Erreur lors de la suppretion channel :", error);
        }
    })
}
supprimerchannel();