# node-argon2

## License
node-argon2 is published under MIT-License which is unproblematic, because it allows all kinds of uses.

github: https://github.com/ranisalt/node-argon2/issues

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