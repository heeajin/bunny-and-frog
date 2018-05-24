
var RhythmicalSimon = RhythmicalSimon || function ( sheet, time, lightUp, match){

	this.enemySheet = this.playerSheet = sheet || new Sheet( new phrase(new Note( 1000, 1)), new phrase(new Note(2000, 1)) );
	this.time = time || Date.now;

	this.isMatch = match || function ( answerNote, inputNote ) {
		var timeDiff = answerNote.time - inputNote.time;
		var solfageoMatched = answerNote.solfageo == inputNote.solfageo;
		return timeDiff==0 && solfageoMatched
	}

	this.onChangeToEnemyTurn = onChangeToEnemyTurn || function (){
		console.log("#");
	}

	this.lightUp = lightUp || funtcion ( note ) {
		console.log( note.solfageo );
	}

	this.onChangeToPlayerTurn = onChangeToPlayerTurn || function ( note ){
		console.log("#");
	}

	this.pressButton = function( solfageo ){
		this.inNote.time = this.time();
		this.inNote.solfageo = solfageo;
		console.log( isMatch( ) ? "O" : "X");
	}

	this.update = function(){
		if ( this.outNote.time() >= this.time() ){
			this.lightUp( this.outNote );
			this.outNote = this.outNote.next;
		}
	}

	this.outNote = this.enemySheet.phrase().note();
	this.inNote = new Note();
	this.answerNote = new Note();
}

RhythmicalSimon.Note = Note || function ( time, solfageo ) {
	this.time = time;
	this.solfageo = solfageo;
}

RhythmicalSimon.phrase = phrase || function ( ...notes ) {
	this[0] = notes[0];
	for ( var i = 1 ; i < notes.length ; i++) {
		this[i] = this[i-1].next = notes[i];
	}
	this.noteIndex = -1;
	this.note = function (){
		return this[this.noteIndex];
	}
	this.next = function (){
		return this[this.noteIndex++];
	}
	this.reset = function () {
		this.noteIndex = 0;
	}
}

RhythmicalSimon.Sheet = Sheet || function ( ...phrases ) {
	this[0] = phrases[0];
	for ( var i = 1 ; i < phrases.length ; i++) {
		this[i] = this[i-1].next = phrases[i];
	}
	this.phraseIndex = -1;
	this.phrase = function () {
		return  this.[this.phraseIndex];
	}
	this.next = function (){
		return  this.[this.phraseIndex++];
	}
}

RhythmicalSimon.Tempo = RhythmicalSimon.Tempo || function (BPM) {
	this.BPM = BPM || 120;
	this.mspb= 1000 / BPM * 240;
}