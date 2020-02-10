import { ChangeLevel } from './constants';
import { ChangeLevelString, parseChangeLevel } from './parseChangeLevel';
import { PrereleaseVersion } from './PrereleaseVersion';
import { ReleaseVersion } from './ReleaseVersion';

export function bumpVersion(
  baseVersionString: string,
  changeLevel: ChangeLevel | ChangeLevelString,
  channel = 'latest',
  previousVersionStrings: string[] = [],
): string {
  const bumpedCoreVersion: ReleaseVersion = new ReleaseVersion(baseVersionString)
    .bump(typeof changeLevel === 'string' ? parseChangeLevel(changeLevel) : changeLevel);
  if (channel === 'latest') {
    return bumpedCoreVersion.versionString;
  }
  const iteration = PrereleaseVersion.computeNextIteration(
    bumpedCoreVersion,
    channel,
    previousVersionStrings
  );
  return new PrereleaseVersion({
    ...bumpedCoreVersion.versionRecord,
    channel,
    iteration,
  }).versionString;
}
