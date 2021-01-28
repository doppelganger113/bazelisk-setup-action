/**
 * Main purpose is to be used for stubbing during tests so it should
 * act as a proxy/wrapper of @actions library
 */
export interface GitHubActionHelper {
  cacheFile(
    sourceFile: string, targetFile: string, tool: string, version: string, arch?: string,
  ): Promise<string>;

  addPath(cachedPath: string): void;

  downloadTool(url: string): Promise<string>;
}
