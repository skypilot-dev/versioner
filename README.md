# @skypilot/versioner

[![build](https://img.shields.io/github/workflow/status/skypilotcc/versioner/Build%20&%20publish%20stable%20Node%20package?label=build)]()&nbsp;
[![npm](https://img.shields.io/npm/v/@skypilot/versioner?label=npm)](https://www.npmjs.com/package/@skypilot/versioner)&nbsp;
[![license: ISC](https://img.shields.io/badge/license-ISC-blue.svg)](https://opensource.org/licenses/ISC)  

A collection of functions and classes for managing version numbers.

## Installation

**Yarn:**
```
yarn add @skypilot/versioner
```


**NPM:**
```
npm install @skypilot/versioner
```

## Basic usage

### TypeScript

```
import { bumpVersion, ChangeLevel } from '@skypilot/versioner';

bumpVersion(version: string, changeLevel: ChangeLevel, channel?: string, previousVersions?: string[])
```

#### TypeScript examples

```
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
```
import { bumpVersion } from '@skypilot/versioner';

bumpVersion(version: string, changeLevel: 'major' | 'minor' | 'patch' | 'fix', channel?: string, previousVersions?: string[])

```

#### ES6 examples

```
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

#### Classes

- `PrereleaseVersion`
- `ReleaseVersion`


#### Constants & enums

- `ChangeLevel`

#### Functions

- `parseChangeLevel(changeLevel: string): ChangeLevel`

TODO: Document class and function API.
