import { ChangeLevel } from './constants';
import { PrereleaseVersion } from './PrereleaseVersion';
import { ReleaseVersion } from './ReleaseVersion';

export function bump(
  baseVersionString: string,
  changeLevel: ChangeLevel,
  channel = 'latest',
  previousVersionStrings: string[] = [],
): string {
  const bumpedCoreVersion: ReleaseVersion = new ReleaseVersion(baseVersionString).bump(changeLevel);
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
