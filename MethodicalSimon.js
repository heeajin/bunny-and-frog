var MethodicalSimon = MethodicalSimon || function ( answerColors, lightingUp, match, onCorrectButton, onWrongButton){

	this.answerColors = answerColors;
	this.currentLevel = -1;
	this.lightUpIndex = -1;
	this.pressButtonIndex = -1;

	this.isMatch = match || function ( answerColor, reproducedColor ){
		return answerColor == reproducedColor;
	};

	this.lightUp = lightingUp || function( answerColor ){
		for ( this.currentIndex = 0; this.currentIndex < answerColor.length; this.currentIndex++ ) {
			console.log( answerColor[this.currentIndex] );
		}
	}

	this.pressButton = function () {

	}

	this.onCorrectButton = onCorrectButton || function () {};
	this.onWrongButton = onWrongButton || function () {};
	this.onLevelStarted = function () { console.log("level ", this.currentLevel) };
	this.onEndOfLevel = function () { console.log("end of level") };
	this.onEndOfGame = function () { console.log("end of game")};

	this.startGame = function () {
		this.currentLevel = 0;
		
		this.startLevel();
	}

	this.startLevel = function (){
		this.lightUpIndex = 0;
		this.pressButtonIndex = 0;

		this.onLevelStarted(this.currentLevel);
		this.lightUp( this.answerColors[this.currentLevel] );

		this.pressButton = function ( reproducedColor ) {
			if ( this.isMatch( this.answerColors[this.currentLevel][this.pressButtonIndex], reproducedColor ) ){
				this.onCorrectButton();
			} else {
				this.onWrongButton();
			}
			this.goToNextColor();
		}
	}

	this.goToNextColor = function () {
		this.pressButtonIndex++;
		if ( this.pressButtonIndex < this.answerColors[this.currentLevel].length ){

		} else {
			this.onEndOfLevel();
			this.goToNextLevel();
		}
	}

	this.goToNextLevel = function () {
		this.currentLevel++;
		if ( this.currentLevel < this.answerColors.length ) {
			this.startLevel();
		} else {
			this.onEndOfGame();
		}
	}

}