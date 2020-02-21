import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let StorageService = class StorageService {
    constructor() {
        this.inMemoryStorage = {};
    }
    isSupported() {
        try {
            const testKey = "cmFuZG9tY29kZW5vdGJlaW5ndXNlZA==";
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            return true;
        }
        catch (_a) {
            return false;
        }
    }
    clear() {
        if (this.isSupported())
            localStorage.clear();
        else
            this.inMemoryStorage = {};
    }
    getItem(name) {
        if (this.isSupported())
            return localStorage.getItem(name);
        if (this.inMemoryStorage.hasOwnProperty(name))
            return this.inMemoryStorage[name];
        return null;
    }
    key(index) {
        if (this.isSupported())
            return localStorage.key(index);
        else
            return Object.keys(this.inMemoryStorage)[index] || null;
    }
    removeItem(name) {
        if (this.isSupported())
            localStorage.removeItem(name);
        else
            delete this.inMemoryStorage[name];
    }
    setItem(name, value) {
        if (this.isSupported())
            localStorage.setItem(name, value);
        else
            this.inMemoryStorage[name] = String(value);
    }
    length() {
        if (this.isSupported())
            return localStorage.length;
        else
            return Object.keys(this.inMemoryStorage).length;
    }
};
StorageService = __decorate([
    Injectable({
        providedIn: 'root' //Singleton
    })
], StorageService);
export { StorageService };
//# sourceMappingURL=storage.service.js.map