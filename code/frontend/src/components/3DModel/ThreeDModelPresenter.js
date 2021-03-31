import React, {Suspense, useRef} from "react";
import {
    Canvas,
    useLoader,
    useFrame,
    useThree,
    extend,
} from "react-three-fiber";
//import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from 'three'


// Camera control for orbiting, zooming and panning.
function CameraControls() {
    const {OrbitControls} = require("three/examples/jsm/controls/OrbitControls");

    extend({OrbitControls});

    const {
        camera,
        gl: {domElement},
    } = useThree();
    // Ref to the controls, so that we can update them on every frame using useFrame
    const controls = useRef();
    useFrame((state) => controls.current.update());
    return <orbitControls ref={controls} args={[camera, domElement]}/>;
};

// Create a light to cast the shadow on  the obejct to highlight contours.
function ShadowLight(position, intensity) {
    //Create a PointLight and turn on shadows for the light
    const light = new THREE.DirectionalLight(0xffffff, 0.5, 10)
    light.position.set(10, 5, 2)
    light.castShadow = true // default false
    light.receiveShadow = true
    //Set up shadow properties for the light
    light.shadow.mapSize.width = 5240 // default
    light.shadow.mapSize.height = 5240 // default
    //light.shadow.camera.near = 0.5 // default
    light.shadow.camera.far = 50 // default
    light.shadow.camera.left = -5
    light.shadow.camera.right = 5
    light.shadow.camera.top = 5
    light.shadow.camera.bottom = -5
    light.shadow.radius = 10;
    light.shadow.bias = 0;

    return <primitive object={light}/>
}

// Creates a light to lighen up the shadow created by the ShadowLight
function Light2(position, intensity) {
    const light = new THREE.DirectionalLight(0xffffff, 0.2, 100)
    light.position.set(-10, -10, -10)

    return <primitive object={light}/>
}

// Auto calculate model distance and height for camera position
function LoadModel(props) {
    const {GLTFLoader} = require("three/examples/jsm/loaders/GLTFLoader");

    //console.log("-----------");
    //console.log(GLTFLoader);
    //console.log("-----------");

    const gltf = useLoader(GLTFLoader, props.modelUrl);

    let boundingBox;

    gltf.scene.traverse(function (child) {
        child.position.set(0, 0, 0);
        child.scale.set(1.7, 1.7, 1.7);
        child.castShadow = true;
        child.receiveShadow = true;
        if (child instanceof THREE.Mesh) {
            boundingBox = (child.geometry.boundingBox);
        }
    });

    const primitiveProps = {
        object: gltf.scene.clone(true),
        castShadow: true,
        receiveShadow: true,
    };

    {/* Removed the code of find the camera positon with respect to the model */
    }
    {/* Because model distance will be same always*/
    }

    return <mesh>
        <primitive {...primitiveProps} />
    </mesh>;
}

function Loading() {
    const ref = useRef()
    useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01))

    return (
        <mesh visible position={[0, 0, 1]} rotation={[0, 0, 0]} ref={ref}>
            <sphereGeometry attach="geometry" args={[0, 0, 0]}/>
            <meshStandardMaterial
                attach="material"
                color="gray"
                transparent
                opacity={0.6}
                roughness={1}
                metalness={0}
            />
        </mesh>
    );
}


class ThreeDModelPresenter extends React.Component {
    render() {
        return (

            <Canvas colorManagement shadowMap>

                {/* Orbital, Zoom and Panning Control for the camera*/}
                <CameraControls/>

                {/* Adding Lights in the Scene*/}
                <ambientLight intensity={0.17}/>
                <ShadowLight/>
                <Light2/>

                {/* Rendergin Model with fallback Loading model */}
                <Suspense fallback={<Loading/>}>
                    {<LoadModel modelUrl={this.props.modelUrl}/>}
                </Suspense>

                {/* Creating the plain to cast shadow on */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                    <planeBufferGeometry attach="geometry" args={[100, 100]}/>
                    <shadowMaterial attach="material" transparent opacity={0.4}/>
                </mesh>

            </Canvas>
        )
    }
}

export default ThreeDModelPresenter;


