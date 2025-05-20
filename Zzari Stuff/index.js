document.addEventListener("DOMContentLoaded", function() {
const pilot = [
  document.getElementById("pilot"),
  document.getElementById("pilotLi")
];
//   const lore = {
//   main: document.getElementById("lore"),
//     li: document.getElementById("loreLi")
//   };
//   const conceptArt = {
//   main: document.getElementById("conceptArt"),
//     li: document.getElementById("conceptArtLi")
//   };
//   const languages = {
//   main: document.getElementById("languages"),
//     li: document.getElementById("languagesLi")
//   }

setupDropdown(pilot);
//   setupDropdown(lore);
//   setupDropdown(conceptArt);
//   setupDropdown(languages);

function setupDropdown(ID) {
  colorChange(ID[0], "#315e31");
  ID[0].addEventListener("mouseover", function () {
    colorChange(ID[0], "green");
  });
  ID[0].addEventListener("mouseout", function () {
    colorChange(ID[0], "#e6d7a1");
  });
  ID[0].addEventListener("click", function () {
    dropDown(ID);
  });
  ID[1].style.display = "none";
  ID[1].isOn = false;
}

function colorChange(ID, color) {
  ID.style.color = color;
}

function dropDown(ID) {
  if (ID[1].isOn) {
    ID[0].innerHTML = ID[0].innerHTML.replace("⮝", "⮟");
    ID[1].style.display = "none";
    ID[1].isOn = false;
  } else {
    ID[0].innerHTML = ID[0].innerHTML.replace("⮟", "⮝");
    ID[1].style.display = "block";
    ID[1].isOn = true;
  }
}
});