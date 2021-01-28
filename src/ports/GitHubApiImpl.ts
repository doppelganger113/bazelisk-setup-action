import {GitHubApi, GitHubRelease} from "../core/GitHubApi";
import axios from "axios";
import {Logger} from "../core/Logger";

const USER_AGENT = 'github doppelganger113/bazelisk-setup-action'

interface HashMap<T> {
  [key: string]: T
}

export const isGitHubRelease = (value: unknown): value is GitHubRelease => {
  if (typeof value !== 'object' || !value) {
    return false;
  }

  const {tag_name} = value as HashMap<unknown>;

  return !(!tag_name || typeof tag_name !== 'string');
}

export class GitHubApiImpl implements GitHubApi {

  constructor(
    private readonly host: string,
    private readonly logger: Logger
  ) {
  }

  async fetchLatestRelease(owner: string, repo: string): Promise<GitHubRelease> {
    const url = `${this.host}/repos/${owner}/${repo}/releases/latest`;

    this.logger.debug('GET ' + url)

    const response = await axios.get<unknown>(url, {
      headers: {'user-agent': USER_AGENT}
    });

    const data = response.data
    if (!isGitHubRelease(data)) {
      throw new Error(`Received unexpected response: ${data}`)
    }

    return data;
  }
}
