module.exports = (eleventyConfig) => {
  eleventyConfig.addFilter(
    "related",
    require("./dist").related({
      serializer: (doc) => [doc.title, doc.link ?? '', doc.text ?? ''],
      weights: [10, 1, 3],
    })
  );

  return {
    dir: {
      input: "samples",
      output: "public",
      data: "_data",
    },
  };
};
