import { ChangeLevel } from '../constants';
import { bump } from '../bump';

describe("bump('0.1.2', :ChangeLevel[, 'beta'[, versionStrings]])", () => {
  const baseVersion = '0.1.2';
  const channel = 'beta';

  it('if no channel is given, should bump & return the release version', () => {
    const bumpedVersionString = bump(baseVersion, ChangeLevel.minor);

    const expectedVersionString = '0.2.0';
    expect(bumpedVersionString).toBe(expectedVersionString);
  });

  it('when there are no changes, should return 0.1.2-beta.0', async () => {
    const bumpedVersionString = bump(baseVersion, ChangeLevel.none, channel);

    const expectedVersionString = '0.1.2-beta.0';
    expect(bumpedVersionString).toBe(expectedVersionString);
  });

  it('when there is a previous iteration, should increment the iteration', async () => {
    const versionStrings = [
      /* different version */
      '0.0.1-beta.3',
      '0.2.1-beta.7', // different patch
      '3.2.1-beta.9',
      /* different channel */
      '0.2.0-alpha.11',
      /* same version */
      '0.2.0-beta.5', //  highest iteration
      '0.2.0-beta.4',
    ];

    const bumpedVersionString = bump(
      `v${baseVersion}`, // version number prefixed with 'v' is accepted
      ChangeLevel.minor,
      channel,
      versionStrings
    );

    const expectedVersionString = '0.2.0-beta.6'; // incremented iteration
    expect(bumpedVersionString).toBe(expectedVersionString);
  });
});
