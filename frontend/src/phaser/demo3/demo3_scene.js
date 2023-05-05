import 'phaser';

export default class Demo3Scene extends Phaser.Scene {
    preload() {
        this.load.atlas('knight', "/demos/demo1/knight.png", "/demos/demo1/knight.json");
        this.load.image('bg', "/demos/demo2/background.png");
    }

    create() {
        //  The background  
        this.add.image(320, 0, 'bg').setOrigin(0.5, 0);


        //  Our animations
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('knight', { prefix: 'idle/frame', start: 0, end: 5, zeroPad: 4 }),
            frameRate: 8,
            repeat: -1
        });


        this.anims.create({
            key: 'guardStart',
            frames: this.anims.generateFrameNames('knight', { prefix: 'guard_start/frame', start: 0, end: 3, zeroPad: 4 }),
            frameRate: 8
        });

        this.anims.create({
            key: 'guard',
            frames: this.anims.generateFrameNames('knight', { prefix: 'guard/frame', start: 0, end: 5, zeroPad: 4 }),
            frameRate: 8,
            repeat: 2
        });

        this.anims.create({
            key: 'guardEnd',
            frames: this.anims.generateFrameNames('knight', { prefix: 'guard_end/frame', start: 0, end: 3, zeroPad: 4 }),
            frameRate: 8
        });

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNames('knight', { prefix: 'run/frame', start: 0, end: 7, zeroPad: 4 }),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNames('knight', { prefix: 'attack_A/frame', start: 0, end: 13, zeroPad: 4 }),
            frameRate: 12
        });

        this.anims.addMix('idle', 'guardStart', 1500);
        
        this.anims.addMix('idle', 'attack', 1500);
        this.anims.addMix('attack', 'idle', 1500);

        this.anims.addMix('guardStart', 'guard', 1500);
        this.anims.addMix('guard', 'guardEnd', 1500);
        this.anims.addMix('guardEnd', 'idle', 2000);

        var lancelotA = this.add.sprite(190, 350);
        lancelotA.setOrigin(0.5, 1);
        lancelotA.setScale(2);

        lancelotA.play('guardStart');

        var lancelotB = this.add.sprite(250, 350);
        lancelotB.setOrigin(0.5, 1);
        lancelotB.setScale(2);
        lancelotB.setFlipX(true);
 
        lancelotB.play('attack');
        lancelotA.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {


            if (lancelotA.anims.getName() === 'idle') {
                lancelotA.play('guardStart');
            }
            if (lancelotA.anims.getName() === 'guardStart') {
                lancelotA.play('guard');
            }
            if (lancelotA.anims.getName() === 'guard') {
                lancelotA.play('guardEnd');
            }
            if (lancelotA.anims.getName() === 'guardEnd') {
                lancelotA.play('idle');
            }
            if (lancelotB.anims.getName() === 'attack') {
                lancelotB.play('idle');
            }
            
        }, this);




    }
    update() { }
}