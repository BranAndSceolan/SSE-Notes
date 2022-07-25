# chai-http

## License
Chai-http is published under MIT-License, which is unproblematic for us, because it allows all kinds of uses.

## Pros
* no known security issues
* popular (over 300 000 weekly downloads)
* sustainable community

## Cons
* inactive
* only 13.2% of chai-http's size are its own code. The rest is [dependencies}(https://bundlephobia.com/package/chai-http@4.3.0)
* At least one of the maintainers still [proclaims their intention to keep chai-http active](https://github.com/chaijs/chai-http/issues/299), but also admit they have only little time for doing that.


## Why this package?
Chai-http helps writing http-tests with chai.
Therefore, chai-http helps us to test our api.
Especially useful is the "agent" chai offers, which saves cookies and therefore allows testing without turning off the session middleware.
It is not optimal that chai-http is inactive, but acceptable because there have been no vulnerabilities. 
It stands to hope, that errors would be found, and that one of the 40 contributors involved would try to fix them.
Because chai-http is a dev dependency and the [test](../../backend/tests)-directory is excluded from the deployment backend build, the security requirements for this package are less harsh, so the overall state of the package is still acceptable.