import {genererModalWorks, initAddEventListenerPopup, MAJWorks} from "./popup.js"



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



/*
const boutonTous= document.querySelector(".btn-tous")
boutonTous.addEventListener("click" , function(){
    document.querySelector(".gallery").innerHTML="";
    genererWorks(works)
})


const boutonObjets= document.querySelector(".btn-objets")
boutonObjets.addEventListener("click" , function(){
    let worksObjets = works.filter(function (work) {
        return work.categoryId === 1;
    })
    
    document.querySelector(".gallery").innerHTML= "";
    genererWorks(worksObjets)
    console.log(worksObjets)
   

})

const boutonAppartements= document.querySelector(".btn-appartements")
boutonAppartements.addEventListener("click" , function(){
    let worksAppartements = works.filter(function (work) {
        return work.categoryId === 2;
    })
    
    document.querySelector(".gallery").innerHTML= "";
    genererWorks(worksAppartements)
    console.log(worksAppartements)
   

})

const boutonHotels= document.querySelector(".btn-hotels")
boutonHotels.addEventListener("click" , function(){
    let worksHotels = works.filter(function (work) {
        return work.categoryId === 3;
    })
    
    document.querySelector(".gallery").innerHTML= "";
    genererWorks(worksHotels)
    console.log(worksHotels)
   

})



**/

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
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        label.classList.remove("fa-image")
        btnFichier.style.display="none";

        reader.onload = function (e) {
            preview.src = e.target.result;
            
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        preview.src=''
        
    }
}



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
            window.location.href = 'index.html';
            console.log(reponse)
        }
        

    });




