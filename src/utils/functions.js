//Montrer / Cacher les commandes
/* $("#flipCommandes").click(function () {
    $("#panelCommandes").slideToggle("slow");
  }); */

/* $("#flipCommandesCombat").click(function () {
    $("#panelCommandesCombat").slideToggle("slow");
  }); */

$(".flipBtn").click(function () {
  $(".flipPanel").slideToggle("slow", function () {
    if ($(this).is(":visible")) $(this).css("display", "inline-block");
  });
});

// Séléctionner aléatoirement le premier joueur
function isPlayer1Turn(playerA, playerB) {
  let randNb = Math.floor(Math.random() * 4); // 0, 1, 2, 3
  if (randNb % 2 == 0) {
    playerA.turn = true;
    playerB.turn = false;
  } else {
    playerA.turn = false;
    playerB.turn = true;
  }
}
//
function openWeaponModal() {
  let modal = $("#weaponModal");
  let closeBtn = $(".close");
  closeBtn.click(function () {
    modal.removeClass("w3-show").addClass("w3-hide");
  });

  modal.removeClass("w3-hide").addClass("w3-show");
}
//Equiper un joueur d'une nouvelle arme
function newPower(player, item) {
  if (player.turn == true && player.moves >= 0 && player.X == item.X && player.Y == item.Y && item.available == true) {
    //1° stocker l'arme portée par le joueur
    let leftItem = {}; 
    leftItem.name = player.weapon.name;
    leftItem.strength = player.weapon.strength;
    leftItem.src = player.weapon.src;
    console.log("leftItem", leftItem);
    item.attr("class","w3-yellow");
    //2° remplacer les valeurs de player.weapon  par item
    player.weapon.name = item.name;
    player.weapon.strength = item.strength;
    player.weapon.src = item.src;

    
    //3° remplacer les valeurs de item par leftItem
    item.src = leftItem.src;
    item.name = leftItem.name;
    item.strength = leftItem.strength;
    //item.attr("src",leftItem.src);
    console.log('item', item);
    item.html(
      "<img class='w3-badge w3-white w3-round' src= '" + leftItem.src + "'>"
    );
    //item.attr("class","w3-yellow");
    console.log("item", item);
    console.log("leftItem", leftItem);
    console.log("player.weapon", player.weapon);

   /*  //console.log("item", item.attr("class"));
    console.log("leftItem", leftItem);

    //modifier l'arme du joueur qui prend la valeur de item
    player.weapon = item;
    console.log("player.weapon", player.weapon);
    console.log("item", item);
    item.attr({
      name: leftItem.name,
      strength: leftItem.strength,
      src: leftItem.src,
      class: "w3-gray"
    });
    
    item.html(
      "<img class='w3-badge w3-white w3-round' src= '" + leftItem.src + "'>"
    );

    $("#modalWeaponText").append(
      '<p class="w3-text-white"> TEST' +
        player.name +
        " gagne " +
        player.weapon.name +
        " avec " +
        player.weapon.strength +
        " points de force.</p>"
    );
    openWeaponModal();
    leftItem = ''; */
    //alert(player.name + " gagne " + player.weapon.name + " avec " + player.weapon.strength + " points de force.");
    //item.available = false;
    //item prend la valeur de leftItem
    //item = leftItem;
    //console.log("item", item.src);
  }
}
//vérifier la position de player2 par rapport à player 1 lors de sa génération.
function checkPlayer2Pos(playerA, playerB) {
  //console.log("positionCombat", isPosCombat);
  let diffX = playerA.X - playerB.X;
  let diffY = playerA.Y - playerB.Y;
  console.log(" diffX", diffX);
  console.log(" diffY", diffY);
  if (diffX == 0 || diffX == 1 || diffX == -1) {
    console.log("X position X à changer");
  }
}

function showInfo(player1, player2) {
  let turnInfoBox = $("#turnInfo");

  if (player1.turn == true) {
    turnInfoBox.removeClass("w3-blue").addClass("w3-pink");
    turnInfoBox.html(
      '<p>Tour de <span class="w3-large">' +
        player1.name +
        "</span> Points de vie: " +
        player1.health +
        " </p><p>Nombre de mouvements restants : " +
        player1.moves +
        "</p><p>Arme équipée : " +
        player1.weapon.name +
        "</p><p>Force : " +
        player1.weapon.strength +
        "</p>"
    );
  } else if (player2.turn == true) {
    turnInfoBox.removeClass("w3-pink").addClass("w3-blue");
    turnInfoBox.html(
      '<p>Tour de <span class="w3-large">' +
        player2.name +
        "</span> Points de vie: " +
        player2.health +
        " </p><p>Nombre de mouvements restants : " +
        player2.moves +
        "</p><p>Arme équipée : " +
        player2.weapon.name +
        "</p><p>Force : " +
        player2.weapon.strength +
        "</p>"
    );
  }
}

function checkFightPos(playerA, playerB) {
  //console.log("positionCombat", isPosCombat);
  let positionCombat = false;
  let diffX = playerA.X - playerB.X;
  let diffY = playerA.Y - playerB.Y;
  if (
    (diffX <= 1 && diffX >= -1 && diffY == 0) ||
    (diffY <= 1 && diffY >= -1 && diffX == 0)
  ) {
    console.log(
      "fight  diffX: " +
        diffX +
        " diffY: " +
        diffY +
        " player1 : " +
        playerA.X +
        " " +
        playerA.Y +
        " player2 : " +
        playerB.X +
        " " +
        playerB.Y
    );
    //isPosCombat = true;
    positionCombat = true;
    console.log("positionCombat", positionCombat);
    stopMove(playerA, playerB);
    startFight(playerA, playerB);
    //return true;
  }
}

function stopMove(playerA, playerB) {
  console.log("mouvements bloqués");
  playerA.moves = 0;
  playerB.moves = 0;
}

function startFight(playerA, playerB) {
  console.log(
    "player1 : " +
      playerA.name +
      playerA.turn +
      " player2 : " +
      playerB.name +
      playerB.turn
  );
  $("#phase1").css("display", "none");
  $("#phase2").css("display", "block");
  fight(playerA, playerB);
}
