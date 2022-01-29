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
    let nbCells = $("td").length;
    //console.log("nb cells", nbCells);

    //3 Peupler les cellules du tableau
    //Test aléatoire : Pour chaque cellule, ajouter un état Accessible ou Inaccessible
    $("td").each(function (index, element) {
      let random = Math.floor(Math.random() * 10);
      if (random < 8) {
      //plus de la moitié de cellules sont accessibles
      // element == this
      $(element).addClass("w3-lime").attr("accessible", true);
      } else {
        $(element).addClass("w3-dark-gray").attr("accessible", false);
      }
    });

    //PERSO 1 : parmi les celllules accessibles en choisir une au hasard et la spécifiée comme personnage 1
    let accessibles = $("[accessible = true]");
    let pers1 = accessibles[Math.floor(Math.random() * accessibles.length)];
    $(pers1)
      .removeClass("w3-lime")
      .addClass("w3-pink")
      .removeAttr("accessible")
      .attr("name", "perso1")
      //.attr("isP1Turn", true)
      .attr("moves", 3);
    let player1 = $(pers1);

    player1.X = parseInt($(pers1).attr("x"));
    player1.Y = parseInt($(pers1).attr("y"));
    player1.name = $(pers1) .attr("name");
    player1.moves = parseInt($(pers1).attr("moves"));
    player1.turn = true;

    //PERSO2
    let pers2 = accessibles[Math.floor(Math.random() * accessibles.length)];
    $(pers2)
      .removeClass("w3-lime")
      .addClass("w3-blue")
      .removeAttr("accessible")
      .attr("name", "perso2")
      //.attr("isP2Turn", false)
      .attr("moves", 3);

    let player2 = $(pers2);
    player2.X = parseInt($(pers2).attr("x"));
    player2.Y = parseInt($(pers2).attr("y"));
    player2.name = $(pers2) .attr("name");
    player2.moves = parseInt($(pers2).attr("moves"));
    //player2.turn = $(pers2).attr("isP2Turn");
    player2.turn = false
    

    console.log("Generation player1", player1);
    console.log("Generation player2", player2);

    function checkMoves(player) {
      if (player.moves == 0) {
        console.log(player.name + " 0 mov");
        console.log(player);
        player.turn == false;
        console.log(player);
        alert("Dernier mouvement, " + player.name);
        //commencer tour suivant
      }
    }

    showInfo()

    function showInfo() {
      let turnInfoBox = $("#turnInfo");
      if (player1.turn == true) {
        turnInfoBox.removeClass("w3-blue").addClass("w3-pink");
        turnInfoBox.html('<p>Tour de <span class="w3-large">' + player1.name + "</span></p><p>Nombre de mouvements restants : " + player1.moves + "</p>"); 
      }
      else if (player2.turn == true) {
        turnInfoBox.removeClass("w3-pink").addClass("w3-blue");
        turnInfoBox.html('<p>Tour de <span class="w3-large">' + player2.name + "</span></p><p>Nombre de mouvements restants : " + player2.moves + "</p>"); 
      }
    }
    
    //turnInfoBox.html('<p>Tour de ' + player1.name + "</p><p>Nombre de mouvements restants : " + player1.moves + "</p>");

    move();
    function move() {
      $(document).keydown(function (e) {
        switch (e.which) {
          case 37: //left arrow key
          console.log('Debut G player1', player1);
          console.log('Debut G player2', player2);

          if (player1.X > 0 && player1.moves > 0 && player1.turn == true) {
            console.log("gauche P1 possible");
              player1.removeClass("w3-pink").addClass("w3-lime");
              player1.X -= 1;
              let x1 = player1.X;
              let y1 = player1.Y;
              let prevX1 = x1 + 1;

              player1.moves--;
              //checkMoves(player1);
              if (player1.moves == 0) {
                console.log("P1 0 mov");
                player2.turn = true;
                player1.turn = false;
                player2.moves = 3;
                console.log("P2" + player2.turn);
                //commencer tour suivant
              }
              let prevCell = $(
                "td[x= " + prevX1.toString() + "][y= " + y1.toString() + "]"
              );
              let nextCell = $(
                "td[x= " + x1.toString() + "][y= " + y1.toString() + "]"
              );
              console.log("P1 normal deplacement Gauche prevXPos", prevX1);
              prevCell.removeClass("w3-pink").addClass("w3-lime");

              //cas du déplacement sur cellule inaccessible
              if (nextCell.hasClass("w3-dark-gray")) {
                console.log("non access GP1 ");
                nextCell.effect("shake", { times: 4 }, 1000);
                player1.X++;
                player1.moves++;

                prevCell.removeClass("w3-lime").addClass("w3-pink");
              } 
              //cas du déplacement sur cellule accessible
              else if (nextCell.hasClass("w3-lime")) {
                console.log(" OK Gauche acces P1", nextCell);
                nextCell.removeClass("w3-lime").addClass("w3-pink");
                console.log(" Gauche acces P1", nextCell);
              }
              console.log("finG P1", player1);
          } else if (player2.X > 0 && player2.moves > 0 && player2.turn == true) {
            console.log("gauche P2 possible");
            player2.removeClass("w3-blue").addClass("w3-lime");
            player2.X -= 1;
            let x2 = player2.X;
            let y2 = player2.Y;
            let prevX2 = x2 + 1;

            player2.moves--;
            //checkMoves(player2);
            if (player2.moves == 0) {
              console.log("P2 0 mov");
              console.log("P1" + player1.turn);
              player1.turn = true;
              console.log("Dernier mouvement P2");
              console.log("P1" + player1.turn);
              console.log("P2" + player2.turn);
              player2.turn = false;
              player1.moves = 3;
              console.log("P2" + player2.turn);
              //commencer tour suivant
            }
            let prevCell = $(
              "td[x= " + prevX2.toString() + "][y= " + y2.toString() + "]"
            );
            let nextCell = $(
              "td[x= " + x2.toString() + "][y= " + y2.toString() + "]"
            );
            console.log(" normal deplacement Gauche prevXPos P2", prevX2);
            console.log(" nextCell P2", nextCell);
            prevCell.removeClass("w3-blue").addClass("w3-lime");

            //cas du déplacement sur cellule inaccessible
            if (nextCell.hasClass("w3-dark-gray")) {
              console.log("non access GP2 ");
              nextCell.effect("shake", { times: 4 }, 1000);
              console.log("player2", player2);
              player2.X++;
              player2.moves++;

              prevCell.removeClass("w3-lime").addClass("w3-blue");
            } 
            //cas du déplacement sur cellule accessible
            else if (nextCell.hasClass("w3-lime")) {
              console.log(" OK Gauche acces P2", nextCell);
              nextCell.removeClass("w3-lime").addClass("w3-blue");
              console.log(" Gauche acces P2", nextCell);
            }
            console.log("fin G P2", player2);
          }
            break;

          case 38: //up arrow key
            //console.log("debut H", player1.X, player1.Y);
            if (player1.Y > 0 && player1.moves > 0 && player1.turn == true) {
              console.log("Haut P1 possible");
              player1.Y -= 1;
              let x1 = player1.X;
              let y1 = player1.Y;
              let prevY1 = y1 + 1;

              player1.moves--;
              if (player1.moves == 0) {
                console.log("P1 0 mov");
                player2.turn = true;
                player1.turn = false;
                player2.moves = 3;
                console.log("P2" + player2.turn);
                //commencer tour suivant
              }
              
              let prevCell = $(
                "td[x= " + x1.toString() + "][y= " + prevY1.toString() + "]"
              );
              let nextCell = $(
                "td[x= " + x1.toString() + "][y= " + y1.toString() + "]"
              );
              console.log("P1 normal deplacement Haut prevY1", prevY1);
              prevCell.removeClass("w3-pink").addClass("w3-lime");

              //cas du déplacement sur cellule inaccessible
              if (nextCell.hasClass("w3-dark-gray")) {
                console.log("non access Haute");
                nextCell.effect("shake", { times: 4 }, 1000);
                //console.log('player1', player1);
                player1.Y++;
                player1.moves++;

                prevCell.removeClass("w3-lime").addClass("w3-pink");
              } else if (nextCell.hasClass("w3-lime")) {
                console.log("P1 OK acces Haut");
                nextCell.removeClass("w3-lime").addClass("w3-pink");
              }
            }
            else if (player2.Y > 0 && player2.moves > 0 && player2.turn == true) {
              console.log("H P2 possible");
              player2.Y -= 1;
              let x2 = player2.X;
              let y2 = player2.Y;
              let prevY2 = y2 + 1;

              player2.moves--;
              if (player2.moves == 0) {
                console.log("P2 0 mov");
                player1.turn = true;
                player2.turn = false;
                player1.moves = 3;
                console.log("P2" + player2.turn);
                //commencer tour suivant
              }

                let prevCell = $(
                  "td[x= " + x2.toString() + "][y= " + prevY2.toString() + "]"
                );
                let nextCell = $(
                  "td[x= " + x2.toString() + "][y= " + y2.toString() + "]"
                );
                console.log("P2 normal deplacement Haut prevY2", prevY2);
                prevCell.removeClass("w3-blue").addClass("w3-lime");
                
                //cas du déplacement sur cellule inaccessible
              if (nextCell.hasClass("w3-dark-gray")) {
                console.log("P2 non access Haute");
                nextCell.effect("shake", { times: 4 }, 1000);

                player2.Y++;
                player2.moves++;
                prevCell.removeClass("w3-lime").addClass("w3-blue");
              }
              //cas du déplacement sur cellule accessible
              else if (nextCell.hasClass("w3-lime")) {
                console.log("P2 OK acces Haut");
                nextCell.removeClass("w3-lime").addClass("w3-blue");
              }
              
            }
            console.log("fin HP1 ", player1);
            console.log("fin HP2 ", player2);
            
            break;

          case 39: //right arrow key
            //console.log("debut D", player1.X);
            console.log("Tour P1 D", player1.turn);
            console.log("Tour P1 D", player1.turn);
            if (player1.X < nbCols - 1 && player1.moves > 0 && player1.turn == true) {
              console.log("P1 droite possible");
              player1.removeClass("w3-pink").addClass("w3-lime");
              player1.X += 1;
              let x1 = player1.X;
              let y1 = player1.Y;
              let prevX1 = x1 - 1;

              player1.moves--;
              if (player1.moves == 0) {
                console.log("P1 0 mov");
                player2.turn = true;
                player1.turn = false;
                player2.moves = 3;
                console.log("P2" + player2.turn);
                //commencer tour suivant
              }
              let prevCell = $(
                "td[x= " + prevX1.toString() + "][y= " + y1.toString() + "]"
              );
              let nextCell = $(
                "td[x= " + x1.toString() + "][y= " + y1.toString() + "]"
              );

              prevCell.removeClass("w3-pink").addClass("w3-lime");

              //cas du déplacement sur cellule inaccessible
              if (nextCell.hasClass("w3-dark-gray")) {
                console.log("non access Droite P1");
                nextCell.effect("shake", { times: 4 }, 1000);
                player1.X--;
                player1.moves++;

                prevCell.removeClass("w3-lime").addClass("w3-pink");
              } 
              //cas du déplacement sur cellule accessible
              else if (nextCell.hasClass("w3-lime")) {
                console.log("OK Droite access P1");
                nextCell.removeClass("w3-lime").addClass("w3-pink");
              }
            }
            
            else if(player2.X < nbCols - 1 && player2.moves > 0 && player2.turn == true) {
              console.log("P2 droite possible");
              player2.removeClass("w3-blue").addClass("w3-lime");
              player2.X += 1;
              let x2 = player2.X;
              let y2 = player2.Y;
              let prevX2 = x2 - 1;

              player2.moves--;
              if (player2.moves == 0) {
                console.log("P2 0 mov");
                player1.turn = true;
                player2.turn = false;
                player1.moves = 3;
                console.log("P1" + player1.turn);
                //commencer tour suivant
              }
              let prevCell = $(
                "td[x= " + prevX2.toString() + "][y= " + y2.toString() + "]"
              );
              let nextCell = $(
                "td[x= " + x2.toString() + "][y= " + y2.toString() + "]"
              );
              prevCell.removeClass("w3-blue").addClass("w3-lime");

              //cas du déplacement sur cellule inaccessible
              if (nextCell.hasClass("w3-dark-gray")) {
                console.log("non access Droite P2");
                nextCell.effect("shake", { times: 4 }, 1000);
                player2.X--;
                player2.moves++;

                prevCell.removeClass("w3-lime").addClass("w3-blue");
              } 
              //cas du déplacement sur cellule accessible
              else if (nextCell.hasClass("w3-lime")) {
                console.log("OK Droite access P2");
                nextCell.removeClass("w3-lime").addClass("w3-blue");
              }
            }
            console.log("fin D P1", player1);
            console.log("fin D P2", player2);
            break;

          case 40: //bottom arrow key
            console.log("debut P1 B", player1.turn);
            console.log("debut P2 B", player2.turn);

            if (player1.Y < nbRows - 1 && player1.moves > 0 && player1.turn == true) {
              console.log("Bas P1 possible");
              player1.Y += 1;
              let x1 = player1.X;
              let y1 = player1.Y;
              let prevY1 = y1 - 1;

              player1.moves--;
              if (player1.moves == 0) {
                console.log("P1 0 mov");
                player2.turn = true;
                player1.turn = false;
                player2.moves = 3;
                console.log("P2" + player2.turn);
                //commencer tour suivant
              }

              let prevCell = $(
                "td[x= " + x1.toString() + "][y= " + prevY1.toString() + "]"
              );
              let nextCell = $(
                "td[x= " + x1.toString() + "][y= " + y1.toString() + "]"
              );
              console.log("P1 normal deplacement Bas prevY1", prevY1);
              prevCell.removeClass("w3-pink").addClass("w3-lime");

              //cas du déplacement sur cellule inaccessible
              if (nextCell.hasClass("w3-dark-gray")) {
                console.log("P1 non access Bas");
                nextCell.effect("shake", { times: 4 }, 1000);
                player1.Y--;
                player1.moves++;

                prevCell.removeClass("w3-lime").addClass("w3-pink");
              }//cas du déplacement sur cellule accessible 
              else if (nextCell.hasClass("w3-lime")) {
                console.log("P1 OK Bas access");
                nextCell.removeClass("w3-lime").addClass("w3-pink");
              }
            }
            else if (player2.Y < nbRows - 1 && player2.moves > 0 && player2.turn == true) {
              console.log("Bas P2 possible");
              player2.Y += 1;
              let x2 = player2.X;
              let y2 = player2.Y;
              let prevY2 = y2 - 1;

              player2.moves--;
              if (player2.moves == 0) {
                console.log("P2 0 mov");
                player1.turn = true;
                player2.turn = false;
                player1.moves = 3;
                console.log("P1" + player1.turn);
                //commencer tour suivant
              }

              let prevCell = $(
                "td[x= " + x2.toString() + "][y= " + prevY2.toString() + "]"
              );
              let nextCell = $(
                "td[x= " + x2.toString() + "][y= " + y2.toString() + "]"
              );
              console.log("P2 normal deplacement Bas prevY2", prevY2);
              prevCell.removeClass("w3-blue").addClass("w3-lime");

              //cas du déplacement sur cellule inaccessible
              if (nextCell.hasClass("w3-dark-gray")) {
                console.log("P2 non access Bas");
                nextCell.effect("shake", { times: 4 }, 1000);
                player2.Y--;
                player2.moves++;
                //TODO check turn state for players
                /* player1.turn = false;
                player2.turn = true; */

                prevCell.removeClass("w3-lime").addClass("w3-blue");
              }
              //cas du déplacement sur cellule accessible 
              else if (nextCell.hasClass("w3-lime")) {
                console.log("P2 OK Bas access");
                nextCell.removeClass("w3-lime").addClass("w3-blue");
              }
            }

            console.log("P1 fin B", player1);
            console.log("P2 fin B", player2);
            break;
        }
        console.log(player1);
        console.log(player2);
        //TODO attribuer player attr à pers1
        console.log("player1Turn", player1.turn);
        console.log("player2Turn", player2.turn);
        showInfo();
        //console.log("player1Turn", player1.turn);
      });
    }

  }

  $("#startBtn").click(function () {
    //Réinitialiser la grille
    $(function () {
      $("#gameTable").html("");
      startGame();
    });
  });
});
