import { Integer, SortComparison } from '@skypilot/common-types';
import { SORT_EQUAL, SORT_HIGHER, SORT_LOWER } from '../common/array/constants';
import { ChangeLevel } from './constants';
import { ReleaseVersion, ReleaseVersionInput, ReleaseVersionRecord } from './ReleaseVersion';

interface PrereleaseVersionChange {
  changeLevel?: ChangeLevel;
  channel: string;
}

interface PrereleaseVersionInput extends ReleaseVersionInput {
  changeLevel?: ChangeLevel;
  channel: string;
  iteration?: Integer;
}

export interface PrereleaseVersionRecord extends ReleaseVersionRecord {
  channel: string;
  iteration: Integer;
}

export class PrereleaseVersion {
  static parseVersionComponents(versionString: string): PrereleaseVersionInput {
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

  static versionPattern(channelPattern = '[A-Za-z]+'): RegExp {
    return new RegExp(`^v?([0-9]+)\\.([0-9]+)\\.([0-9]+)-(${channelPattern})\\.([0-9]+)$`);
  }

  changeLevel = ChangeLevel.none;

  channel = '';

  iteration: Integer = 0;

  major: Integer = 0;

  minor: Integer = 0;

  patch: Integer = 0;

  constructor(versionInput: PrereleaseVersionInput)

  constructor(versionString: string);

  constructor(prereleaseVersion: PrereleaseVersion, change: PrereleaseVersionChange)

  constructor(releaseVersion: ReleaseVersion, change: PrereleaseVersionChange)

  constructor(versionInput: ReleaseVersion | PrereleaseVersion | PrereleaseVersionInput | string, change?: PrereleaseVersionChange) {
    const objectInput = typeof versionInput === 'object'
      ? versionInput
      : PrereleaseVersion.parseVersionComponents(versionInput);

    if (objectInput instanceof ReleaseVersion) {
      if (change === undefined) {
        throw new Error('Cannot instantiate from ReleaseVersion without PrereleaseVersionChange')
      }
      const { channel, changeLevel = ChangeLevel.none } = change;
      const releaseVersion = new ReleaseVersion(objectInput);
      releaseVersion.bump(changeLevel);
      return new PrereleaseVersion({ ...releaseVersion, channel });
    }

    if (objectInput instanceof PrereleaseVersion) {
      if (change === undefined) {
        throw new Error('Cannot instantiate from PrereleaseVersion without PrereleaseVersionChange')
      }
      const { channel, changeLevel = ChangeLevel.none } = change;
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
