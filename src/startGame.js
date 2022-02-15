$(function () {
  startGame();

  function startGame() {
    let nbRows = Math.floor(Math.random() * 12 + 6);
    let nbCols = Math.floor(Math.random() * 8 + 4);
    //1 Générer les lignes et colonnes  d'un tableau
    for (let i = 0; i < nbRows; i++) {
      $("#gameTable").append("<tr>" + "resTR" + i + "</tr>");
      for (let ii = 0; ii < nbCols; ii++) {
        //2 Générer les cellules dans le tableau
        let td = "<td x=" + ii + " y=" + i + "></td>";

        $("#gameTable").append(td);
      }
    }

    //3 Peupler les cellules du tableau
    //Test aléatoire : Pour chaque cellule, ajouter un état Accessible ou Inaccessible
    $("td").each(function (index, $this) {
      //$this peut être remplacé element ou autre nom
      let random = Math.floor(Math.random() * 10);
      if (random < 8) {
        //plus de la moitié de cellules sont accessibles
        $($this).addClass("w3-lime").attr("accessible", true);
      } else {
        $($this).addClass("w3-dark-gray").attr("accessible", false);
        $($this).acc = false;
      }
    });

    let accessibles = $("[accessible = true]");

    // instancier 4 items armes via ClassItems.js
    let hache = accessibles[Math.floor(Math.random() * accessibles.length)];
    let itemHache = $(hache);
    prepareItem(itemHache, $(hache), item1);

    let kunai = accessibles[Math.floor(Math.random() * accessibles.length)];
    let itemKunai = $(kunai);
    prepareItem(itemKunai, $(kunai), item2);

    let grenade = accessibles[Math.floor(Math.random() * accessibles.length)];
    let itemGrenade = $(grenade);
    prepareItem(itemGrenade, $(grenade), item3);

    let cobra = accessibles[Math.floor(Math.random() * accessibles.length)];
    let itemCobra = $(cobra);
    prepareItem(itemCobra, $(cobra), item4);

/*     console.log("itemHache", itemHache);
  console.log("itemKunai", itemKunai);
  console.log("itemGrenade", itemGrenade);
  console.log("itemCobra", itemCobra); */

    //ajouter comme accessibles les cellules qui ne contiennetn pas la classe réservée aux items
    accessibles = $("[accessible = true][class!='w3-brown']");

    //PERSO 1 : parmi les celllules accessibles en choisir une au hasard et la spécifiée comme personnage 1
    let perso1 = accessibles[Math.floor(Math.random() * accessibles.length)];
    let player1 = $(perso1);
    preparePlayer(player1, $(perso1), p1);

    let perso2 = accessibles[Math.floor(Math.random() * accessibles.length)];
    let player2 = $(perso2);

    preparePlayer(player2, $(perso2), p2); //(element, object, instance)
    perso2 = null;

    //vérifier la position de player2 par rapport à player 1 lors de sa génération. Régénérer player2 si trop proche
    let diffX = player1.X - player2.X;
    let diffY = player1.Y - player2.Y;
    console.log(" diffX", diffX);
    console.log(" diffY", diffY);

    if (
      (diffX == 0 && diffY == 0) ||
      (diffX == 1 && diffY == 0) ||
      (diffX == -1 && diffY == 0) ||
      (diffY == 0 && diffX == 0) ||
      (diffY == 1 && diffX == 0) ||
      (diffY == -1 && diffX == 0)
    ) {
      console.log("trop proche");
      $(function () {
        location.reload();
      });
    }

    isPlayer1Turn(player1, player2);

    console.log("Generation player1", player1);
    console.log("Generation player2", player2);

    showInfo(player1, player2);

    function changeTurn() {
      console.log("debut CT player1", player1);
      console.log("debut CT player2", player2);
      if (player1.moves == 3 && player1.turn == true) {
        alert("Vous devez vous déplacez au moins une fois, " + player1.name);
      } else if (player2.moves == 3 && player2.turn == true) {
        alert("Vous devez vous déplacez au moins une fois, " + player2.name);
      } else if (player1.moves < 3 && player1.turn == true) {
        console.log("P1 true");
        player1.turn = false;
        player2.turn = true;
        player2.moves = 3;
        player1.moves = 0;
        showInfo(player1, player2);
      } else if (player2.moves < 3 && player2.turn == true) {
        console.log("P2 true");
        player2.turn = false;
        player1.turn = true;
        player1.moves = 3;
        player2.moves = 0;
        showInfo(player1, player2);
      }
    }
    move();

    function move() {
      $(document).keydown(function (e) {
        if (checkFightPos(player1, player2)) {
          console.log("Combat");
          return;
        } else {
          switch (e.which) {
            case 37: //left arrow key
              if (player1.X > 0 && player1.moves > 0 && player1.turn == true) {
                player1.removeClass("w3-pink w3-card").addClass("w3-lime");
                player1.X -= 1;
                let x1 = player1.X;
                let y1 = player1.Y;
                let prevX1 = x1 + 1;

                player1.moves--;

                let prevCell = $(
                  "td[x= " + prevX1.toString() + "][y= " + y1.toString() + "]"
                );
                let nextCell = $(
                  "td[x= " + x1.toString() + "][y= " + y1.toString() + "]"
                );
                prevCell.removeClass("w3-pink  w3-card").addClass("w3-lime");

                //cas du déplacement sur cellule inaccessible
                if (nextCell.hasClass("w3-dark-gray")) {
                  nextCell.effect("shake", { times: 4 }, 1000);
                  player1.X++;
                  player1.moves++;

                  prevCell.removeClass("w3-lime").addClass("w3-pink w3-card");
                }
                //cas du déplacement sur cellule accessible
                else if (nextCell.hasClass("w3-lime")) {
                  nextCell.removeClass("w3-lime").addClass("w3-pink w3-card");
                }
                if (player1.moves == 0) {
                  player2.turn = true;
                  player1.turn = false;
                  player2.moves = 3;
                }
              } else if (
                player2.X > 0 &&
                player2.moves > 0 &&
                player2.turn == true
              ) {
                player2.removeClass("w3-blue w3-card").addClass("w3-lime");
                player2.X -= 1;
                let x2 = player2.X;
                let y2 = player2.Y;
                let prevX2 = x2 + 1;

                player2.moves--;

                let prevCell = $(
                  "td[x= " + prevX2.toString() + "][y= " + y2.toString() + "]"
                );
                let nextCell = $(
                  "td[x= " + x2.toString() + "][y= " + y2.toString() + "]"
                );
                prevCell.removeClass("w3-blue w3-card").addClass("w3-lime");

                //cas du déplacement sur cellule inaccessible
                if (nextCell.hasClass("w3-dark-gray")) {
                  nextCell.effect("shake", { times: 4 }, 1000);
                  player2.X++;
                  player2.moves++;

                  prevCell.removeClass("w3-lime").addClass("w3-blue w3-card");
                }
                //cas du déplacement sur cellule accessible
                else if (nextCell.hasClass("w3-lime")) {
                  nextCell.removeClass("w3-lime").addClass("w3-blue w3-card");
                }
                if (player2.moves == 0) {
                  player1.turn = true;
                  player2.turn = false;
                  player1.moves = 3;
                }
              }
              break;

            case 38: //up arrow key
              if (player1.Y > 0 && player1.moves > 0 && player1.turn == true) {
                player1.Y -= 1;
                let x1 = player1.X;
                let y1 = player1.Y;
                let prevY1 = y1 + 1;

                player1.moves--;

                let prevCell = $(
                  "td[x= " + x1.toString() + "][y= " + prevY1.toString() + "]"
                );
                let nextCell = $(
                  "td[x= " + x1.toString() + "][y= " + y1.toString() + "]"
                );
                prevCell.removeClass("w3-pink w3-card").addClass("w3-lime");
                //cas du déplacement sur cellule inaccessible
                if (nextCell.hasClass("w3-dark-gray")) {
                  nextCell.effect("shake", { times: 4 }, 1000);
                  player1.Y++;
                  player1.moves++;

                  prevCell.removeClass("w3-lime").addClass("w3-pink w3-card");
                } else if (nextCell.hasClass("w3-lime")) {
                  nextCell.removeClass("w3-lime").addClass("w3-pink w3-card");
                }
                if (player1.moves == 0) {
                  player2.turn = true;
                  player1.turn = false;
                  player2.moves = 3;
                }
              } else if (
                player2.Y > 0 &&
                player2.moves > 0 &&
                player2.turn == true
              ) {
                player2.Y -= 1;
                let x2 = player2.X;
                let y2 = player2.Y;
                let prevY2 = y2 + 1;

                player2.moves--;

                let prevCell = $(
                  "td[x= " + x2.toString() + "][y= " + prevY2.toString() + "]"
                );
                let nextCell = $(
                  "td[x= " + x2.toString() + "][y= " + y2.toString() + "]"
                );
                prevCell.removeClass("w3-blue w3-card").addClass("w3-lime");

                //cas du déplacement sur cellule inaccessible
                if (nextCell.hasClass("w3-dark-gray")) {
                  nextCell.effect("shake", { times: 4 }, 1000);

                  player2.Y++;
                  player2.moves++;
                  prevCell.removeClass("w3-lime").addClass("w3-blue w3-card");
                }
                //cas du déplacement sur cellule accessible
                else if (nextCell.hasClass("w3-lime")) {
                  nextCell.removeClass("w3-lime").addClass("w3-blue w3-card");
                }
                if (player2.moves == 0) {
                  player1.turn = true;
                  player2.turn = false;
                  player1.moves = 3;
                }
              }

              break;

            case 39: //right arrow key
              if (
                player1.X < nbCols - 1 &&
                player1.moves > 0 &&
                player1.turn == true
              ) {
                player1.removeClass("w3-pink w3-card").addClass("w3-lime");
                player1.X += 1;
                let x1 = player1.X;
                let y1 = player1.Y;
                let prevX1 = x1 - 1;

                player1.moves--;

                let prevCell = $(
                  "td[x= " + prevX1.toString() + "][y= " + y1.toString() + "]"
                );
                let nextCell = $(
                  "td[x= " + x1.toString() + "][y= " + y1.toString() + "]"
                );

                prevCell.removeClass("w3-pink w3-card").addClass("w3-lime");

                //cas du déplacement sur cellule inaccessible
                if (nextCell.hasClass("w3-dark-gray")) {
                  nextCell.effect("shake", { times: 4 }, 1000);
                  player1.X--;
                  player1.moves++;

                  prevCell.removeClass("w3-lime").addClass("w3-pink w3-card");
                }
                //cas du déplacement sur cellule accessible
                else if (nextCell.hasClass("w3-lime")) {
                  nextCell.removeClass("w3-lime").addClass("w3-pink w3-card");
                }
                if (player1.moves == 0) {
                  player2.turn = true;
                  player1.turn = false;
                  player2.moves = 3;
                }
              } else if (
                player2.X < nbCols - 1 &&
                player2.moves > 0 &&
                player2.turn == true
              ) {
                player2.removeClass("w3-blue w3-card").addClass("w3-lime");
                player2.X += 1;
                let x2 = player2.X;
                let y2 = player2.Y;
                let prevX2 = x2 - 1;

                player2.moves--;

                let prevCell = $(
                  "td[x= " + prevX2.toString() + "][y= " + y2.toString() + "]"
                );
                let nextCell = $(
                  "td[x= " + x2.toString() + "][y= " + y2.toString() + "]"
                );
                prevCell.removeClass("w3-blue w3-card").addClass("w3-lime");

                //cas du déplacement sur cellule inaccessible
                if (nextCell.hasClass("w3-dark-gray")) {
                  //console.log("non access Droite P2");
                  nextCell.effect("shake", { times: 4 }, 1000);
                  player2.X--;
                  player2.moves++;

                  prevCell.removeClass("w3-lime").addClass("w3-blue w3-card");
                }
                //cas du déplacement sur cellule accessible
                else if (nextCell.hasClass("w3-lime")) {
                  nextCell.removeClass("w3-lime").addClass("w3-blue w3-card");
                }
                //vérifier le nombre de mouvements possibles et changer de tour au besoin + réinitialiser le nombre de mouvements autorisés
                if (player2.moves == 0) {
                  player1.turn = true;
                  player2.turn = false;
                  player1.moves = 3;
                }
              }
              break;

            case 40: //bottom arrow key
              if (
                player1.Y < nbRows - 1 &&
                player1.moves > 0 &&
                player1.turn == true
              ) {
                player1.Y += 1;
                let x1 = player1.X;
                let y1 = player1.Y;
                let prevY1 = y1 - 1;

                player1.moves--;

                let prevCell = $(
                  "td[x= " + x1.toString() + "][y= " + prevY1.toString() + "]"
                );
                let nextCell = $(
                  "td[x= " + x1.toString() + "][y= " + y1.toString() + "]"
                );
                //console.log("P1 normal deplacement Bas prevY1", prevY1);
                prevCell.removeClass("w3-pink w3-card").addClass("w3-lime");

                //cas du déplacement sur cellule inaccessible
                if (nextCell.hasClass("w3-dark-gray")) {
                  nextCell.effect("shake", { times: 4 }, 1000);
                  player1.Y--;
                  player1.moves++;

                  prevCell.removeClass("w3-lime").addClass("w3-pink w3-card");
                }
                //cas du déplacement sur cellule accessible
                else if (nextCell.hasClass("w3-lime")) {
                  nextCell.removeClass("w3-lime").addClass("w3-pink w3-card");
                }
                //vérifier le nombre de mouvements possibles et changer de tour au besoin + réinitialiser le nombre de mouvements autorisés
                if (player1.moves == 0) {
                  player2.turn = true;
                  player1.turn = false;
                  player2.moves = 3;
                }
              } else if (
                player2.Y < nbRows - 1 &&
                player2.moves > 0 &&
                player2.turn == true
              ) {
                player2.Y += 1;
                let x2 = player2.X;
                let y2 = player2.Y;
                let prevY2 = y2 - 1;

                player2.moves--;

                let prevCell = $(
                  "td[x= " + x2.toString() + "][y= " + prevY2.toString() + "]"
                );
                let nextCell = $(
                  "td[x= " + x2.toString() + "][y= " + y2.toString() + "]"
                );

                prevCell.removeClass("w3-blue w3-card").addClass("w3-lime");

                //cas du déplacement sur cellule inaccessible
                if (nextCell.hasClass("w3-dark-gray")) {
                  nextCell.effect("shake", { times: 4 }, 1000);
                  player2.Y--;
                  player2.moves++;

                  prevCell.removeClass("w3-lime").addClass("w3-blue w3-card");
                }
                //cas du déplacement sur cellule accessible
                else if (nextCell.hasClass("w3-lime")) {
                  nextCell.removeClass("w3-lime").addClass("w3-blue w3-card");
                }
                //vérifier le nombre de mouvements possibles et changer de tour au besoin + réinitialiser le nombre de mouvements autorisés
                if (player2.moves == 0) {
                  player1.turn = true;
                  player2.turn = false;
                  player1.moves = 3;
                }
              }
              break;
          }
        }
        newPower(player1, itemHache);
        newPower(player1, itemKunai);
        newPower(player1, itemGrenade);
        newPower(player1, itemCobra);
        newPower(player2, itemHache);
        newPower(player2, itemKunai);
        newPower(player2, itemGrenade);
        newPower(player2, itemCobra);
        showInfo(player1, player2);

        checkFightPos(player1, player2);
      });
      // Changer de tour au click
      $("#nextBtn").click(function () {
        changeTurn();
      });
    }
  }

  //Réinitialiser la grille
  //TODO vérifier réinitilisation complète
  $("#startBtn").click(function () {
    $(function () {
      location.reload();
    });
  });
});
