export class UrlUtility {
	static isExternalUrl(url: string): boolean {
		return url.match(/[a-zA-Z0-9]*:\/\/[^\s]*/g) !== null;
	}
}
