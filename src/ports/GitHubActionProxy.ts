import {addPath} from "@actions/core";
import {cacheFile} from "@actions/tool-cache";
import {downloadTool} from "@actions/tool-cache";

import {GitHubActionHelper} from "../core/GitHubActionHelper";

export class GitHubActionProxy implements GitHubActionHelper {
  addPath(cachedPath: string): void {
    return addPath(cachedPath)
  }

  cacheFile(sourceFile: string, targetFile: string, tool: string, version: string, arch?: string): Promise<string> {
    return cacheFile(sourceFile, targetFile, tool, version, arch)
  }

  downloadTool(url: string): Promise<string> {
    return downloadTool(url)
  }
}
