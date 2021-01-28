import {GitHubApi} from "../../src/core/GitHubApi";
import {GitHubApiImpl} from "../../src/ports/GitHubApiImpl";
import {GIT_HUB_OWNER, GIT_HUB_REPO} from "../../src/core/BazeliskSetupAction";
import {Logger} from '../../src/core/Logger';

describe('fetchLatestRelease', () => {
  let gitHubApi: GitHubApi;
  const loggerMock: Logger = {
    debug: jest.fn(),
    error: jest.fn(),
  }

  beforeEach(() => {
    gitHubApi = new GitHubApiImpl('https://api.github.com/', loggerMock);
  })

  it('should fetch the latest release data', async () => {
    const release = await gitHubApi.fetchLatestRelease(GIT_HUB_OWNER, GIT_HUB_REPO);
    expect(release).toBeTruthy();
    expect(release.tag_name).toBeTruthy();
    expect(typeof release.tag_name).toBe('string');
  })
})
