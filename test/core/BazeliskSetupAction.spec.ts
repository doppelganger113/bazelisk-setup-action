import {BazeliskSetupAction} from "../../src/core/BazeliskSetupAction";
import {Logger} from "../../src/core/Logger";
import {Configuration} from "../../src/core/Configuration";
import {GitHubActionHelper} from "../../src/core/GitHubActionHelper";
import {GitHubApiImpl} from "../../src/ports/GitHubApiImpl";

describe('BazeliskSetupAction', () => {
  let bazeliskSetupAction: BazeliskSetupAction;
  const configuration: Configuration = {
    gitHubApiUrl: 'https://api.github.com',
    gitHubServerUrl: 'https://github.com',
    platform: 'linux'
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
    fetchRelease: jest.fn(() => Promise.resolve({tag_name: 'v1.7.4'}))
  };

  beforeEach(() => {
    bazeliskSetupAction = new BazeliskSetupAction(
      configuration, testLogger, githubActionHelper, gitHubApiImpl
    );
  })

  it('should do run without any errors', async () => {
    await bazeliskSetupAction.run()

    expect(githubActionHelper.downloadTool)
      .toHaveBeenCalledWith(
        'https://github.com/bazelbuild/bazelisk/releases/download/v1.7.4/bazelisk-linux-amd64'
      )

    expect(githubActionHelper.cacheFile)
      .toHaveBeenCalledWith("/var/downloadedFile", "bazel", "bazel", "v1.7.4")

    expect(githubActionHelper.addPath)
      .toHaveBeenCalledWith("/var/cachedFile")
  })
})
