//Javascript code for The Hangman Game.
//UM Coding Boot Camp 2018. Joed Machado.

var hangman = {
    wins: 0,
    remainGuesses: 15,
    letterGuesses: [],
    wordIndex: 0,
    currentWord: "",
    wordlList:[ 
        "Vincent van Gogh",
        "Claude Monet",
        "Pablo Picasso",
        "Leonardo da Vinci",
        "Rembrandt",
        "Michelangelo",
        "Johannes Vermeer",
        "Salvador Dali",
        "Frida Kahlo",
        "Edgar Degas",
        "Raphael",
        "Caravaggio",
        "Sandro Botticelli",
        "Edvard Munch",
        "Edouard Manet"
    ],

    initialize: function(){
        this.wins = 0;
        this.remainGuesses = 15;
        this.letterGuesses = [];
        this.wordIndex = 0;
        this.currentWord = this.pickWord();
    },

    pickWord: function(){
        if (wordIndex === this.wordlList.length()) { this.wordIndex = 0 }
        let i = this.wordIndex;
        this.wordIndex++;
        return this.wordList[ i ];
    }
}