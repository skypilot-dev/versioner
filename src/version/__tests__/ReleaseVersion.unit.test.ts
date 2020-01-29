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
    it('should be instantiable from version strings', () => {
      const versionStrings = ['1.1.10', 'v1.1.10'];

      versionStrings.forEach((versionString) => {
        const releaseVersion = new ReleaseVersion(versionString);

        const expectedVersionRecord = ({ major: 1, minor: 1, patch: 10 });
        expect(releaseVersion.versionRecord).toEqual(expectedVersionRecord);
      });
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

  describe('parseVersionElements(:string)', () => {
    it("can parse '1.1.1' to an object", () => {
      const versionString = '1.1.1';

      const versionInput = ReleaseVersion.parseVersionComponents(versionString);

      const expectedLiteral = { major: 1, minor: 1, patch: 1 };
      expect(versionInput).toEqual(expectedLiteral);
    });

    it("can parse 'v1.0.10' to an object", () => {
      const versionString = 'v1.0.10';

      const versionInput = ReleaseVersion.parseVersionComponents(versionString);

      const expectedLiteral = { major: 1, minor: 0, patch: 10 };
      expect(versionInput).toEqual(expectedLiteral);
    });

    it("cannot parse invalid strings: '1.1', 'v1.1.x'", () => {
      const versionStrings = ['x1.1.1', '1.1', 'v1.1.x'];

      expect.assertions(3);
      versionStrings.forEach((versionString) => {
        expect(() => {
          ReleaseVersion.parseVersionComponents(versionString);
        }).toThrow();
      });
    });
  });
});
