import { swapKeysAndValues } from '@skypilot/sugarbowl';
import { ChangeLevel } from './constants';
import { changeLevelMap, ChangeLevelString } from './parseChangeLevel';

export function changeLevelToString(changeLevel: ChangeLevel): ChangeLevelString {
  const changeLevelStringMap = swapKeysAndValues(changeLevelMap);
  return changeLevelStringMap[changeLevel] as ChangeLevelString;
}
