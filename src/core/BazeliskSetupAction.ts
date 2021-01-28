import {GitHubActionHelper} from "./GitHubActionHelper";
import {Logger} from "./Logger";
import {getExecutableNameByPlatform, getReleaseNameByPlatform} from "./platform";
import {Configuration} from "./Configuration";
import {GitHubApi} from "./GitHubApi";

export const GIT_HUB_OWNER = 'bazelbuild';
export const GIT_HUB_REPO = 'bazelisk';

export class BazeliskSetupAction {
  constructor(
    private readonly config: Configuration,
    private readonly logger: Logger,
    private readonly gitHubActionHelper: GitHubActionHelper,
    private readonly gitHubApi: GitHubApi
  ) {
  }

  async run(): Promise<void> {
    this.logger.debug(`Fetching tag name for: ${this.config.releaseTagName}`);
    const tagName = await this.fetchReleaseTagName(this.config.releaseTagName)

    const releaseName = getReleaseNameByPlatform(this.config.platform)

    this.logger.debug(`Fetching latest Bazelisk release: ${releaseName}`)
    const latestBazeliskRelease = await this.fetchRelease(
      this.config.gitHubServerUrl, tagName, releaseName
    )

    const targetFileName = getExecutableNameByPlatform(this.config.platform)

    this.logger.debug('Caching Bazelisk...')
    const cachedPath = await this.gitHubActionHelper.cacheFile(
      latestBazeliskRelease, targetFileName, 'bazel', tagName
    )

    this.logger.debug(`Cached Bazelisk at ${cachedPath}`)
    this.gitHubActionHelper.addPath(cachedPath)
  }

  private fetchRelease(
    gitHubServerUrl: string, tagName: string, releaseName: string
  ): Promise<string> {
    const url = `${gitHubServerUrl}bazelbuild/bazelisk/releases/download/${tagName}/${releaseName}`;

    return this.gitHubActionHelper.downloadTool(url);
  }

  private async fetchReleaseTagName(releaseVersion: string): Promise<string> {
    let tagName: string;

    if (releaseVersion === 'latest') {
      const release = await this.gitHubApi.fetchLatestRelease(GIT_HUB_OWNER, GIT_HUB_REPO)
      tagName = release.tag_name
    } else {
      tagName = releaseVersion
    }

    this.logger.debug(`Downloaded Bazelisk release info with tag: ${tagName}`)

    return tagName;
  }
}
