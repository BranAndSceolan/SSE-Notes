# Chai

homepage: https://www.chaijs.com/
github: https://github.com/chaijs/chai
npm: https://www.npmjs.com/package/chai

## License
Chai is published under MIT-License, which is unproblematic for us, because it allows all kinds of uses. 

## Pros
* no known security issues on [SynkAdvisor](https://snyk.io/advisor/npm-package/chai)
* healthy maintenance
* around 4.7 million weekly downloads (key ecosystem project)
* active community

## Cons
* 7 direct dependencies, 2 indirect dependencies (which are also direct dependencies)

## Dependencies
* [assertion-error](https://snyk.io/advisor/npm-package/assertion-error) secure, but only has a small community
* [check-error](https://snyk.io/advisor/npm-package/check-error) secure, many downloads, but inactive
* [deep-eql](https://snyk.io/advisor/npm-package/deep-eql) secure, many downloads, healthy maintenance, sustainable community
    * [type-detect](https://snyk.io/advisor/npm-package/type-detect) secure, many downloads, inactive, sustainable community
* [get-func-name](https://snyk.io/advisor/npm-package/get-func-name) secure, many downloads, inactive, community limited
* [loupe](https://snyk.io/advisor/npm-package/loupe) secure, many downloads, healthy maintenance, community limited
  * [get-func-name](https://snyk.io/advisor/npm-package/get-func-name) secure, many downloads, inactive, community limited
* [pathval](https://snyk.io/advisor/npm-package/pathval) secure, many downloads, sustainable maintenance, community limited
* [type-detect](https://snyk.io/advisor/npm-package/type-detect) secure, many downloads, inactive, sustainable community

While not all dependencies are active, they have no known vulnerabilities and are used commonly enough to expect that vulnerabilities should be found and reported.
So, while the state of the package in terms of dependencies is not perfect, it is well enough to use.

## Size
size and composition are acceptable ([bundlephobia](https://bundlephobia.com/package/chai@4.3.6))

## Why this package?
Chai is an assertion libary that is recommended for use with mocha.
It helps us write easily readable tests.
Because chai is a dev dependency and the [test](../../../backend/tests)-directory is excluded from the deployment backend build, the security requirements for this package are less harsh.