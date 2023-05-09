import 'phaser';

export default class Demo3Scene extends Phaser.Scene {
    constructor(args) {
        super();
        window.game = this;
        window.isCollide = false;
        this.systemdata = args;
        try {
            this.player = this.systemdata.selected_cantomon.image.src;
            this.enemy = this.systemdata.selected_enemy.image.src
        } catch (error) {
            this.player = "";
            this.enemy = "";
        }

    }

    preload() {

        this.load.spritesheet('cloud', "/battle-in-progress/cloudsheet.png", { frameWidth: 160, frameHeight: 145 });
        this.load.image('bg', "/battle-in-progress/battle-arena.png");
        if (this.player != "" && this.enemy != "") {
            this.load.image('player', this.player);
            this.load.image('enemy', this.enemy);
        }
    }

    create() {
        //  The background  
        window.gamex = this;
        this.add.image(320, 0, 'bg').setOrigin(0.5, 0);
        if (this.player != "" && this.player != "") {
            const player = this.add.image(70, 237, 'player').setOrigin(0.5, 0);
            const enemy = this.add.image(572, 237, 'enemy').setOrigin(0.5, 0);
            const playerFighting = this.add.image(235, 190, 'player').setOrigin(0.5, 0);
            const enemyFighting = this.add.image(389, 190, 'enemy').setOrigin(0.5, 0);
            this.playerFighting = playerFighting;
            this.enemyFighting = enemyFighting;
            this.tweens.add({
                targets: this.playerFighting,
                x: 305,
                ease: 'Power0',
                duration: 2000,
                flipX: true,
                yoyo: true,
                repeat: -1,
            });
            this.tweens.add({
                targets: this.enemyFighting,
                x: 305,
                ease: 'Power0',
                duration: 2000,
                flipX: true,
                yoyo: true,
                repeat: -1,
            });
            player.setScale(1.8);
            enemy.setScale(1.8);
 

            this.anims.create({
                key: 'explode',
                frames: this.anims.generateFrameNames('cloud', {
                  start: 0,
                  end: 11,
                }),
                frameRate: 22,
                repeat: -1
              });

            this.physics.world.enable(this.playerFighting);
            this.playerFighting.body.setCollideWorldBounds(true);
            this.physics.world.enable(this.enemyFighting);
            this.enemyFighting.body.setCollideWorldBounds(true);
            window.playerFighting = this.playerFighting;
            window.enemyFighting = this.enemyFighting;
 
            window.cloud = this.add.sprite(295, 210, 'cloud');
            window.cloud.setScale(0.8);
            window.explodeAnim = window.cloud.play("explode");
            window.cloud.setVisible(false);

            this.physics.add.overlap(this.playerFighting, this.enemyFighting, function (gameObject1, gameObject2) {
                if (Phaser.Math.Within(gameObject1.body.center.x, gameObject2.body.center.x, 14)) {
                    window.cloud.setVisible(true);
                } else {
                    window.cloud.setVisible(false);
                }
            });
            window.isCollide = false;



        }

    }
    update() {
    }
}