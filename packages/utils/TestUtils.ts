import axios from "axios";
export class TestUtils {
  static getPackagePath(dirname: string) {
    const path = this.getPath(dirname);
    return path.split(".").slice(0, 2).join(".");
  }
  static getUnitTestPath(dirname: string, klass: { name: string; }) {
    const path = this.getPath(dirname);
    return `${path}.${klass.name}`;
  }
  static getAcceptanceTestPath(dirname: string, title?: string) {
    const path = this.getPath(dirname);
    return title ? `${path}/${title}` : path;
  }

  static localRequest(route: string, method: string, body?: any, port: number = 3000) {
    return axios({
      method,
      url: `http://localhost:${port}${route}`,
      data: body,
      headers: { "Content-Type": "application/json" }
    });
  }

  private static getPath(dirname: string) {
    return dirname
      .split(process.cwd()).join("")
      .split("/test").join("")
      .split("/").join(".")
      .substring(1)
      ;
  }

}