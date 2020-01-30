# @skypilot/versioner

## Installation

**Yarn:**
```
yarn add @skypilot/versioner
```


**NPM:**
```
npm install @skypilot/versioner
```

## Usage

### Usage: TypeScript

```
import { bump, ChangeLevel } from '@skypilot/versioner';

bump(version: string, changeLevel: ChangeLevel, channel?: string, previousVersions?: string[])
```

#### TypeScript examples

```
bump('1.0.1', ChangeLevel.patch)
// '1.0.2'

bump('1.0.1', ChangeLevel.minor)
// '1.1.0'

bump('1.0.1', ChangeLevel.major)
// '2.0.0'

bump('1.0.1', ChangeLevel.minor, 'alpha')
// '1.1.0-alpha.0'

bump('1.0.1', ChangeLevel.minor, 'alpha', ['1.1.0-alpha.1', '1.1.0-alpha.2'])
// '1.1.0-alpha.3'
```

### Usage: ES6
```
import { bump } from '@skypilot/versioner';

bump(version: string, changeLevel: 'major' | 'minor' | 'patch' | 'fix', channel?: string, previousVersions?: string[])

```

#### ES6 examples

```
bump('1.0.1', 'patch')
// '1.0.2'

bump('1.0.1', 'minor')
// '1.1.0'

bump('1.0.1', 'major')
// '2.0.0'

bump('1.0.1', 'minor', 'alpha')
// '1.1.0-alpha.0'

bump('1.0.1', 'minor', 'alpha', ['1.1.0-alpha.1', '1.1.0-alpha.2'])
// '1.1.0-alpha.3'
```

