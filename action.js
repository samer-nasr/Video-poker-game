
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
    $("#card1").
});