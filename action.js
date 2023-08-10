var cards = [];
var first = [];
var second = [];
var helds = [Boolean];
var canHeld = false;
var onScreenCards = [];

resetHelds();
initializeCards();
clickEvent();

$(".reward-1").css("background-color", "red");

function getResult(){ 
    initializeCards();
    var cardsNumbers = [];
    var test = "";

    //To get the card number and store it in a array //
    for (let i = 0; i < onScreenCards.length; i++) {
        let temp = onScreenCards[i].substr(8,2);
        if(temp.charAt(0) == "0"){
            cardsNumbers[i] = parseInt(temp.charAt(1));
        }else{
            cardsNumbers[i] = parseInt(temp);
        } 
        test+=cardsNumbers[i] +" ";
    }

    
    //To check the result//
    var counter = 0;
    var isJackOrBetter = false;
    for(let  i = 0 ; i < 4 ; i++){ 
        for (let j = i+1; j < cardsNumbers.length; j++) {
            if(cardsNumbers[i] == cardsNumbers[j]){
                if (cardsNumbers[i] == 1 || (cardsNumbers[i] > 10 && cardsNumbers[i] < 14)) {
                    isJackOrBetter = true;
                }
                counter++;
            }
        }
    }

    switch(counter){
        case 1://JACKS OR BETTER//
              if (isJackOrBetter) {
                $(".jb").css("background-color","red");
              }
              break;
              
        case 2://TO PAIRS//
                $(".2p").css("background-color","red");
                break;

        case 3://TREE OF A KIND//
                $(".3k").css("background-color","red");
                break;

        case 4://FULL HOUSE//
                $(".fh").css("background-color","red");
                break;

        case 6://FOUR OF A KIND//
                $(".4k").css("background-color","red");
                break;

        case 0://STRIAGHT//
                cardsNumbers.sort();
                var c = 0;
                for (let i = 0; i < cardsNumbers.length-1; i++) {
                        if (cardsNumbers[i]+1 == (cardsNumbers[i+1])) {
                            c++;
                    }
                }
                if (c == 4) {
                    $(".s").css("background-color","red");
                }
                break;

    }

    test+=c;
    $(".test").html(test);
    
}

//Function to return a array of size 5 that contains the index of the cards randomly//
function getCardsIndex(){ 
    var cardIndex = [];
    for(let i = 0 ; i<5 ; i++){ 
        let t = getRandomNumber();
        let exist = false;
        for(let j = 0 ; j < 5 ; j++){ 
            if(t == cardIndex[j]){
                exist = true;
            }
        }
        if(exist){ 
            let x = getRandomNumber();
            while(x==cardIndex[0]||x==cardIndex[1]||x==cardIndex[2]||x==cardIndex[3]||x==cardIndex[4]){ 
                x = getRandomNumber();
            }
            cardIndex[i] = x;
            
        }else{ 
            cardIndex[i] = t;
        }
    }
    return cardIndex;
}

//Function to get a number between 0 and 51//
function getRandomNumber() {
    return Math.floor(Math.random() * 52);
}

function resetHelds(){ 
        $("#h1").text("");
        $("#h2").text("");
        $("#h3").text("");
        $("#h4").text("");
        $("#h5").text("");

    for (let i = 0; i < 5; i++) {
        helds[i] = false;
    }
}

function clickEvent(){ 
    //handle when the user click on a card to held it//
    $("#card1").click(function(){ 
        if($("#h1").text() == "" && canHeld){ 
            $("#h1").html("HELD");
            helds[0] = true;
        }else{ 
            $("#h1").html("");
            helds[0] = false;
        }
    });
    
    $("#card2").click(function(){ 
        if($("#h2").text() == "" && canHeld){ 
            $("#h2").html("HELD");
            helds[1] = true;
        }else{ 
            $("#h2").html("");
            helds[1] = false;
        }
    });
    
    $("#card3").click(function(){ 
        if($("#h3").text() == "" && canHeld){ 
            $("#h3").html("HELD");
            helds[2] = true;
        }else{ 
            $("#h3").html("");
            helds[2] = false;
        }
    });
    
    $("#card4").click(function(){ 
        if($("#h4").text() == "" && canHeld){ 
            $("#h4").html("HELD");
            helds[3] = true;
        }else{ 
            $("#h4").html("");
            helds[3] = false;
        }
    });
    
    $("#card5").click(function(){ 
        if($("#h5").text() == "" && canHeld){ 
            $("#h5").html("HELD");
            helds[4] = true;
        }else{ 
            $("#h5").html("");
            helds[4] = false;
        }
    });

    //handle when the user click on the bet 1 button//
    $("#bet1").click(function(){
        if($(".reward-1").css("background-color") == "rgb(255, 0, 0)"){ 
            $(".reward-1").css("background-color", "#00003f");
            $(".reward-2").css("background-color", "red");
        }else if($(".reward-2").css("background-color") == "rgb(255, 0, 0)"){ 
            $(".reward-2").css("background-color", "#00003f");
            $(".reward-3").css("background-color", "red");
        }else if($(".reward-3").css("background-color") == "rgb(255, 0, 0)"){ 
            $(".reward-3").css("background-color", "#00003f");
            $(".reward-4").css("background-color", "red");
        }else if($(".reward-4").css("background-color") == "rgb(255, 0, 0)"){ 
            $(".reward-4").css("background-color", "#00003f");
            $(".reward-5").css("background-color", "red");
        }else if($(".reward-5").css("background-color") == "rgb(255, 0, 0)"){ 
            $(".reward-5").css("background-color", "#00003f");
            $(".reward-1").css("background-color", "red");
        }
    });

    //handle when the user click on the bet 5 button//
    $("#bet5").click(function(){
        $(".reward-1").css("background-color", "#00003f");
        $(".reward-2").css("background-color", "#00003f");
        $(".reward-3").css("background-color", "#00003f");
        $(".reward-4").css("background-color", "#00003f");
    
        $(".reward-5").css("background-color", "red");
    });

    //handle when the user click on the deal button//
    $("#draw").click(function(){

        //if the text is deal//
        if($("#draw").text() == "DEAL"){
            $(".test").text("test");
            //Reset results//
            resetResult();

            //Reset helds //
            resetHelds();
    
            //Give the user access to held cards//
            canHeld = true;
    
            //Change button text from deal to draw//
            $("#draw").text("DRAW");
    
            //Disable the buttons bet 1 and bet 5 while playing//
            $("#bet1").prop('disabled', true);
            $("#bet").prop('disabled', true);
            $("#bet1").css("background-color","grey");
            $("#bet").css("background-color","grey");
            $("#bet5").prop('disabled', true);
            $("#bet5").css("background-color","grey");
    
            //To display 5 random cards//
            first = getCardsIndex();
    
            $("#card1").attr("src", cards[first[0]]);
            $("#card2").attr("src", cards[first[1]]);
            $("#card3").attr("src", cards[first[2]]);
            $("#card4").attr("src", cards[first[3]]);
            $("#card5").attr("src", cards[first[4]]);
    
    
        }else if($("#draw").text() == "DRAW"){ 
            //Remove the held access from the user//
            canHeld = false;
    
            //Enable the buttons bet 1 and bet 5//
            $("#bet1").prop('disabled', false);
            $("#bet").prop('disabled', false);
            $("#bet1").css("background-color","#ffff00");
            $("#bet").css("background-color","#ffff00");
            $("#bet5").prop('disabled', false);
            $("#bet5").css("background-color","#ffff00");
    
            //Change button text from draw to deal//
            $("#draw").text("DEAL");
    
            //Get new cards list//
            second = getCardsIndex();
    
            //Modifie the new list to work with the held selected by the user//
            for(let i = 0 ; i < 5 ; i++){ 
                if(helds[i]){ 
                    second[i] = first[i];
                }
            }
    
            //Display the cards on the screen//
            // $("#card1").attr("src", cards[second[0]]);
            // $("#card2").attr("src", cards[second[1]]);
            // $("#card3").attr("src", cards[second[2]]);
            // $("#card4").attr("src", cards[second[3]]);
            // $("#card5").attr("src", cards[second[4]]);

            $("#card1").attr("src", cards[0]);
            $("#card2").attr("src", cards[3]);
            $("#card3").attr("src", cards[4]);
            $("#card4").attr("src", cards[2]);
            $("#card5").attr("src", cards[1]);
            

            //get the result//
            getResult();
        }
    });
}

function test(){ 
        // $("#h1").text(helds[0]);
        // $("#h2").text(helds[1]);
        // $("#h3").text(helds[2]);
        // $("#h4").text(helds[3]);
        // $("#h5").text(helds[4]);

        // $(".rf").css("background-color","red");
        // $(".sf").css("background-color","red");
        // $(".4k").css("background-color","red");
        // $(".fh").css("background-color","red");
        // $(".f").css("background-color","red");
        // $(".s").css("background-color","red");
        // $(".3k").css("background-color","red");
        // $(".2p").css("background-color","red");
        // $(".jb").css("background-color","red");
}

function initializeCards(){ 
    cards[0] = "./cards/01B.PNG";
    cards[1] = "./cards/02B.PNG";
    cards[2] = "./cards/03B.PNG";
    cards[3] = "./cards/04B.PNG";
    cards[4] = "./cards/05B.PNG";
    cards[5] = "./cards/06B.PNG";
    cards[6] = "./cards/07B.PNG";
    cards[7] = "./cards/08B.PNG";
    cards[8] = "./cards/09B.PNG";
    cards[9] = "./cards/10B.PNG";
    cards[10] = "./cards/11B.PNG";
    cards[11] = "./cards/12B.PNG";
    cards[12] = "./cards/13B.PNG";

    cards[13] = "./cards/01A.PNG";
    cards[14] = "./cards/02A.PNG";
    cards[15] = "./cards/03A.PNG";
    cards[16] = "./cards/04A.PNG";
    cards[17] = "./cards/05A.PNG";
    cards[18] = "./cards/06A.PNG";
    cards[19] = "./cards/07A.PNG";
    cards[20] = "./cards/08A.PNG";
    cards[21] = "./cards/09A.PNG";
    cards[22] = "./cards/10A.PNG";
    cards[23] = "./cards/11A.PNG";
    cards[24] = "./cards/12A.PNG";
    cards[25] = "./cards/13A.PNG";

    cards[26] = "./cards/01C.PNG";
    cards[27] = "./cards/02C.PNG";
    cards[28] = "./cards/03C.PNG";
    cards[29] = "./cards/04C.PNG";
    cards[30] = "./cards/05C.PNG";
    cards[31] = "./cards/06C.PNG";
    cards[32] = "./cards/07C.PNG";
    cards[33] = "./cards/08C.PNG";
    cards[34] = "./cards/09C.PNG";
    cards[35] = "./cards/10C.PNG";
    cards[36] = "./cards/11C.PNG";
    cards[37] = "./cards/12C.PNG";
    cards[38] = "./cards/13C.PNG";

    cards[39] = "./cards/01D.PNG";
    cards[40] = "./cards/02D.PNG";
    cards[41] = "./cards/03D.PNG";
    cards[42] = "./cards/04D.PNG";
    cards[43] = "./cards/05D.PNG";
    cards[44] = "./cards/06D.PNG";
    cards[45] = "./cards/07D.PNG";
    cards[46] = "./cards/08D.PNG";
    cards[47] = "./cards/09D.PNG";
    cards[48] = "./cards/10D.PNG";
    cards[49] = "./cards/11D.PNG";
    cards[50] = "./cards/12D.PNG";
    cards[51] = "./cards/13D.PNG";

    onScreenCards[0] = $("#card1").attr("src");
    onScreenCards[1] = $("#card2").attr("src");
    onScreenCards[2] = $("#card3").attr("src");
    onScreenCards[3] = $("#card4").attr("src");
    onScreenCards[4] = $("#card5").attr("src");
}

function resetResult(){ 
        $(".rf").css("background-color","#00003f");
        $(".sf").css("background-color","#00003f");
        $(".4k").css("background-color","#00003f");
        $(".fh").css("background-color","#00003f");
        $(".f").css("background-color","#00003f");
        $(".s").css("background-color","#00003f");
        $(".3k").css("background-color","#00003f");
        $(".2p").css("background-color","#00003f");
        $(".jb").css("background-color","#00003f");
}
