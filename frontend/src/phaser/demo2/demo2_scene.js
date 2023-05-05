import 'phaser';

export default class Demo2Scene extends Phaser.Scene {
    preload() {
        this.load.spritesheet('samuraix', "/demos/demo2/samuraix.png", { frameWidth: 216, frameHeight: 216 });
        this.load.image('bg', "/demos/demo2/background.png");
        this.load.image('dragao', "/demos/demo2/dragao.png");
        this.load.image('monge', "/demos/demo2/monge.png");
        this.load.image('sacerdotiza', "/demos/demo2/sacerdotiza.png");

        this.load.image('samurai', "/demos/demo2/samurai.png");
        this.load.image('yukionna', "/demos/demo2/yukionna.png");
    }

    create() {
        //  The background  
        this.add.image(320, 0, 'bg').setOrigin(0.5, 0);

        //  Our animations
        this.anims.create({
            key: 'mashup',
            frames: [
                { key: 'dragao' },
                { key: 'monge' },
                { key: 'sacerdotiza' },
                { key: 'samurai' },
                { key: 'yukionna', duration: 50 }
            ],
            frameRate: 1,
            repeat: -1
        });
        /*
                const samuraix = this.add.sprite(100, 265, 'samuraix');
                samuraix.anims.create({
                    key: 'idle',
                    frames: this.anims.generateFrameNames('samuraix', { prefix: 'samuraix_standup_', start: 0, end: 4 }),
                   
                    repeat: -1
                });
        
            this.anims.create({
            key: 'standup',
            frames: this.anims.generateFrameNames('samuraix', { prefix: 'samuraix_standup_', start: 0, end: 4 }),
            duration: 1,
            repeat: -1
        });
       // this.add.sprite(150, 265, 'samuraix').play('standup');
         
                if('duration' in samuraix ){
                    samuraix.play('idle', true); 
                }
        */
        const samuraix = this.add.sprite(100, 265, 'samuraix');
        samuraix.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('samuraix', { prefix: 'samuraix_standup_', start: 0, end: 4 }),

            repeat: -1
        });
        this.add.sprite(450, 285, 'dragao').play('mashup');


    }
    update() { }
}