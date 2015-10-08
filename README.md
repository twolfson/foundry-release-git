# foundry-release-git [![Build status](https://travis-ci.org/twolfson/foundry-release-git.png?branch=master)](https://travis-ci.org/twolfson/foundry-release-git)

[git][] release library for [foundry][]

This command creates reference commits and `git tag's` for [foundry][], a modular release management library.

[git]: http://git-scm.com/
[foundry]: https://github.com/twolfson/foundry

## Documentation
This library was build to match the [foundry release specification][spec] and is written on top of [foundry-release-base][]. Documentation can be found at:

https://github.com/twolfson/foundry-release-spec

https://github.com/twolfson/foundry-release-base

[spec]: https://github.com/twolfson/foundry-release-spec
[foundry-release-base]: https://github.com/twolfson/foundry-release-base

### Actions
- On `commit`, we will:
    1. Save staged changes via `git commit` with `foundry release's` message (e.g. `Release 1.0.0`)
    2. Create a `git tag` with the version (e.g. `1.0.0`)
- On `publish`, we will push the branch and its tags (i.e. `git push`, `git push --tags`)

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via [grunt](https://github.com/gruntjs/grunt) and test via `npm test`.

## Donating
Support this project and [others by twolfson][gittip] via [gittip][].

[![Support via Gittip][gittip-badge]][gittip]

[gittip-badge]: https://rawgithub.com/twolfson/gittip-badge/master/dist/gittip.png
[gittip]: https://www.gittip.com/twolfson/

## Unlicense
As of Feb 03 2014, Todd Wolfson has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE
