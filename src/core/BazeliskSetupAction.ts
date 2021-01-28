import {GitHubActionHelper} from "./GitHubActionHelper";
import {Logger} from "./Logger";
import {getExecutableNameByPlatform, getReleaseNameByPlatform} from "./platform";
import {Configuration} from "./Configuration";
import {GitHubApi} from "./GitHubApi";

export class BazeliskSetupAction {
  constructor(
    private readonly config: Configuration,
    private readonly logger: Logger,
    private readonly gitHubActionHelper: GitHubActionHelper,
    private readonly gitHubApi: GitHubApi
  ) {
  }

  async run(): Promise<void> {
    const {tag_name} = await this.gitHubApi
      .fetchRelease('bazelbuild', 'bazelisk', 'latest')
    this.logger.debug(`Downloaded Bazelisk release info with tag: ${tag_name}`)

    const releaseName = getReleaseNameByPlatform(this.config.platform)

    this.logger.debug(`Fetching latest Bazelisk release: ${releaseName}`)
    const latestBazeliskRelease = await this.fetchLatestBazeliskRelase(
      this.config.gitHubServerUrl, tag_name, releaseName
    )

    const targetFileName = getExecutableNameByPlatform(this.config.platform)

    this.logger.debug('Caching Bazelisk...')
    const cachedPath = await this.gitHubActionHelper.cacheFile(
      latestBazeliskRelease, targetFileName, 'bazel', tag_name
    )

    this.logger.debug(`Cached Bazelisk at ${cachedPath}`)
    this.gitHubActionHelper.addPath(cachedPath)
  }

  private fetchLatestBazeliskRelase(
    gitHubServerUrl: string, tagName: string, releaseName: string
  ): Promise<string> {
    const url = `${gitHubServerUrl}/bazelbuild/bazelisk/releases/download/${tagName}/${releaseName}`;

    return this.gitHubActionHelper.downloadTool(url);
  }
}
