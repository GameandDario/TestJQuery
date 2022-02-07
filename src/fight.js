function fight(playerA, playerB) {
  $("header").removeClass("w3-teal").addClass("w3-flat-pomegranate");
  let content = ``;
  content += `
    <div class='w3-container'>
        <h3>Qui commence : `;
  if (playerA.turn) {
    content += ` Au tour de ` + playerA.name + `</h3> `;
  } else if (playerB.turn) {
    content += ` Au tour de ` + playerB.name + `</h3> `;
  }
  content +=
    `
    <div class="w3-row-padding">
        <div class="w3-half">
            <div id='player1-wrapper' class='w3-card-4 w3-flat-concrete w3-round  w3-border'>
                <div class='w3-container w3-center'>
                    <h4 class='w3-bottombar w3-border-pink w3-wide'> ` +
    playerA.name +
    `</h4>
                    <img class='w3-round player-img' src='` +
    playerA.src +
    `' alt='` +
    playerA.name +
    `Avatar'>
                    <p> Points de vie ` +
    playerA.health +
    `</p>
                    <li class="w3-bar">
                        <img src="src/img/question.png" class="w3-bar-item w3-circle" style="width:85px">
                        <div class="w3-bar-item">
                            <span class="w3-large">` +
    playerA.weapon.name +
    ` Force : ` +
    playerA.weapon.strength +
    `</span><br>
                        </div>
                    </li>
                    <div class="w3-bar">
                        <button id = "P1_Attack" class="w3-button w3-red player1-btn">Attaquer</button>
                        <button id = "P1_Defend" class="w3-button w3-black player1-btn">Défendre</button>
                    </div> 
                </div>
            </div>
        </div>

        <div class="w3-half">
            <div id='player2-wrapper' class='w3-card-4 w3-flat-concrete w3-round w3-border'>
                <div class='w3-container w3-center'>
                    <h4 class=''w3-bottombar w3-border-blue w3-wide'> ` +
    playerB.name +
    `</h4>
                    <img class='w3-round player-img' src='` +
    playerB.src +
    `' alt='` +
    playerB.name +
    `Avatar'>
                    <p> Points de vie ` +
    playerB.health +
    `</p>
                    <li class="w3-bar">
                        <img src="src/img/question.png" class="w3-bar-item w3-circle" style="width:85px">
                        <div class="w3-bar-item">
                            <span class="w3-large">` +
    playerB.weapon.name +
    ` Force : ` +
    playerB.weapon.strength +
    `</span>
                        </div>
                    </li>
                    <div class="w3-bar">
                        <button id = "P2_Attack" class="w3-button w3-red player2-btn">Attaquer</button>
                        <button id = "P2_Defend" class="w3-button w3-black player2-btn">Défendre</button>
                    </div> 
                </div>
            </div>
        </div>
    </div>    
</div>
  `;

  $("#fightZone").append(content);
  checkPlayerTurn(playerA, playerB);

  function checkPlayerTurn(playerA, playerB) {
    if (playerA.turn) {
      $("#player1-wrapper").removeClass("w3-flat-concrete").addClass("w3-pink");
      $("#player2-wrapper").removeClass("w3-blue").addClass("w3-flat-concrete");
      $(".player1-btn").removeClass("w3-disabled");
      $(".player2-btn").addClass("w3-disabled");
    } else if (playerB.turn) {
      $("#player2-wrapper").removeClass("w3-flat-concrete").addClass("w3-blue");
      $("#player1-wrapper").removeClass("w3-pink").addClass("w3-flat-concrete");
      $(".player2-btn").removeClass("w3-disabled");
      $(".player1-btn").addClass("w3-disabled");
    }
  }

  let fightInfoBox = $("#fightInfo");

  $("#P1_Attack").click(function () {
    fightInfoBox.removeClass("w3-blue").addClass("w3-pink");
    fightInfoBox.html(
      '<p><span class="w3-large"> ' +
        playerA.name +
        "</span> donne un coup de " +
        playerA.weapon.name +
        " pour " +
        playerA.weapon.strength +
        " points de dégats ! </p>"
    );
    $(".player1-btn").addClass("w3-disabled");
    $(".player2-btn").removeClass("w3-disabled");
    playerA.turn = false;
    playerB.turn = true;
    checkPlayerTurn(playerA, playerB);
    console.log(
      "player1 : " +
        playerA.name +
        playerA.turn +
        " player2 : " +
        playerB.name +
        playerB.turn
    );
  });

  //function p1Defend(player1, player2) {
  $("#P1_Defend").click(function () {
    fightInfoBox.removeClass("w3-blue").addClass("w3-pink");
    fightInfoBox.html(
      '<p><span class="w3-large"> ' +
        playerA.name +
        "</span> choisit la défense ! </p>"
    );
    $(".player1-btn").addClass("w3-disabled");
    $(".player2-btn").removeClass("w3-disabled");
    playerA.turn = false;
    playerB.turn = true;
    checkPlayerTurn(playerA, playerB);
    console.log(
      "player1 : " +
        playerA.name +
        playerA.turn +
        " player2 : " +
        playerB.name +
        playerB.turn
    );
  });
  //}

  //function p2Attack(player1, player2) {
  $("#P2_Attack").click(function () {
    fightInfoBox.removeClass("w3-pink").addClass("w3-blue");
    fightInfoBox.html(
      '<p><span class="w3-large"> ' +
        playerB.name +
        "</span> donne un coup de " +
        playerB.weapon.name +
        " pour " +
        playerB.weapon.strength +
        " points de dégats ! </p>"
    );
    $(".player2-btn").addClass("w3-disabled");
    $(".player1-btn").removeClass("w3-disabled");
    playerB.turn = false;
    playerA.turn = true;
    checkPlayerTurn(playerA, playerB);
    console.log(
      "player1 : " +
        playerA.name +
        playerA.turn +
        " player2 : " +
        playerB.name +
        playerB.turn
    );
  });
  //}
  //function p2Defend(player1, player2) {
  $("#P2_Defend").click(function () {
    fightInfoBox.removeClass("w3-pink").addClass("w3-blue");
    fightInfoBox.html(
      '<p><span class="w3-large"> ' +
        playerB.name +
        "</span> choisit la défense ! </p>"
    );
    $(".player2-btn").addClass("w3-disabled");
    $(".player1-btn").removeClass("w3-disabled");
    playerB.turn = false;
    playerA.turn = true;
    checkPlayerTurn(playerA, playerB);
    console.log(
      "player1 : " +
        playerA.name +
        playerA.turn +
        " player2 : " +
        playerB.name +
        playerB.turn
    );
  });
  //}

  showFightInfo(playerA, playerB);

  function showFightInfo(player1, player2) {
    if (player1.turn == true) {
      fightInfoBox.removeClass("w3-blue").addClass("w3-pink");
      fightInfoBox.html(
        '<p>Tour de <span class="w3-large">' +
          player1.name +
          "</span> Points de vie:" +
          player1.health +
          " </p><p>Arme équipée : " +
          player1.weapon.name +
          "</p><p>Force : " +
          player1.weapon.strength +
          "</p>"
      );
      /* p1Attack(player1, player2);
      p1Defend(player1, player2); */
    } else if (player2.turn == true) {
      fightInfoBox.removeClass("w3-pink").addClass("w3-blue");
      fightInfoBox.html(
        '<p>Tour de <span class="w3-large">' +
          player2.name +
          "</span> Points de vie:" +
          player2.health +
          " </p><p>Arme équipée : " +
          player2.weapon.name +
          "</p><p>Force : " +
          player2.weapon.strength +
          "</p>"
      );
      /* p2Attack(player1, player2);
      p2Defend(player1, player2); */
    }
  }
}
