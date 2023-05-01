import * as BABYLON from '@babylonjs/core';
import SceneComponet from './SceneComponet';

import '@babylonjs/core/Loading/loadingScreen';
import '@babylonjs/loaders/glTF';
import '@babylonjs/core/Materials/standardMaterial';
import '@babylonjs/core/Materials/Textures/Loaders/envTextureLoader';

function ModelContent() {
  const onSceneReady = async (scene: BABYLON.Scene) => {
    // This creates and positions a free camera (non-mesh)
    const camera = new BABYLON.ArcRotateCamera(
      'Camera',
      (-3 * Math.PI) / 10,
      Math.PI / 4,
      20,
      new BABYLON.Vector3(0, 0, 0),
      scene,
    );

    scene.clearColor = new BABYLON.Color4(0.31, 0.48, 0.64);

    camera.setTarget(BABYLON.Vector3.Zero());

    const canvas = scene.getEngine().getRenderingCanvas();

    camera.attachControl(canvas, true);
    // camera.lowerRadiusLimit = 100;
    camera.upperRadiusLimit = 500;

    new BABYLON.DirectionalLight('Omni', new BABYLON.Vector3(0, -1, 0), scene);
    new BABYLON.DirectionalLight('Omni', new BABYLON.Vector3(0, 0, -1), scene);
    new BABYLON.DirectionalLight('Omni', new BABYLON.Vector3(-1, 0, 0), scene);
    new BABYLON.DirectionalLight('Omni', new BABYLON.Vector3(1, 0, 0), scene);
    new BABYLON.DirectionalLight('Omni', new BABYLON.Vector3(0, 1, 0), scene);
    new BABYLON.DirectionalLight('Omni', new BABYLON.Vector3(0, 0, 1), scene);

    // scene.registerBeforeRender(function () {
    //   light.position = camera.position;
    // });

    BABYLON.SceneLoader.Append('/3DModel/jordan.glb', '', scene, function () {
      scene.createDefaultCamera(true, true, true);
    });
  };

  return (
    <SceneComponet
      antialias={true}
      onSceneReady={onSceneReady}
      id="my-canvas"
      height={window.innerHeight}
      width={window.innerWidth}
      style={{ overflow: 'hidden' }}
    />
  );
}

export default ModelContent;
