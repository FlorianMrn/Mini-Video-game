var app = {

  init: function() {
    console.log('init');

    // Event listener
    $( "#launchScript" ).click(app.handleLaunchScriptButton);

    // Lancer une nouvelle partie sans rechargement de la page
    $( "#launchNew" ).on('click', function() {
      location.reload();
    });

    // Nombre aléatoire pour la case départ et d'arrivée
    app.ramdomNbStart = Math.floor(Math.random() * (23 - 0 + 1) + 0);
    app.ramdomNbEnd = Math.floor(Math.random() * (23 - 0 + 1) + 0);
    
    if (app.ramdomNbStart === app.ramdomNbEnd) {

      app.ramdomNbStart = Math.floor(Math.random() * (23 - 0 + 1) + app.ramdomNbEnd);
    }

    // Colonne de départ pour le curseur qui permettra de bien placer le curseur à la suite d'un moveFoward();
    if (app.ramdomNbStart >= 6 && app.ramdomNbStart <= 11) {
              app.column = app.ramdomNbStart - 6;
    } else if (app.ramdomNbStart >= 12 && app.ramdomNbStart <= 17) {
              app.column = app.ramdomNbStart - 12;
    } else if (app.ramdomNbStart >= 18 && app.ramdomNbStart <= 24) {
              app.column = app.ramdomNbStart - 18;
    } else {
              app.column = app.ramdomNbStart;
    }
    console.log(app.column);
    // Lancement
    app.drawBoard();

  },

  // Déclarer la méthode drawBoard() dans app permettant de dessiner la board
  drawBoard: function () {

    let parentContent = $("#board");
    
    // Créer les div avec les bonnes classes pour avoir ces 4 lignes
    for (let i = 1; i < 5; i++) {

      let childContent = $("<div>").addClass("cellRow").attr("id", "row"+[i]);

      parentContent.append(childContent);

            // Créer les div avec les bonnes classes pour avoir ces 6 colonnes
            for (let j = 0; j < 6; j++) {

              let littleChildContent = $("<div>").addClass("cell");

              childContent.append(littleChildContent);
            }

    }
        

        // Case de départ aléatoire
        $("div.cell:eq("+app.ramdomNbStart+")").addClass("cellStart");
        // et d'arrivée aléatoire
        $("div.cell:eq("+app.ramdomNbEnd+")").addClass("cellEnd");

        // Avec curseur / si pas déjà présent
        if (!$("div.cell").hasClass("cellCurrent")) 
        {
            $(".cellStart").addClass("cellCurrent cellCurrent-right");
        }
       
        
      
  },

  
  // Faire avancer le curseur
  moveForward: function() {

      // Si la position du curseur est à gauche
      if ($(".cellCurrent").hasClass("cellCurrent-left")) {
        console.log("1 moveFoward");
        $(".cellCurrent").prev().addClass("cellCurrent cellCurrent-left");
        $(".cellCurrent").next().removeClass("cellCurrent cellCurrent-left");
        
        if (app.column > 0){

          app.column--;
        }
        
      }

      // Si la position du curseur est en haut
      else if ($(".cellCurrent").hasClass("cellCurrent-top")) {
        console.log("2 moveFoward");
        $(".cellCurrent").parent().prev().children().eq(app.column).addClass("cellCurrent cellCurrent-top");
        $(".cellCurrent").parent().next().children().removeClass("cellCurrent cellCurrent-top");
      }

      // Si la position du curseur est à droite
      else if ($(".cellCurrent").hasClass("cellCurrent-right")) {
        console.log("3 moveFoward");
        $(".cellCurrent").next().addClass("cellCurrent cellCurrent-right");
        $(".cellCurrent").prev().removeClass("cellCurrent cellCurrent-right");

        if (app.column < 5){

          app.column++;
        }

      }

      // Si la position du curseur est en bas
      else  {
        console.log("4 moveFoward");
        $("div.cellCurrent").parent().next().children().eq(app.column).addClass("cellCurrent cellCurrent-bottom");
        $("div.cellCurrent").parent().prev().children().removeClass("cellCurrent cellCurrent-bottom");
  
      }
  },



    // Touner à droite
    turnRight: function() {


      // Si la position du curseur est à gauche
      if ($(".cellCurrent").hasClass("cellCurrent-left")) {
        console.log("1 turnRight");
        $(".cellCurrent").removeClass("cellCurrent-left").addClass("cellCurrent-top");

      }

      // Si la position du curseur est en haut
      else if ($(".cellCurrent").hasClass("cellCurrent-top")) {
        console.log("2 turnRight");
        $(".cellCurrent").removeClass("cellCurrent-top").addClass("cellCurrent-right");

      }

      // Si la position du curseur est à droite
      else if ($(".cellCurrent").hasClass("cellCurrent-right")) {
        console.log("3 turnRight");
        $(".cellCurrent").removeClass("cellCurrent-right").addClass("cellCurrent-bottom");

      }

      // Si la position du curseur est en bas
      else  {
        console.log("4 turnRight");
        $(".cellCurrent").removeClass("cellCurrent-bottom").addClass("cellCurrent-left");

      }

    },

    // Tourner à gauche 
    turnLeft: function() {

      // Si la position du curseur est à gauche
      if ($(".cellCurrent").hasClass("cellCurrent-left")) {
        console.log("1 turnLeft");
        $(".cellCurrent").removeClass("cellCurrent-left").addClass("cellCurrent-bottom");

      }

      // Si la position du curseur est en haut
      else if ($(".cellCurrent").hasClass("cellCurrent-top")) {
        console.log("2 turnLeft");
        $(".cellCurrent").removeClass("cellCurrent-top").addClass("cellCurrent-left");

      }

      // Si la position du curseur est à droite
      else if ($(".cellCurrent").hasClass("cellCurrent-right")) {
        console.log("3 turnLeft");
        $(".cellCurrent").removeClass("cellCurrent-right").addClass("cellCurrent-top");

      }
      
      // Si la position du curseur est en bas
      else {
        console.log("4 turnLeft");
        $(".cellCurrent").removeClass("cellCurrent-bottom").addClass("cellCurrent-right");

      }

  },

  handleLaunchScriptButton: function() {

    
    // TODO : get all lines as an array
    let codeLines = $("#userCode").val().split('\n');
    
    window.setTimeout(function() {
      app.codeLineLoop(codeLines, 0);
    }, 2000);
  },

  codeLineLoop: function(codeLines, index) {
    // Getting currentLine
    var currentLine = codeLines[index];
    console.log(currentLine);

    if (currentLine == "move forward") {

       app.moveForward();

    } else if (currentLine == "turn right") {

      app.turnRight();
    
    } else if (currentLine == "turn left") {

      app.turnLeft();

    } else {

        $("#userCode").val("");
        window.alert("Use move forward / turn left / turn right (good luck !)")
        return;
    }

    // Increment
    index++;

    // if still a line to interpret
    if (index < codeLines.length) {
      // Recall same method (=> make a loop)
      window.setTimeout(function() {
        app.codeLineLoop(codeLines, index);
      }, 1000);
    } else {
      window.setTimeout(function() {
        app.checkSuccess();
      }, 1000);
    }
  },

  checkSuccess: function() {
    // TODO display if the game is won or not
    if ($(".cellCurrent").hasClass("cellEnd")) {

      window.alert("You win bro !");

    } else {
      $("#userCode").val("");
      window.alert("Try again..!");

    }
      
  }
};

$( "document" ).ready(app.init);
