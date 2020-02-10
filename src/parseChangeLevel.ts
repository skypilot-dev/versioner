import { ChangeLevel } from './constants';

type ChangeLevelMap = {
  none: ChangeLevel;
  patch: ChangeLevel;
  minor: ChangeLevel;
  major: ChangeLevel;
}

export type ChangeLevelString = keyof ChangeLevelMap;

export const changeLevelMap: { [key: string]: ChangeLevel } = {
  none: ChangeLevel.none,
  patch: ChangeLevel.patch,
  minor: ChangeLevel.minor,
  major: ChangeLevel.major,
};

export function parseChangeLevel(changeLevelString: ChangeLevelString): ChangeLevel {
  const changeLevel: ChangeLevel = changeLevelMap[changeLevelString];
  if (changeLevel !== undefined) {
    return changeLevel;
  }
  throw new Error(`Unrecognized change level: ${changeLevelString}`);
}
