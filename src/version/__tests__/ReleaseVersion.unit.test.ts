import { ChangeLevel } from '../constants';
import { ReleaseVersion } from '../ReleaseVersion';

describe('ReleaseVersion class', () => {
  describe('constructor', () => {
    it('new () should return a ReleaseVersion object with v0.0.0', () => {
      const releaseVersion = new ReleaseVersion();
      const expectedProps = { major: 0, minor: 0, patch: 0 };
      expect(releaseVersion).toMatchObject(expectedProps);
    });

    it('new ({ major: 1, minor: 0, patch: 0 }) should return a ReleaseVersion object with v1.0.0', () => {
      const releaseVersion = new ReleaseVersion({ major: 1 });
      const expectedReleaseVersion = { major: 1, minor: 0, patch: 0 };
      expect(releaseVersion).toMatchObject(expectedReleaseVersion);
    });

    it('new with a negative version element should throw', () => {
      expect(() => {
        new ReleaseVersion({ major: -1 });
      }).toThrow();
    });
  });

  describe('representations', () => {
    it('versionString should return a string in the format X.X.X', () => {
      const versionString = new ReleaseVersion({ major: 1 }).versionString;
      const expectedVersionString = '1.0.0';
      expect(versionString).toBe(expectedVersionString);
    });

    it('versionTagName should return a string in the format vX.X.X', () => {
      const versionTagName = new ReleaseVersion({ major: 1, minor: 1 }).versionTagName;
      const expectedVersionTagName = 'v1.1.0';
      expect(versionTagName).toBe(expectedVersionTagName);
    });

    it('versionRecord should return an object literal in the format { major: X, minor: X, patch: X }', () => {
      const versionRecord = new ReleaseVersion({ major: 1, minor: 1 }).versionRecord;
      const expectedVersionRecord = { major: 1, minor: 1, patch: 0 };
      expect(versionRecord).toEqual(expectedVersionRecord);
    });
  });

  describe('bump(:ChangeLevel)', () => {
    it('given changeLevel=major, should increment to next major version', () => {
      const releaseVersion = new ReleaseVersion({ major: 0, minor: 1, patch: 1 });

      const bumpedVersion = releaseVersion.bump(ChangeLevel.major);

      const expectedBumpedVersion = { major: 1, minor: 0, patch: 0 };
      expect(bumpedVersion).toEqual(expectedBumpedVersion);
    });

    it('given changeLevel=minor, should increment to next minor version', () => {
      const releaseVersion = new ReleaseVersion({ major: 0, minor: 1, patch: 1 });

      const bumpedVersion = releaseVersion.bump(ChangeLevel.minor);

      const expectedBumpedVersion = { major: 0, minor: 2, patch: 0 };
      expect(bumpedVersion).toEqual(expectedBumpedVersion);
    });

    it('given changeLevel=patch, should increment to next patch number', () => {
      const releaseVersion = new ReleaseVersion({ major: 0, minor: 1, patch: 1 });

      const bumpedVersion = releaseVersion.bump(ChangeLevel.patch);

      const expectedBumpedVersion = { major: 0, minor: 1, patch: 2 };
      expect(bumpedVersion).toEqual(expectedBumpedVersion);
    });
  });
});
