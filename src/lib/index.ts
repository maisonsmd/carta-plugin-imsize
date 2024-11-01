import type { Plugin as CartaPlugin } from 'carta-md';
import type { Parent, Text } from 'mdast';
import { toString } from 'mdast-util-to-string';
import { findAfter } from 'unist-util-find-after';
import { findAllBetween } from 'unist-util-find-between-all';
import type { Visitor, VisitorResult } from 'unist-util-visit';
import { SKIP, visit } from 'unist-util-visit';

/**
 * Target format: ![image alt](/path/to/image "title" =widthxheight)
 * Image alt, title, width, height are optional.
 * Because this is not a standard markdown syntax, we receive the format in a chunks.
 * We can not use one regex to match all of them at once, so we use one regex to find the starting point, then tranverse the parent's children to find the end point.
 * If both starting and ending points are found, we can extract the information.
 */

const RE_IMAGE_FULL = /!\[(?<alt>.*?)\]\((?<path>.*?)\s*(?:"(?<title>.*?)")?\s*(?:=(?<width>\d*)x(?<height>\d*))?\)/;
// to detect the starting point
const RE_START = /!\[((?<alt>.*?)\]\()?$/;
// to detect the ending point
const RE_END = /=(?<width>\d*)x(?<height>\d*)\)/;
const RE_TITLE_TO_END = /^ (?:"(?<title>.*?)")?\s*(?:=(?<width>\d*)x(?<height>\d*))?\)/;

function transformer(ast: any) {
	// Normal image without size
	const normalImageVisitor: Visitor<Text, Parent> = function (node, index): VisitorResult {
		const newNode = {
			type: 'div',
			data: {
				hProperties: {
					className: 'image-container',
				},
			},
			children: [
				{
					...node,
					children: [],
				},
			],
		};

		Object.assign(node, newNode);
		return [SKIP, index! + 1];
	};

	const newFormatVisitor: Visitor<Text, Parent> = function (node, index, parent): VisitorResult {
		if (!parent || typeof index === 'undefined') return;

		// Case RE_FULL_IMAGE is found in single node
		if (RE_IMAGE_FULL.test(node.value)) {
			const match = node.value.match(RE_IMAGE_FULL);
			if (!match) return;

			const w = match.groups?.width;
			const h = match.groups?.height;

			console.log(w, h);

			const newNode = {
				type: 'div',
				data: {
					hProperties: {
						className: 'image-container',
					},
				},
				children: [
					{
						type: 'image',
						alt: match.groups?.alt,
						url: match.groups?.path,
						title: match.groups?.title,
						data: {
							hProperties: {
								...(w ? { width: w } : {}),
								...(h ? { height: h } : {}),
							},
						},
					},
				],
			};

			parent.children[index] = newNode as any;
			return [SKIP, index + 1];
		}

		// Case RE_FULL_IMAGE is found in multiple nodes (RE_START and RE_END)

		// If this is the starting point
		if (!RE_START.test(toString(node))) return;

		const openingNode = node;

		// Find the closing node
		const closingNode = findAfter(parent, openingNode, (node: any) => {
			return node.type === 'text' && RE_END.test((node as Text).value);
		}) as Text | undefined;

		if (!closingNode) return;

		const allBetween = findAllBetween(parent, openingNode, closingNode);
		const allNodes = [openingNode, ...allBetween, closingNode];
		const mergedText = allNodes.map((node) => toString(node)).join('');

		if (!RE_IMAGE_FULL.test(mergedText)) return;

		const match = mergedText.match(RE_IMAGE_FULL);
		if (!match) return;

		// Remove the matced portion from the opening and closing node
		openingNode.value = openingNode.value.replace(RE_START, '');
		closingNode.value = closingNode.value.replace(RE_TITLE_TO_END, '');

		const w = match.groups?.width;
		const h = match.groups?.height;

		const newNode = {
			type: 'div',
			data: {
				hProperties: {
					className: 'image-container',
				},
			},
			children: [
				{
					type: 'image',
					alt: match.groups?.alt,
					url: match.groups?.path,
					title: match.groups?.title,
					data: {
						hProperties: {
							...(w ? { width: w } : {}),
							...(h ? { height: h } : {}),
						},
					},
				},
			],
		};

		// Replace the nodes with the new node
		parent.children.splice(index + 1, allBetween.length, newNode as any);
		return [SKIP, index + allNodes.length];
	};

	visit(ast, 'image', normalImageVisitor);
	visit(ast, 'text', newFormatVisitor);
}

export const imsize = (): CartaPlugin => {
	return {
		transformers: [
			{
				type: 'remark',
				execution: 'sync',
				transform: ({ processor }) => {
					processor.use(() => transformer);
				},
			},
		],
		grammarRules: [
			{
				name: 'image',
				type: 'inline',
				definition: {
					match: RE_IMAGE_FULL.source,
					name: 'markup.image.markdown',
				},
			},
		],
		highlightingRules: [
			{
				light: {
					scope: 'markup.image',
					settings: {
						foreground: 'purple',
					},
				},
				dark: {
					scope: 'markup.image',
					settings: {
						foreground: 'darkseagreen',
					},
				},
			},
		],
	};
};
