// CHALLENGE 1


function ageInDays(){

    var birth = parseInt(prompt('Enter your "Birth Year" : '));
    var currYear = parseInt(prompt('Enter current year'));

    var days = (currYear - birth) * 365;
    var textArea = document.createTextNode("You live " + days + " no. of days");

    var h1 = document.createElement('h1');
    h1.setAttribute('id', 'noOfDays');
    h1.appendChild(textArea);
    document.getElementById('flexboxResult').appendChild(h1);

}

function reset(){
    
    document.getElementById('noOfDays').remove();  

}




// CHALLENGE 2 




function generateKitty(){

    var img = document.createElement('img');
    var kitty = document.getElementById('kitty');
    img.src = "https://66.media.tumblr.com/tumblr_m24hg0ACCm1qcxyrro1_500.jpg";
    kitty.appendChild(img);

}




// CHALLENGE 3:ROCK , PAPER , SCISSORS




function mannualClick(yourChoice){

    var humanChoice = yourChoice.id;
    
    // Choose btw random number generated by randomNumber func. then
    // chooseRandomRPS will give between rock, paper, scissor through that random number
    var boatChoice = chooseRandomRPS(randomNumber(3)); 
    
    // WINNER PREDICTOR
    // RETURN SOME NUMBER 1, 0.5, 0
    result = decideWinner(humanChoice, boatChoice);
    
    // TAKES UP NUMBER AND PREDICT WINNER 
    var message = finalResult(result);

    // FUNCTION ON THE FRONT END SIDE
    rpsFrontEnd(humanChoice, boatChoice, message);

}

function chooseRandomRPS(number){

    return ['rock', 'paper', 'scissors'][number];

} 

function randomNumber(n){

    return Math.floor(Math.random() * n);

}

function decideWinner(humanChoice, boatChoice){

    var dataBase = {
        'rock' : {scissors:1, rock:0.5, paper:0},
        'paper' : {rock:1, paper:0.5, scissors:0},
        'scissors' : {paper:1, scissors:0.5, rock:0}        
    } 
    var humanScore = dataBase[humanChoice][boatChoice];
    var boatScore = dataBase[boatChoice][humanChoice];
 
    return [humanScore, boatScore];

}

function finalResult([humanChoice, boatChoice]){
 
    if (humanChoice == 0) {
        return {'message': 'You Lost!', 'color': 'red'};
    } else if(humanChoice == 0.5){
        return {'message': 'You Tied!', 'color': 'yellow'};
    }
    else if(humanChoice == 1){
        return {'message': 'You Win!', 'color': 'green'};;
    }

}

// Html Css visibility of functions

function rpsFrontEnd(humanChoice, boatChoice, message){

    var imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var boatDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imageDatabase[humanChoice] + "' height = 150 width = 150 style='box-shadow: 0px 18px 25px rgba(20 , 20, 200, 0.6);'>";
    messageDiv.innerHTML = "<h1 style = 'color: " + message['color'] + "; padding: 38px;'>" + message['message'] + "</h1>";
    boatDiv.innerHTML = "<img src='" + imageDatabase[boatChoice] + "' height = 150 width = 150 style='box-shadow: 0px 18px 25px rgba(200 , 20, 20, 0.6)'>";
   
    document.getElementById('flexbox3').appendChild(humanDiv);
    document.getElementById('flexbox3').appendChild(messageDiv);
    document.getElementById('flexbox3').appendChild(boatDiv);

}




// CHALLENGE 4: CHANGE THE COLOR OF ALL THE BUTTONS




var allButtons = document.getElementsByTagName('button');
var createDuplicate = [];
for(let i=0; i<allButtons.length; i++){
    createDuplicate.push(allButtons[i].classList[1]);
}

function implementColor(buttonThings){

    if (buttonThings.value == 'red') {
        buttonRed();
    }
    else if(buttonThings.value == 'green'){
        buttonGreen();
    }
    else if(buttonThings.value == 'blue'){
        buttonBlue();
    }
    else if(buttonThings.value == 'random'){
        buttonRandomColor();
    }
    else if(buttonThings.value == 'reset'){
        buttonColorReset();
    }
 
}

function buttonRed(){
    
    for (let index = 0; index < allButtons.length; index++) {
        allButtons[index].classList.remove(allButtons[index].classList[1]);
        allButtons[index].classList.add('btn-danger');
    }
 
}

function buttonGreen(){
    
    for (let index = 0; index < allButtons.length; index++) {
        allButtons[index].classList.remove(allButtons[index].classList[1]);
        allButtons[index].classList.add('btn-success');
    }
 
}

function buttonBlue(){
    
    for (let index = 0; index < allButtons.length; index++) {
        allButtons[index].classList.remove(allButtons[index].classList[1]);
        allButtons[index].classList.add('btn-primary');
    }
 
}

function buttonRandomColor(){
    
    for (let index = 0; index < allButtons.length; index++) {
        allButtons[index].classList.remove(allButtons[index].classList[1]);
        var color = randomColor();
        allButtons[index].classList.add(color);
    }

}

function randomColor(){
    
    var array = ['btn-danger', 'btn-success', 'btn-warning', 'btn-primary']
    var number = randomNumber(4);
    return array[number];

}

function buttonColorReset(){

    for (let index = 0; index < allButtons.length; index++) {
        allButtons[index].classList.remove(allButtons[index].classList[1]);
        allButtons[index].classList.add(createDuplicate[index]);
    }

}




// CHALLENGE 5: BLACK JACK




let blackJackGame = {
    'you': {'scoreSpan':'#you', 'div':'#your-Box', 'score':0},
    'dealer': {'scoreSpan':'#dealer', 'div':'#dealer-Box', 'score':0},
    'cards': ['A','2','3','4','5','6','7','8','9','10','J','K','Q'],
    'cardDesc': {'A': [1, 11], '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'K': 13, 'Q': 12},
    'wins': 0,
    'loses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];
 
const hitSound = new Audio('ascets/sounds/swish.m4a');
const winSound = new Audio('ascets/sounds/cash.mp3');
const lossSound = new Audio('ascets/sounds/aww.mp3');

document.querySelector('#hit').addEventListener('click', blackJackHit);
document.querySelector('#deal').addEventListener('click', blackJackDeal);
document.querySelector('#stand').addEventListener('click', blackJackStand);

// 1.   HITTING FUNCTIONS

function blackJackHit(){
    
    if (blackJackGame['isStand'] == false) {
        if (!(YOU['score'] > 21)) {
            let cards = randomCardsNumber();
            updateScore(cards, YOU); 
            showCard(cards, YOU);        
            showScore(YOU);   
        }    
    }
    
}


// FOR CHOOSING RANDOM CARDS

function randomCardsNumber(){
    let randomIndex = randomNumber(13);
    return blackJackGame['cards'][randomIndex];    
}

// UX

function showCard(cards, activeUser){

    if (activeUser['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `ascets/images/${cards}.png`;    
        document.querySelector(activeUser['div']).appendChild(cardImage);
        hitSound.play();
    }
    
}

function updateScore(cards, activeUser){

    // IF ADDING 11 WILL RESULTS IN GREATER THAN 21 THEN ADD 1 ELSE CAN ADD 11

    if (cards == 'A') {
        if (activeUser['score'] + blackJackGame['cardDesc'][cards][1] <= 21) {
            activeUser['score'] += blackJackGame['cardDesc'][cards][1];
        } else {
            activeUser['score'] += blackJackGame['cardDesc'][cards][0];
        }        
    }

    else{
        activeUser['score'] += blackJackGame['cardDesc'][cards];
    }
    
}

// SHOW SCORE ON SPAN ON PRESENT GAME NOT TABLE

function showScore(activeUser){
    if (activeUser['score'] > 21) {
        document.querySelector(activeUser['scoreSpan']).textContent = 'BUST';
        document.querySelector(activeUser['scoreSpan']).style.color = 'red';
    }
    else{
        document.querySelector(activeUser['scoreSpan']).textContent = activeUser['score'];    
    }
    
}


// 3.   FOR DELETING CARDS


function blackJackDeal(){

    if (blackJackGame['turnsOver'] === true) {

        blackJackGame['isStand'] = false;

        var yourCard = document.querySelector(YOU['div']).querySelectorAll('img');
    
        for (let index = 0; index < yourCard.length; index++) {
            yourCard[index].remove();
        }
        
        var dealerCard = document.querySelector(DEALER['div']).querySelectorAll('img');
        
        for (let index = 0; index < dealerCard.length; index++) {
            dealerCard[index].remove();
        }
        
        YOU['score'] = 0;
        DEALER['score'] = 0;
        
        document.querySelector(YOU['scoreSpan']).textContent = 0;
        document.querySelector(DEALER['scoreSpan']).textContent = 0;
        
        document.querySelector(YOU['scoreSpan']).style.color = 'black';
        document.querySelector(DEALER['scoreSpan']).style.color = 'black';
        
        document.querySelector('#result').textContent = "Let's Play";
        document.querySelector('#result').style.color = "black";
        
        blackJackGame['turnsOver'] = true;    
    
    }
    
}

// 2.   STANDING FUNCTIONS

function blackJackStand(){
        
        blackJackGame['isStand'] = true;

    while (DEALER['score'] < 16) {
        
        let cards = randomCardsNumber();
        updateScore(cards, DEALER);    
        showScore(DEALER);
        showCard(cards, DEALER);        

    }    

    blackJackGame['isStand'] = true;
    blackJackGame['turnsOver'] = true;
    showResults(computeWinner());
    document.querySelector('#looses').textContent = blackJackGame['loses'];
    document.querySelector('#draws').textContent = blackJackGame['draws'];    
        
}

function computeWinner(){
    
    let winner;

    //IF YOU DON'T BUST
    if (YOU['score'] <= 21 && DEALER['score'] <= 21) {
        
        // IF YOUR SCORE ARE GREATER THAN DEALER OR DEALER BUSTS
        if (YOU['score'] > DEALER['score']) {
            blackJackGame['wins']++;
            winner = YOU;
        }
        
        else if (YOU['score'] < DEALER['score']) {
            blackJackGame['loses']++;
            winner = DEALER
        } 
        
        else if(YOU['score'] === DEALER['score']){
            blackJackGame['draws']++;
        }        
        
    }
    
    // IF YOU BUST
    
    else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackJackGame['loses']++;
        winner = DEALER;        
    }
    
    // IF DEALER BUSTS
    
    else if (YOU['score'] <= 21 && DEALER['score'] > 21) {
        blackJackGame['wins']++;
        winner = YOU;
    }
    
    // IF BOTH BUSTS
    
    else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackJackGame['draws']++;
    }
    
    return winner;
}

// SHOWS RESULTS ON LET'S PLAY DESTINATION

function showResults(winner){

    if (blackJackGame['turnsOver'] === true) {

        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackJackGame['wins'];
            message = "You Win!!";
            messageColor = 'green';
            winSound.play();
        }
        else if(winner === DEALER){
            document.querySelector('#looses').textContent = blackJackGame['loses'];
            message = "You lost!!";
            messageColor = 'red';
            lossSound.play();
        }
        else{
            document.querySelector('#draws').textContent = blackJackGame['draws']; 
            message = "You Drew!!";
            messageColor = 'black';
        }
    
        document.querySelector("#result").textContent = message;
        document.querySelector("#result").style.color = messageColor;    
    
    }

}