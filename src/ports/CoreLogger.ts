import * as core from '@actions/core'

import {Logger} from "../core/Logger"

export class CoreLogger implements Logger {
  debug(msg: string): void {
    core.debug(msg)
  }

  error(msg: string): void {
    core.setFailed(msg)
  }
}
