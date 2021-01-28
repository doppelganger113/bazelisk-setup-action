import {Configuration} from "../core/Configuration";
import {isPlatform} from "../core/platform";
import {URL} from "url";

export const getConfiguration = (): Configuration | never => {
  const gitHubApiUrl = process.env.GITHUB_API_URL || ''
  if (!gitHubApiUrl) {
    throw new Error('Missing GITHUB_API_URL env variable')
  }

  const gitHubServerUrl = process.env.GITHUB_SERVER_URL || ''
  if (!gitHubServerUrl) {
    throw new Error('Missing GITHUB_SERVER_URL env variable')
  }

  const url = new URL(gitHubServerUrl);
  url.port = '433'

  const platform = process.platform
  if (!isPlatform(platform)) {
    throw new Error('Unsupported platform ' + platform)
  }

  return {
    gitHubApiUrl,
    gitHubServerUrl: url.host,
    platform
  }
}
