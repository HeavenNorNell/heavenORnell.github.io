$(document).ready(function () {

  $("#random").on("click", handleClick);
  $("#one").on("click", select1);
  $("#zero").on("click", select0);

  function select1() {
    $("#one").css("background-color","#ffd5ff");
    $("#zero").css("background-color","#3fa7d6");
  }

  function select0() {
    $("#zero").css("background-color","#ffd5ff");
    $("#one").css("background-color","#3fa7d6");
  }

  function handleClick() {
    console.log(randomize());
  }

  function randomize() {
    int = Math.random() >= 0.5 ? 1 : 0;
    $("#num").text(int);
    return int;
  }

  //   function randomize() {
  //     one = 0;
  //     zero = 0;
  //     for (i = 0; i < 10000; i++) {
  //         int = Math.random() >= 0.5 ? 1 : 0;
  //         if (int === 1){
  //             one ++;
  //         } else {
  //             zero ++
  //         }
  //     }

  //     return one + " " + zero;
  //   }
});
