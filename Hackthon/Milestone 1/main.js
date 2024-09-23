var toggle_Button = document.getElementById("button");
var skillss = document.getElementById("skills");
toggle_Button.addEventListener("click", function () {
    if (skillss.style.display === "none") {
        skillss.style.display = " block";  
    }
    else {
        skillss.style.display = "none";
    }
});
