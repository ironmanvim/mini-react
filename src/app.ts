import { c, useState } from "./react";

function List(props: any) {
  return c("div", {
    children: props.list.map((i: any) => {
      return c("div", {
        children: `${i}`,
      });
    }),
  });
}

export function Counter(props: any) {
  const [count, setCount] = useState("count", 0);
  const [list, setList] = useState("list", props.list);

  return c("div", {
    children: [
      c("h1", {
        children: "Counter",
      }),
      c("div", {
        children: [
          c("button", {
            children: `count: ${count || 0}`,
          }),
        ],
        onClick: () => {
          setCount((count || 0) + 1);
          setList([...(list || []), count + 1]);
        },
      }),
      c(List, {
        list: list,
      }),
    ],
  });
}
export function App() {
  return c(Counter, {
    children: "Vishnu",
    list: [1, 2, 3, 4, 5, 6],
  });
}
