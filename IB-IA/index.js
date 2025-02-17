$(document).ready(function () {
  $("#random").on("click", handleClick);
  $("#one").on("click", select1);
  $("#zero").on("click", select0);
  let myBet = null;
  const arr = [];



  function select1() {
    myBet = 1;
    $("#one").css("background-color", "#3fa7d6");
    $("#zero").css("background-color", "#92d1c3");
  }

  function select0() {
    myBet = 0;
    $("#zero").css("background-color", "#3fa7d6");
    $("#one").css("background-color", "#92d1c3");
  }

  function handleClick() {
    console.log(randomize());;
    $("#counter").text("Counter:\n" + arr.length);
  }

  function randomize() {
    if (arr.length >= 300) {
      return "300 values recorded";
    }
    if (myBet === null) {
      alert("Please select a number to continue.");
      return;
    }
    int = Math.random() >= 0.5 ? 1 : 0;
    $("#num").text(int);
    const obj = { bet: myBet, result: int };
    arr.push(obj);
    return obj;
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
