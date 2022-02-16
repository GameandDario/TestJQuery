class Perso {
  constructor(name, playerClass, moves, health, weapon, onDefend, src) {
    this.name = name;
    this.playerClass = playerClass;
    this.moves = moves;
    this.health = health;
    this.weapon = weapon;
    this.onDefend = onDefend;
    this.src = src;
  }
}

function preparePlayer(element, object, instance) {
  element
    .removeClass("w3-lime")
    .addClass(instance.playerClass)
    .removeAttr("accessible");
  element.X = parseInt(object.attr("x"));
  element.Y = parseInt(object.attr("y"));
  element.name = instance.name;
  element.playerClass = instance.playerClass;
  element.moves = instance.moves;
  element.strength = instance.weapon.strength;
  element.health = instance.health;
  element.weapon = instance.weapon;
  element.onDefend = instance.onDefend;
  element.src = instance.src;
}
const p1 = new Perso(
  "Pink1",
  "w3-pink",
  3,
  100,
  {
    name: "Arme lambda",
    strength: 10,
    src: "src/img/icons8-saber-weapon-25.png",
  },
  false,
  "src/img/guy1.png"
);
const p2 = new Perso(
  "Blue2",
  "w3-blue",
  3,
  100,
  {
    name: "Arme lambda",
    strength: 10,
    src: "src/img/icons8-saber-weapon-25.png",
  },
  false,
  "src/img/portraitCaptain.png"
);
//test const p3 = new Perso("Toto", "w3-white", 3, { name: "TTTT", strength: 15 }, "toto.jpg");
// Version function

/*    let pers1 = accessibles[Math.floor(Math.random() * accessibles.length)];
    $(pers1)
      .removeClass("w3-lime")
      .addClass("w3-pink")
      .removeAttr("accessible")
      .attr("name", "perso1")
      .attr("moves", 3);
    let player1 = $(pers1);

     player1.X = parseInt($(pers1).attr("x"));
    player1.Y = parseInt($(pers1).attr("y"));
    player1.name = $(pers1).attr("name");
    player1.moves = parseInt($(pers1).attr("moves"));
    player1.health = 10;
    player1.weapon = { name: "lambda", strength: 10 }; */

//PERSO2
// let pers2 = "";
/*  function createPerso2() {
      pers2 = accessibles[Math.floor(Math.random() * accessibles.length)];
      $(pers2)
      .removeClass("w3-lime")
      .addClass("w3-blue")
      .removeAttr("accessible")
      .attr("name", "perso2")
      .attr("moves", 3);
    }
    createPerso2(); */

/*    let player2 = $(pers2);

    player2.X = parseInt($(pers2).attr("x"));
    player2.Y = parseInt($(pers2).attr("y"));
    player2.name = $(pers2).attr("name");
    player2.moves = parseInt($(pers2).attr("moves"));
    player2.health = 10;
    player2.weapon = { name: "lambda", strength: 10 }; */

//Test position pers2
