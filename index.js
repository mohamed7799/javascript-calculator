let calculator = {
  shownValue: "0",
  currentOperation: "",
  firstValue: 0,
  onhold: false,
  opDone:false,
  add: (x, y) => {
    return x + y;
  },
  sub: (x, y) => {
    return x - y;
  },
  mul: (x, y) => {
    return x * y;
  },
  div: (x, y) => {
    return x / y;
  },
  clear: function() {
    this.shownValue = "0";
  },
  percentage: function() {
    this.shownValue /= 100;
  },
  equal: function(currentOperation, x) {
    this.shownValue = currentOperation(x, this.shownValue);
  }
};
/* dom varables*/
let numbers = [...document.getElementsByClassName("num-js")];
let operations = [...document.getElementsByClassName("op-js")];
let screen = document.getElementById("CS-js");
let clear = document.getElementById("clear-js");
let percentage = document.getElementById("percentage-js");
let equal = document.getElementById("equal");

let update = () => {
  screen.innerText = calculator.shownValue;
};

clear.addEventListener("click", () => {
  calculator.clear();
  update();
});

percentage.addEventListener("click", () => {
  calculator.shownValue = parseFloat(calculator.shownValue);
  calculator.percentage();
  update();
});

//handling operations
operations.forEach(op => {
  op.addEventListener("click", e => {
    if (!calculator.onhold) {
      calculator.currentOperation = e.target.id;
      calculator.firstValue = parseFloat(calculator.shownValue);
      calculator.shownValue = "0";
    }

    calculator.onhold = true;
  });
});

//handling numbers
numbers.forEach(num => {
  num.addEventListener("click", event => {
    let targetValue = event.target.innerText;
    if (calculator.shownValue === "0"||calculator.opDone===true) {
      calculator.shownValue = targetValue;
      calculator.opDone=false;
      update();
    } else {
      if (!(targetValue === "." && calculator.shownValue.includes("."))) {
        calculator.shownValue += targetValue;
        update();
      }
    }
  });
});

//getting results
equal.addEventListener("click", () => {
  calculator.shownValue = parseFloat(calculator.shownValue);
  calculator.equal(
    calculator[`${calculator.currentOperation}`],
    calculator.firstValue
  );
  console.log(calculator.firstValue,calculator.shownValue)
  update();
  calculator.firstValue = calculator.shownValue;
  calculator.onhold = false;
  calculator.opDone = true;
});
