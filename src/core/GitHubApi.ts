export interface GitHubRelease {
  tag_name: string;
}

export interface GitHubApi {
  fetchLatestRelease(owner: string, repo: string): Promise<GitHubRelease>;
}
