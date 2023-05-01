import { useEffect, useRef } from 'react';
import * as BABYLON from 'babylonjs';

export type BabylonjsProps = {
  antialias?: boolean;
  engineOptions?: BABYLON.EngineOptions;
  adaptToDeviceRatio?: boolean;
  renderChildrenWhenReady?: boolean;
  sceneOptions?: BABYLON.SceneOptions;
  onSceneReady: (scene: BABYLON.Scene) => void;
  observeCanvasResize?: boolean;
  onRender?: (scene: BABYLON.Scene) => void;
  children?: React.ReactNode;
};

function SceneComponet(
  props: BabylonjsProps & React.CanvasHTMLAttributes<HTMLCanvasElement>,
) {
  const {
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
    ...rest
  } = props;
  const reactCanvas = useRef(null);

  // set up basic engine and scene
  useEffect(() => {
    const { current: canvas } = reactCanvas;

    if (!canvas) return;

    const engine = new BABYLON.Engine(
      canvas,
      antialias,
      engineOptions,
      adaptToDeviceRatio,
    );
    const scene = new BABYLON.Scene(engine, sceneOptions);
    if (scene.isReady()) {
      onSceneReady(scene);
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
    }

    engine.runRenderLoop(() => {
      if (typeof onRender === 'function') onRender(scene);
      scene.render();
    });

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener('resize', resize);
    }

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener('resize', resize);
      }
    };
  }, [
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
  ]);

  return <canvas ref={reactCanvas} {...rest} />;
}
export default SceneComponet;
