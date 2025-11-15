var cards = [];
var first = [];
var second = [];
var helds = [Boolean];
var canHeld = false;
var onScreenCards = [];
var multiple = 0;
var is_loaded = false;

var prices = [
    [1, 2 , 3 , 4 , 5],
    [2, 4 , 6 , 8 , 10],
    [3, 6 , 9 , 12 , 15],
    [4, 8 , 12 , 16 , 20],
    [6, 12 , 18 , 24 , 30],
    [9, 18 , 27 , 36 , 45],
    [25, 50 , 75 , 100 , 125],
    [50, 100 , 150 , 200 , 250],
    [250, 500 , 750 , 1000 , 4000]
];

resetHelds();
initializeCards();
updateBalance(loadBalance());

if(!is_loaded) {
    preloadImages(cards , function(){
        // All images loaded
        $('#loading-screen').fadeOut(500, function() {
            $(this).remove();
        });
        clickEvent(); // Initialize game after loading
    }, function(progress) {
        // Progress callback
        let percentage = (progress / cards.length) * 100;
        $('#progress-fill').css('width', percentage + '%');
    });
}

function getResult(){
    initializeCards();
    var cardsNumbers = [];
    var cardsType = [];
    var test = "";

    // Extract card numbers and suits
    for (let i = 0; i < onScreenCards.length; i++) {
        let temp = onScreenCards[i].substr(8,2);
        if(temp.charAt(0) == "0"){
            cardsNumbers[i] = parseInt(temp.charAt(1));
        }else{
            cardsNumbers[i] = parseInt(temp);
        }
        cardsType[i] = onScreenCards[i].substr(10,1);
    }

    // Evaluate hand
    let handResult = evaluateHand(cardsNumbers, cardsType);

    // Highlight winning category and calculate payout
    if(handResult.payoutIndex !== -1){
        let payoutClass = handResult.className;
        let payoutMultiplier = prices[handResult.payoutIndex][multiple-1];
        $(`.${payoutClass}`).css("background-color","red");
        $('#card1,#card2,#card3,#card4,#card5').addClass('win');

        let betAmount = getBet();
        let winnings = betAmount * payoutMultiplier;
        updateBalance(getBalance() + winnings);
        test += winnings;
    }

    $(".test").html(test);
}

function evaluateHand(numbers, suits) {
    // Sort numbers for straight detection
    let sortedNumbers = [...numbers].sort((a,b) => a - b);
    let flush = isFlush(suits);
    let straight = isStraight(sortedNumbers);

    // Royal Flush: A-K-Q-J-10 same suit
    if (flush && straight && sortedNumbers[0] === 1 && sortedNumbers[4] === 13) {
        return { className: 'rf', payoutIndex: 8 };
    }

    // Straight Flush
    if (flush && straight) {
        return { className: 'sf', payoutIndex: 7 };
    }

    // Four of a Kind
    let fourKind = getFourOfAKind(numbers);
    if (fourKind.length > 0) {
        return { className: '4k', payoutIndex: 6 };
    }

    // Full House
    let [threeKind, pairs] = getThreeOfAKindAndPairs(numbers);
    if (threeKind.length > 0 && pairs.length > 0) {
        return { className: 'fh', payoutIndex: 5 };
    }

    // Flush
    if (flush) {
        return { className: 'f', payoutIndex: 4 };
    }

    // Straight
    if (straight) {
        return { className: 's', payoutIndex: 3 };
    }

    // Three of a Kind
    if (threeKind.length > 0) {
        return { className: '3k', payoutIndex: 2 };
    }

    // Two Pair
    if (pairs.length >= 2) {
        return { className: '2p', payoutIndex: 1 };
    }

    // Jacks or Better
    let highPair = getHighPair(numbers);
    if (highPair !== -1) {
        return { className: 'jb', payoutIndex: 0 };
    }

    // Nothing
    return { className: '', payoutIndex: -1 };
}

function isFlush(suits) {
    return suits.every(suit => suit === suits[0]);
}

function isStraight(sortedNumbers) {
    // Check normal straight
    let isNormal = true;
    for (let i = 0; i < sortedNumbers.length - 1; i++) {
        if (sortedNumbers[i] + 1 !== sortedNumbers[i + 1]) {
            isNormal = false;
            break;
        }
    }
    if (isNormal) return true;

    // Check low straight: A-2-3-4-5
    return sortedNumbers[0] === 1 && sortedNumbers[1] === 2 &&
           sortedNumbers[2] === 3 && sortedNumbers[3] === 4 && sortedNumbers[4] === 5;
}

function getFourOfAKind(numbers) {
    let counts = {};
    numbers.forEach(num => counts[num] = (counts[num] || 0) + 1);
    return Object.keys(counts).filter(num => counts[num] === 4);
}

function getThreeOfAKindAndPairs(numbers) {
    let counts = {};
    numbers.forEach(num => counts[num] = (counts[num] || 0) + 1);
    let threeKind = Object.keys(counts).filter(num => counts[num] === 3);
    let pairs = Object.keys(counts).filter(num => counts[num] === 2);
    return [threeKind, pairs];
}

function getHighPair(numbers) {
    let counts = {};
    numbers.forEach(num => counts[num] = (counts[num] || 0) + 1);
    let pairs = Object.keys(counts).filter(num => counts[num] >= 2 && (num == 1 || num >= 11));
    return pairs.length > 0 ? pairs[0] : -1;
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

    // Stop win animation on new hand
    $('#card1,#card2,#card3,#card4,#card5').removeClass('win');
}

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
    $(".reward-1").css("background-color", "red");

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

    $("#plus").click(function(){
        if (getBet() <= getBalance()) {
            if (getBet()*2 <= getBalance()) {
                $("#bet").text(parseInt(getBet()*2) + "$") ;
            }else {
                $("#bet").text(getBalance() + "$") ;
            }
        }
    });

    $("#minus").click(function(){
        if (getBet() > 1) {
            if (getBet()/2 < 1) {
                $("#bet").text(1 + "$") ;
            }else{
                $("#bet").text(parseInt(getBet()/2) + "$") ;
            }
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

    // Handle reset balance button
    $("#resetBalance").click(function(){
        updateBalance(20);
    });

    //handle when the user click on the deal button//
    $("#draw").click(function(){

        //if the text is deal//
        if($("#draw").text() == "DEAL"){
            $(".test").text("test");

            //Take bet from balance//
            var bet = "";


            if($(".reward-1").css("background-color") == "rgb(255, 0, 0)"){
                multiple = 1;
            }else if($(".reward-2").css("background-color") == "rgb(255, 0, 0)"){
                multiple = 2;
            }else if($(".reward-3").css("background-color") == "rgb(255, 0, 0)"){
                multiple = 3;
            }else if($(".reward-4").css("background-color") == "rgb(255, 0, 0)"){
                multiple = 4;
            }else if($(".reward-5").css("background-color") == "rgb(255, 0, 0)"){
                multiple = 5;
            }


            for (let i = 0; i < $("#bet").text().length; i++) {
                if ($("#bet").text().charAt(i) != "$") {
                    bet += $("#bet").text().charAt(i);
                }
            }

            if ($("#balance").text() >= (bet*multiple) && $("#balance").text() > 0) {
                updateBalance(getBalance() - (bet*multiple));
            }


            //Reset results//
            resetResult();

            //Reset helds //
            resetHelds();

            //Give the user access to held cards//
            canHeld = true;

            //Change button text from deal to draw//
            $("#draw").text("DRAW");

            //Disable the buttons bet 1 and bet 5 while playing//
            $("#minus").prop('disabled', true);
            $("#plus").prop('disabled', true);
            $("#bet1").prop('disabled', true);
            $("#bet").prop('disabled', true);
            $("#bet1").css("background-color","grey");
            $("#bet").css("background-color","grey");
            $("#minus").css("background-color","grey");
            $("#plus").css("background-color","grey");
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
            $("#minus").prop('disabled', false);
            $("#plus").prop('disabled', false);
            $("#bet1").prop('disabled', false);
            $("#bet").prop('disabled', false);
            $("#bet1").css("background-color","#ffff00");
            $("#bet").css("background-color","#ffff00");
            $("#plus").css("background-color","red");
            $("#minus").css("background-color","black");
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
            $("#card1").attr("src", cards[second[0]]);
            $("#card2").attr("src", cards[second[1]]);
            $("#card3").attr("src", cards[second[2]]);
            $("#card4").attr("src", cards[second[3]]);
            $("#card5").attr("src", cards[second[4]]);

            //get the result//
            getResult();

        }
    });
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

//function to load images (optimization)
function preloadImages(imageArray, callback, progressCallback) {
    let loadedCount = 0;
    let images = [];

    for (let i = 0; i < imageArray.length; i++) {
        images[i] = new Image();
        images[i].src = imageArray[i];
        images[i].onload = function () {
            loadedCount++;
            // Update progress each time an image loads
            if (progressCallback) progressCallback(loadedCount);
            if (loadedCount === imageArray.length) {
                is_loaded = true;
                callback();
            }
        };
        // Handle image load errors
        images[i].onerror = function() {
            loadedCount++;
            if (progressCallback) progressCallback(loadedCount);
            if (loadedCount === imageArray.length) {
                is_loaded = true;
                callback();
            }
        };
    }
}

// Function to save balance to localStorage
function saveBalance(balance) {
    localStorage.setItem('videoPokerBalance', balance);
}

// Function to load balance from localStorage
function loadBalance() {
    return parseInt(localStorage.getItem('videoPokerBalance')) || 20;
}

// Function to update balance
function updateBalance(newBalance) {
    $("#balance").text(newBalance);
    saveBalance(newBalance);
}

function getBet(){
    var bet = "";
    for (let i = 0; i < $("#bet").text().length; i++) {
        if ($("#bet").text().charAt(i) != "$") {
            bet += $("#bet").text().charAt(i);
        }
    }
    return bet;
}

function getBalance(){
    return parseInt($("#balance").text());
}
