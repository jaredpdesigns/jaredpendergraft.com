A good way to search within an Array of Objects if you know which keys you intend to search within. In this case, we’re searching within the `title` only.

``` javascript
const arr = [
  { title: "Cool Video", description: "Really really cool video" },
  {
    title: "Regular Video",
    description:
      "Really really regular, standard video without anything interesting"
  }
];

const searchTerm = "cool";

function findInObject() {
  return arr.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}
console.log(findInObject());

// [{title: "Cool Video", description: "Really really cool video"}]
```