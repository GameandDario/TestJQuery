function fight(playerA, playerB) {
  $("header").removeClass("w3-teal").addClass("w3-flat-pomegranate");
  let content = ``;
  content += `
    <div class='w3-container'>
        <h3>`;
  if (playerA.turn) {
    content += playerA.name + ` engage le combat ! </h3> `;
  } else if (playerB.turn) {
    content += playerB.name + ` engage le combat ! </h3> `;
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
                    <p> Points de vie <span id="healthP1_wrapper">` +
    playerA.health +
    `</span></p>
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
                        <button id = "P1_Attack" class="action-btn w3-button w3-red player1-btn">Attaquer</button>
                        <button id = "P1_Defend" class="action-btn w3-button w3-black player1-btn">Défendre</button>
                    </div> 
                </div>
            </div>
        </div>

        <div class="w3-half">
            <div id='player2-wrapper' class='w3-card-4 w3-flat-concrete w3-round w3-border'>
                <div class='w3-container w3-center'>
                    <h4 class='w3-bottombar w3-border-blue w3-wide'> ` +
    playerB.name +
    `</h4>
                    <img class='w3-round player-img' src='` +
    playerB.src +
    `' alt='` +
    playerB.name +
    `Avatar'>
                    <p> Points de vie <span id="healthP2_wrapper">` +
    playerB.health +
    `</span></p>
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
                        <button id = "P2_Attack" class="action-btn w3-button w3-red player2-btn">Attaquer</button>
                        <button id = "P2_Defend" class="action-btn w3-button w3-black player2-btn">Défendre</button>
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
    if(playerB.onDefend == false) {
      playerB.health = playerB.health - playerA.weapon.strength;
    } else if(playerB.onDefend == true) {
      playerB.health = playerB.health - (playerA.weapon.strength / 2);
      playerB.onDefend = false;
    }
    $("#healthP2_wrapper").text(playerB.health);
    checkHealth(playerA,playerB);
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

  $("#P1_Defend").click(function () {
    fightInfoBox.removeClass("w3-blue").addClass("w3-pink");
    fightInfoBox.html(
      '<p><span class="w3-large"> ' +
        playerA.name +
        "</span> choisit la défense ! </p>"
    );
    $(".player1-btn").addClass("w3-disabled");
    $(".player2-btn").removeClass("w3-disabled");
    playerA.onDefend = true;
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
    if(playerA.onDefend == false) {
      playerA.health = playerA.health - playerB.weapon.strength;
    } else if(playerA.onDefend == true) {
      playerA.health = playerA.health - (playerB.weapon.strength / 2);
      playerA.onDefend = false;
    }
    checkHealth(playerA,playerB);
    
    $("#healthP1_wrapper").text(playerA.health);
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
 
  $("#P2_Defend").click(function () {
    fightInfoBox.removeClass("w3-pink").addClass("w3-blue");
    fightInfoBox.html(
      '<p><span class="w3-large"> ' +
        playerB.name +
        "</span> choisit la défense ! </p>"
    );
    $(".player2-btn").addClass("w3-disabled");
    $(".player1-btn").removeClass("w3-disabled");
    playerB.onDefend = true;
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

  showFightInfo(playerA, playerB);

  function showFightInfo(player1, player2) {
    if (player1.turn == true) {
      fightInfoBox.removeClass("w3-blue").addClass("w3-pink");
      fightInfoBox.html(
        '<p>Tour de <span class="w3-large">' +
          player1.name +
          "</span> Points de vie : " +
          player1.health +
          " </p><p>Arme équipée : " +
          player1.weapon.name +
          "</p><p>Force : " +
          player1.weapon.strength +
          "</p>"
      );
    } else if (player2.turn == true) {
      fightInfoBox.removeClass("w3-pink").addClass("w3-blue");
      fightInfoBox.html(
        '<p>Tour de <span class="w3-large">' +
          player2.name +
          "</span> Points de vie: " +
          player2.health +
          " </p><p>Arme équipée : " +
          player2.weapon.name +
          "</p><p>Force : " +
          player2.weapon.strength +
          "</p>"
      );  
    }
  }
  function checkHealth(player1,player2) {
    if (player1.health <= 0) {
      alert(player1.name + ' a perdu !');
      $(".action-btn").addClass("w3-disabled");
    } else if (player2.health <= 0) {
      alert(player2.name + ' a perdu !');
      $(".action-btn").addClass("w3-disabled");
    }
  }
}
