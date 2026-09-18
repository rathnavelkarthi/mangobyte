#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const CLEAN_CONTENT_REGEX = {
	comments: /\/\*[\s\S]*?\*\/|\/\/.*$/gm,
	templateLiterals: /`[\s\S]*?`/g,
	strings: /'[^']*'|"[^"]*"/g,
	jsxExpressions: /\{.*?\}/g,
	htmlEntities: {
		quot: /&quot;/g,
		amp: /&amp;/g,
		lt: /&lt;/g,
		gt: /&gt;/g,
		apos: /&apos;/g
	}
};

const EXTRACTION_REGEX = {
	// `element={<Page />}` puts a `>` inside the tag, so the attribute scan has
	// to step over brace groups instead of stopping at the first `>`.
	route: /<Route\s+(?:[^>{]|\{[^}]*\})*\/?>/g,
	path: /path=["']([^"']+)["']/,
	element: /element=\{([\s\S]*)\}/,
	elementComponent: /<(\w+)/g,
	helmet: /<Helmet[^>]*?>([\s\S]*?)<\/Helmet>/i,
	helmetTest: /<Helmet[\s\S]*?<\/Helmet>/i,
	title: /<title[^>]*?>\s*(.*?)\s*<\/title>/i,
	description: /<meta\s+name=["']description["']\s+content=["'](.*?)["']/i
};

function cleanContent(content) {
	return content
		.replace(CLEAN_CONTENT_REGEX.comments, '');
}

function cleanText(text) {
	if (!text) return text;

	return text
		.replace(CLEAN_CONTENT_REGEX.jsxExpressions, '')
		.replace(CLEAN_CONTENT_REGEX.htmlEntities.quot, '"')
		.replace(CLEAN_CONTENT_REGEX.htmlEntities.amp, '&')
		.replace(CLEAN_CONTENT_REGEX.htmlEntities.lt, '<')
		.replace(CLEAN_CONTENT_REGEX.htmlEntities.gt, '>')
		.replace(CLEAN_CONTENT_REGEX.htmlEntities.apos, "'")
		.trim();
}

function extractRoutes(appJsxPath) {
	if (!fs.existsSync(appJsxPath)) return new Map();

	try {
		const content = fs.readFileSync(appJsxPath, 'utf8');
		const routes = new Map();
		const routeMatches = [...content.matchAll(EXTRACTION_REGEX.route)];

		for (const match of routeMatches) {
			const routeTag = match[0];
			const pathMatch = routeTag.match(EXTRACTION_REGEX.path);
			const elementMatch = routeTag.match(EXTRACTION_REGEX.element);
			const isIndex = routeTag.includes('index');

			if (elementMatch) {
				// A guarded route reads `element={<ProtectedRoute><SettingsPage /></ProtectedRoute>}`,
				// so the page is the innermost component rather than the first one.
				const componentNames = [...elementMatch[1].matchAll(EXTRACTION_REGEX.elementComponent)];
				const componentName = componentNames.at(-1)?.[1];

				if (!componentName) continue;

				let routePath;

				if (isIndex) {
					routePath = '/';
				} else if (pathMatch) {
					routePath = pathMatch[1].startsWith('/') ? pathMatch[1] : `/${pathMatch[1]}`;
				}

				routes.set(componentName, routePath);
			}
		}

		return routes;
	} catch (error) {
		return new Map();
	}
}

function findReactFiles(dir) {
	return fs.readdirSync(dir)
		.filter(item => item.endsWith('.jsx') || item.endsWith('.js') || item.endsWith('.tsx'))
		.map(item => path.join(dir, item));
}

function extractHelmetData(content, filePath, routes) {
	const cleanedContent = cleanContent(content);

	if (!EXTRACTION_REGEX.helmetTest.test(cleanedContent)) {
		return null;
	}

	const helmetMatch = content.match(EXTRACTION_REGEX.helmet);
	if (!helmetMatch) return null;

	const helmetContent = helmetMatch[1];
	const titleMatch = helmetContent.match(EXTRACTION_REGEX.title);
	const descMatch = helmetContent.match(EXTRACTION_REGEX.description);

	const title = cleanText(titleMatch?.[1]);
	const description = cleanText(descMatch?.[1]);

	const fileName = path.basename(filePath, path.extname(filePath));
	const url = routes.size && routes.has(fileName)
		? routes.get(fileName)
		: generateFallbackUrl(fileName);

	return {
		url,
		title: title || 'Untitled Page',
		description: description || 'No description available'
	};
}

function generateFallbackUrl(fileName) {
	const cleanName = fileName.replace(/Page$/, '').toLowerCase();
	return cleanName === 'app' ? '/' : `/${cleanName}`;
}

function generateLlmsTxt(pages) {
	const sortedPages = pages.sort((a, b) => a.title.localeCompare(b.title));
	const pageEntries = sortedPages.map(page =>
		`- [${page.title}](${page.url}): ${page.description}`
	).join('\n');

	return `## Pages\n${pageEntries}`;
}

function ensureDirectoryExists(dirPath) {
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true });
	}
}

function processPageFile(filePath, routes) {
	try {
		const content = fs.readFileSync(filePath, 'utf8');
		return extractHelmetData(content, filePath, routes);
	} catch (error) {
		console.error(`❌ Error processing ${filePath}:`, error.message);
		return null;
	}
}

function main() {
	try {
		const baseDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
		const rootDir = fs.existsSync(path.join(process.cwd(), 'src')) ? process.cwd() : baseDir;
		const pagesDir = path.join(rootDir, 'src', 'pages');
		const appJsxPath = path.join(rootDir, 'src', 'App.jsx');

		let pages = [];

		if (!fs.existsSync(pagesDir)) {
			pages.push(processPageFile(appJsxPath, new Map()));
			pages = pages.filter(Boolean);
		} else {
			const routes = extractRoutes(appJsxPath);
			const reactFiles = findReactFiles(pagesDir);

			pages = reactFiles
				.map(filePath => processPageFile(filePath, routes))
				.filter(Boolean);
		}

		if (pages.length === 0) {
			console.warn('⚠️ No pages with Helmet components found, using default metadata.');
			pages = [{
				url: '/',
				title: 'Mangobite — AI Apps & Software Development, Engineered',
				description: 'Production-grade AI applications, custom software platforms and data infrastructure — engineered like load-bearing structures.'
			}];
		}

		const llmsTxtContent = generateLlmsTxt(pages);
		const outputPath = path.join(rootDir, 'public', 'llms.txt');

		ensureDirectoryExists(path.dirname(outputPath));
		fs.writeFileSync(outputPath, llmsTxtContent, 'utf8');
		console.log('✅ Generated public/llms.txt successfully.');
	} catch (err) {
		console.warn('⚠️ generate-llms warning:', err.message);
	}
}

main();

