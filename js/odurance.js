/* -------------------------------------------------------------------------- */
/*                                Odurance                                    */
/* -------------------------------------------------------------------------- */

/*
    *
    * CCP WebGL
    *
*/
window.ccpwgl = ccpwgl;
window.ccpwgl_int = ccpwgl_int;

function load_ccpwgl() {
    // Load CCP WebGL
    var mat4 = ccpwgl_int.math.mat4;
    var canvas = document.getElementById('mainCanvas');
    ccpwgl.initialize(canvas, { antialias: true });
    ccpwgl.enablePostprocessing(true);
    ccpwgl_int.device.viewportPixelRatio = 1;
    ccpwgl_int.device.Resize();

    // Camera
    camera = ccpwgl.createCamera(canvas, undefined, true);
    camera.rotationX = 150 * Math.PI / 180
    camera.rotationY = 20 * Math.PI / 180
    camera.fov = 40
    camera.minDistance = 2300
    camera.maxDistance = 20000
    camera.shift = 100.92

    // Scene
    scene = ccpwgl.loadScene('res:/dx9/scene/universe/m03_cube.red');

    // Load Ship
    station = scene.loadShip('cm1_t1:caldaribase:caldari', function () {
        camera.focus(this, 0.255)

        let matrix = mat4.fromValues(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        )

        let rotationMatrix = mat4.fromYRotation(matrix, 0 * Math.PI / 180)
        rotationMatrix[15] = 7

        this.setTransform(rotationMatrix)
        this.setTransform(matrix)

        setColor(4, 3, 1, 'Mtl1DiffuseColor')
        setColor(148, 76, 43, 'Mtl2DiffuseColor')
        setColor(2, 1, 1, 'Mtl3DiffuseColor')
        setColor(5, 6, 13, 'Mtl4DiffuseColor')

        setColor(94, 0, 60, 'Mtl1Gloss')
        setColor(59, 59, 59, 'Mtl2Gloss')
        setColor(54, 54, 54, 'Mtl3Gloss')
        setColor(41, 41, 41, 'Mtl4Gloss')

        setColor(0, 0, 0, 'Mtl1FresnelColor')
        setColor(0, 0, 0, 'Mtl2FresnelColor')
        setColor(0, 0, 0, 'Mtl3FresnelColor')
        setColor(5, 5, 5, 'Mtl4FresnelColor')

    });


    // Planets
    var planets = [
        [40000000,
            'res:/dx9/model/WorldObject/Planet/Template/Ocean/P_Ocean_10.red',
            undefined,
            'res:/dx9/Model/WorldObject/planet/Terrestrial/Terrestrial01_H.dds.0.png',
            'res:/dx9/model/worldobject/planet/Terrestrial/Terrestrial03_H.dds.0.png'],
    ];
    window.planets = [];
    for (var i = 0; i < planets.length; ++i) {
        var planet = scene.loadPlanet(planets[i][0], planets[i][1], planets[i][2], planets[i][3], planets[i][4]);
        var angle = Math.PI * 2 * i / planets.length;
        planet.setTransform(mat4.fromValues(
            1000 - 0, 0, 0, 0,
            0, 10000, 0, 0,
            0, 0, 10000, 0,
            100000 * Math.cos(angle), 0, 100000 * Math.sin(angle), 1
        ));
        window.planets.push(planet);
    }


    // Animation
    function animate() {
        camera.rotationX += 0.01 * Math.PI / 180
        requestAnimationFrame(animate);
    }
    animate();



}


/*
    *
    * Anchor navigation
    *


document.addEventListener('DOMContentLoaded', (event) => {
    document.body.style.overflow = 'hidden';

    const sections = document.querySelectorAll('section[id^="a-"]');
    let currentSectionIndex = 0;

    function navigateToSection(index) {
        if (index >= 0 && index < sections.length) {
            sections[index].scrollIntoView({ behavior: 'smooth' });
            currentSectionIndex = index;
        }
    }

    function onScroll(event) {
        if (document.getElementById('loading')) {
            return;
        }
        if (event.deltaY > 0) {
            // Scroll vers le bas
            navigateToSection(currentSectionIndex + 1);
        } else if (event.deltaY < 0) {
            // Scroll vers le haut
            navigateToSection(currentSectionIndex - 1);
        }
        event.preventDefault();
    }

    window.addEventListener('wheel', onScroll);

    function onKeydown(event) {
        if (document.getElementById('loading')) {
            return;
        }
        if (event.key === 'ArrowDown') {
            navigateToSection(currentSectionIndex + 1);
        } else if (event.key === 'ArrowUp') {
            navigateToSection(currentSectionIndex - 1);
        }
    }

    window.addEventListener('keydown', onKeydown);

    navigateToSection(0);

    document.querySelectorAll('a[href^="#a-"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetIndex = Array.from(sections).findIndex(section => section.id === targetId);
            if (targetIndex !== -1) {
                navigateToSection(targetIndex);
            }
        });
    });
});

*/