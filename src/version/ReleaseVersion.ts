import { Integer } from '@skypilot/common-types';

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

  private validate(): void {
    [this.major, this.minor, this.patch].forEach((element) => {
      if  (element < 0) {
        throw new Error('Negative values are not permitted in version numbers.');
      }
    });
  }
}
