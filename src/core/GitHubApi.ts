export interface GitHubRelease {
  tag_name: string;
}

export interface GitHubApi {
  fetchRelease(owner: string, repo: string, release: string): Promise<GitHubRelease>;
}
