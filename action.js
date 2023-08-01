var cards = [];
cards[0] = "./cards/1b.PNG";
cards[1] = "./cards/2b.PNG";
cards[2] = "./cards/3b.PNG";
cards[3] = "./cards/4b.PNG";
cards[4] = "./cards/5b.PNG";
cards[5] = "./cards/6b.PNG";
cards[6] = "./cards/7b.PNG";
cards[7] = "./cards/8b.PNG";
cards[8] = "./cards/9b.PNG";
cards[9] = "./cards/10b.PNG";
cards[10] = "./cards/11b.PNG";
cards[11] = "./cards/12b.PNG";
cards[12] = "./cards/13b.PNG";

cards[13] = "./cards/1A.PNG";
cards[14] = "./cards/2A.PNG";
cards[15] = "./cards/3A.PNG";
cards[16] = "./cards/4A.PNG";
cards[17] = "./cards/5A.PNG";
cards[18] = "./cards/6A.PNG";
cards[19] = "./cards/7A.PNG";
cards[20] = "./cards/8A.PNG";
cards[21] = "./cards/9A.PNG";
cards[22] = "./cards/10A.PNG";
cards[23] = "./cards/11A.PNG";
cards[24] = "./cards/12A.PNG";
cards[25] = "./cards/13A.PNG";

cards[26] = "./cards/B1.PNG";
cards[27] = "./cards/B2.PNG";
cards[28] = "./cards/B3.PNG";
cards[29] = "./cards/B4.PNG";
cards[30] = "./cards/B5.PNG";
cards[31] = "./cards/B6.PNG";
cards[32] = "./cards/B7.PNG";
cards[33] = "./cards/B8.PNG";
cards[34] = "./cards/B9.PNG";
cards[35] = "./cards/B10.PNG";
cards[36] = "./cards/B11.PNG";
cards[37] = "./cards/B12.PNG";
cards[38] = "./cards/B13.PNG";

cards[39] = "./cards/A1.PNG";
cards[40] = "./cards/A2.PNG";
cards[41] = "./cards/A3.PNG";
cards[42] = "./cards/A4.PNG";
cards[43] = "./cards/A5.PNG";
cards[44] = "./cards/A6.PNG";
cards[45] = "./cards/A7.PNG";
cards[46] = "./cards/A8.PNG";
cards[47] = "./cards/A9.PNG";
cards[48] = "./cards/A10.PNG";
cards[49] = "./cards/A11.PNG";
cards[50] = "./cards/A12.PNG";
cards[51] = "./cards/A13.PNG";


$("#card1").click(function(){ 
    if($("#h1").text() == ""){ 
        $("#h1").html("HELD");
    }else{ 
        $("#h1").html("");
    }
});

$("#card2").click(function(){ 
    if($("#h2").text() == ""){ 
        $("#h2").html("HELD");
    }else{ 
        $("#h2").html("");
    }
});

$("#card3").click(function(){ 
    if($("#h3").text() == ""){ 
        $("#h3").html("HELD");
    }else{ 
        $("#h3").html("");
    }
});

$("#card4").click(function(){ 
    if($("#h4").text() == ""){ 
        $("#h4").html("HELD");
    }else{ 
        $("#h4").html("");
    }
});

$("#card5").click(function(){ 
    if($("#h5").text() == ""){ 
        $("#h5").html("HELD");
    }else{ 
        $("#h5").html("");
    }
});

$(".reward-1").css("background-color", "red");

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


$("#bet5").click(function(){
    $(".reward-1").css("background-color", "#00003f");
    $(".reward-2").css("background-color", "#00003f");
    $(".reward-3").css("background-color", "#00003f");
    $(".reward-4").css("background-color", "#00003f");

    $(".reward-5").css("background-color", "red");
});

$("#draw").click(function(){

    if($("#draw").text() == "DEAL"){ 
        //Change button text from deal to draw//
        $("#draw").text("DRAW");

        //Disable the buttons bet 1 and bet 5 while playing//
        $("#bet1").prop('disabled', true);
        $("#bet5").prop('disabled', true);


    }else if($("#draw").text() == "DRAW"){ 
        //Enable the buttons bet 1 and bet 5//
        $("#bet1").prop('disabled', false);
        $("#bet5").prop('disabled', false);

        //Change button text from draw to deal//
        $("#draw").text("DEAL");
    }


    
    var first = getCardsIndex();
    
    $("#card1").attr("src", cards[first[0]]);
    $("#card2").attr("src", cards[first[1]]);
    $("#card3").attr("src", cards[first[2]]);
    $("#card4").attr("src", cards[first[3]]);
    $("#card5").attr("src", cards[first[4]]);

    $("#h1").text(first[0]);
    $("#h2").text(first[1]);
    $("#h3").text(first[2]);
    $("#h4").text(first[3]);
    $("#h5").text(first[4]);
});

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
            getCardsIndex();
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