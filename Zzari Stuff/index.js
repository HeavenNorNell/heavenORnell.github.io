
const pilot = [
    document.getElementById("pilot")
    // li: document.getElementById("pilotLi")
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
  
  function setupDropdown(ID){
    colorChange(ID[0], "#315e31");
    ID[0].addEventListener("mouseover", function (){ colorChange(ID[0], "green");})
    ID[0].addEventListener("mouseout", function (){ colorChange(ID[0], "#e6d7a1");})
    ID[0].addEventListener("click", function (){ dropDown(ID[0]);})
    ID.li.style.display = "block";
    ID[0].isOn = false;
  }
  
  function colorChange(ID, color){
    ID.style.color = color;
  }
  
  function dropDown(ID){
    if(ID.isOn){
    ID[0].innerHTML = ID.innerHTML.replace("⮝", "⮟");
    ID.li.style.display = "block";
    ID.isOn = false;
    } else {
    ID[0].innerHTML = ID.innerHTML.replace("⮟", "⮝"); 
        ID.li.style.display = "none";
    ID[0].isOn = true;
    }
  }
