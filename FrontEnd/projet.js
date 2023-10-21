import {genererModalWorks, initAddEventListenerPopup, majWorks} from "./popup.js"



/**RESET DE LA PAGE */
const logout= document.getElementById("logout")
logout.addEventListener("click" , function(){
    localStorage.clear()
    location.reload()
    })


const reponseCategories= await fetch("http://localhost:5678/api/categories")
const categories= await reponseCategories.json()

const reponseWorks = await fetch("http://localhost:5678/api/works")
const works = await reponseWorks.json(); 


/** Mettre en page le site */
function genererPage(){
    const token = localStorage.getItem('jwtToken')
    let btnModifier = document.querySelector(".user-btn-modifier")
    const logout=document.getElementById("logout")
    const login=document.getElementById("login")
    const banner=document.querySelector(".banner")

    if(token === null){
        genererCategories()
        genererWorks(works)
        btnModifier.classList.add("active")
    }else{
        let userCategorie= document.querySelector(".categories")
        userCategorie.classList.add("active")
        banner.style.display="flex";
        logout.style.display="block";
        login.style.display="none";
        initAddEventListenerPopup()
        genererWorks(works)
        
        
    
        console.log(token)
    }


}
/** Générer la gallerie de la page d'accueil */
// Récupération des travaux depuis le fichier JSON
export async function genererWorks(works){
   await fetch("http://localhost:5678/api/works", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
   })
   

 
   for (let i=0; i<works.length; i++){
    const article= works[i]
    const sectionFiche= document.querySelector(".gallery")
    const workElement= document.createElement("figure")
    workElement.className="jsfigure"

    const imageElement=document.createElement("img")
    imageElement.src= article.imageUrl
    
    const nomElement= document.createElement("figcaption")
    nomElement.innerText= article.title

    sectionFiche.appendChild(workElement)
    workElement.appendChild(imageElement)
    workElement.appendChild(nomElement) 
   }
    
}

/** Générer le filtre des catégories */
function genererCategories(){
    let listeBouton= document.querySelectorAll(".btn-Categories")
    
        for (let i=0 ; i<listeBouton.length; i++){
      let boutonActuel= listeBouton[i]
     
      boutonActuel.addEventListener("click" , ()=>{
        let monBouton= works.filter(function (work){
            return work.categoryId === i
        })
        if(monBouton !=0){
            document.querySelector(".gallery").innerHTML= "";
            genererWorks(monBouton)
            console.log(monBouton)
        }else{
            document.querySelector(".gallery").innerHTML="";
            genererWorks(works)
            console.log(works)
        }        
      })
    }
}

   
const noms = works.map(work => work.category.name)
console.log(noms)

genererPage()


/** Gérer la prévisualisation de l'image dans la modal "ajouter travail" */
let btnFichier= document.getElementById("btn-ajout-photo")
let inputFile=document.getElementById("photo")
console.log(btnFichier)
btnFichier.addEventListener("click" , function(){
    onclick=document.getElementById("photo").click()
    console.log(inputFile.value)
})

document.getElementById('photo').onchange = function() {
    previewImage();
};

function previewImage() {
    const input = document.getElementById('photo');
    const label = document.getElementById('fileLabel');
    const preview = document.getElementById('preview');
    const p= document.getElementById('p-preview');
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        label.classList.remove("fa-image")
        btnFichier.style.display="none";
        p.style.display="none";

        reader.onload = function (e) {
            preview.src = e.target.result;
            
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        preview.src=''
        
    }
}

/** Reset de la prévisualisation */
export function resetPreview() {
    const input = document.getElementById('photo');
    const label = document.getElementById('fileLabel');
    const preview = document.getElementById('preview');
    const p= document.getElementById('p-preview');


    label.classList.add("fa-image");
    btnFichier.style.display = "block";
    p.style.display="block";
    preview.src = '';
    input.value = '';


}




/** Générer l'ajout d'un nouveau travail */
    document.getElementById("monFormulaire").addEventListener("submit", async function(event) {
        event.preventDefault();  
        const token = window.localStorage.getItem('jwtToken');

        const formulaire = document.getElementById("monFormulaire");
        const formData = new FormData(formulaire);
            
        const reponse= await fetch("http://localhost:5678/api/works", {
            method: "POST",
            body: formData,
            headers: {"Authorization": `Bearer ${token}`}           
            
        })
        
        if(reponse.ok){
            const sectionFiche= document.querySelector(".gallery")
            const workElement= document.querySelector(".jsfigure")
            const sectionFicheModal= document.querySelector("#js-modal-gallerie")
            const workElementModal= document.createElement("figure")

            sectionFicheModal.appendChild(workElementModal)
            sectionFiche.appendChild(workElement)
            sectionFiche.innerHTML = '';
            formulaire.reset();
            resetPreview();
            sectionFicheModal.innerHTML='';
            genererModalWorks();
            majWorks();
            btnValider.disabled = true;
            btnValider.style.background = "#A7A7A7";
            console.log(reponse)
        }else{
            alert("Echec de l'envoi. Veuillez mettre une photo, un titre et une categorie")
        }
        

    });


 /** Activer ou désactiver le bouton ajouter nouveau travail */   
        let inputImage = document.getElementById("photo");
        let inputTitre = document.querySelector("#title");
        let inputCategorie = document.getElementById("categoryId");
        let btnValider = document.getElementById("js-ajouter-formulaire");
        btnValider.disabled = true;
        btnValider.style.background="#A7A7A7";

    function btnValiderActif() {
        if (inputTitre.value !== "" && inputImage.value !== "" && inputCategorie.value !== "") {
            btnValider.disabled = false;
            btnValider.style.background = "#1D6154";
        } else{
            btnValider.disabled = true;
            btnValider.style.background="#A7A7A7";
        }
    }

    inputTitre.addEventListener("input", btnValiderActif);
    inputImage.addEventListener("input", btnValiderActif);
    inputCategorie.addEventListener("input", btnValiderActif);