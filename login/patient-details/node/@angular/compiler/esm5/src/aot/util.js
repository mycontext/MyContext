/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var STRIP_SRC_FILE_SUFFIXES = /(\.ts|\.d\.ts|\.js|\.jsx|\.tsx)$/;
var GENERATED_FILE = /\.ngfactory\.|\.ngsummary\./;
var JIT_SUMMARY_FILE = /\.ngsummary\./;
var JIT_SUMMARY_NAME = /NgSummary$/;
export function ngfactoryFilePath(filePath, forceSourceFile) {
    if (forceSourceFile === void 0) { forceSourceFile = false; }
    var urlWithSuffix = splitTypescriptSuffix(filePath, forceSourceFile);
    return urlWithSuffix[0] + ".ngfactory" + normalizeGenFileSuffix(urlWithSuffix[1]);
}
export function stripGeneratedFileSuffix(filePath) {
    return filePath.replace(GENERATED_FILE, '.');
}
export function isGeneratedFile(filePath) {
    return GENERATED_FILE.test(filePath);
}
export function splitTypescriptSuffix(path, forceSourceFile) {
    if (forceSourceFile === void 0) { forceSourceFile = false; }
    if (path.endsWith('.d.ts')) {
        return [path.slice(0, -5), forceSourceFile ? '.ts' : '.d.ts'];
    }
    var lastDot = path.lastIndexOf('.');
    if (lastDot !== -1) {
        return [path.substring(0, lastDot), path.substring(lastDot)];
    }
    return [path, ''];
}
export function normalizeGenFileSuffix(srcFileSuffix) {
    return srcFileSuffix === '.tsx' ? '.ts' : srcFileSuffix;
}
export function summaryFileName(fileName) {
    var fileNameWithoutSuffix = fileName.replace(STRIP_SRC_FILE_SUFFIXES, '');
    return fileNameWithoutSuffix + ".ngsummary.json";
}
export function summaryForJitFileName(fileName, forceSourceFile) {
    if (forceSourceFile === void 0) { forceSourceFile = false; }
    var urlWithSuffix = splitTypescriptSuffix(stripGeneratedFileSuffix(fileName), forceSourceFile);
    return urlWithSuffix[0] + ".ngsummary" + urlWithSuffix[1];
}
export function stripSummaryForJitFileSuffix(filePath) {
    return filePath.replace(JIT_SUMMARY_FILE, '.');
}
export function summaryForJitName(symbolName) {
    return symbolName + "NgSummary";
}
export function stripSummaryForJitNameSuffix(symbolName) {
    return symbolName.replace(JIT_SUMMARY_NAME, '');
}
var LOWERED_SYMBOL = /\u0275\d+/;
export function isLoweredSymbol(name) {
    return LOWERED_SYMBOL.test(name);
}
export function createLoweredSymbol(id) {
    return "\u0275" + id;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9hb3QvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxJQUFNLHVCQUF1QixHQUFHLGtDQUFrQyxDQUFDO0FBQ25FLElBQU0sY0FBYyxHQUFHLDZCQUE2QixDQUFDO0FBQ3JELElBQU0sZ0JBQWdCLEdBQUcsZUFBZSxDQUFDO0FBQ3pDLElBQU0sZ0JBQWdCLEdBQUcsWUFBWSxDQUFDO0FBRXRDLE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxRQUFnQixFQUFFLGVBQXVCO0lBQXZCLGdDQUFBLEVBQUEsdUJBQXVCO0lBQ3pFLElBQU0sYUFBYSxHQUFHLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUN2RSxPQUFVLGFBQWEsQ0FBQyxDQUFDLENBQUMsa0JBQWEsc0JBQXNCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFHLENBQUM7QUFDcEYsQ0FBQztBQUVELE1BQU0sVUFBVSx3QkFBd0IsQ0FBQyxRQUFnQjtJQUN2RCxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQy9DLENBQUM7QUFFRCxNQUFNLFVBQVUsZUFBZSxDQUFDLFFBQWdCO0lBQzlDLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN2QyxDQUFDO0FBRUQsTUFBTSxVQUFVLHFCQUFxQixDQUFDLElBQVksRUFBRSxlQUF1QjtJQUF2QixnQ0FBQSxFQUFBLHVCQUF1QjtJQUN6RSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDMUIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQy9EO0lBRUQsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUV0QyxJQUFJLE9BQU8sS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0tBQzlEO0lBRUQsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNwQixDQUFDO0FBRUQsTUFBTSxVQUFVLHNCQUFzQixDQUFDLGFBQXFCO0lBQzFELE9BQU8sYUFBYSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7QUFDMUQsQ0FBQztBQUVELE1BQU0sVUFBVSxlQUFlLENBQUMsUUFBZ0I7SUFDOUMsSUFBTSxxQkFBcUIsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzVFLE9BQVUscUJBQXFCLG9CQUFpQixDQUFDO0FBQ25ELENBQUM7QUFFRCxNQUFNLFVBQVUscUJBQXFCLENBQUMsUUFBZ0IsRUFBRSxlQUF1QjtJQUF2QixnQ0FBQSxFQUFBLHVCQUF1QjtJQUM3RSxJQUFNLGFBQWEsR0FBRyxxQkFBcUIsQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUNqRyxPQUFVLGFBQWEsQ0FBQyxDQUFDLENBQUMsa0JBQWEsYUFBYSxDQUFDLENBQUMsQ0FBRyxDQUFDO0FBQzVELENBQUM7QUFFRCxNQUFNLFVBQVUsNEJBQTRCLENBQUMsUUFBZ0I7SUFDM0QsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsVUFBa0I7SUFDbEQsT0FBVSxVQUFVLGNBQVcsQ0FBQztBQUNsQyxDQUFDO0FBRUQsTUFBTSxVQUFVLDRCQUE0QixDQUFDLFVBQWtCO0lBQzdELE9BQU8sVUFBVSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBRUQsSUFBTSxjQUFjLEdBQUcsV0FBVyxDQUFDO0FBRW5DLE1BQU0sVUFBVSxlQUFlLENBQUMsSUFBWTtJQUMxQyxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxFQUFVO0lBQzVDLE9BQU8sV0FBUyxFQUFJLENBQUM7QUFDdkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuY29uc3QgU1RSSVBfU1JDX0ZJTEVfU1VGRklYRVMgPSAvKFxcLnRzfFxcLmRcXC50c3xcXC5qc3xcXC5qc3h8XFwudHN4KSQvO1xuY29uc3QgR0VORVJBVEVEX0ZJTEUgPSAvXFwubmdmYWN0b3J5XFwufFxcLm5nc3VtbWFyeVxcLi87XG5jb25zdCBKSVRfU1VNTUFSWV9GSUxFID0gL1xcLm5nc3VtbWFyeVxcLi87XG5jb25zdCBKSVRfU1VNTUFSWV9OQU1FID0gL05nU3VtbWFyeSQvO1xuXG5leHBvcnQgZnVuY3Rpb24gbmdmYWN0b3J5RmlsZVBhdGgoZmlsZVBhdGg6IHN0cmluZywgZm9yY2VTb3VyY2VGaWxlID0gZmFsc2UpOiBzdHJpbmcge1xuICBjb25zdCB1cmxXaXRoU3VmZml4ID0gc3BsaXRUeXBlc2NyaXB0U3VmZml4KGZpbGVQYXRoLCBmb3JjZVNvdXJjZUZpbGUpO1xuICByZXR1cm4gYCR7dXJsV2l0aFN1ZmZpeFswXX0ubmdmYWN0b3J5JHtub3JtYWxpemVHZW5GaWxlU3VmZml4KHVybFdpdGhTdWZmaXhbMV0pfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpcEdlbmVyYXRlZEZpbGVTdWZmaXgoZmlsZVBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBmaWxlUGF0aC5yZXBsYWNlKEdFTkVSQVRFRF9GSUxFLCAnLicpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNHZW5lcmF0ZWRGaWxlKGZpbGVQYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIEdFTkVSQVRFRF9GSUxFLnRlc3QoZmlsZVBhdGgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3BsaXRUeXBlc2NyaXB0U3VmZml4KHBhdGg6IHN0cmluZywgZm9yY2VTb3VyY2VGaWxlID0gZmFsc2UpOiBzdHJpbmdbXSB7XG4gIGlmIChwYXRoLmVuZHNXaXRoKCcuZC50cycpKSB7XG4gICAgcmV0dXJuIFtwYXRoLnNsaWNlKDAsIC01KSwgZm9yY2VTb3VyY2VGaWxlID8gJy50cycgOiAnLmQudHMnXTtcbiAgfVxuXG4gIGNvbnN0IGxhc3REb3QgPSBwYXRoLmxhc3RJbmRleE9mKCcuJyk7XG5cbiAgaWYgKGxhc3REb3QgIT09IC0xKSB7XG4gICAgcmV0dXJuIFtwYXRoLnN1YnN0cmluZygwLCBsYXN0RG90KSwgcGF0aC5zdWJzdHJpbmcobGFzdERvdCldO1xuICB9XG5cbiAgcmV0dXJuIFtwYXRoLCAnJ107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVHZW5GaWxlU3VmZml4KHNyY0ZpbGVTdWZmaXg6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBzcmNGaWxlU3VmZml4ID09PSAnLnRzeCcgPyAnLnRzJyA6IHNyY0ZpbGVTdWZmaXg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdW1tYXJ5RmlsZU5hbWUoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGZpbGVOYW1lV2l0aG91dFN1ZmZpeCA9IGZpbGVOYW1lLnJlcGxhY2UoU1RSSVBfU1JDX0ZJTEVfU1VGRklYRVMsICcnKTtcbiAgcmV0dXJuIGAke2ZpbGVOYW1lV2l0aG91dFN1ZmZpeH0ubmdzdW1tYXJ5Lmpzb25gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3VtbWFyeUZvckppdEZpbGVOYW1lKGZpbGVOYW1lOiBzdHJpbmcsIGZvcmNlU291cmNlRmlsZSA9IGZhbHNlKTogc3RyaW5nIHtcbiAgY29uc3QgdXJsV2l0aFN1ZmZpeCA9IHNwbGl0VHlwZXNjcmlwdFN1ZmZpeChzdHJpcEdlbmVyYXRlZEZpbGVTdWZmaXgoZmlsZU5hbWUpLCBmb3JjZVNvdXJjZUZpbGUpO1xuICByZXR1cm4gYCR7dXJsV2l0aFN1ZmZpeFswXX0ubmdzdW1tYXJ5JHt1cmxXaXRoU3VmZml4WzFdfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpcFN1bW1hcnlGb3JKaXRGaWxlU3VmZml4KGZpbGVQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gZmlsZVBhdGgucmVwbGFjZShKSVRfU1VNTUFSWV9GSUxFLCAnLicpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3VtbWFyeUZvckppdE5hbWUoc3ltYm9sTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke3N5bWJvbE5hbWV9TmdTdW1tYXJ5YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmlwU3VtbWFyeUZvckppdE5hbWVTdWZmaXgoc3ltYm9sTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHN5bWJvbE5hbWUucmVwbGFjZShKSVRfU1VNTUFSWV9OQU1FLCAnJyk7XG59XG5cbmNvbnN0IExPV0VSRURfU1lNQk9MID0gL1xcdTAyNzVcXGQrLztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzTG93ZXJlZFN5bWJvbChuYW1lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIExPV0VSRURfU1lNQk9MLnRlc3QobmFtZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMb3dlcmVkU3ltYm9sKGlkOiBudW1iZXIpOiBzdHJpbmcge1xuICByZXR1cm4gYFxcdTAyNzUke2lkfWA7XG59XG4iXX0=