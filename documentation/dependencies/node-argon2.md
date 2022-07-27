# node-argon2
[![argon2](https://snyk.io/advisor/npm-package/argon2/badge.svg)](https://snyk.io/advisor/npm-package/argon2)

## License
node-argon2 is published under MIT-License which is unproblematic, because it allows all kinds of uses.

# Links
[npm](https://www.npmjs.com/package/argon2)<br>
[github](https://github.com/ranisalt/node-argon2/issues)<br>
[snykAdvisor](https://snyk.io/advisor/npm-package/argon2)<br>
[bundlephobia](https://bundlephobia.com/package/argon2@0.28.7)

## Pros
* supports argon2id
* argon2id is recommended by OWASP for password hashing
* argon2 is the winner of the [Password Hashing Competition (PHC)](https://www.password-hashing.net/) and recommended by the jury
* high resource cost which helps protect against rainbow table attacks by making them take too much time and memory
* version history shows continual updates
* very small size of 183kB unpacked
* growing number of weekly downloads (currently nearly 95 000)
* good scores on [snykAdvisor](https://snyk.io/advisor/npm-package/argon2)
* no known security issues
* automatically safes the salt with the hash

## Cons
* GitHub Repo has no security policy or advisories set yet
* coverage currently "only" at 97% percent
* has 1 inaktive dependency ([@phc/format](https://snyk.io/advisor/npm-package/@phc/format))

## Dependencies
node-argon2 has 3 direct and no indirect dependencies. All of them seem well tested and trustworthy. 
Sadly one of them does seem inactive.
* [@mapbox/node-pre-gyp](https://snyk.io/advisor/npm-package/@mapbox/node-pre-gyp)[![@mapbox/node-pre-gyp](https://snyk.io/advisor/npm-package/@mapbox/node-pre-gyp/badge.svg)](https://snyk.io/advisor/npm-package/@mapbox/node-pre-gyp)
  * detect-libc
  * https-proxy-agent
  * make-dir
  * node-fetch
  * nopt
  * npmlog
  * rimraf
  * semver
  * tar
* [@phc/format](https://snyk.io/advisor/npm-package/@phc/format)[![@phc/format](https://snyk.io/advisor/npm-package/@phc/format/badge.svg)](https://snyk.io/advisor/npm-package/@phc/format)
* [node-adon-api](https://snyk.io/advisor/npm-package/node-addon-api)[![node-addon-api](https://snyk.io/advisor/npm-package/node-addon-api/badge.svg)](https://snyk.io/advisor/npm-package/node-addon-api)

## Why this package?

There is a golden rule in security: <br>
*If you are not an expert,*  ***do not*** *try to implement hashing, encrypting, or decrypting functions yourself.* <br>
*Will fail, and your application will be insecure because of this. There are already implementations out there, which were done by experts and are secure. use them.*<br>

After deciding on using argon2id is a state-of-the-art password hashing algorithm, we therefore knew we had to find a trustworthy package implementing agron2id.<br>
node-argon2 by ranisalt is by far the most used npm package for password-hashing using argon2id.<br>
It is regularly updated, has multiple contributors, and offers bindings to the [reference c implementation of argon2id that won the password hashing competition](https://github.com/P-H-C/phc-winner-argon2).<br>
