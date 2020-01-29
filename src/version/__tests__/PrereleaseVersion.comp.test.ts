import { ChangeLevel } from '../constants';
import { PrereleaseVersion } from '../PrereleaseVersion';
import { ReleaseVersion } from '../ReleaseVersion';

describe('PrereleaseVersion class', () => {
  describe('constructor', () => {
    it("new ({ major: 1, 'next') should return a PrereleaseVersion object with version 1.0.0, channel: 'next', iteration: 0", () => {
      const prereleaseVersion = new PrereleaseVersion({ major: 1, channel: 'next' });
      const expectedProps = { major: 1, minor: 0, patch: 0, channel: 'next' };
      expect(prereleaseVersion).toMatchObject(expectedProps);
    });

    it('new with negative version element should throw', () => {
      expect(() => {
        new PrereleaseVersion({ major: -1, channel: 'next' });
      }).toThrow();
    });

    it('new with empty channel should throw', () => {
      expect(() => {
        new PrereleaseVersion({ major: 1, channel: '' });
      }).toThrow();
    });

    it('should be instantiable from a ReleaseVersion without a change', () => {
      const releaseVersion = new ReleaseVersion({ major: 1 });
      const prereleaseVersion = new PrereleaseVersion(releaseVersion, { channel: 'next' });

      const expectedVersionRecord = { major: 1, minor: 0, patch: 0, channel: 'next', iteration: 0 };
      expect(prereleaseVersion.versionRecord).toEqual(expectedVersionRecord);
    });

    it('should be instantiable from a ReleaseVersion with a change', () => {
      const releaseVersion = new ReleaseVersion({ major: 1, patch: 1 });

      const prereleaseVersion = new PrereleaseVersion(
        releaseVersion,
        { changeLevel: ChangeLevel.minor, channel: 'next' }
      );

      const expectedVersionRecord = { major: 1, minor: 1, patch: 0, channel: 'next', iteration: 0 };
      expect(prereleaseVersion.versionRecord).toEqual(expectedVersionRecord);
    });

    it('should be instantiable from a PrereleaseVersion without a change', () => {
      const basePrereleaseVersion = new PrereleaseVersion({ major: 1, channel: 'beta' });

      const prereleaseVersion = new PrereleaseVersion(
        basePrereleaseVersion,
        { channel: 'alpha' }
      );

      const expectedVersionRecord = { major: 1, minor: 0, patch: 0, channel: 'alpha', iteration: 0 };
      expect(prereleaseVersion.versionRecord).toEqual(expectedVersionRecord);
    });

    it('should be instantiable from a PrereleaseVersion with a change', () => {
      const basePrereleaseVersion = new PrereleaseVersion(
        { major: 1, patch: 1, channel: 'beta' }
      );

      const prereleaseVersion = new PrereleaseVersion(
        basePrereleaseVersion,
        { changeLevel: ChangeLevel.minor, channel: 'alpha' }
      );

      const expectedLiteral = { major: 1, minor: 1, patch: 0, channel: 'alpha', iteration: 0 };
      expect(prereleaseVersion.versionRecord).toEqual(expectedLiteral);
    });

    it('should be instantiable from prerelease version strings', () => {
      const versionStrings = ['1.1.0-alpha.10', 'v1.1.0-alpha.10'];

      versionStrings.forEach((versionString) => {
        const prereleaseVersionRecord = new PrereleaseVersion(versionString).versionRecord;

        const expectedLiteral = ({ major: 1, minor: 1, patch: 0, channel: 'alpha', iteration: 10 });
        expect(prereleaseVersionRecord).toEqual(expectedLiteral);
      });
    });
  });

  describe('representations', () => {
    it('versionString should return a string in the format X.X.X-channel.X', () => {
      const versionString = new PrereleaseVersion({ major: 1, channel: 'alpha' }).versionString;
      const expectedVersionString = '1.0.0-alpha.0';
      expect(versionString).toBe(expectedVersionString);
    });

    it('versionRecord should return an object literal in the format { major: X, minor: X, patch: X, channel, iteration: X }', () => {
      const versionRecord = new PrereleaseVersion(
        { major: 1, minor: 1, patch: 1, channel: 'beta', iteration: 2 }
      ).versionRecord;
      const expectedVersionRecord = { major: 1, minor: 1, patch: 1, channel: 'beta', iteration: 2 };
      expect(versionRecord).toEqual(expectedVersionRecord);
    });

    it('versionTagName should return a string in the format vX.X.X-channel.X', () => {
      const versionTagName = new PrereleaseVersion({ major: 1, channel: 'beta' }).versionTagName;
      const expectedVersionTagName = 'v1.0.0-beta.0';
      expect(versionTagName).toBe(expectedVersionTagName);
    });

  });

  describe('bump(:ChangeLevel)', () => {
    it('if changeLevel is less than or equal to the changeLevel so far, should increment the iteration number', () => {
      const prereleaseVersion = new PrereleaseVersion(
        { major: 2, channel: 'next', changeLevel: ChangeLevel.major }
      );

      prereleaseVersion.bump(ChangeLevel.minor);

      const expectedLiteral = { major: 2, minor: 0, patch: 0, iteration: 1 };
      expect(prereleaseVersion.versionRecord).toMatchObject(expectedLiteral);
    });

    it('if changeLevel is greater than the max changeLevel so far, should bump the version number', () => {
      const prereleaseVersion = new PrereleaseVersion(
        { major: 1, minor: 1, channel: 'next', changeLevel: ChangeLevel.minor }
      );

      prereleaseVersion.bump(ChangeLevel.major);

      const expectedLiteral = { major: 2, minor: 0, patch: 0, iteration: 0 };
      expect(prereleaseVersion.versionRecord).toMatchObject(expectedLiteral);
    });

    it('if invoked without a parameter, should increment the iteration number', () => {
      const prereleaseVersion = new PrereleaseVersion({ channel: 'next' });

      prereleaseVersion.bump();

      const expectedLiteral = { major: 0, minor: 0, patch: 0, iteration: 1 };
      expect(prereleaseVersion.versionRecord).toMatchObject(expectedLiteral);
    });
  });

  describe('parseVersionComponents(:string)', () => {
    it("can parse '1.1.1-alpha.0' to an object", () => {
      const versionString = '1.1.1-alpha.0';

      const prereleaseVersionInput = PrereleaseVersion.parseVersionComponents(versionString);

      const expectedInput = { major: 1, minor: 1, patch: 1, channel: 'alpha', iteration: 0 };
      expect(prereleaseVersionInput).toEqual(expectedInput);
    });

    it("can parse 'v1.0.10-beta.1' to an object", () => {
      const versionString = 'v1.0.10-beta.1';

      const prereleaseVersionInput = PrereleaseVersion.parseVersionComponents(versionString);

      const expectedInput = { major: 1, minor: 0, patch: 10, channel: 'beta', iteration: 1 };
      expect(prereleaseVersionInput).toEqual(expectedInput);
    });

    it("cannot parse invalid strings: '1.1', 'v1.1.x', '1.1.0.beta', '1.1.0..1'", () => {
      const versionStrings = ['x1.1.1', '1.1', 'v1.1.x', '1.1.0.beta.1', '1.1.0-beta', '1.1.0..1'];

      versionStrings.forEach((versionString) => {
        expect.assertions(6);
        expect(() => {
          console.log(PrereleaseVersion.parseVersionComponents(versionString));
        }).toThrow();
      });
    });
  });
});
