import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root' //Singleton
})
export class StorageService {
	private inMemoryStorage: { [key: string]: string } = {};

	isSupported(): boolean {
		try {
			const testKey = "cmFuZG9tY29kZW5vdGJlaW5ndXNlZA==";
			localStorage.setItem(testKey, testKey);
			localStorage.removeItem(testKey);
			return true;
		} catch {
			return false;
		}
	}

	clear(): void {
		if (this.isSupported()) localStorage.clear();
		else this.inMemoryStorage = {};
	}

	getItem(name: string): string | null {
		if (this.isSupported()) return localStorage.getItem(name);
		if (this.inMemoryStorage.hasOwnProperty(name)) return this.inMemoryStorage[name];
		return null;
	}

	key(index: number): string | null {
		if (this.isSupported()) return localStorage.key(index);
		else return Object.keys(this.inMemoryStorage)[index] || null;
	}

	removeItem(name: string): void {
		if (this.isSupported()) localStorage.removeItem(name);
		else delete this.inMemoryStorage[name];
	}

	setItem(name: string, value: string): void {
		if (this.isSupported()) localStorage.setItem(name, value);
		else this.inMemoryStorage[name] = String(value);
	}

	length(): number {
		if (this.isSupported()) return localStorage.length;
		else return Object.keys(this.inMemoryStorage).length;
	}
}
