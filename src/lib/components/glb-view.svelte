<script>
	import { Canvas, T } from "@threlte/core";
	import { OrbitControls, useGltf } from "@threlte/extras";

	export let modelUrl = "";
</script>

<Canvas shadows>
	<T.AmbientLight intensity={0.3} />
	<T.DirectionalLight 
		position={[10, 10, 5]} 
		intensity={0.6} 
		castShadow 
		shadow-mapSize-width={2048} 
		shadow-mapSize-height={2048}
		shadow-camera-far={50}
		shadow-camera-near={0.5}
	/>
	<T.DirectionalLight position={[-10, 5, -5]} intensity={0.3} />
	<T.HemisphereLight args={["#ddeeff", "#202020", 0.5]} />
	<T.SpotLight 
		position={[5, 15, 5]} 
		intensity={0.7} 
		angle={Math.PI / 6} 
		penumbra={0.7} 
		castShadow
		shadow-mapSize-width={1024}
		shadow-mapSize-height={1024}
	/>
	
	<T.Fog color="#f0f0f0" near={50} far={200} />
	<T.GridHelper args={[100, 100, "#888888", "#444444"]} position.y={-0.01} />

	<T.PerspectiveCamera makeDefault position={[15, 10, 15]} fov={60} near={0.1} far={1000}>
		<OrbitControls 
			autoRotate 
			autoRotateSpeed={0.5} 
			enableDamping 
			dampingFactor={0.05}
			maxPolarAngle={Math.PI / 2} 
			maxDistance={100} 
			minDistance={5}
		/>
	</T.PerspectiveCamera>

	{#await useGltf(modelUrl) then gltf}
		<T is={gltf.scene} receiveShadow castShadow />
	{/await}
</Canvas>
