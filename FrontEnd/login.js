


/** Générer la page de connexion. Si connecté, renvoie à la page d'acceuil et récupération du token*/
export function genererLogin() {
    const formulaireIdentifiant = document.querySelector(".identifiant");
    formulaireIdentifiant.addEventListener("submit", async function (event) {
    event.preventDefault();
    // Création de l’objet 
    const users = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=mdp]").value,
       
    };
    // Création de la charge utile au format JSON
    const chargeUtile = JSON.stringify(users);
    // Appel de la fonction fetch avec toutes les informations nécessaires
    const reponse= await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    });
    
    if (reponse.status === 200) {
        const data = await reponse.json();
        const token = data.token;
        const id=data.userId
        console.log("Connexion réussie. Token JWT :", id ,token)
        // Stocker le token
        window.localStorage.setItem('jwtToken' , token)
        renvoieIndex()

        
    }else{
        const errorData = await reponse.json();
                console.log("Erreur lors de la connexion :", errorData.message)
        alert("Echec de la connexion. Veuillez vérifier votre e-mail et votre mot de passe.")
        
    }
 



    });
    
 }

 genererLogin()



/** Renvoie à la page d'accueil */
export function renvoieIndex (){
    
    window.location.href = "index.html"
    }