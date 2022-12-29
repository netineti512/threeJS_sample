import * as THREE from 'https://unpkg.com/three@0.126.0/build/three.module.js';
 
      const scene = new THREE.Scene();
      // 背景色を灰色にする
      scene.background = new THREE.Color(0x444444);
 
      const renderer = new THREE.WebGLRenderer();
      // 影に必要
      renderer.shadowMap.enabled = true;      
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
 
 
      // 立方体
      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(), 
        new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
      );
      cube.castShadow = true;
      cube.position.set(0, 0.5, 0);
      scene.add(cube);
 
 
      // 円のジオメトリ（物体）の生成 
      const plane = new THREE.Mesh(
        new THREE.CircleGeometry(5, 300), 
        new THREE.MeshLambertMaterial()
      );
      // 回転は度ではなくラジアンなので注意
      plane.rotation.x = THREE.MathUtils.degToRad(-90);
      plane.receiveShadow = true;
      scene.add(plane);
 
 
      // ポイントライト
      const pointLight = new THREE.PointLight(0xffffff, 1, 100 );
      pointLight.position.set(0, 10, 0);
      pointLight.castShadow = true;
      scene.add(pointLight);
 
 
      // GUI表示
      import { GUI } from 'https://unpkg.com/three@0.126.0/examples/jsm/libs/dat.gui.module.js';
 
      // カメラ位置をリセットするためのメニュー項目
      const settings = {
        resetCamera: function() {
          controls.update();
          camera.position.set(10, 10, 10);
        }
      };
 
      // メニューGUI
      const gui = new GUI();
      gui.add(settings, 'resetCamera');
      gui.open();
 
      // カメラ設定
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(10, 10, 10);
      camera.lookAt(0, 0, 0);
 
      import { OrbitControls } from 'https://unpkg.com/three@0.126.0/examples/jsm/controls/OrbitControls.js';     
      const controls = new OrbitControls(camera, renderer.domElement);
 
      // 毎フレームのレンダリング処理
      function animate() {
 
        // requestAnimationFrameによる更新処理は他のブラウザタブが選択されると自動的にポーズされる
        requestAnimationFrame(animate);
 
        // required if controls.enableDamping or controls.autoRotate are set to true
        // controls.update();
        renderer.render(scene, camera);
      }
 
      // WebGLのサポートチェック
      import { WEBGL } from 'https://unpkg.com/three@0.126.0/examples/jsm/WebGL.js';    
      if (WEBGL.isWebGLAvailable()) {
        animate();
      } else {
        document.getElementById('container').appendChild(WEBGL.getWebGLErrorMessage());
      }
