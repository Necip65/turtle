
function createCamera(scene) {
    let camera = new BABYLON.ArcRotateCamera("camera",
        BABYLON.Tools.ToRadians(0),
        BABYLON.Tools.ToRadians(90),
        10,
        BABYLON.Vector3.Zero(), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    camera.upperBetaLimit = null;
    camera.lowerBetaLimit = null;
    camera.angularSensibilityX = 2000;
    camera.angularSensibilityY = 2000;
    camera.wheelPrecision = 50;
}

function createLight(scene) {
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    let lightHemi = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    lightHemi.intensity = 0.7;

    let light = new BABYLON.PointLight("light1", BABYLON.Vector3.Zero(), scene);
    light.intensity = 0.7;
    light.diffuse = BABYLON.Color3.FromHexString("#ff9944");
}

function createPrimitives(scene) {
    let t = new Turtle(scene);
    // t.circle(30);

    let pz = new BABYLON.Vector3(0, 0, 0);
    t.repeat(15, (i) => {
        t.setPos(pz)
        t.circle(1 * (i + 1));
    })
}


function createWing(scene) {
    let a = 180 - 109.5;
    let b = 360 / 3;

    let modul = (position, rotation) => {
        let t0 = new Turtle(scene);
        let t1 = new Turtle(scene);
        let t2 = new Turtle(scene);
        let t3 = new Turtle(scene);

        t0.setPos(position);
        t0.setRot(rotation);
        t0.lt(90, 0).fw(1);
        t1.set(t0).lt(a, 1 * b).fw(1).rt(a, 1 * b);
        t2.set(t0).lt(a, 2 * b).fw(1).rt(a, 2 * b);
        t3.set(t0).lt(a, 3 * b).fw(1).rt(a, 3 * b);

        return { t0: t0, t1: t1, t2: t2, t3: t3 }
    }

    let vec0 = new BABYLON.Vector3(0, 0, 0);
    let ts0 = modul(vec0, vec0);
    let ts1 = modul(ts0.t1.mesh1.position, vec0);
    let ts2 = modul(ts0.t2.mesh1.position, vec0);
    let ts3 = modul(ts0.t3.mesh1.position, vec0);

    modul(ts1.t1.mesh1.position, vec0);
    modul(ts1.t2.mesh1.position, vec0);
    modul(ts1.t3.mesh1.position, vec0);

    modul(ts2.t1.mesh1.position, vec0);
    modul(ts2.t2.mesh1.position, vec0);
    modul(ts2.t3.mesh1.position, vec0);

    modul(ts3.t1.mesh1.position, vec0);
    modul(ts3.t2.mesh1.position, vec0);
    modul(ts3.t3.mesh1.position, vec0);
}

function createHoneyComb(scene) {
    let material = new BABYLON.StandardMaterial("mat", scene);
    material.emissiveColor = BABYLON.Color3.Gray();
    material.linkEmissiveWithDiffuse = true;
    material.backFaceCulling = false;   // BABYLON.Mesh.DOUBLESIDE
    material.alpha = 0.5;

    let customMesh = new BABYLON.Mesh("custom", scene);
    customMesh.material = material;

    let positions = [];
    let indices = [];

    let addPos = (v) => {
        positions.push(v.x);
        positions.push(v.y);
        positions.push(v.z);
    }

    let idx3 = 0;
    let addIndices = () => {
        indices.push(idx3);
        indices.push(idx3 + 1);
        indices.push(idx3 + 2);
        idx3 += 3;
    }

    let turtles = [];
    let maxTurtles = 10;
    for (let i = 0; i < maxTurtles; i++) {
        turtles.push(new Turtle(scene));
    }

    let max = 17;
    let dg = 10;
    let len = 0.5;
    for (let i = 0; i < max; i++) {

        turtles.forEach((turtle, index) => {
            turtle.fw(len).lt(dg * (index + 1) * 0.2, (index + 1) * 0.2);
        })

        // create faces
        for (let i = 1; i < maxTurtles; i++) {
            addPos(turtles[i - 1].mesh1.position);
            addPos(turtles[i - 1].mesh2.position);
            addPos(turtles[i].mesh1.position);
            addIndices();

            addPos(turtles[i - 1].mesh2.position);
            addPos(turtles[i].mesh2.position);
            addPos(turtles[i].mesh1.position);
            addIndices();
        }

    }

    let vertexData = new BABYLON.VertexData();
    vertexData.positions = positions;
    vertexData.indices = indices;
    vertexData.applyToMesh(customMesh);
}


function createScene() {
    let scene = new BABYLON.Scene(engine);

    createCamera(scene);
    createLight(scene);

    createPrimitives(scene);
    createHoneyComb(scene);
    createWing(scene);

    return scene;
}

