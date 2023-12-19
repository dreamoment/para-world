import * as THREE from 'three';


const createGroup = (target: THREE.Object3D, clone: THREE.Object3D) => {
    const group = new THREE.Group()
    group.position.copy(target.position)
    group.rotation.copy(target.rotation)
    group.scale.copy(target.scale)
    target.parent?.add(group)

    target.position.set(0, 0, 0)
    target.rotation.set(0, 0, 0)
    target.scale.set(1, 1, 1)
    clone.position.set(0, 0, 0)
    clone.rotation.set(0, 0, 0)
    clone.scale.set(1, 1, 1)

    group.add(target, clone)
    return group
}

const createTarget = (target: THREE.Object3D, clone: THREE.Object3D, renderOrder: number) => {
    target.renderOrder = renderOrder + 1
    clone.renderOrder = renderOrder

    const group = createGroup(target, clone)
    return group
}

class ParaWorld {

    static renderOrder: number = 0

    static createTargetByMaterial(target: THREE.Object3D, material: THREE.Material) {
        const clone = target.clone()
        clone.traverse(e => {
            if (e instanceof THREE.Mesh) {
                if (Array.isArray(e.material)) {
                    e.material.forEach((material, index) => {
                        material.transparent = true

                        e.material[index] = material
                    })
                }
                else {
                    e.material.transparent = true

                    material.transparent = true
                    e.material = material
                }
            }
        })
        return createTarget(target, clone, ParaWorld.renderOrder)
    }

    static createTargetByObject3D(target: THREE.Object3D, clone: THREE.Object3D) {
        return createTarget(target, clone, ParaWorld.renderOrder)
    }

    static createCover(target: THREE.Object3D) {
        target.renderOrder = ParaWorld.renderOrder

        const clone = target.clone()
        clone.renderOrder = ParaWorld.renderOrder - 1
        clone.traverse(e => {
            if (e instanceof THREE.Mesh) {
                if (Array.isArray(e.material)) {
                    e.material.forEach((material, index) => {
                        material.transparent = true
                        material.opacity = 0

                        e.material[index] = e.material.clone()
                        e.material[index].opacity = 1
                        e.material[index].depthTest = false
                    })
                }
                else {
                    e.material.transparent = true
                    e.material.opacity = 0

                    e.material = e.material.clone()
                    e.material.opacity = 1
                    e.material.depthTest = false
                }
            }
        })

        const group = createGroup(target, clone)
        return group
    }
}


export default ParaWorld