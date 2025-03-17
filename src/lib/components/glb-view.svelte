<script>
	import { Canvas, T } from "@threlte/core";
	import { OrbitControls, useGltf } from "@threlte/extras";

	export let modelUrl = "";
</script>

<Canvas>
	<T.AmbientLight intensity={1.0} />
	<T.DirectionalLight position={[10, 10, 5]} intensity={1.2} />
	<T.DirectionalLight position={[-10, -10, -5]} intensity={1.2} />
	<T.DirectionalLight position={[0, 15, 0]} intensity={0.8} />
	<T.PointLight position={[5, 5, 5]} intensity={1} distance={20} />
	<T.SpotLight position={[-5, 10, -5]} intensity={0.8} angle={Math.PI / 4} penumbra={0.2} />

	<T.PerspectiveCamera makeDefault position={[10, 10, 10]} fov={80} near={0.1} far={1000}>
		<OrbitControls autoRotate autoRotateSpeed={1.0} allowPan={false} enableDamping maxDistance={200} minDistance={10} />
	</T.PerspectiveCamera>

	{#await useGltf(modelUrl) then gltf}
		<T is={gltf.scene} />
	{/await}
</Canvas>
