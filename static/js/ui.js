console.log("UI JS cargado");

function showPage(pageId){

document.querySelectorAll(".page").forEach(page => {
page.style.display = "none";
});

const selected = document.getElementById(pageId);

if(selected){
selected.style.display = "block";
}

}
