import { Integer } from '@skypilot/common-types';
import { ReleaseVersionInput } from './ReleaseVersion';


interface PrereleaseVersionInput extends ReleaseVersionInput {
  channel: string;
  iteration?: Integer;
}

export class PrereleaseVersion {
  channel = '';

  iteration: Integer = 0;

  major: Integer = 0;

  minor: Integer = 0;

  patch: Integer = 0;

  constructor(versionInput: PrereleaseVersionInput) {
    const { major = 0, minor = 0, patch = 0, channel, iteration = 0 } = versionInput;
    this.major = major;
    this.minor = minor;
    this.patch = patch;
    this.channel = channel;
    this.iteration = iteration;
    this.validate();
  }

  get versionString(): string {
    const { channel, iteration, major, minor = 'x', patch = 'x' } = this;
    return `${major}.${minor}.${patch}-${channel}.${iteration}`;
  }

  get versionRecord(): object {
    const { major, minor, patch, channel, iteration } = this;
    return { major, minor, patch, channel: channel, iteration };
  }

  get versionTagName(): string {
    return `v${this.versionString}`;
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
