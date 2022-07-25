# zxcvbn

[![zxcvbn](https://snyk.io/advisor/npm-package/zxcvbn/badge.svg)](https://snyk.io/advisor/npm-package/zxcvbn)

github: https://github.com/dropbox/zxcvbn#usage
npm: https://www.npmjs.com/package/zxcvbn

## License
zxcvbn is published under MIT-License, which is unproblematic for us, because it allows all kinds of uses. 

## Pros
* Gives not only a score but also suggestions and warnings
* A high number of weekly downloads on npm (more than 350 000)
* Uses pattern matching (sequences, keyboard patterns, dates, l33t speak) and lists of common passwords and words
* Recommended in a [study](http://users.encs.concordia.ca/~mmannan/publications/password-meters-tissec.pdf) by the [Concordia University (Canada)](https://www.concordia.ca/cunews/main/stories/2015/03/25/does-your-password-pass-muster.html)
* No third hand dependencies
* Operates below human perception
* no known security issues on [synkAdvisor](https://snyk.io/advisor/npm-package/zxcvbn)
## Cons
* not unconditionally suited to usage in frontend
* last update in 2017, which is also the reason for a relatively low score on [synkAdvisor](https://snyk.io/advisor/npm-package/zxcvbn)
* relatively [high package size](https://bundlephobia.com/package/zxcvbn@4.4.2) for a password strength checker

## Why this package?

We wanted to use a reliable password strength checker, which does still allow users some leeway.
Many password strength checkers just use a few constraints like "Has to have at least one special character, one number, a mix of capital and lower case letters..."
but allow constructs with very common elements like "Qwerty123+", which does not help that much with security.
Others might use regex, which is a better idea, but their effectiveness strongly depends on the set of regex used, and whether they catch patterns like logical number sequences and keyboard sequences.
Common words and phrases should also lower the security score of a password. To check for this, there is either a collection of very specific regex needed, or extensive lists of common words and passwords.
So we wanted to use a password checker that uses a well-thought-out pattern matching, and also checks for strings a brute force attack might use.
Rules regarding special characters could be used additionally, but should not be relied on too much.

Another requirement was for the password-checking itself to be quick. If we want to be able to give live-feedback in our UI, 
(which we do), we can't allow for the calculation to take long.
This requirement of course means that the algorithm doing the checking needs to be time-effective if it is still to check for sufficient number of patterns.

While a simple password checker is written quickly, it would be pure arrogance to think that in terms of time-efficiency and quality of results our product would be better than a professionally developed product, which is the result of a team with more members, experience, knowledge and time than we have for this project.
Sadly, many of the password checker packages found on npm seemed to be very simple projects. Without further information determining the quality of a password checker is hard.

So we first filtered the packages by popularity to avoid too simple or badly functioning packages.
Then we took a further look at the remaining ones and dismissed those which only checked based on some simple rules.
When we looked up zxcvbn, we found the package to have an informative README, which stated that it was based on multiple lists of commonly used words and patterns, as well as the way, a hacker might try to crack a password.

It had nearly ten times the number of weekly downloads the (unofficial) owasp recommendations based password checker had.
Its results where detailed and contained suggestions and warnings in clear text, which felt like a very useful feature.
Also, it is open source and recommended by the Concordia University.

Sadly the last update was back in 2017, but we found no younger password checker of comparable quality. 
We decided that since language does not tend to change that fast, the used lists of common words should still work.
Keyboard patterns do not tend to change also, and logical patterns will always be the same. 
There might be some trends zxcvbn failed to pick up on in the last years, but most of the lists should still be relevant.

First we intended to directly use our password checker in frontend and backend, but the lists zxcvbn uses lead to a size which can, 
depending on connection and client hardware, lead to delays if used as part of the frontend. 
While there were some tips on how to avoid this problem, we decided to not experiment and instead send potential passwords from client to backend for checking.
This leads to added work for the backend, but since password strength only needs to be checked while a user registers or changes his password, (two relatively rare operations),
we considered this to be a bearable cost.