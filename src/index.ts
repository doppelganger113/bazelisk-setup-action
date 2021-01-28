import {BazeliskSetupAction} from "./core/BazeliskSetupAction";
import {getConfiguration} from "./ports/configuration";
import {CoreLogger} from "./ports/CoreLogger";
import {GitHubActionProxy} from "./ports/GitHubActionProxy";
import {GitHubApiImpl} from "./ports/GitHubApiImpl";

const logger = new CoreLogger();

export const main = async (): Promise<void> => {
  const config = getConfiguration();
  const gitHubActionHelper = new GitHubActionProxy();
  const gitHubApiImp = new GitHubApiImpl(config.gitHubServerUrl);

  await new BazeliskSetupAction(
    config, logger, gitHubActionHelper, gitHubApiImp
  )
    .run()
}

// Execute application
(async (): Promise<void> => {
  try {
    await main()
  } catch (e) {
    logger.error(e)
  }
})();
