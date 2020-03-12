# @skypilot/versioner

[![npm stable](https://img.shields.io/npm/v/@skypilot/versioner?label=stable)](https://www.npmjs.com/package/@skypilot/versioner)
![stable build](https://img.shields.io/github/workflow/status/skypilotcc/versioner/Stable%20release?label=stable%20build)
[![npm next](https://img.shields.io/npm/v/@skypilot/versioner/next?label=next)](https://www.npmjs.com/package/@skypilot/versioner)
![next build](https://img.shields.io/github/workflow/status/skypilotcc/versioner/Prerelease?branch=next&label=next%20build)
![Codacy grade](https://img.shields.io/codacy/grade/e451ed84e1064a72ba1b560ed6d73df7)
![downloads](https://img.shields.io/npm/dm/@skypilot/versioner)
[![license: ISC](https://img.shields.io/badge/license-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A collection of functions and classes for managing version numbers.

## Installation

```console
$ yarn add @skypilot/versioner
# or
$ npm install @skypilot/versioner
```

## Basic usage

### TypeScript

```typescript
import { bumpVersion, ChangeLevel } from '@skypilot/versioner';

bumpVersion(
  version: string,
  changeLevel: ChangeLevel,
  channel?: string,
  previousVersions?: string[]
)
```

#### TypeScript examples

```typescript
bumpVersion('1.0.1', ChangeLevel.patch)
// '1.0.2'

bumpVersion('1.0.1', ChangeLevel.minor)
// '1.1.0'

bumpVersion('1.0.1', ChangeLevel.major)
// '2.0.0'

bumpVersion('1.0.1', ChangeLevel.minor, 'alpha')
// '1.1.0-alpha.0'

bumpVersion('1.0.1', ChangeLevel.minor, 'alpha', ['1.1.0-alpha.1', '1.1.0-alpha.2'])
// '1.1.0-alpha.3'
```

### ES6

```javascript
import { bumpVersion } from '@skypilot/versioner';

bumpVersion(
  version, // string
  changeLevel, // 'major' | 'minor' | 'patch' | 'fix'
  channel, // [optional] string
  previousVersions // [optional] string[]
)
```

#### ES6 examples

```javascript
bumpVersion('1.0.1', 'patch')
// '1.0.2'

bumpVersion('1.0.1', 'minor')
// '1.1.0'

bumpVersion('1.0.1', 'major')
// '2.0.0'

bumpVersion('1.0.1', 'minor', 'alpha')
// '1.1.0-alpha.0'

bumpVersion('1.0.1', 'minor', 'alpha', ['1.1.0-alpha.1', '1.1.0-alpha.2'])
// '1.1.0-alpha.3'
```

## Advanced usage

The library exposes the following exports:

### Classes

- `PrereleaseVersion`
- `ReleaseVersion`

### Constants & enums

- `ChangeLevel`

### Functions

- `parseChangeLevel(changeLevel: string): ChangeLevel`

TODO: Document class and function API.
