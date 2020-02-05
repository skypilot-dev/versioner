import { Integer, SortComparison } from '@skypilot/common-types';
import { SORT_EQUAL, SORT_HIGHER, SORT_LOWER } from './common/array/constants';
import { ChangeLevel } from './constants';
import { ReleaseVersion, ReleaseVersionObjectInput, ReleaseVersionRecord } from './ReleaseVersion';

type PrereleaseVersionFilter = (versionInput: PrereleaseVersionInput) => boolean;
type PrereleaseVersionInput = PrereleaseVersion | PrereleaseVersionObjectInput | string;
type PrereleaseVersionSorter = (a: VersionRecord, b: VersionRecord) => SortComparison;
type VersionRecord = { prereleaseVersion: PrereleaseVersion; versionInput: PrereleaseVersionInput };

interface PrereleaseVersionChange {
  changeLevel?: ChangeLevel;
  channel: string;
}

interface PrereleaseVersionObjectInput extends ReleaseVersionObjectInput {
  changeLevel?: ChangeLevel;
  channel: string;
  iteration?: Integer;
}

export interface PrereleaseVersionRecord extends ReleaseVersionRecord {
  channel: string;
  iteration: Integer;
}

/* eslint-disable @typescript-eslint/no-use-before-define */
function createVersionRecords(versionInputs: Array<PrereleaseVersionInput>): VersionRecord[] {
  return versionInputs
    .map((versionInput) => {
      if (versionInput instanceof PrereleaseVersion) {
        return {
          prereleaseVersion: versionInput,
          versionInput,
        };
      }
      return {
        prereleaseVersion: new PrereleaseVersion(versionInput),
        versionInput,
      }
    });
}

const sorterOnPrereleaseVersion: PrereleaseVersionSorter = (a, b) => {
  const releaseVersionA = a.prereleaseVersion;
  const releaseVersionB = b.prereleaseVersion;
  return ReleaseVersion.sorter(releaseVersionA, releaseVersionB);
};

export class PrereleaseVersion {
  /* Given a version & change level, return a function matching versions at that change level.
  * For example, `{ major: 1, minor: 1, patch: 1 }, ChangeLevel.minor, 'beta'` returns a function
  * that matches any `1.1.x-beta`. */
  static changeLevelFilterFn(targetVersion: ReleaseVersionObjectInput, changeLevel: ChangeLevel, channel?: string): PrereleaseVersionFilter {
    return ((prereleaseVersionInput: PrereleaseVersionInput) => {
      const prereleaseVersion = new PrereleaseVersion(prereleaseVersionInput);
      if (channel && (prereleaseVersion.channel != channel)) {
        return false;
      }
      const { major, minor, patch } = prereleaseVersion;
      if (major !== targetVersion.major) {
        return false;
      }
      if (changeLevel < ChangeLevel.major) {
        if (minor !== targetVersion.minor) {
          return false;
        }
        if (changeLevel < ChangeLevel.minor) {
          if (patch !== targetVersion.patch) {
            return false;
          }
        }
      }
      return true;
    });
  }

  static computeNextIteration(
    coreReleaseVersion: ReleaseVersion,
    channel: string,
    versionStrings: string[] = [],
  ): Integer {
    const versionPattern = PrereleaseVersion.versionPattern(channel);
    const versionFilter = PrereleaseVersion.versionFilterFn(coreReleaseVersion, channel);
    const prereleaseVersions = versionStrings
      .filter((tagName) => versionPattern.test(tagName))
      .map((versionString) => new PrereleaseVersion(versionString))
      .filter(versionFilter)
      .sort(PrereleaseVersion.sorter)
      .reverse();

    if (prereleaseVersions.length > 0) {
      return prereleaseVersions[0].iteration + 1;
    }
    return 0;
  }

  /* Given a series of prerelease version inputs, return the one that has the highest version
   * number. */
  static highestOf<T extends PrereleaseVersionInput>(versionInputs: T[]): T {
    if (versionInputs.length === 0) {
      throw new Error('PrereleaseVersion.higherOf() requires an array of at least one item.')
    }
    if (versionInputs.length === 1) {
      return versionInputs[0];
    }
    const versionRecords = createVersionRecords(versionInputs)
      .sort(sorterOnPrereleaseVersion)
      .reverse();
    return versionRecords[0].versionInput as T;
  }

  static parseVersionComponents(versionString: string): PrereleaseVersionObjectInput {
    const PRERELEASE_VERSION_ELEMENT_COUNT = 5;

    const pattern = PrereleaseVersion.versionPattern();
    const components = (versionString.match(pattern) || []).slice(1);
    if (!components || components.length < PRERELEASE_VERSION_ELEMENT_COUNT) {
      throw new Error(`Invalid prerelease version string: ${versionString}`);
    }

    /* Parse version core components. */
    const coreComponents = components
      .slice(0, 3)
      .map((element) => parseInt(element, 10));
    const [major, minor, patch] = coreComponents;

    /* Parse additional prerelease components. */
    const channel: string = components[3];
    const iteration: Integer = parseInt(components[4]);

    return { major, minor, patch, channel, iteration };
  }

  /* A sort function usable with any objects that have all elements of a prelease version. */
  static sorter(a: PrereleaseVersionRecord, b: PrereleaseVersionRecord): SortComparison {
    const sortableProps: Array<keyof PrereleaseVersionRecord> = [
      'major', 'minor', 'patch', 'channel', 'iteration',
    ];
    for (let i = 0; i < sortableProps.length; i += 1) {
      const prop = sortableProps[i];
      if (a[prop] > b[prop]) {
        return SORT_LOWER;
      }
      if (a[prop] < b[prop]) {
        return SORT_HIGHER;
      }
    }
    return SORT_EQUAL;
  }

  /* Given a core version and, optionally, a channel, return a filter that matches all prerelease
   * versions having the same core version and channel (or any channel, if none is specified). */
  static versionFilterFn(
    coreVersionInput: ReleaseVersionObjectInput,
    channel?: string
  ): PrereleaseVersionFilter {
    return ((prereleaseVersionInput: PrereleaseVersionInput) => {
      const prereleaseVersion = new PrereleaseVersion(prereleaseVersionInput);
      if (channel && (prereleaseVersion.channel !== channel)) {
        return false;
      }
      const { major, minor, patch } = prereleaseVersion;
      return major === coreVersionInput.major
        && minor === coreVersionInput.minor
        && patch === coreVersionInput.patch;
    });
  }

  static versionPattern(channelPattern = '[A-Za-z]+'): RegExp {
    return new RegExp(`^v?([0-9]+)\\.([0-9]+)\\.([0-9]+)-(${channelPattern})\\.([0-9]+)$`);
  }

  changeLevel = ChangeLevel.none;

  channel = '';

  iteration: Integer = 0;

  major: Integer = 0;

  minor: Integer = 0;

  patch: Integer = 0;

  constructor(prereleaseVersion: PrereleaseVersion, change: PrereleaseVersionChange);

  constructor(releaseVersion: ReleaseVersion, change: PrereleaseVersionChange);

  constructor(versionInput: PrereleaseVersion | PrereleaseVersionObjectInput | string);

  constructor(versionInput: ReleaseVersion | PrereleaseVersion | PrereleaseVersionObjectInput | string, change?: PrereleaseVersionChange) {
    const objectInput = typeof versionInput === 'object'
      ? versionInput
      : PrereleaseVersion.parseVersionComponents(versionInput);

    if (objectInput instanceof ReleaseVersion) {
      if (change === undefined) {
        throw new Error('Cannot instantiate from ReleaseVersion without PrereleaseVersionChange')
      }
      /* When instantiated from a release version, a prerelease must have a core version that is
       * greater than the release's version; therefore, if change level is `ChangeLevel.none`,
       * increase it to `ChangeLevel.patch`. */
      const { channel, changeLevel = ChangeLevel.patch } = change;
      const releaseVersion = new ReleaseVersion(objectInput);

      /* Do not allow a change level less than `patch`. */
      releaseVersion.bump(Math.max(changeLevel, ChangeLevel.patch));

      return new PrereleaseVersion({ ...releaseVersion, channel });
    }

    if (objectInput instanceof PrereleaseVersion) {
      const { channel, changeLevel = ChangeLevel.none } = (change || objectInput);
      const prereleaseVersion = new PrereleaseVersion({ ...objectInput });
      return prereleaseVersion.spawn(channel, changeLevel);
    }
    const {
      major = 0,
      minor = 0,
      patch = 0,
      changeLevel = ChangeLevel.none,
      channel,
      iteration = 0,
    } = objectInput;
    this.major = major;
    this.minor = minor;
    this.patch = patch;
    this.changeLevel = changeLevel;
    this.channel = channel;
    this.iteration = iteration;
    this.validate();
  }

  get versionString(): string {
    const { channel, iteration, major, minor = 'x', patch = 'x' } = this;
    return `${major}.${minor}.${patch}-${channel}.${iteration}`;
  }

  get versionRecord(): PrereleaseVersionRecord {
    const { major, minor, patch, channel, iteration } = this;
    return { major, minor, patch, channel, iteration };
  }

  get versionTagName(): string {
    return `v${this.versionString}`;
  }

  bump(changeLevel = ChangeLevel.none): PrereleaseVersion {
    if (changeLevel <= this.changeLevel) {
      this.iteration += 1;
      return this;
    }
    this.changeLevel = changeLevel;
    switch (changeLevel) {
      case ChangeLevel.major:
        this.major += 1;
        this.minor = 0;
        this.patch = 0;
        this.iteration = 0;
        break;
      case ChangeLevel.minor:
        this.minor += 1;
        this.patch = 0;
        this.iteration = 0;
        break;
      case ChangeLevel.patch:
        this.patch += 1;
        this.iteration = 0;
        break;
      default:
        this.iteration += 1;
    }
    return this;
  }

  /* Given a channel & change level, return a new PrereleaseVersion object with the new
   * channel and a new version number bumped according to the change level. */
  private spawn(channel: string, changeLevel = ChangeLevel.none): PrereleaseVersion {
    const { major, minor, patch } = this;
    const releaseVersion = new ReleaseVersion({ major, minor, patch });
    releaseVersion.bump(changeLevel);
    return new PrereleaseVersion({ ...releaseVersion, channel });
  }

  private validate(): void {
    [this.major, this.minor, this.patch, this.iteration].forEach((element) => {
      if  (element < 0) {
        throw new Error('Negative values are not permitted in version numbers.');
      }
    });
    if  (!this.channel) {
      throw new Error('The channel cannot be empty.');
    }
  }
}
