//Montrer / Cacher les commandes
$("#flipCommandes").click(function () {
    $("#panelCommandes").slideToggle("slow");
  });

$("#flipCommandesCombat").click(function () {
    $("#panelCommandesCombat").slideToggle("slow");
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

  function newPower(player, item) {
    if (player.X == item.X && player.Y == item.Y && item.available == true) {
      player.weapon.strength = item.strength;
      player.weapon.name = item.name;
      alert(player.name + " gagne " + item.name);
      item.available = false;
      item.removeClass("w3-brown").addClass("w3-grey");
    }
  }

  function checkPlayer2Pos(playerA, playerB) {
    //console.log("positionCombat", isPosCombat);
    let diffX = playerA.X - playerB.X;
    let diffY = playerA.Y - playerB.Y;
    console.log(' diffX',  diffX);
    console.log(' diffY',  diffY);
    if(diffX == 0 || diffX == 1 || diffX == -1 ) {
      console.log('X position X à changer')
    } 
    

    /* if ((diffX <= 1 && diffY == 0) ||  (diffX >= -1 && diffY == 0) ||( diffY <= 1 &&  diffX == 0) || (diffY >= -1 && diffX == 0)) {
      console.log('position à changer')
      playerB.X += 2;
      playerB.Y += 2;
      //Todo vérifier que le positionnenement nouveau soit sur case avec class w3-lime
    } */
  }

  function showInfo(player1, player2) {
    let turnInfoBox = $("#turnInfo");
    
    if (player1.turn == true) {
      turnInfoBox.removeClass("w3-blue").addClass("w3-pink");
      turnInfoBox.html(
        '<p>Tour de <span class="w3-large">' +
          player1.name +
          '</span> Points de vie: ' + player1.health + ' </p><p>Nombre de mouvements restants : ' +
          player1.moves +
          '</p><p>Arme équipée : ' +
          player1.weapon.name +
          '</p><p>Force : ' +
          player1.weapon.strength +
          '</p>'
      );
    } else if (player2.turn == true) {
      turnInfoBox.removeClass("w3-pink").addClass("w3-blue");
      turnInfoBox.html(
        '<p>Tour de <span class="w3-large">' +
          player2.name +
          '</span> Points de vie: ' + player2.health + ' </p><p>Nombre de mouvements restants : ' +
          player2.moves +
          '</p><p>Arme équipée : ' +
          player2.weapon.name +
          '</p><p>Force : ' +
          player2.weapon.strength +
          '</p>'
      );
    }
  }
  

  function checkFightPos(playerA, playerB) {
    //console.log("positionCombat", isPosCombat);
    let positionCombat = false;
    let diffX = playerA.X - playerB.X;
    let diffY = playerA.Y - playerB.Y;
    if ((diffX <= 1 &&  diffX >= -1 && diffY == 0) ||( diffY <= 1 && diffY >= -1 && diffX == 0)) {
      console.log("fight  diffX: " + diffX + " diffY: " + diffY + " player1 : " + playerA.X + " "+ playerA.Y + " player2 : " + playerB.X + " "+ playerB.Y )
      //isPosCombat = true;
      positionCombat = true;
      console.log("positionCombat", positionCombat);
      stopMove(playerA, playerB);
      startFight(playerA, playerB);
      //return true;
    }
  }



  function stopMove(playerA, playerB) {
    console.log('mouvements bloqués');
    playerA.moves = 0;
    playerB.moves = 0;
  }

  function startFight(playerA, playerB) {
    console.log('player1 : ' + playerA.name + playerA.turn + ' player2 : ' + playerB.name + playerB.turn );
    $('#phase1').css('display', 'none');
    $('#phase2').css('display', 'block');
    fight(playerA, playerB);
  }