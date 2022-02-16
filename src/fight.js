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
    <p><div class="w3-light-grey w3-round">
                  <div id="healthP1_bar" class="w3-flat-alizarin" style="height:24px;width:` +
    playerA.health +
    `%"></div>
                </div>
              </p>
              <div class="w3-cell-row">
              <div class="w3-container w3-cell w3-cell-middle">
                <img src="` +
    playerA.weapon.src +
    `" alt="` +
    playerA.weapon.name +
    `Image">
              </div>
              <div class="w3-container w3-cell w3-cell-middle">
              <p style="font-size: 20px;">` +
    playerA.weapon.name +
    ` Force : ` +
    playerA.weapon.strength +
    `</p>
              </div>
              
            </div>
                    <div class="w3-bar p1_btn">
                        <button id="P1_Attack" class="w3-button w3-red w3-round w3-col"><img class= "w3-margin-right" src="src/img/icons8-sword-25-2.png">Attaquer</button>
                        <button id="P1_Defend" class="w3-button w3-black w3-round w3-col"><img class= "w3-margin-right" src="src/img/icons8-shield-25.png">Défendre</button>
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
              <p><div class="w3-round w3-light-grey">
                  <div id="healthP2_bar" class="w3-flat-belize-hole" style="height:24px;width:` +
    playerB.health +
    `%"></div>
                </div>
              </p>

              <div class="w3-container">
              
<div class="w3-cell-row">
    <div class="w3-container w3-cell w3-cell-middle">
      <img src="` +
    playerB.weapon.src +
    `" alt="` +
    playerB.weapon.name +
    `Image">
    </div>
    <div class="w3-container w3-cell w3-cell-middle">
    <p style="font-size: 20px;">` +
    playerB.weapon.name +
    ` Force : ` +
    playerB.weapon.strength +
    `</p>
    </div>
    
  </div>
                  
                    <div class="w3-bar p2_btn">
                    <button id="P2_Attack" class="w3-button w3-red w3-round w3-col"><img class= "w3-margin-right" src="src/img/icons8-sword-25-2.png">Attaquer</button>
                    <button id="P2_Defend" class="w3-button w3-black w3-round w3-col"><img class= "w3-margin-right" src="src/img/icons8-shield-25.png">Défendre</button>
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
      $("#player1-wrapper")
        .removeClass("w3-flat-concrete w3-opacity")
        .addClass("w3-pink");
      $("#player2-wrapper")
        .removeClass("w3-blue")
        .addClass("w3-flat-concrete w3-opacity");
      $(".p1_btn").show();
      $(".p2_btn").hide();
    } else if (playerB.turn) {
      $("#player2-wrapper")
        .removeClass("w3-flat-concrete w3-opacity")
        .addClass("w3-blue");
      $("#player1-wrapper")
        .removeClass("w3-pink")
        .addClass("w3-flat-concrete w3-opacity");
      $(".p2_btn").show();
      $(".p1_btn").hide();
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
    if (playerB.onDefend) {
      fightInfoBox.append(
        '<p>Mais <span class="w3-large"> ' +
          playerB.name +
          " se défend et les dégats sont réduits à " +
          playerA.weapon.strength / 2 +
          " !</span>"
      );
    }
    $(".p1_btn").hide();
    $(".p2_btn").show();
    if (playerB.onDefend == false) {
      playerB.health = playerB.health - playerA.weapon.strength;
    } else if (playerB.onDefend == true) {
      playerB.health = playerB.health - playerA.weapon.strength / 2;
      playerB.onDefend = false;
    }
    $("#healthP2_wrapper")
      .text(playerB.health)
      .effect("shake", { times: 3 }, 500);
    $("#healthP2_bar").css("width", playerB.health + "%");
    checkHealth(playerA, playerB);
    playerA.turn = false;
    playerB.turn = true;
    checkPlayerTurn(playerA, playerB);
    console.log(
      "player1 : " +
        playerA.name +
        playerA.turn +
        +playerA.onDefend +
        " player2 : " +
        playerB.name +
        playerB.turn +
        playerB.onDefend
    );
  });

  $("#P1_Defend").click(function () {
    fightInfoBox.removeClass("w3-blue").addClass("w3-pink");
    fightInfoBox.html(
      '<p><span class="w3-large"> ' +
        playerA.name +
        "</span> choisit la défense ! </p>"
    );
    $(".p1_btn").hide();
    $(".p2_btn").show();
    playerA.onDefend = true;
    playerA.turn = false;
    playerB.turn = true;
    checkPlayerTurn(playerA, playerB);
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
    if (playerA.onDefend) {
      fightInfoBox.append(
        '<p>Mais <span class="w3-large"> ' +
          playerA.name +
          " se défend et les dégats sont réduits à " +
          playerB.weapon.strength / 2 +
          " !</span>"
      );
    }
    $(".p2_btn").hide();
    $(".p1_btn").show();
    if (playerA.onDefend == false) {
      playerA.health = playerA.health - playerB.weapon.strength;
    } else if (playerA.onDefend == true) {
      playerA.health = playerA.health - playerB.weapon.strength / 2;
      playerA.onDefend = false;
    }
    checkHealth(playerA, playerB);

    $("#healthP1_wrapper")
      .text(playerA.health)
      .effect("shake", { times: 3 }, 500);
    $("#healthP1_bar").css("width", playerA.health + "%");
    playerB.turn = false;
    playerA.turn = true;
    checkPlayerTurn(playerA, playerB);
  });

  $("#P2_Defend").click(function () {
    fightInfoBox.removeClass("w3-pink").addClass("w3-blue");
    fightInfoBox.html(
      '<p><span class="w3-large"> ' +
        playerB.name +
        "</span> choisit la défense ! </p>"
    );
    $(".p2_btn").hide();
    $(".p1_btn").show();
    playerB.onDefend = true;
    playerB.turn = false;
    playerA.turn = true;
    checkPlayerTurn(playerA, playerB);
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
  function openModal() {
    let modal = $("#resultModal");
    let closeBtn = $(".close");
    closeBtn.click(function () {
      modal.removeClass("w3-show").addClass("w3-hide");
    });
    $("#restartGame").click(function () {
      $(function () {
        location.reload();
      });
    });
    modal.removeClass("w3-hide").addClass("w3-show");
  }

  function checkHealth(player1, player2) {
    if (player1.health <= 0) {
      $("P1_Attack,#P1_Defend,#P2_Attack, #P2_Defend").remove();
      //alert(player1.name + ' a perdu !');
      $("#player2-wrapper").removeClass("w3-opacity");
      $("#player1-wrapper").addClass("w3-sepia").fadeTo("slow", 0.2);
      $("#modalText")
        .addClass("w3-blue")
        .html(
          '<p class="w3-text-white"><span class="w3-large">' +
            player1.name +
            "</span> est vaincu. </p>"
        );
      $("#modalText").append(
        '<p class="w3-text-white">Les niveaux de difficulté supérieure sont désormais accessibles. ( à faire )</p>'
      );
      openModal();
    } else if (player2.health <= 0) {
      $("P1_Attack,#P1_Defend,#P2_Attack, #P2_Defend").remove();
      //alert(player2.name + ' a perdu !');
      $("#player2-wrapper").addClass("w3-sepia").fadeTo("slow", 0.2);
      $("#player1-wrapper").removeClass("w3-opacity");
      $("#modalText")
        .addClass("w3-pink")
        .html(
          '<p class="w3-text-white"><span class="w3-large">' +
            player2.name +
            "</span> est vaincu. </p>"
        );
      $("#modalText").append(
        '<p class="w3-text-white">Les niveaux de difficulté supérieure sont désormais accessibles.( à faire )</p>'
      );
      openModal();
    }
  }
}
