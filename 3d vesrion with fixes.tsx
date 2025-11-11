<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sacred Library - 3D Experience</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Georgia', serif;
            overflow: hidden;
            background: #1a1a1a;
        }
        
        #canvas-container {
            width: 100vw;
            height: 100vh;
            position: relative;
        }
        
        #info-overlay {
            position: absolute;
            top: 20px;
            left: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: #f5e6d3;
            padding: 20px;
            border-radius: 10px;
            font-size: 14px;
            max-width: 300px;
            border: 2px solid #d4af37;
        }
        
        #book-modal {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 248, 240, 0.98);
            padding: 40px;
            border-radius: 15px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            display: none;
            box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
            border: 3px solid #d4af37;
        }
        
        #book-modal.active {
            display: block;
        }
        
        #book-modal h2 {
            color: #8b4513;
            margin-bottom: 20px;
            font-size: 28px;
        }
        
        #book-modal p {
            color: #333;
            line-height: 1.8;
            margin-bottom: 15px;
        }
        
        #close-book {
            background: #8b4513;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 20px;
        }
        
        #close-book:hover {
            background: #a0522d;
        }
        
        #crosshair {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 20px;
            pointer-events: none;
        }
        
        #crosshair::before,
        #crosshair::after {
            content: '';
            position: absolute;
            background: rgba(212, 175, 55, 0.8);
        }
        
        #crosshair::before {
            width: 2px;
            height: 20px;
            left: 9px;
        }
        
        #crosshair::after {
            width: 20px;
            height: 2px;
            top: 9px;
        }
        
        #interaction-prompt {
            position: absolute;
            top: 60%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(212, 175, 55, 0.9);
            color: #1a1a1a;
            padding: 10px 20px;
            border-radius: 5px;
            font-weight: bold;
            display: none;
        }
        
        #interaction-prompt.active {
            display: block;
        }
    </style>
</head>
<body>
    <div id="canvas-container"></div>
    
    <div id="info-overlay">
        <h3 style="color: #d4af37; margin-bottom: 10px;">Welcome to the Sacred Library</h3>
        <p><strong>Controls:</strong></p>
        <p>Mouse - Look around</p>
        <p>W/A/S/D - Move</p>
        <p>Click - Interact with books</p>
        <p style="margin-top: 15px; font-size: 12px; opacity: 0.8;">Click anywhere to start exploring...</p>
    </div>
    
    <div id="crosshair"></div>
    <div id="interaction-prompt">Press E or Click to read</div>
    
    <div id="book-modal">
        <h2 id="book-title">Book Title</h2>
        <div id="book-content"></div>
        <button id="close-book">Close Book</button>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    
    <script>
        var scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a1a2e);
        scene.fog = new THREE.Fog(0x1a1a2e, 1, 50);
        
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 1.6, 5);
        
        var renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        document.getElementById('canvas-container').appendChild(renderer.domElement);
        
        var ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);
        
        var mainLight = new THREE.PointLight(0xffd700, 1, 50);
        mainLight.position.set(0, 5, 0);
        mainLight.castShadow = true;
        scene.add(mainLight);
        
        var light1 = new THREE.PointLight(0xffaa55, 0.8, 20);
        light1.position.set(-8, 4, 0);
        scene.add(light1);
        
        var light2 = new THREE.PointLight(0xffaa55, 0.8, 20);
        light2.position.set(8, 4, 0);
        scene.add(light2);
        
        var floorGeometry = new THREE.PlaneGeometry(40, 40);
        var floorMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x4a3728,
            roughness: 0.8 
        });
        var floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        scene.add(floor);
        
        var ceilingGeometry = new THREE.PlaneGeometry(40, 40);
        var ceilingMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x2a2a2a,
            side: THREE.DoubleSide 
        });
        var ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
        ceiling.rotation.x = Math.PI / 2;
        ceiling.position.y = 5;
        scene.add(ceiling);
        
        function createWall(width, height, x, y, z, rotationY) {
            if (rotationY === undefined) rotationY = 0;
            var wallGeometry = new THREE.BoxGeometry(width, height, 0.3);
            var wallMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x3d2f1f,
                roughness: 0.9 
            });
            var wall = new THREE.Mesh(wallGeometry, wallMaterial);
            wall.position.set(x, y, z);
            wall.rotation.y = rotationY;
            wall.receiveShadow = true;
            wall.castShadow = true;
            return wall;
        }
        
        scene.add(createWall(40, 5, 0, 2.5, -20, 0));
        scene.add(createWall(40, 5, 0, 2.5, 20, 0));
        scene.add(createWall(40, 5, -20, 2.5, 0, Math.PI / 2));
        scene.add(createWall(40, 5, 20, 2.5, 0, Math.PI / 2));
        
        var booksData = [
            { title: "Bhagavad Gita", room: "Hinduism", content: "The Bhagavad Gita is a 700-verse Hindu scripture that is part of the epic Mahabharata. It is a conversation between Prince Arjuna and the god Krishna, who serves as his charioteer. This sacred text explores dharma, yoga, and the nature of reality through profound philosophical dialogue." },
            { title: "Upanishads", room: "Hinduism", content: "The Upanishads are ancient Sanskrit texts that contain the central philosophical concepts and ideas of Hinduism. They explore the nature of ultimate reality and the self, forming the theoretical basis for Hindu philosophy." },
            { title: "Dhammapada", room: "Buddhism", content: "The Dhammapada is a collection of sayings of the Buddha in verse form. It is one of the most widely read and best known Buddhist scriptures, containing the essence of Buddhist teaching and wisdom in accessible form." },
            { title: "Heart Sutra", room: "Buddhism", content: "The Heart Sutra is a famous Mahayana Buddhist sutra. Despite being the shortest of all sutras, it compactly expresses the heart of perfect wisdom and is chanted daily in Buddhist temples throughout the world." },
            { title: "Tao Te Ching", room: "Comparative", content: "The Tao Te Ching is a Chinese classic text traditionally credited to Laozi. Its 81 chapters contain profound wisdom about the Tao and how to live in harmony with the natural order of the universe." },
            { title: "Meditation Guide", room: "Practice", content: "A comprehensive guide to meditation practices from various traditions. Learn techniques for mindfulness, breath awareness, loving-kindness meditation, and visualization practices that have been refined over thousands of years." }
        ];
        
        var interactableBooks = [];
        
        function createBookshelf(x, z, rotation, bookIndices) {
            var shelfGeometry = new THREE.BoxGeometry(6, 3, 0.5);
            var shelfMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x5c4033,
                roughness: 0.7 
            });
            var shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
            shelf.position.set(x, 2, z);
            shelf.rotation.y = rotation;
            shelf.castShadow = true;
            scene.add(shelf);
            
            for (var i = 0; i < bookIndices.length; i++) {
                var bookIndex = bookIndices[i];
                var bookWidth = 0.3;
                var bookHeight = 1.2;
                var bookDepth = 0.8;
                var spacing = 1.2;
                var startX = -2.5 + (i * spacing);
                
                var bookGeometry = new THREE.BoxGeometry(bookWidth, bookHeight, bookDepth);
                var hue = bookIndex * 0.15;
                var bookMaterial = new THREE.MeshStandardMaterial({ 
                    color: new THREE.Color().setHSL(hue, 0.6, 0.5),
                    roughness: 0.6,
                    metalness: 0.1
                });
                var book = new THREE.Mesh(bookGeometry, bookMaterial);
                
                var offsetX = Math.cos(rotation) * startX;
                var offsetZ = Math.sin(rotation) * startX;
                var forwardX = Math.cos(rotation) * 0.15;
                var forwardZ = Math.sin(rotation) * 0.15;
                
                book.position.set(x + offsetX + forwardX, 2, z + offsetZ + forwardZ);
                book.rotation.y = rotation;
                book.castShadow = true;
                
                book.userData = {
                    isBook: true,
                    bookData: booksData[bookIndex]
                };
                
                interactableBooks.push(book);
                scene.add(book);
            }
        }
        
        createBookshelf(-12, -8, 0, [0, 1]);
        createBookshelf(-12, 0, 0, [0, 1]);
        createBookshelf(12, -8, Math.PI, [2, 3]);
        createBookshelf(12, 0, Math.PI, [2, 3]);
        createBookshelf(0, -15, Math.PI / 2, [4, 5]);
        
        function createPillar(x, z) {
            var pillarGeometry = new THREE.CylinderGeometry(0.5, 0.5, 5, 8);
            var pillarMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x6b5742,
                roughness: 0.8 
            });
            var pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
            pillar.position.set(x, 2.5, z);
            pillar.castShadow = true;
            scene.add(pillar);
        }
        
        createPillar(-5, 10);
        createPillar(5, 10);
        createPillar(-5, -5);
        createPillar(5, -5);
        
        var moveSpeed = 0.1;
        var keys = {};
        var yaw = 0;
        var pitch = 0;
        var isPointerLocked = false;
        var booksRead = 0;
        
        if (localStorage.getItem('booksRead')) {
            booksRead = parseInt(localStorage.getItem('booksRead'));
        }
        
        document.addEventListener('keydown', function(e) {
            keys[e.key.toLowerCase()] = true;
        });
        
        document.addEventListener('keyup', function(e) {
            keys[e.key.toLowerCase()] = false;
        });
        
        renderer.domElement.addEventListener('click', function() {
            if (!isPointerLocked) {
                renderer.domElement.requestPointerLock();
            } else {
                checkBookInteraction();
            }
        });
        
        document.addEventListener('pointerlockchange', function() {
            isPointerLocked = document.pointerLockElement === renderer.domElement;
            document.getElementById('info-overlay').style.display = isPointerLocked ? 'none' : 'block';
        });
        
        document.addEventListener('mousemove', function(e) {
            if (isPointerLocked) {
                yaw -= e.movementX * 0.002;
                pitch -= e.movementY * 0.002;
                pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
            }
        });
        
        var raycaster = new THREE.Raycaster();
        raycaster.far = 5;
        var currentLookingAtBook = null;
        
        function checkBookInteraction() {
            var direction = new THREE.Vector3();
            camera.getWorldDirection(direction);
            var origin = camera.position.clone();
            origin.y -= 0.2;
            raycaster.set(origin, direction);
            
            var intersects = raycaster.intersectObjects(interactableBooks, false);
            
            if (intersects.length > 0) {
                var book = intersects[0].object;
                if (book.userData.isBook) {
                    if (document.pointerLockElement) {
                        document.exitPointerLock();
                    }
                    openBook(book.userData.bookData);
                }
            }
        }
        
        function openBook(bookData) {
            booksRead++;
            localStorage.setItem('booksRead', booksRead);
            document.getElementById('book-title').textContent = bookData.title;
            document.getElementById('book-content').innerHTML = '<p>' + bookData.content + '</p><p style="margin-top: 20px; color: #d4af37; font-weight: bold;">Books Read: ' + booksRead + ' / ' + booksData.length + '</p>';
            document.getElementById('book-modal').classList.add('active');
        }
        
        document.getElementById('close-book').addEventListener('click', function() {
            document.getElementById('book-modal').classList.remove('active');
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (document.pointerLockElement) {
                    document.exitPointerLock();
                } else {
                    document.getElementById('book-modal').classList.remove('active');
                }
            }
            if (e.key.toLowerCase() === 'e' && currentLookingAtBook) {
                if (document.pointerLockElement) {
                    document.exitPointerLock();
                }
                openBook(currentLookingAtBook.userData.bookData);
            }
        });
        
        function updateBookPrompt() {
            var direction = new THREE.Vector3();
            camera.getWorldDirection(direction);
            var origin = camera.position.clone();
            origin.y -= 0.2;
            raycaster.set(origin, direction);
            
            var intersects = raycaster.intersectObjects(interactableBooks, false);
            var prompt = document.getElementById('interaction-prompt');
            
            if (intersects.length > 0 && intersects[0].distance < 5) {
                prompt.classList.add('active');
                currentLookingAtBook = intersects[0].object;
            } else {
                prompt.classList.remove('active');
                currentLookingAtBook = null;
            }
        }
        
        function animate() {
            requestAnimationFrame(animate);
            
            camera.rotation.order = 'YXZ';
            camera.rotation.y = yaw;
            camera.rotation.x = pitch;
            
            var forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
            forward.y = 0;
            forward.normalize();
            
            var right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
            right.y = 0;
            right.normalize();
            
            if (keys['w']) {
                camera.position.addScaledVector(forward, moveSpeed);
            }
            if (keys['s']) {
                camera.position.addScaledVector(forward, -moveSpeed);
            }
            if (keys['d']) {
                camera.position.addScaledVector(right, moveSpeed);
            }
            if (keys['a']) {
                camera.position.addScaledVector(right, -moveSpeed);
            }
            
            camera.position.x = Math.max(-18, Math.min(18, camera.position.x));
            camera.position.z = Math.max(-18, Math.min(18, camera.position.z));
            
            updateBookPrompt();
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        window.addEventListener('resize', function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    </script>
</body>
</html>