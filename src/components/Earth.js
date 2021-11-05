import { useEffect, useRef } from "react";
import * as THREE from "three";

import vertexShader from '../shaders/vertex.glsl'



import globe from '../earth.jpeg'

export default function Earth() {
  const ref = useRef();

  useEffect(() => {
    if (ref?.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        innerWidth  / innerHeight,
        0.1,
        1000
      );

      const renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      renderer.setSize(innerWidth / 2, innerHeight / 2);
      renderer.setPixelRatio(window.devicePixelRatio)

      ref.current.appendChild(renderer.domElement);

      const geometry = new THREE.SphereGeometry(5, 50, 50);
      const material = new THREE.ShaderMaterial({
        // vertexShader: vertexShader.helloBlue,
        // fragmentShader: ""
      })
      // const material = new THREE.MeshBasicMaterial({
      //   map: new THREE.TextureLoader().load(globe)
      // });
      const sphere = new THREE.Mesh(geometry, material);

      scene.add(sphere);

      camera.position.z = 15

      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }


      animate();
    }
  }, []);

  return <div ref={ref} />;
}
