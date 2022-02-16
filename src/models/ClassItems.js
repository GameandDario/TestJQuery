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



class Item {
  constructor(name, strength, src, className) {
    this.name = name;
    this.strength = strength;
    this.src = src;
    this.className = className;
  }
}
function prepareItem(element, object, instance) {
  element.removeClass("w3-lime").addClass("w3-brown w3-container w3-center").removeAttr("accessible").html("<img class='itemInChest w3-amber w3-round' src= '" + instance.src + "'>");
  element.X = parseInt(object.attr("x"));
  element.Y = parseInt(object.attr("y"));
  element.name = instance.name;
  element.strength = instance.strength;
  element.available = true;
  element.src = instance.src;
  element.class = instance.className;
}
const item1 = new Item("Hache", 20, "src/img/icons8-axe-25.png", "w3-brown");
const item2 = new Item("Kunaï", 15, "src/img/icons8-kunai-25.png", "w3-brown");
const item3 = new Item("Grenade", 25, "src/img/icons8-bomb-25.png", "w3-brown");
const item4 = new Item("Cobra", 30, "src/img/icons8-snake-25.png", "w3-brown");
