import * as BABYLON from 'babylonjs';
import { useEffect, useRef } from 'react';

interface BabylonSceneProps {}

const BabylonScene = (props: BabylonSceneProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const engine = new BABYLON.Engine(canvas, true);

      const scene = new BABYLON.Scene(engine);

      // Add your Babylon.js code here

      engine.runRenderLoop(() => {
        scene.render();
      });
    }
  }, []);

  return <canvas ref={canvasRef} />;
};

export default BabylonScene;
