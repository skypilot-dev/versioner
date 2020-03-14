## [1.3.3](https://github.com/skypilotcc/versioner/compare/v1.3.3-next.1...v1.3.3) (2020-03-14)



## [1.3.3-next.1](https://github.com/skypilotcc/versioner/compare/v1.3.3-next.0...v1.3.3-next.1) (2020-03-14)



## [1.3.3-next.0](https://github.com/skypilotcc/versioner/compare/v1.3.2...v1.3.3-next.0) (2020-03-14)



## [1.3.2](https://github.com/skypilotcc/versioner/compare/v1.3.2-next.0...v1.3.2) (2020-03-12)



## [1.3.2-next.0](https://github.com/skypilotcc/versioner/compare/v1.3.1...v1.3.2-next.0) (2020-03-12)



## [1.3.1](https://github.com/skypilotcc/versioner/compare/v1.3.1-next.0...v1.3.1) (2020-02-14)



## [1.3.1-next.0](https://github.com/skypilotcc/versioner/compare/v1.3.0...v1.3.1-next.0) (2020-02-14)



# [1.3.0](https://github.com/skypilotcc/versioner/compare/v1.2.1...v1.3.0) (2020-02-10)


### Features

* Can get the string representation of a change level ([8f40b8d](https://github.com/skypilotcc/versioner/commit/8f40b8d7b2dae1c9c8635f69f9e166e3111091c6))



## [1.2.1](https://github.com/skypilotcc/versioner/compare/v1.2.0...v1.2.1) (2020-02-10)



# [1.2.0](https://github.com/skypilotcc/versioner/compare/v1.1.4...v1.2.0) (2020-02-10)


### Features

* Add a prerelease version-pattern filter function ([3445e0d](https://github.com/skypilotcc/versioner/commit/3445e0d68dbe77197e12e3e14456e16b452f6e9a))



## [1.1.4](https://github.com/skypilotcc/versioner/compare/v1.1.3...v1.1.4) (2020-02-06)



## [1.1.3](https://github.com/skypilotcc/versioner/compare/v1.1.2...v1.1.3) (2020-02-06)



## [1.1.2](https://github.com/skypilotcc/versioner/compare/v1.0.1...v1.1.2) (2020-02-06)



## [1.0.1](https://github.com/skypilotcc/versioner/compare/v1.0.0...v1.0.1) (2020-02-06)


### Features

* ReleaseVersion.sorter can sort version strings as well as objects ([3555e66](https://github.com/skypilotcc/versioner/commit/3555e661605f146bc903f13fe1601d4310ab3d7b))



# [1.0.0](https://github.com/skypilotcc/versioner/compare/a8467b2ef2a7320cb7b30100621b09dfbe31151f...v1.0.0) (2020-02-05)


### Bug Fixes

* `ReleaseVersion.highestOf()` should throw if given empty array ([ce60f75](https://github.com/skypilotcc/versioner/commit/ce60f75082244388725007231e19848452577750))
* Prerelease core version must always be higher than release version ([bfb673e](https://github.com/skypilotcc/versioner/commit/bfb673eeb8e4baadbe5dc3daf358197f5a89d5b0))


### Features

* Accept variety of inputs to prerelease filter ([1c380b2](https://github.com/skypilotcc/versioner/commit/1c380b2de90bb5e25fe8ace32119866f85d09148))
* Automatically ignore invalid version strings ([f149561](https://github.com/skypilotcc/versioner/commit/f149561a7a9001d17c26c3211b75ae70953a8899))
* Can accept a string value for change level ([5666699](https://github.com/skypilotcc/versioner/commit/5666699910ec4777c9b15f9a446a2e41a6937d67))
* Can bump prerelease version number ([fd1198b](https://github.com/skypilotcc/versioner/commit/fd1198bb9d4d116a3f63dd9fad33aca03a54cbce))
* Can bump release version number ([b5e2ea4](https://github.com/skypilotcc/versioner/commit/b5e2ea4744a2c977c4e778e94775cab5102daee1))
* Can compute the next iteration of a prerelease version ([bb65844](https://github.com/skypilotcc/versioner/commit/bb65844a82b279b2b4b9dbbafc3dad3ec1f31172))
* Can create a prerelease version from a string ([6a82949](https://github.com/skypilotcc/versioner/commit/6a82949cc27cd2494f989a11a3be4a3e6197d256))
* Can create a release version from a string ([6dd8aca](https://github.com/skypilotcc/versioner/commit/6dd8acae99d91704e39899a0ef26f277f55ed5bd))
* Can create prerelease version numbers from various inputs ([22e49db](https://github.com/skypilotcc/versioner/commit/22e49db202facacc1d3312f52accc0334af6b480))
* Can create release version numbers from various inputs ([a8467b2](https://github.com/skypilotcc/versioner/commit/a8467b2ef2a7320cb7b30100621b09dfbe31151f))
* Can filter out invalid version strings ([a333594](https://github.com/skypilotcc/versioner/commit/a333594a52f5415ff7b9b1039681a7b8cff56f61))
* Can filter prerelease versions on change level ([5b6e32e](https://github.com/skypilotcc/versioner/commit/5b6e32ed311713fb762d92de4f8ba377e496c353))
* Can filter prerelease versions on core version ([0b9f790](https://github.com/skypilotcc/versioner/commit/0b9f790e5c4aef99a0d93e2001546b4c9e35f37f))
* Can generate the next version number from inputs ([a5db60a](https://github.com/skypilotcc/versioner/commit/a5db60ad51a80014dbbc74442db1140a392d6bcb))
* Can instantiate prerelease version from other versions ([5ca6358](https://github.com/skypilotcc/versioner/commit/5ca6358ed1a470cf6c865765f43a4a8542819b60))
* Can parse the components of a version string ([0f547fd](https://github.com/skypilotcc/versioner/commit/0f547fdfaa0f0b5060574d92d1df52cddcb70a30))
* Can return the highest of an array of prerelease version inputs ([2661892](https://github.com/skypilotcc/versioner/commit/2661892a4c394bf572d594efef604f3b94f5e2b9))
* Can return the highest of an array of version inputs ([00687f7](https://github.com/skypilotcc/versioner/commit/00687f7f7e9ddcab91b8bab842d0fb099911f710))
* Can sort prerelease versions ([a0feb07](https://github.com/skypilotcc/versioner/commit/a0feb07e7a005dd2372734029c4029241b21e02d))
* Can sort release versions ([7ea4d38](https://github.com/skypilotcc/versioner/commit/7ea4d3823b43cdf6520ac0532fdd0bd354ef10b3))
* Enable use of release & prerelease version classes ([333ef60](https://github.com/skypilotcc/versioner/commit/333ef60d1a28b18b1825b49e61d2d254594fbe97))
* Export ChangeLevel enum & change level parser ([fb0dba8](https://github.com/skypilotcc/versioner/commit/fb0dba8996446d1d67bb2c2f9d13e9130bd111fb))



