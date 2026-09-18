import fs from 'fs';
import path from 'path';

function copyDirRecursive(src, dest) {
	if (!fs.existsSync(dest)) {
		fs.mkdirSync(dest, { recursive: true });
	}

	const entries = fs.readdirSync(src, { withFileTypes: true });

	for (const entry of entries) {
		const srcPath = path.join(src, entry.name);
		const destPath = path.join(dest, entry.name);

		if (entry.isDirectory()) {
			copyDirRecursive(srcPath, destPath);
		} else {
			fs.copyFileSync(srcPath, destPath);
		}
	}
}

function main() {
	const currentDist = path.resolve(process.cwd(), '../../dist/apps/web');
	const rootDist = path.resolve(process.cwd(), '../../dist');
	const publicHtml = path.resolve(process.cwd(), '../../public_html');

	if (!fs.existsSync(currentDist)) {
		console.warn('⚠️ No built dist/apps/web found to mirror');
		return;
	}

	// 1. Mirror dist/apps/web directly into root dist/ (so dist/index.html exists for Hostinger dist/ publish)
	console.log(`📦 Mirroring build output to ${rootDist}...`);
	copyDirRecursive(currentDist, rootDist);

	// 2. Also copy to public_html/ in case Hostinger uses standard public_html document root
	console.log(`📦 Mirroring build output to ${publicHtml}...`);
	copyDirRecursive(currentDist, publicHtml);

	console.log('✅ Post-build mirroring complete! index.html is available at dist/, dist/apps/web/, and public_html/');
}

main();
