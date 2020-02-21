export class UrlUtility {
    static isExternalUrl(url) {
        return url.match(/[a-zA-Z0-9]*:\/\/[^\s]*/g) !== null;
    }
}
//# sourceMappingURL=url.utility.js.map