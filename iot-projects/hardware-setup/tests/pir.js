const g = require("onoff").Gpio;
const s = new g(4, "in", "both");
const l1 = new g(16, "out");
const l2 = new g(21, "out");

s.watch((e, v) => {
  if (e) exit(e);
  if (v) {
    l2.write(1), function () {
      console.log("there is someone!");
    }
  } else {
    l2.write(0, function () {
      console.log("not anymore!");
    });
  }
});

function exit() {
  s.unexport();

  function wrap() {
    return function () {
      console.dir("Bye, bye!");
      process.exit();
    };
  }
  wrap()();
}
process.on("SIGINT", exit);
