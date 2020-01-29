import { PrereleaseVersion } from '../PrereleaseVersion';

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
});
