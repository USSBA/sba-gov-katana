export default [
  {
    test: "normal test",
    year: 2017,
    month: 5,
    day: 23,
    title: "normal title"
  },
  {
    test: "zero for dates",
    year: 0,
    month: 0,
    day: 0,
    title: "simple title"
  },
  {
    test: "big dates invalid",
    year: 321654,
    month: 13,
    day: 32,
    title: "simple title"
  },
  {
    test: "chars for dates",
    year: "a",
    month: "a",
    day: "a",
    title: "simple title"
  },
  {
    test: "title word filtering",
    year: 2017,
    month: 1,
    day: 1,
    title: "Filter out words begin an the of end"
  },
  {
    test: "title symbol filtering",
    year: 2017,
    month: 2,
    day: 2,
    title: "Filter symbols begin !@#$%&^*^&(% end"
  },
  {
    test: "short title",
    year: 2017,
    month: 3,
    day: 3,
    title: "a"
  },
  {
    test: "title caps filtering",
    year: 2017,
    month: 4,
    day: 4,
    title: "BIG small"
  },
  {
    test: "title as number",
    year: 2017,
    month: 5,
    day: 5,
    title: 12345
  }
];
