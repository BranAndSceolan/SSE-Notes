# csurf
[![csurf](https://snyk.io/advisor/npm-package/csurf/badge.svg)](https://snyk.io/advisor/npm-package/csurf)

[npm](https://www.npmjs.com/package/csurf) <br>
[github](https://github.com/expressjs/csurf#readme) <br>
[snykAdvisor](https://snyk.io/advisor/npm-package/csurf) <br>
[bundlephobia](https://bundlephobia.com/package/csurf@1.11.0)

## Pros
* proposed for use by GitHub's CodeQL code check action
* no known security issues
* influential project (top 5% in direct usage)
* sustainable community
* relatively compact despite all dependencies

## Cons
* inactive
* has multiple indirect dependencies

## direct dependencies
* [cookie-signature](https://snyk.io/advisor/npm-package/cookie-signature) [![cookie-signature](https://snyk.io/advisor/npm-package/cookie-signature/badge.svg)](https://snyk.io/advisor/npm-package/cookie-signature)
* [cookie](https://snyk.io/advisor/npm-package/cookie) [![cookie](https://snyk.io/advisor/npm-package/cookie/badge.svg)](https://snyk.io/advisor/npm-package/cookie)
* [csrf](https://snyk.io/advisor/npm-package/csrf) [![csrf](https://snyk.io/advisor/npm-package/csrf/badge.svg)](https://snyk.io/advisor/npm-package/csrf)
  * rndm
  * tsscmp
  * uid-safe
    * random-bytes
* [http-errors](https://snyk.io/advisor/npm-package/http-errors) [![http-errors](https://snyk.io/advisor/npm-package/http-errors/badge.svg)](https://snyk.io/advisor/npm-package/http-errors)
  * depd
  * inherits
  * setprototypeof
  * statuses
  * toidentifier

## Why this package?
Csurf offers csrf-protection for apps. 
There were not too many packages for this around. <br>
So if we wanted to at least attempt using csrf-protection, we had to choose one, even if it has not the greatest scores.<br>
In the end, we used csurf, because it seems to still be used regularly and GitHub recommended it.<br>
It is not great, but is not likely to fail.