// ![image alt](/path/to/image "image title" =widthxheight)
// ![image alt](/path/to/image =200x300)
// ![image alt](/path/to/image =x300)
// ![image alt](/path/to/image =200x)
// ![image alt](/path/to/image =x)
// ![image alt](/path/to/image)

import type { CartaExtension } from 'carta-md';
import type { TokenizerAndRendererExtension } from 'marked';

/**
 * Carta imsize plugin. This plugin adds ability to render images in specific sizes
 */
export const imsize = (): CartaExtension => {
	return {
		markedExtensions: [
			{
				extensions: [imsizeTokenizerAndRenderer()],
			},
		],
	};
};

function imsizeTokenizerAndRenderer(): TokenizerAndRendererExtension {
	return {
		name: 'imsize',
		level: 'inline',
		start(src) {
			return src.match(/!\[(?<alt>.*?)\]\((?<path>.*?)\s*(?:"(?<title>.*?)")?\s*(?:=(?<width>\d*)x(?<height>\d*))?\)/)?.index;
		},
		tokenizer(src) {
			const match = src.match(/^!\[(?<alt>.*?)\]\((?<path>.*?)\s*(?:"(?<title>.*?)")?\s*(?:=(?<width>\d*)x(?<height>\d*))?\)/);

			if (!match) return undefined;

			return {
				type: 'imsize',
				raw: match[0],
				alt: match.groups?.alt,
				path: match.groups?.path,
				title: match.groups?.title,
				width: match.groups?.width,
				height: match.groups?.height,
			};
		},

		renderer(token) {
			/** Add a container to the image, so we can add frame by css if needed,
			 *  Note: use span instead of div, so it won't break the line.
			 */
			return `
			<div class="image-container">
				<img 
					src="${token.path}" 
					${valueOrNone('alt', token.alt)}
					${valueOrNone('title', token.title)}
					${valueOrNone('width', token.width)}
					${valueOrNone('height', token.height)}
					style="object-fit: contain;"
				/>
			</div>
			`;
		},
	};
}

function valueOrNone(key: string, value: string | undefined): string {
	if (value) return `${key}="${value}"`;
	return '';
}
