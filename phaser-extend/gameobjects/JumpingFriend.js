if ( !Phaser.GameObjectFactory ){
	throw "Exception Phaser.GameObjectFactory undefined.";
}
var JumpingFriend = JumpingFriend || {

};

Phaser.GameObjectFactory.prototype.JumpingFriend = function (x, y, key, frameIdle, frameJump, jumpHeight, group, audio){

	// 반환될 객체 
	var friend = this.sprite(x, y, key);

    friend.jumpingSound = this.audio(audio);
    friend.jumpHeight = jumpHeight;

    // 에니메이션 추가
    friend.animations.add('idle', frameIdle);
    friend.animations.add('jump', frameJump);

	// 점프 모션을 두 단계로 나누어서 생성 : 도약 모션과 떨어지는 모션.
 	var leapTween = this.tween(friend).to({ y: friend.y - jumpHeight }, 100, Phaser.Easing.Circular.Out);
    var fallTween = this.tween(friend).to({ y: friend.y }, 100, Phaser.Easing.Circular.In)
    // 도약 모션 종료 --> 떨어지는 모션 시작
    leapTween.onComplete.add( function (){
    	fallTween.start();
    }, friend);
    // 점프 모션 종료 --> 프레임 Idle로 조정
	fallTween.onComplete.add( function(){
		this.setFrameIdle();
	} , friend);

    friend.jumpingTween = leapTween;

    friend.setFrameIdle = function () {
    	this.animations.play('idle', 30, true);
    }

    friend.setFrameJump = function () {
	    this.animations.play('jump', 30, true);
    }

    friend.jump = function (){
    	friend.setFrameJump();
    	friend.jumpingSound.play();
    	friend.jumpingTween.start();
    }

    return friend;
}