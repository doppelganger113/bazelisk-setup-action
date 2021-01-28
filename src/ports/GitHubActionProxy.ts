import {addPath} from "@actions/core";
import {cacheFile} from "@actions/tool-cache";
import {downloadTool} from "@actions/tool-cache";

import {GitHubActionHelper} from "../core/GitHubActionHelper";
import {Logger} from "../core/Logger";

export class GitHubActionProxy implements GitHubActionHelper {

  constructor(private readonly logger: Logger) {
  }

  addPath(cachedPath: string): void {
    this.logger.debug('addPath ' + cachedPath)
    return addPath(cachedPath)
  }

  cacheFile(sourceFile: string, targetFile: string, tool: string, version: string, arch?: string): Promise<string> {
    return cacheFile(sourceFile, targetFile, tool, version, arch)
  }

  downloadTool(url: string): Promise<string> {
    this.logger.debug(`downloadTool ${url}`)
    return downloadTool(url)
  }
}
