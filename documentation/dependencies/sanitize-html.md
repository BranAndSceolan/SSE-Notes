# sanitize-html
[![sanitize-html](https://snyk.io/advisor/npm-package/sanitize-html/badge.svg)](https://snyk.io/advisor/npm-package/sanitize-html)

## License
sanitize-html is published under MIT-License which is unproblematic, because it allows all kinds of uses.

## Links
[npm](https://www.npmjs.com/package/sanitize-html)
[github](https://github.com/apostrophecms/sanitize-html)
[snykAdvisor](https://snyk.io/advisor/npm-package/sanitize-html)
[bundlephobia](https://bundlephobia.com/package/sanitize-html@2.7.1)

## Pros
* removes hidden javascript from href= and src= attributes
* Top 5%: over 910 000 downloads a week
* no known security issues
* healthy maintenance
* active community

## Cons
* some inactive dependencies

## Dependencies
* [deepmerge](https://snyk.io/advisor/npm-package/deepmerge)[![deepmerge](https://snyk.io/advisor/npm-package/deepmerge/badge.svg)](https://snyk.io/advisor/npm-package/deepmerge)
* [escape-string-regexp](https://snyk.io/advisor/npm-package/escape-string-regexp)[![escape-string-regexp](https://snyk.io/advisor/npm-package/escape-string-regexp/badge.svg)](https://snyk.io/advisor/npm-package/escape-string-regexp)
* [htmlparser2](https://snyk.io/advisor/npm-package/htmlparser2)[![htmlparser2](https://snyk.io/advisor/npm-package/htmlparser2/badge.svg)](https://snyk.io/advisor/npm-package/htmlparser2)
  * [domelementtype](https://snyk.io/advisor/npm-package/domelementtype) [![domelementtype](https://snyk.io/advisor/npm-package/domelementtype/badge.svg)](https://snyk.io/advisor/npm-package/domelementtype)
  * [domhandler](https://snyk.io/advisor/npm-package/domhandler)[![domhandler](https://snyk.io/advisor/npm-package/domhandler/badge.svg)](https://snyk.io/advisor/npm-package/domhandler)
    * [domelementtype](https://snyk.io/advisor/npm-package/domelementtype) [![domelementtype](https://snyk.io/advisor/npm-package/domelementtype/badge.svg)](https://snyk.io/advisor/npm-package/domelementtype)
  * domutils
  * entities
* [is-plain-object](https://snyk.io/advisor/npm-package/is-plain-object)[![is-plain-object](https://snyk.io/advisor/npm-package/is-plain-object/badge.svg)](https://snyk.io/advisor/npm-package/is-plain-object)
* [parse-srcset](https://snyk.io/advisor/npm-package/parse-srcset)[![parse-srcset](https://snyk.io/advisor/npm-package/parse-srcset/badge.svg)](https://snyk.io/advisor/npm-package/parse-srcset)
* [postcss](https://snyk.io/advisor/npm-package/postcss)[![postcss](https://snyk.io/advisor/npm-package/postcss/badge.svg)](https://snyk.io/advisor/npm-package/postcss)
    * [nanoid](https://snyk.io/advisor/npm-package/nanoid)[![nanoid](https://snyk.io/advisor/npm-package/nanoid/badge.svg)](https://snyk.io/advisor/npm-package/nanoid)
    * [picocolors](https://snyk.io/advisor/npm-package/picocolors)[![picocolors](https://snyk.io/advisor/npm-package/picocolors/badge.svg)](https://snyk.io/advisor/npm-package/picocolors)
    * [source-map-js](https://snyk.io/advisor/npm-package/source-map-js)[![source-map-js](https://snyk.io/advisor/npm-package/source-map-js/badge.svg)](https://snyk.io/advisor/npm-package/source-map-js)

## Why this package?
The app is intended to allow users use of Markdown, which includes HTML-Tags.<br>
HTML-tags are a security risk if not sanitized. So could for example links hide javascript. <br>
Because HTML-sanitization is a security-relevant task, it is preferable to use a well known and tested package.<br>
Writing own functions, while obviously possible, comes with too high a risk of making a small error which leads to a heavy security issue.<br>
Sanitize html is easy to use and values like maintenance look well. <br>
Another contender would have been the xss package, but since this package had a high rated vulnerability in several earlier releases for years, sanitize-html seemed better.<br>
There are also security issues in earlier sanitize-html releases, but those were of lower severely, the package has been without security issues for longer and sanitize-html has a higher rate of new releases.