import { ChangeLevel } from './constants';
import { PrereleaseVersion } from './PrereleaseVersion';
import { ReleaseVersion } from './ReleaseVersion';

type ChangeLevelMap = {
  none: ChangeLevel;
  patch: ChangeLevel;
  minor: ChangeLevel;
  major: ChangeLevel;
}

type ChangeLevelString = keyof ChangeLevelMap;

const changeLevelMap: { [key: string]: ChangeLevel } = {
  none: ChangeLevel.none,
  patch: ChangeLevel.patch,
  minor: ChangeLevel.minor,
  major: ChangeLevel.major,
};

function parseChangeLevel(changeLevelString: ChangeLevelString): ChangeLevel {
  const changeLevel: ChangeLevel = changeLevelMap[changeLevelString];
  if (changeLevel !== undefined) {
    return changeLevel;
  }
  throw new Error(`Unrecognized change level: ${changeLevelString}`);
}

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
