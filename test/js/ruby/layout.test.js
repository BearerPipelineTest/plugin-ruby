describe("layout", () => {
  test("turns multiple blank lines into just one blank line", () =>
    expect("1\n\n\n\n\n2").toChangeFormat("1\n\n2"));

  test("turns semicolons into adjacent lines", () =>
    expect("1; 2; 3").toChangeFormat("1\n2\n3"));

  test("maintains semicolons from within interpolation", () =>
    expect(`"a#{b; c}"`).toMatchFormat());

  test("handles multiple newlines at the end of the file", () =>
    expect("foo\n\n\n").toChangeFormat("foo"));
});
