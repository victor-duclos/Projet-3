import {resetPreview , } from "./projet.js"


export function afficherPopup() {
    let popupBackground = document.querySelector(".popupbackground")

    popupBackground.classList.add("activepopup")
}

 

export function cacherPopup() {
    let popupBackground = document.querySelector(".popupbackground")
 
    popupBackground.classList.remove("activepopup")

}


 export function initAddEventListenerPopup() {

    let btnModifier = document.querySelector(".user-btn-modifier")
    let popupBackground = document.querySelector(".popupbackground")
    let btnFermer1=document.querySelector("#js-modal .js-modal-close")
    let btnFermer2=document.querySelector("#js-modal2 .js-modal-close")
    const formulaire = document.getElementById("monFormulaire");
    let modalWrapper2=document.querySelector("#js-modal2 .js-modal");
    let modalWrapper= document.querySelector("#js-modal .js-modal")

    btnModifier.addEventListener("click", () => {
       console.log("j'ai cliqué")
        modalWrapper2.classList.add("active");
        modalWrapper.classList.remove("active")
        afficherPopup()
    })


    popupBackground.addEventListener("click", (event) => {

        if (event.target === popupBackground || event.target===btnFermer1 || event.target===btnFermer2) {
            console.log(event.target)
            formulaire.reset();
           resetPreview();
           let btnValider = document.getElementById("js-ajouter-formulaire");
        btnValider.disabled = true;
        btnValider.style.color="black";
            cacherPopup()
        }
    })

}


const reponseWorks = await fetch("http://localhost:5678/api/works");
const works = await reponseWorks.json();
export  async function genererModalWorks(){
    const token = window.localStorage.getItem('jwtToken');
    const reponse = await fetch("http://localhost:5678/api/works", {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}`, },
            });
            if (!reponse.ok) {
                console.error("La récupération de la liste des articles a échoué");
                return;
            }else{
                const works = await reponse.json();
                for (let i=0; i<works.length; i++){
     const article= works[i]
     const sectionFicheModal= document.querySelector("#js-modal-gallerie")
     const workElementModal= document.createElement("figure")
     workElementModal.className="inline-block"
 
     const imageElementModal=document.createElement("img")
     imageElementModal.src= article.imageUrl

     const btnEffacerElement=document.createElement("button")
     btnEffacerElement.className="fa-solid fa-trash-can"

     sectionFicheModal.appendChild(workElementModal)
     workElementModal.appendChild(imageElementModal)
     workElementModal.appendChild(btnEffacerElement)
           
    
     
     
     btnEffacerElement.addEventListener("click" , async function(event){
        event.preventDefault()
        let id= article.id
        
        const token=window.localStorage.getItem('jwtToken')
        const reponse= await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}`  },
        
    });
        
        if(reponse.status === 204){

            const sectionFiche= document.querySelector(".gallery")
            const workElement= document.querySelector(".jsfigure")
            
            sectionFiche.appendChild(workElement)
            

        
           console.log("photo supprimée")
          workElementModal.remove()
          sectionFiche.innerHTML = '';
          MAJWorks()
          
           
        
        }else{
        const errorData = await reponse.json();
        console.log("Erreur lors de la connexion :", errorData.message)
     } 
     
     })
     
     } }
     
 }
 genererModalWorks()


 export async function MAJWorks() {
   
    const token = window.localStorage.getItem('jwtToken');
    
    try {
        const reponse = await fetch("http://localhost:5678/api/works", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}`, },
        });

        if (!reponse.ok) {
            console.error("La récupération de la liste des articles a échoué");
            return;
        }else{

        const nouveauxWorks = await reponse.json();
        for (let i=0; i<nouveauxWorks.length; i++){
            const nouveauxArticles= nouveauxWorks[i]
            const nouveauSectionFiche= document.querySelector(".gallery")
            const nouveauWorkElement= document.createElement("figure")
            nouveauWorkElement.className="jsfigure"
        
            const imageElement=document.createElement("img")
            imageElement.src= nouveauxArticles.imageUrl
            
            const nomElement= document.createElement("figcaption")
            nomElement.innerText= nouveauxArticles.title
        
            nouveauSectionFiche.appendChild(nouveauWorkElement)
            nouveauWorkElement.appendChild(imageElement)
            nouveauWorkElement.appendChild(nomElement) 
           }
        }

    } catch (erreur) {
        console.error("Une erreur s'est produite lors de la récupération de la liste des articles :", erreur);
    }
}







 let btnModalAjout= document.querySelector("#js-ajouter")
 let modalWrapper= document.querySelector("#js-modal .js-modal")
 console.log(modalWrapper)

btnModalAjout.addEventListener("click" , function(){
 modalWrapper.classList.add("active")
 let modalWrapper2=document.querySelector("#js-modal2 .js-modal")
 modalWrapper2.classList.remove("active")


})
    
    
let btnRetour=document.querySelector("#modal-retour")
let modalWrapper2=document.querySelector("#js-modal2 .js-modal")
const formulaire = document.getElementById("monFormulaire");
btnRetour.addEventListener("click" , function(){
    modalWrapper2.classList.add("active")
    modalWrapper.classList.remove("active")
    formulaire.reset();
    resetPreview();
    let btnValider = document.getElementById("js-ajouter-formulaire");
        btnValider.disabled = true;
        btnValider.style.color="black";

})







