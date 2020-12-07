const { long, ruby } = require("./utils");

describe("undef", () => {
  test("single inline", () => expect("undef foo").toMatchFormat());

  test("multiple inline", () => expect("undef foo, bar").toMatchFormat());

  test("multiple breaking", () => {
    const expected = ruby(`
      undef ${long},
            a${long}
    `);

    return expect(`undef ${long}, a${long}`).toChangeFormat(expected);
  });

  test("single with comment", () => expect("undef foo # bar").toMatchFormat());

  test("multiple inline with comment", () =>
    expect("undef foo, bar # baz").toMatchFormat());

  test("multiple lines comment on first", () => {
    const content = ruby(`
      undef foo, # baz
            bar
    `);

    return expect(content).toMatchFormat();
  });

  test("multiple lines comment on each", () => {
    const content = ruby(`
      undef foo, # baz
            bar # bam
    `);

    return expect(content).toMatchFormat();
  });

  test("multiple breaking with comment", () => {
    const expected = ruby(`
      undef ${long},
            a${long} # foo
    `);

    return expect(`undef ${long}, a${long} # foo`).toChangeFormat(expected);
  });
});
