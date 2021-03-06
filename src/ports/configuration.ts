import {Configuration} from "../core/Configuration";
import {isPlatform} from "../core/platform";
import {URL} from "url";
import * as core from '@actions/core';

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
  url.protocol = 'https'

  const platform = process.platform
  if (!isPlatform(platform)) {
    throw new Error('Unsupported platform ' + platform)
  }

  const releaseTagName = core.getInput('version', {required: false})

  return {
    gitHubApiUrl,
    gitHubServerUrl: url.href,
    platform,
    releaseTagName
  }
}
