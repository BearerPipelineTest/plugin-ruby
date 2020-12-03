const { concat, group, lineSuffix, join } = require("../prettier");
const { literalLineNoBreak } = require("../utils");

function printHeredoc(path, opts, print) {
  const { beging, body, ending } = path.getValue();

  const parts = body.map((part, index) => {
    if (part.type !== "@tstring_content") {
      // In this case, the part of the string is an embedded expression
      return path.call(print, "body", index);
    }

    // In this case, the part of the string is just regular string content
    return join(literalLineNoBreak, part.body.split("\n"));
  });

  // We use a literalline break because matching indentation is required
  // for the heredoc contents and ending. If the line suffix contains a
  // break-parent, all ancestral groups are broken, and heredocs automatically
  // break lines in groups they appear in. We prefer them to appear in-line if
  // possible, so we use a literalline without the break-parent.
  return group(
    concat([
      beging,
      lineSuffix(
        group(concat([literalLineNoBreak].concat(parts).concat(ending)))
      )
    ])
  );
}

module.exports = {
  heredoc: printHeredoc
};
