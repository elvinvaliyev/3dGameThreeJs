var camera, scene, renderer;
var cover, body, avatar;
var sphereHandAndFoot, left_foot, left_hand, right_foot, right_hand;

scene = new THREE.Scene();

//CAMERA
var aspect = window.innerWidth / window.innerHeight;
camera = new THREE.PerspectiveCamera(75, aspect, 1, 1000);
var marker = new THREE.Object3D();
marker.position.x = 500;
scene.add(marker);


renderer = new THREE.CanvasRenderer();
renderer.setClearColorHex(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.style.margin = 0;
document.body.style.overflow = 'hidden';
document.body.appendChild(renderer.domElement);


cover = new THREE.MeshNormalMaterial();
body = new THREE.SphereGeometry(100);
avatar = new THREE.Mesh(body, cover);
marker.add(avatar);
marker.add(camera);


sphereHandAndFoot = new THREE.SphereGeometry(50);

right_hand = new THREE.Mesh(sphereHandAndFoot, cover);
right_hand.position.set(-150, 0, 0);
avatar.add(right_hand);

left_hand = new THREE.Mesh(sphereHandAndFoot, cover);
left_hand.position.set(150, 0, 0);
avatar.add(left_hand);

right_foot = new THREE.Mesh(sphereHandAndFoot, cover);
right_foot.position.set(-75, -125, 0);
avatar.add(right_foot);

left_foot = new THREE.Mesh(sphereHandAndFoot, cover);
left_foot.position.set(75, -125, 0);
avatar.add(left_foot);


//ANIMATION
var is_cartwheeling = true;
var is_flipping = false;

function animate() {
    requestAnimationFrame(animate);
    if (is_cartwheeling) {
        avatar.rotation.y += 0.01;
    }

    if (is_flipping) {
        avatar.rotation.x = avatar.rotation.x + 0.05;
    }

    renderer.render(scene, camera);

}

animate();


//KEYS
document.addEventListener('keydown', function (event) {
    var code = event.keyCode;
    if (code == 65) avatar.position.x = avatar.position.x - 5; // left
    if (code == 87) avatar.position.z = avatar.position.z - 5; // up
    if (code == 68) avatar.position.x = avatar.position.x + 5; // right
    if (code == 83) avatar.position.z = avatar.position.z + 5; // down

    if (code == 67) is_cartwheeling = !is_cartwheeling; // C
    if (code == 70) is_flipping = !is_flipping; // F

});

//TREES
function makeTreeAt(x, z) {
    var trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(50, 50, 200),
        new THREE.MeshBasicMaterial({ color: 0xA0522D })
    );
    var top = new THREE.Mesh(
        new THREE.SphereGeometry(150),
        new THREE.MeshBasicMaterial({ color: 0x228B22 })
    );
    top.position.y = 175;
    trunk.add(top);
    trunk.position.set(x, -75, z);
    scene.add(trunk);
}

makeTreeAt(500, 0);
makeTreeAt(-500, 0);
makeTreeAt(750, -1000);
makeTreeAt(-750, -1000);
