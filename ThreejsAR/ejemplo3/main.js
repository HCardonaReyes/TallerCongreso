import {mockWithVideo} from './camera-mock.js';
import * as THREE from 'three';
import {MindARThree} from 'mindar-image-three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {loadGLTF} from "./loader.js";

//const loadGLTF = (path) =>{
//    return new Promise( (resolve, reject) =>{
//        const loader = new GLTFLoader();
//        loader.load(path, (gltf) => {
//            resolve(gltf);
//        });
//    });
//}

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    // initialize MindAR 
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './targets.mind',
    });
    const {renderer, scene, camera} = mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    // create AR object
    //const geometry = new THREE.PlaneGeometry(1, 1);
    //const material = new THREE.MeshBasicMaterial({color: 0x00ffff, transparent: true, opacity: 0.5});
    //const plane = new THREE.Mesh(geometry, material);

    // create anchor
    //anchor.group.add(plane);

    const anchor = mindarThree.addAnchor(0);

    const gltf = await loadGLTF("./musicband-raccoon/scene.gltf");
    gltf.scene.scale.set(0.1, 0.1, 0.1);
    gltf.scene.position.set(0, -0.4, 0);
    anchor.group.add(gltf.scene); 


  //  const loader = new GLTFLoader();
  //  loader.load("./musicband-raccoon/scene.gltf", (gltf) => {
  //      gltf.scene.scale.set(0.1, 0.1, 0.1);
  //      gltf.scene.position.set(0, -0.4, 0);
  //      anchor.group.add(gltf.scene);
  //  });

    // start AR
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
