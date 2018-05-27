//Javascript code for The Hangman Game.
//UM Coding Boot Camp 2018. Joed Machado.


var painters = [
    {
        name: "Vincent van Gogh",
        year: "1853-1890",
        country: "Dutch",
        image: "vincent.jpg"
    },

    {
        name: "Claude Monet",
        year: "1840-1926",
        country: "French",
        image: "claude.jpg"
    },

    {
        name: "Pablo Picasso",
        year: "1881-1973",
        country: "Spanish",
        image: "pablo.jpg"
    },

    {
        name: "Leonardo da Vinci",
        year: "1452-1519",
        country: "Italian",
        image: "leonardo.jpg"
    },

    {
        name: "Rembrandt",
        year: "1606-1669",
        country: "Dutch",
        image: "rembrandt.jpg"
    },

    {
        name: "Michelangelo",
        year: "1475-1564",
        country: "Italian",
        image: "michelangelo.jpg"
    },

    {
        name: "Johannes Vermeer",
        year: "1632-1675",
        country: "Dutch",
        image: "johannes.jpg"
    },

    {
        name: "Salvador Dali",
        year: "1904-1989",
        country: "Spanish",
        image: "salvador.jpg"
    },

    {
        name: "Frida Kahlo",
        year: "1907-1954",
        country: "Mexican",
        image: "frida.jpg"
    },

    {
        name: "Edgar Degas",
        year: "1834-1917",
        country: "French",
        image: "edgar.jpg"
    },

    {
        name: "Raphael",
        year: "1483-1520",
        country: "Italian",
        image: "raphael.jpg"
    },

    {
        name: "Caravaggio",
        year: "1571-1610",
        country: "Italian",
        image: "caravaggio.jpg"
    },

    {
        name: "Sandro Botticelli",
        year: "1445-1510",
        country: "Italian",
        image: "boticelli.jpg"
    },

    {
        name: "Edvard Munch",
        year: "1863-1944",
        country: "Norwegian",
        image: "munch.jpg"
    },

    {
        name: "Edouard Manet",
        year: "1832-1883",
        country: "French",
        image: "eduard.jpg"
    },

    {
        name: "Diego Velazquez",
        year: "1599-1660",
        country: "Spanish",
        image: "velazquez,jpg"
    },

    {
        name: "Francisco Goya",
        year: "1746-1828",
        country: "Spanish",
        image: "goya.jpg"
    },

    {
        name: "Rene Magritte",
        year: "1898-1967",
        country: "Belgian",
        image: "magritte.jpg"
    }
    
];

var hangman = {
    wins: 0,
    startAgain: false,
    remainGuesses: 12,
    letterGuesses: [],
    wordIndex: 0,
    currentWord: "",
    guessedWord: [],
    wordList: [],
   
    updateScreen: function(){
        document.getElementById("wins").innerHTML = this.wins;
        document.getElementById("curWord").innerHTML = this.showGuessedWord();
        document.getElementById("guessRemain").innerHTML = this.remainGuesses;

        var guesses = "";
        if (this.letterGuesses != null) {
            for (let i=0; i<this.letterGuesses.length; i++){
                guesses += this.letterGuesses[i] + ',';
            }
        }  
        document.getElementById("lettersGuesses").innerHTML = guesses;   
    },

    showGuessedWord: function(){
        var show = "";
        for (let i = 0; i < this.guessedWord.length; i++ ) {
            show = show + this.guessedWord[i].toUpperCase() + " ";
        }
        return show;
    },

    initialize: function(){

        for ( let i = 0; i < painters.length; i++ ) {
            this.wordList.push( painters[i].name );
        }

        this.wins = 0;
        this.wordIndex = 0;

        this.reset();
    },

    reset: function(){
        this.startAgain = false;
        this.remainGuesses = 12;
        this.letterGuesses = [];
        this.currentWord = this.pickWord();
        this.maskWord(); // fills guessedWord
        this.updateScreen();
    },

    pickWord: function(){
        if ( this.wordIndex === this.wordList.length ) { 
            this.wordIndex = 0; 
        }
        let i = this.wordIndex;
        this.wordIndex++;
        return this.wordList[ i ].toLocaleUpperCase();
    },

    maskWord: function(){
        this.guessedWord = [];
        for (let i = 0; i < this.currentWord.length; i++){
            let char = this.currentWord.charAt(i);
            if ( this.currentWord.charCodeAt(i) != 32) { this.guessedWord.push("_") }
            else { this.guessedWord.push( "." ) }
        }
    },

    unmaskWord: function(letter){ // Insert the guessed letter in guessedWord
        for (let i=0; i < this.currentWord.length; i++){
            if ( letter === this.currentWord.charAt(i) ) { this.guessedWord[i] = letter }
        }
    },

    isAlreadyGuessed: function( letter ){ //return true is the letter has been keyed before and false if is not, in tha last case it includes the letter to the letterGuesses
        var result = this.letterGuesses.includes( letter );
        if ( !result ) {
            this.letterGuesses.push( letter );
        }
        return result;
    },

    isLetterInWord: function( letter ){ //return true if the letter is in the current selected word and replace _ with the letter
        var result = this.currentWord.includes( letter );
        return result;
    },

    isAllGuessed: function() {
        return !( this.guessedWord.includes("_") );
    },

    showPicture: function() {
        document.getElementById('name').innerHTML = painters[this.wordIndex-1].name;
        document.getElementById('country').innerHTML = painters[this.wordIndex-1].country;
        document.getElementById('year').innerHTML = painters[this.wordIndex-1].year;
        document.getElementById('painter').src = "assets/images/" + painters[this.wordIndex-1].image;
        document.getElementById('googleIt').style.display = "block";
        document.getElementById('googleIt').href = "https://www.google.com/search?q=" + painters[this.wordIndex-1].name;

        //https://www.google.com/search?q=
    },

    youWin: function() {
        console.log( this.guessedWord );
        this.updateScreen();
        this.showPicture();
        this.wins ++;
        this.startAgain = true;
        alert("You Win !")
    },

    youLoose: function() {
        alert("You Losse...");
        this.startAgain = true;
    },


    play: function( key ){ // key has the value of the pressed key already converted to upper case

        if ( this.isAlreadyGuessed(key) ){
            console.log( "Already guessed - " + key);
        }
        else {

            if ( this.isLetterInWord( key ) ) { 
                this.unmaskWord( key ); 
            }

            if ( this.isAllGuessed() ) { 
                this.updateScreen();
                this.youWin(); 
            }

            this.remainGuesses--;

            if ( this.remainGuesses === 0) { this.youLoose(); }
        }


        this.updateScreen();
    }

}//hangman

//Start running

var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

hangman.initialize();

document.onkeyup = function(ev){
    var keyPressed = ev.key.toUpperCase();

    if ( hangman.startAgain ) {
        hangman.reset();
    }
    else {
        if ( alphabet.includes( keyPressed ) ) {
            hangman.play( keyPressed );
        }
    }

}