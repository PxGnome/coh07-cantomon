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

        this.load.spritesheet('cloud', "/battle-in-progress/battlecloudsheet.png", { frameWidth: 145, frameHeight: 144 });
        this.load.spritesheet('cloud-1', "/battle-in-progress/cloud-1.png", { frameWidth: 145, frameHeight: 144 });
        this.load.spritesheet('cloud-2', "/battle-in-progress/cloud-2.png", { frameWidth: 145, frameHeight: 144 });
        this.load.spritesheet('cloud-3', "/battle-in-progress/cloud-3.png", { frameWidth: 145, frameHeight: 144 });
        this.load.spritesheet('cloud-4', "/battle-in-progress/cloud-4.png", { frameWidth: 145, frameHeight: 144 });
        this.load.spritesheet('cloud-5', "/battle-in-progress/cloud-5.png", { frameWidth: 145, frameHeight: 144 });
        this.load.spritesheet('cloud-6', "/battle-in-progress/cloud-6.png", { frameWidth: 145, frameHeight: 144 });
        this.load.spritesheet('cloud-7', "/battle-in-progress/cloud-7.png", { frameWidth: 145, frameHeight: 144 });
        this.load.spritesheet('cloud-8', "/battle-in-progress/cloud-8.png", { frameWidth: 145, frameHeight: 144 });
        this.load.spritesheet('cloud-9', "/battle-in-progress/cloud-9.png", { frameWidth: 145, frameHeight: 144 });
        this.load.spritesheet('cloud-10', "/battle-in-progress/cloud-10.png", { frameWidth: 145, frameHeight: 144 });
        this.load.spritesheet('cloud-11', "/battle-in-progress/cloud-11.png", { frameWidth: 145, frameHeight: 144 });
        this.load.spritesheet('cloud-12', "/battle-in-progress/cloud-12.png", { frameWidth: 145, frameHeight: 144 });

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
                frames: [
                    { key: 'cloud-1' },
                    { key: 'cloud-2' },
                    { key: 'cloud-3' },
                    { key: 'cloud-4' },
                    { key: 'cloud-5' },
                    { key: 'cloud-6' },
                    { key: 'cloud-7' },
                    { key: 'cloud-8' },
                    { key: 'cloud-9' },
                    { key: 'cloud-10' },
                    { key: 'cloud-11' },
                    { key: 'cloud-12' },
                ],
                frameRate: 60,
                repeat: -1
            });

            this.physics.world.enable(this.playerFighting);
            this.playerFighting.body.setCollideWorldBounds(true);
            this.physics.world.enable(this.enemyFighting);
            this.enemyFighting.body.setCollideWorldBounds(true);
            window.playerFighting = this.playerFighting;
            window.enemyFighting = this.enemyFighting;

            window.cloud = window.gamex.add.sprite(295, 210, 'cloud');
            window.cloud.setScale(0.8);
            window.explodeAnim = window.cloud.play("explode", false);
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