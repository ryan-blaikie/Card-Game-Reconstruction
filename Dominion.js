  // Next development ideas:
  // Animation for EndTurn
  //Display Message section (e.g. "Not enough treasure!")
  //Display buy cost and Treasure value of cards to purchase (need more screen space so probably do this on Git)
  // Make Buy Card button dull if no card is selected
  // ///*



///--------SuperClass Card--------///
class Card {
    constructor(){
      var buyCost;
      var name;
    }
  }
  
  ///--------Main Card Types--------///
  class Treasure extends Card {
  constructor(){
    super();
    var treasureValue;}
  }
  
  class Action extends Card {}
  
  class victoryPoint extends Card {
    constructor(){
      super();
      var pointValue;}
  }
  
  ///--------Treasure Card Types--------///
  
  class Copper extends Treasure {
    constructor(){
      super();
      super.buyCost = 0;
      super.treasureValue = 1;
    }
  }
  
  class Silver extends Treasure {
    constructor(){
      super();
      super.buyCost = 3;
      super.treasureValue = 2;
    }
  }
  
  class Gold extends Treasure {
    constructor(){
      super();
      super.buyCost = 6;
      super.treasureValue = 3;
    }
  }
  
  ///--------Victory Point Card Types--------///
  
  class Estate extends victoryPoint {
    constructor(){
      super();
      super.buyCost = 2;
      super.pointValue = 1;
    }
  }
  
  class Duchy extends victoryPoint {
    constructor(){
      super();
      super.buyCost = 5;
      super.pointValue = 3;
    }
  }
  
  class Province extends victoryPoint {
    constructor(){
      super();
      super.buyCost = 8;
      super.pointValue = 6;
    }
  }
  
  class Turn{
    constructor(){
      this.treasure = handTreasure();
      this.actions = 1;
      this.buys = 1;
  }}
  
  class CardFactory{
    static getCard(className){
      if (className == "Copper"){return new Copper();}
      else if (className == "Silver"){return new Silver();}
      else if (className == "Gold"){return new Gold();}
      else if (className == "Estate"){return new Estate();}
      else if (className == "Duchy"){return new Duchy();}
      else if (className == "Province"){return new Province();}
      return null;
    }
  }
    
  function getDeck(){
    var deck = [];
    for (var i=0; i<draw.length; i++){
      deck.push(draw[i]);
    }
    for (var i=0; i<hand.length; i++){
      deck.push(hand[i]);
    }
    for (var i=0; i<discard.length; i++){
      deck.push(discard[i]);
    }
    return deck;
  }
  
  
  
  ///--------Modified Shuffle--------///
  ///--------By Chris Coyier--------///
  // https://css-tricks.com/snippets/javascript/shuffle-array/
  function shuffle(o) {
      for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
  };
  
  function drawCards(num){
    for (var i = 0; i<num; i++){
      if (draw.length > 0){
        var card = draw.pop();
        hand.push(card);
      }
      else {
        shuffle(discard);
        while (discard.length > 0){
          var card2 = discard.pop();
          draw.push(card2);
        }
        discard = [];
        var card3 = draw.pop();
        hand.push(card3);
      }
    }
      
  }
  
  function showCards(pile){
    var text = "";
    if (pile == hand){text = "My hand: ";}
    else if (pile == discard){text = "My discard pile: ";}
    else {text = "My deck: ";}
    for (var i = 0; i < pile.length; i++){
      text += pile[i].constructor.name;
      if (i<pile.length-1){text += ", ";}
    }
    document.getElementById("myHand").innerHTML = text;
  }
  
  function handTreasure(){
    var total = 0;
    for (var i = 0; i < hand.length; i++){
      if (hand[i] instanceof Treasure){
        total += hand[i].treasureValue;
      }
    }
    return total;
  }
  
  function countVictory(){
    var total = 0;
    var deck = getDeck();
    for (var i = 0; i < deck.length; i++){
      if (deck[i] instanceof victoryPoint){
        total += deck[i].pointValue;
      }
    }
      document.getElementById("myVictoryPoints").innerHTML = "Victory Points: " + total;  
  }
    
    function countCards(pile){
      var dict = {};
      for (var i = 0; i < pile.length; i++){  //Create dictionary//
        var key = pile[i].constructor.name;
        if (key in dict){
          dict[key] += 1;
        }
        else {
          dict[key] = 1;
        }
      }
      var dictText = "";
  
      if (pile == draw){
        dictText = "Draw Pile: \n"
      }
      else if (pile == discard){
        dictText = "Discard Pile: \n"
      }
      else {
        dictText = "Deck: \n"
      }
  
      
      for (key in dict){
        dictText = dictText + "\t" + key + ": " + dict[key] + "\n";
      }
      document.getElementById("pile").innerHTML = dictText;
    }
  
  
  function pileTotal(pile){
    var size = pile.length;
    if (pile == discard){
    document.getElementById("myDiscard").innerHTML = "Discard pile: " + size;  
    }
    else if (pile == draw){
     document.getElementById("myDraw").innerHTML = "Draw pile: " + size;  
    }
  }
  
  function displaySelected(){
    document.getElementById("displaySelected").innerHTML = "Selected Card: " + selectedCardText;
  }
  
  function endTurn(){
    var len = hand.length;
    for (var i = 0; i < len; i++){
      var card = hand.pop();
      discard.push(card);
    }
      drawCards(5);
      turn = new Turn();
      unselectAll();
      display();
  }
  
  ///--------Displays Hand--------///
  function display(){
    showCards(hand);
    document.getElementById("myTreasure").innerHTML = "Treasure: " + turn.treasure;
    document.getElementById("myBuys").innerHTML = "Buys: " + turn.buys;
      document.getElementById("myActions").innerHTML = "Actions: " + turn.actions;
    countVictory();
    pileTotal(draw);
    pileTotal(discard);
    displaySelected();
  }
  
  ///--------End Turn Button--------///
  document.getElementById("endTurnButton").onclick = function() {endTurn()};
  
  ///Dict containing remaining available cards in pile to obtain
  var cardPileAmt = {};
  ///--------Card Pile Select--------///
  var cardPilesDiv = document.getElementsByClassName("cardPile");
    for (var i = 0; i<cardPilesDiv.length; i++){
      var c = cardPilesDiv[i];
      var name = cardPilesDiv[i].innerHTML;
      //add selection function
      c.onclick = function() {selectCard(event)};
      //initialise 20 cards in each draw pile via dictionary.
      cardPileAmt[name] = 20;
    }
  
    function selectCard(event){
      for (var i = 0; i<cardPilesDiv.length; i++){
        if (cardPilesDiv[i] == event.target){
          cardPilesDiv[i].classList.toggle("selected");
          if (cardPilesDiv[i].classList.contains("selected")){
            selectedCard = cardPilesDiv[i]; 
            selectedCardText = cardPilesDiv[i].innerHTML;
          }
          else{
            selectedCard = null; 
            selectedCardText = "";
          }
          display();
        }
        else if (cardPilesDiv[i].classList.contains("selected")){
          cardPilesDiv[i].classList.toggle("selected");
        }}}
  
  function unselectAll(){
        for (var i=0; i< cardPilesDiv.length; i++){
        if (cardPilesDiv[i].classList.contains("selected")){
          cardPilesDiv[i].classList.toggle("selected");
        }}
      selectedCard = null;
      selectedCardText = "";
  }
  
  ///--------Show Pile Buttons--------///
  var modal = document.getElementById("Modal");
  var close = document.getElementsByClassName("close")[0];
  
  showDraw.onclick = function() {  
    modal.style.display = "block";
    countCards(draw);
  };
  showDeckButton.onclick = function() {  
    modal.style.display = "block";
    countCards(getDeck());
  };
  showDiscardButton.onclick = function() {  
    modal.style.display = "block";
    countCards(discard);
  };
  
  document.getElementById("buyCard").onclick = function(){
    buyCard();
  }
  
  function buyCard(){
    var card = CardFactory.getCard(selectedCardText)
    if (selectedCard != null && cardPileAmt[selectedCardText] > 0 && card.buyCost <= turn.treasure && turn.buys > 0){
      discard.push(card);
      cardPileAmt[selectedCardText] -= 1;
      turn.treasure -= card.buyCost;
      turn.buys -= 1;
      display();
    }
  
  }
  
  // When the user clicks on <span> (x), close the modal
  close.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }}
  
  ///--------Player Card Piles--------///
  var draw = [];
  var hand = [];
  var discard = [];
  var turn = new Turn();
  var selectedCard = null;
  var selectedCardText = "";
  
  ///--------Initial Starting Deck--------///
  for (var i = 0; i < 7; i++){
    var c = new Copper();
    draw.push(c);
  }
  
  for (var i = 0; i < 3; i++){
    var c = new Estate();
    draw.push(c);
  }
  ///--------Main--------///
  shuffle(draw);
  drawCards(5);
  endTurn();
  
  
  
  
  
  
  
  
  