
import 'phaser';
import Demo3Scene from './demo3_scene';
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
        parent: 'gamedemo3',
        width: 640,
        height: 360,
        backgroundColor: '#026bc6',
        pixelArt: true, 
    };

    var game = new Phaser.Game(config);

    game.scene.add('demo3', Demo3Scene);
    game.scene.start('demo3');
  };

  return null;
}