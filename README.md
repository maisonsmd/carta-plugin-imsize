![carta-plugin-imsize](https://img.shields.io/npm/v/carta-plugin-imsize)

# carta-plugin-imsize

This plugin adds ability to render images in specific sizes to [Carta](https://github.com/BearToCode/carta).

## Installation

```shell
npm i carta-plugin-imsize
```

## Setup

### Styles

For custom styles, this is an example of the generated HTML:

```HTML
<div class="image-container">
	<img
		src="path/to/image"
		alt="image alt"
		title="image title"
		width="300px"
		height="200px"
		style="object-fit: contain; max-width: 100%; max-height: 100%;"
	/>
</div>
```

The images are shrunk to fit its container by default.

### Extension

```svelte
<script>
	import { Carta, CartaEditor } from 'carta-md';
	import { imsize } from 'carta-plugin-imsize';

	const carta = new Carta({
		extensions: [imsize()],
	});
</script>

<CartaEditor {carta} />
```

## Usage

Image title, width and height are optional

```markdown
With all parameters:
![image alt](/path/to/image "image title" =200x300)

With only with and height:
![image alt](/path/to/image =200x300)

With only height:
![image alt](/path/to/image =x300)

With only width:
![image alt](/path/to/image =200x)

With no parameters:
![image alt](/path/to/image =x)
![image alt](/path/to/image)
```

Check the example [here](./src/routes/+page.svelte) for more detail.
