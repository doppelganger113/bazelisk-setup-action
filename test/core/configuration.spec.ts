import {getConfiguration} from "../../src/ports/configuration";

describe('getConfiguration', () => {

  beforeEach(() => {
    process.env.GITHUB_API_URL = 'https://api.github.com'
    process.env.GITHUB_SERVER_URL = 'https://github.com'
  })

  it('should return valid configuration', () => {
    const config = getConfiguration();
    expect(config).toBeTruthy();
    expect(config.gitHubServerUrl).toBe('https://github.com/')
    expect(config.gitHubApiUrl).toBe('https://api.github.com')
  })
})
