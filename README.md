# eleventy-plugin-related

[![npm](https://img.shields.io/npm/v/eleventy-plugin-related)](https://www.npmjs.com/package/eleventy-plugin-related)
![Build](https://github.com/jpoehnelt/eleventy-plugin-related/workflows/Build/badge.svg)
![Release](https://github.com/jpoehnelt/eleventy-plugin-related/workflows/Release/badge.svg)
[![Docs](https://img.shields.io/badge/documentation-api-brightgreen)](https://jpoehnelt.github.io/eleventy-plugin-related/)

## Description

Filter and/or short code to rank text documents by similarity.

## Install

Install using NPM or similar.

```sh
npm i eleventy-plugin-related
```

## Usage

```js
eleventyConfig.addFilter(
    "related",
    require("eleventy-plugin-related").related({
      serializer: (doc) => [doc.title, doc.link ?? '', doc.text ?? ''],
      weights: [10, 1, 3],
    })
  );
```

Usage in a NunJucks template would look similar to the following.

```html
<h3>Related</h3>
<ul>
{% for result in story | related(stories) %}
  <li>{{ result.relative }} - {{ result.document.title }}</li>
{% endfor %}
</ul>
```

See the [reference documentation](https://jpoehnelt.github.io/eleventy-plugin-related/).

For more complex options, check out the package[related-documents](https://www.npmjs.com/package/related-documents), on which this package is based.
