export type Platform = 'win32' | 'darwin' | 'linux';
export const platforms: Platform[] = ['win32', 'darwin', 'linux'];

export const isPlatform = (aValue: string): aValue is Platform =>
  platforms.includes(aValue as Platform)

export const getReleaseNameByPlatform = (platform: Platform): string => {
  switch (platform) {
    case 'win32':
      return 'bazelisk-windows-amd64.exe'
    case 'darwin':
      return 'bazelisk-darwin-amd64'
    case "linux":
      return 'bazelisk-linux-amd64'
  }
}

export const getExecutableNameByPlatform = (platform: Platform): string =>
  platform === 'win32' ? 'bazel.exe' : 'bazel'
