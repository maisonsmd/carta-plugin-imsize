<script lang="ts">
	import { Carta, CartaEditor } from 'carta-md';
	import 'carta-md/default.css';

	import { imsize } from '$lib';

	const carta = new Carta({
		extensions: [imsize()],
	});

	let value = `
With title, width and height:
![cat 1](https://placehold.co/600x400/A00000/FFF "Title goes here" =200x300)

With width and height:
![cat 2](https://placehold.co/600x400/A00000/FFF =x)

With only height:
![cat 3](https://placehold.co/600x400/A00000/FFF =x300)

With only width:
![cat 4](https://placehold.co/600x400/A00000/FFF =200x)`;
</script>

<svelte:head>
	<!-- Custom font -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
	<link rel="preconnect" href="https://rsms.me/" />
	<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
</svelte:head>

<main>
	<CartaEditor {carta} {value} />
</main>

<style>
	:global(.image-container) {
		padding: 5px;
		background-color: lightblue;
		display: flex;
		justify-content: center;
	}

	:global(.image-container img) {
		background-color: bisque;
	}

	:global(body) {
		margin: 0;
		font-family: 'Inter var', sans-serif;
		min-height: 100vh;
	}

	:global(.carta-font-code, code) {
		font-family: 'Fira Code', monospace;
		font-variant-ligatures: normal;
	}

	:global(input, textarea, button) {
		font-family: inherit;
	}

	main {
		max-width: 1536px;
		margin: 0 auto 0 auto;
		padding: 2rem 0 2rem 0;
	}

	/* Responsive main */

	@media screen and (max-width: 640px) {
		main {
			width: 95%;
		}
	}

	@media screen and (min-width: 640px) and (max-width: 767px) {
		main {
			width: 640px;
		}
	}

	@media screen and (min-width: 767px) and (max-width: 1023px) {
		main {
			width: 768px;
		}
	}

	@media screen and (min-width: 1023px) and (max-width: 1279px) {
		main {
			width: 1024px;
		}
	}

	@media screen and (min-width: 1279px) and (max-width: 1535px) {
		main {
			width: 1280px;
		}
	}
</style>
