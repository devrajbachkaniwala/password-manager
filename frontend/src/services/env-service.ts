export class EnvService {
  static get baseUrl() {
    return process.env.NEXT_PUBLIC_SERVER_URL;
  }
}
