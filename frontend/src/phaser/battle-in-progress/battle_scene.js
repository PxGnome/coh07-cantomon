import 'phaser';

export default class Demo3Scene extends Phaser.Scene {
    constructor(args) {
        super();
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
        
        this.load.spritesheet('cloud', "/battle-in-progress/battlecloudsheet.png", { frameWidth: 150, frameHeight: 125 });
        this.load.image('bg', "/battle-in-progress/battle-arena.png");
        if (this.player != "" && this.enemy != "") {
            this.load.image('player', this.player);
            this.load.image('enemy', this.enemy);
        }
    }

    create() {
        //  The background  
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

            this.physics.world.enable(this.playerFighting); 
            this.playerFighting.body.setCollideWorldBounds(true);
            this.physics.world.enable(this.enemyFighting); 
            this.enemyFighting.body.setCollideWorldBounds(true);
           
          
            this.cloud = this.add.sprite(310, 205, 'cloud');
            this.cloud.setScale(0.6);
            this.cloud.setVisible(false); 
            
        
        }

    }
    update() {
        this.physics.add.collider(this.playerFighting, this.enemyFighting, function(gameObject1, gameObject2) {
              
            
        }); 
    }
}