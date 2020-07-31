import type { Integer, SortComparison } from '@skypilot/common-types';
import { SORT_EQUAL, SORT_HIGHER, SORT_LOWER } from './common/array/constants';
import { ChangeLevel } from './constants';

type ReleaseVersionInput = ReleaseVersion | ReleaseVersionObjectInput | string;
type VersionRecord = { releaseVersion: ReleaseVersion; versionInput: ReleaseVersionInput };
type ReleaseVersionSorter = (a: VersionRecord, b: VersionRecord) => SortComparison;
export type ReleaseVersionRecord = Required<ReleaseVersionObjectInput>;

export interface ReleaseVersionObjectInput {
  major?: Integer;
  minor?: Integer;
  patch?: Integer;
}

/* eslint-disable @typescript-eslint/no-use-before-define */
function createVersionRecords(versionInputs: Array<ReleaseVersionInput>): VersionRecord[] {
  return versionInputs
    .map((versionInput) => {
      if (versionInput instanceof  ReleaseVersion) {
        return {
          releaseVersion: versionInput,
          versionInput,
        };
      }
      const releaseVersion = new ReleaseVersion(versionInput);
      return {
        releaseVersion,
        versionInput,
      };
    });
}

const sorterOnReleaseVersion: ReleaseVersionSorter = (a, b) => {
  const releaseVersionA = a.releaseVersion;
  const releaseVersionB = b.releaseVersion;
  return ReleaseVersion.sorter(releaseVersionA, releaseVersionB);
};
/* eslint-enable @typescript-eslint/no-use-before-define */

export class ReleaseVersion {
  /* Given a series of version inputs, return the one that has the highest version number. */
  static highestOf<T extends ReleaseVersionInput>(versionInputs: T[]): T {
    if (versionInputs.length === 0) {
      throw new Error('ReleaseVersion.higherOf() requires an array of at least one item.')
    }
    if (versionInputs.length === 1) {
      return versionInputs[0];
    }
    const versionRecords = createVersionRecords(versionInputs)
      .sort(sorterOnReleaseVersion)
      .reverse();
    return versionRecords[0].versionInput as T;
  }

  static parseVersionComponents(versionString: string): ReleaseVersionObjectInput {
    const pattern = ReleaseVersion.versionPattern();
    const versionElements = versionString.match(pattern);
    if (!versionElements || versionElements.length < 4) {
      throw new Error(`Invalid version string: ${versionString}`);
    }
    const [major, minor, patch] = versionElements
      .slice(1)
      .map((element) => parseInt(element, 10));
    return { major, minor, patch };
  }

  /* A sort function usable with any objects that have `major`, `minor` & `patch` properties
   * or any version string parsable as a release version. */
  static sorter(
    a: ReleaseVersionRecord | string,
    b: ReleaseVersionRecord | string
  ): SortComparison {
    const sortableProps: Array<keyof ReleaseVersionRecord> = ['major', 'minor', 'patch'];
    const releaseA = typeof a === 'string'
      ? new ReleaseVersion(a)
      : a;
    const releaseB = typeof b === 'string'
      ? new ReleaseVersion(b)
      : b;
    for (let i = 0; i < sortableProps.length; i += 1) {
      const prop = sortableProps[i];
      if (releaseA[prop] > releaseB[prop]) {
        return SORT_LOWER;
      }
      if (releaseA[prop] < releaseB[prop]) {
        return SORT_HIGHER;
      }
    }
    return SORT_EQUAL;
  }

  /* Deprecated. */
  static versionFilter(versionString: string): boolean {
    return ReleaseVersion.versionPattern().test(versionString);
  }

  static versionPattern(): RegExp {
    return new RegExp(/^v?([0-9]+)\.([0-9]+)\.([0-9]+)$/);
  }

  static versionPatternFilter(versionString: string): boolean {
    return ReleaseVersion.versionPattern().test(versionString);
  }

  major: Integer;

  minor: Integer;

  patch: Integer;

  constructor(versionInput: ReleaseVersionObjectInput | string = {}) {
    const objectInput = typeof versionInput === 'object'
      ? versionInput
      : ReleaseVersion.parseVersionComponents(versionInput);
    const {
      major = 0,
      minor = 0,
      patch = 0,
    } = objectInput;
    this.major = major;
    this.minor = minor;
    this.patch = patch;
    this.validate();
  }

  get versionRecord(): ReleaseVersionRecord {
    const { major, minor, patch } = this;
    return { major, minor, patch };
  }

  get versionString(): string {
    const { major, minor, patch } = this;
    return `${major}.${minor}.${patch}`;
  }

  get versionTagName(): string {
    return `v${this.versionString}`;
  }

  /* Given a change level, bump this object's version number accordingly and return the object. */
  bump(changeLevel: ChangeLevel): ReleaseVersion {
    switch (changeLevel) {
      case ChangeLevel.major:
        this.major += 1;
        this.minor = 0;
        this.patch = 0;
        break;
      case ChangeLevel.minor:
        this.minor += 1;
        this.patch = 0;
        break;
      case ChangeLevel.patch:
        this.patch += 1;
        break;
      default:
    }
    return this;
  }

  private validate(): void {
    [this.major, this.minor, this.patch].forEach((element) => {
      if  (element < 0) {
        throw new Error('Negative values are not permitted in version numbers.');
      }
    });
  }
}
