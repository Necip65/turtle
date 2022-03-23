class Turtle {
    constructor(scene) {
        this.pen = true;

        this.mesh1 = BABYLON.MeshBuilder.CreateBox("box", { size: .05 }, scene);
        this.mesh1.material = new BABYLON.StandardMaterial("", scene);
        this.mesh1.material.diffuseColor = new BABYLON.Color3(1, 0, 0);

        this.mesh2 = BABYLON.MeshBuilder.CreateBox("box", { size: .05 }, scene);
        // this.mesh2.material = new BABYLON.StandardMaterial("", scene);
        // this.mesh2.material.wireframe = true;
        // this.mesh2.material.diffuseColor = new BABYLON.Color3(1, 1, 0);

        this.visible(false);
    }

    rotate(dx, dy, dz) {
        if (dx == undefined) dx = 0;
        if (dy == undefined) dy = 0;
        if (dz == undefined) dz = 0;

        this.mesh2.rotation.copyFrom(this.mesh1.rotation);

        this.mesh1.rotation.x += BABYLON.Tools.ToRadians(dx);
        this.mesh1.rotation.y += BABYLON.Tools.ToRadians(dy);
        this.mesh1.rotation.z += BABYLON.Tools.ToRadians(dz);
        return this;
    }

    forward(d) {
        let forward = new BABYLON.Vector3(0, 0, 1);
        this.mesh2.position = this.mesh1.getAbsolutePosition().clone();
        this.mesh1.position.addInPlace(this.mesh1.getDirection(forward).normalize().scale(d))

        if (this.pen)
            BABYLON.MeshBuilder.CreateLines("line1", { points: [this.mesh1.position, this.mesh2.position] });

        return this;
    }

    pendown(pen) {
        this.pen = pen;
        return this;
    }

    visible(visible) {
        this.mesh1.isVisible = visible;
        this.mesh2.isVisible = visible;
    }

    setPos(position) {
        this.mesh1.position.copyFrom(position);
        this.mesh2.position.copyFrom(position);
        return this;
    }

    setRot(rotation) {
        this.mesh1.rotation.copyFrom(rotation);
        this.mesh2.rotation.copyFrom(rotation);

        return this;
    }

    set(t) {
        this.mesh1.position.copyFrom(t.mesh1.position);
        this.mesh1.rotation.copyFrom(t.mesh1.rotation);

        this.mesh2.position.copyFrom(t.mesh2.position);
        this.mesh2.rotation.copyFrom(t.mesh2.rotation);

        return this;
    }

    di(t) {
        let dx = this.mesh1.position.x - t.mesh1.position.x;
        let dy = this.mesh1.position.y - t.mesh1.position.y;
        let dz = this.mesh1.position.z - t.mesh1.position.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    la(t) {
        this.mesh1.lookAt(t.mesh1.position);
        return this;
    }

    fw(d) {
        return this.forward(d);
    }

    bw(d) {
        return this.forward(-d);
    }

    lt(dx, dy) {
        return this.rotate(dx, dy, 0);
    }

    rt(dx, dy) {
        return this.rotate(-dx, -dy, 0);
    }
}

