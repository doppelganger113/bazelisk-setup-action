import {BazeliskSetupAction} from "../../src/core/BazeliskSetupAction";
import {Logger} from "../../src/core/Logger";
import {Configuration} from "../../src/core/Configuration";
import {GitHubActionHelper} from "../../src/core/GitHubActionHelper";
import {GitHubApiImpl} from "../../src/ports/GitHubApiImpl";
import {GITHUB_API_URL, GITHUB_SERVER_URL} from "../env";

describe('BazeliskSetupAction', () => {
  let bazeliskSetupAction: BazeliskSetupAction;
  const configuration: Configuration = {
    gitHubApiUrl: GITHUB_API_URL,
    gitHubServerUrl: GITHUB_SERVER_URL,
    platform: 'linux',
    releaseTagName: 'latest'
  };
  const testLogger: Logger = {
    error: jest.fn(),
    debug: jest.fn(),
  }
  const githubActionHelper: GitHubActionHelper = {
    addPath: jest.fn(),
    cacheFile: jest.fn(() => Promise.resolve('/var/cachedFile')),
    downloadTool: jest.fn(() => Promise.resolve('/var/downloadedFile'))
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const gitHubApiImpl: GitHubApiImpl = {
    host: configuration.gitHubServerUrl,
    fetchLatestRelease: jest.fn(() => Promise.resolve({tag_name: 'v1.7.4'}))
  };

  beforeEach(() => {
    bazeliskSetupAction = new BazeliskSetupAction(
      configuration, testLogger, githubActionHelper, gitHubApiImpl
    );
  })

  it('should do run without any errors', async () => {
    await bazeliskSetupAction.run()

    expect(gitHubApiImpl.fetchLatestRelease)
      .toHaveBeenCalledWith("bazelbuild", "bazelisk")

    expect(githubActionHelper.downloadTool)
      .toHaveBeenCalledWith(
        'https://github.com/bazelbuild/bazelisk/releases/download/v1.7.4/bazelisk-linux-amd64'
      )

    expect(githubActionHelper.cacheFile)
      .toHaveBeenCalledWith("/var/downloadedFile", "bazel", "bazel", "v1.7.4")

    expect(githubActionHelper.addPath)
      .toHaveBeenCalledWith("/var/cachedFile")
  })

  it('should run and specific release by tag name', async () => {
    configuration.releaseTagName = "v1.6.1"
    await bazeliskSetupAction.run()

    expect(gitHubApiImpl.fetchLatestRelease)
      .toHaveBeenCalledWith("bazelbuild", "bazelisk")

    expect(githubActionHelper.downloadTool)
      .toHaveBeenCalledWith(
        'https://github.com/bazelbuild/bazelisk/releases/download/v1.6.1/bazelisk-linux-amd64'
      )

    expect(githubActionHelper.cacheFile)
      .toHaveBeenCalledWith("/var/downloadedFile", "bazel", "bazel", "v1.6.1")

    expect(githubActionHelper.addPath)
      .toHaveBeenCalledWith("/var/cachedFile")
  })
})
