export class SessionStorage {
  static get(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  static set(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  static clear(): void {
    sessionStorage.clear();
  }
}
