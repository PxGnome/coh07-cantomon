
import 'phaser';
import Demo1Scene from './demo1_scene';
import { useEffect } from 'react';

export default function PhaserApp() { 

  useEffect(() => {
    loadGame();
  }, []);

  const loadGame = async () => {
    
    if (typeof window !== 'object') {
      return;
    }
/*
    var config = {
      type: Phaser.AUTO,
      width: 640,
      height: 360,
      // width: window.innerWidth * window.devicePixelRatio,
      // height: window.innerHeight * window.devicePixelRatio,
      backgroundColor: '#4eb3e7',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 200 },
        },
      },
      parent: 'game',

      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };
*/
    const config = {
        type: Phaser.AUTO,
        parent: 'gamedemo1',
        width: 800,
        height: 600,
        backgroundColor: '#026bc6',
        pixelArt: true, 
    };

    var game = new Phaser.Game(config);

    game.scene.add('main', Demo1Scene);
    game.scene.start('main');
  };

  return null;
}