<script lang="ts">
	import { Carta, MarkdownEditor } from 'carta-md';
	import 'carta-md/default.css';

	import { imsize } from '$lib';

	const carta = new Carta({
		extensions: [imsize()],
		sanitizer: false,
	});

	let value = `
Default:
![test 0](https://placehold.co/600x400/A00000/FFF)

With title, width and height:
![test 1](https://placehold.co/600x400/A00000/FFF "Title goes here" =200x300)

With width and height:
![test 2](https://placehold.co/600x400/A00000/FFF =100x100)

With only height:
![test 3](https://placehold.co/600x400/A00000/FFF =x300)

With only width:
![test 4](https://placehold.co/600x400/A00000/FFF =200x)`;
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
	<MarkdownEditor {carta} {value} />
</main>

<style>
	:global(.markdown-body .image-container) {
		padding: 5px;
		background-color: lightblue;
		text-align: center;
	}

	:global(.markdown-body .image-container img) {
		object-fit: contain;
		max-width: 100%; 
		max-height: 100%;
	}

	:global(body) {
		margin: 0;
		font-family: 'Inter var', sans-serif;
		min-height: 100vh;
	}

	:global(.carta-font-code, code) {
		font-family: 'Fira Code', monospace;
		font-variant-ligatures: normal;
		font-size: 0.95rem;
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
