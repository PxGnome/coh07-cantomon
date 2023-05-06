
import 'phaser';
import BattleScene from './battle_scene';
import { useEffect } from 'react';

import { useSelector } from "react-redux";
export default function PhaserApp() {

  const selected_cantomon = useSelector((state) => state?.cantomonStore.selected_cantomon);
  const selected_enemy = useSelector((state) => state?.cantomonStore.selected_enemy);
  useEffect(() => {
    loadGame();
  }, []);

  const loadGame = async () => {

    if (typeof window !== 'object') {
      return;
    }
    const config = {
      type: Phaser.AUTO,
      parent: 'battlescene-container',
      width: 640,
      height: 360,
      backgroundColor: '#026bc6',
      pixelArt: true,
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
/*
          tileBias: 20,
          gravity: {
            y: 0
          },
          debug: true,
          debugShowBody: true,
          debugShowStaticBody: true,
          */
        }
      },
    };

    var game = await new Phaser.Game(config);
 

    game.scene.add('battlescene', new BattleScene({
      "selected_enemy": selected_enemy,
      "selected_cantomon": selected_cantomon
    }));
    game.scene.start('battlescene');

  };

  return null;
}