
///récupérer le numéro de commande 

let params = new URL (document.location).searchParams;
let orderId = params.get ("orderId");

// afficher le numéro de commande sur la page 

document.getElementById("orderId").textContent = orderId;