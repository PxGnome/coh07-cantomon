
import 'phaser';
import Demo2Scene from './demo2_scene';
import { useEffect } from 'react';

export default function PhaserApp() { 

  useEffect(() => {
    loadGame();
  }, []);

  const loadGame = async () => {
    
    if (typeof window !== 'object') {
      return;
    } 
    const config = {
        type: Phaser.AUTO,
        parent: 'gamedemo2',
        width: 640,
        height: 360,
        backgroundColor: '#026bc6',
        pixelArt: true, 
    };

    var game = new Phaser.Game(config);

    game.scene.add('demo2', Demo2Scene);
    game.scene.start('demo2');
  };

  return null;
}