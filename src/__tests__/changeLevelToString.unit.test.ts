import { changeLevelToString } from '../changeLevelToString';
import { ChangeLevel } from '../constants';

describe('changeLevelToString(:ChangeLevel)', () => {
  it('given a change level, should return its string representation', () => {
    const changeLevels = [
      ChangeLevel.major,
      ChangeLevel.minor,
      ChangeLevel.patch,
      ChangeLevel.none,
    ];
    const labels = ['major', 'minor', 'patch', 'none'];
    changeLevels.forEach((changeLevel, index) => {
      const label = changeLevelToString(changeLevel);
      const expectedLabel = labels[index];
      expect(label).toBe(expectedLabel);
    });
  });
});
