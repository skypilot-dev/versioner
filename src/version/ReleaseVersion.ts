import { Integer } from '@skypilot/common-types';
import { ChangeLevel } from './constants';

export interface ReleaseVersionInput {
  major?: Integer;
  minor?: Integer;
  patch?: Integer;
}

export class ReleaseVersion {
  major: Integer;

  minor: Integer;

  patch: Integer;

  constructor(versionInput: ReleaseVersionInput = {}) {
    const {
      major = 0,
      minor = 0,
      patch = 0,
    } = versionInput;
    this.major = major;
    this.minor = minor;
    this.patch = patch;
    this.validate();
  }

  get versionRecord(): object {
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
