document.addEventListener("DOMContentLoaded", function () {
  const dropDowns = {
    pilot: [
      document.getElementById("pilot"),
      document.getElementById("pilotLi")
    ],
    lore: [
      document.getElementById("lore"),
      document.getElementById("loreLi")
    ],
    conceptArt: [
      document.getElementById("conceptArt"),
      document.getElementById("conceptArtLi")
    ],
    languages: [
      document.getElementById("languages"),
      document.getElementById("languagesLi")
    ]
  }
  setupDropdown(dropDowns.pilot);
  setupDropdown(dropDowns.lore);
  setupDropdown(dropDowns.conceptArt);
  setupDropdown(dropDowns.languages);

  function setupDropdown(ID) {
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
      for (var key in dropDowns) {
        // if(dropDowns[key][1].isOn === true){
        dropDowns[key][1].style.display = "none";
        dropDowns[key][1].isOn = false;
        // }
        ID[0].innerHTML = ID[0].innerHTML.replace("⮟", "⮝");
        ID[1].style.display = "block";
        ID[1].isOn = true;
      }
    }
  }
});
