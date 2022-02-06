// Initializing a constructor function
/* function Hero(name, level) {
    this.name = name;
    this.level = level;
} */

// Initializing a class definition
/* class Hero {
    constructor(name, level) {
        this.name = name;
        this.level = level;
    }
} */

function Hello() {
  console.log("Hello from ClassItems");
}

class Item {
  constructor(name, strength, src) {
    this.name = name;
    this.strength = strength;
    this.src = src;
  }
}
function prepareItem(element, object, instance) {
  element.removeClass("w3-lime").addClass("w3-brown").removeAttr("accessible");
  element.X = parseInt(object.attr("x"));
  element.Y = parseInt(object.attr("y"));
  element.name = instance.name;
  element.strength = instance.strength;
  element.available = true;
}
const item1 = new Item("Hache", 15, "hache.jpg");
const item2 = new Item("Kunaï", 20, "kunai.jpg");
const item3 = new Item("Grenade", 25, "grenade.jpg");
const item4 = new Item("Cobra", 30, "cobra.jpg");
