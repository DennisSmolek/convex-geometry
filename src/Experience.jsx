/* eslint-disable react/no-unknown-property */
import { useRef } from "react";
import * as THREE from "three";
import { useTexture, Points } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import { ConvexGeometry } from "three/addons/geometries/ConvexGeometry.js";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";

export default function Experience() {
    /* This example seems to tear apart a dodecahedron and 
    build a new convex hull geometry from the pieces. */

    const groupRef = useRef();

    const texture = useTexture("./disc.png");
    texture.colorSpace = THREE.SRGBColorSpace;

    // Build geometry ============
    // Because we have to do so much work I wont be using a standard Drei object
    let geometry = new THREE.DodecahedronGeometry(10);

    // if normal and uv attributes are not removed, mergeVertices() can't consolidate indentical vertices with different normal/uv data
    geometry.deleteAttribute("normal");
    geometry.deleteAttribute("uv");

    // merge identical vertices
    geometry = BufferGeometryUtils.mergeVertices(geometry);

    // go over the verticies to build a points array so we can put markers on it
    const vertices = [];
    const positionAttribute = geometry.getAttribute("position");

    for (let i = 0; i < positionAttribute.count; i++) {
        const vertex = new THREE.Vector3();
        vertex.fromBufferAttribute(positionAttribute, i);
        vertices.push(vertex);
    }
    const pointsMaterial = new THREE.PointsMaterial({
        color: 0x0080ff,
        map: texture,
        size: 1,
        alphaTest: 0.5,
    });

    const pointsGeometry = new THREE.BufferGeometry().setFromPoints(vertices);
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    // convex hull

    const meshGeometry = new ConvexGeometry(vertices);
    const meshMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        opacity: 0.5,
        side: THREE.DoubleSide,
        transparent: true,
    });

    // animation
    useFrame(() => {
        groupRef.current.rotation.y += 0.005;
    });

    return (
        <>
            <pointLight args={[0xffffff, 3, 0, 0]} />
            <ambientLight color={0x666666} intensity={1} />

            <axesHelper args={[20]} />
            <group position={[0, 0, 0]} ref={groupRef}>
                <primitive object={points} />
                <Points positions={pointsGeometry}>
                    <pointsMaterial color={0x0080ff} map={texture} size={1} alphaTest={0.5} />
                </Points>

                <mesh geometry={meshGeometry} material={meshMaterial}></mesh>
            </group>
        </>
    );
}
