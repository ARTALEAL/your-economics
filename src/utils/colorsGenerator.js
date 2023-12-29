const colors = [];
let color;
while (colors.length < 100) {
  do {
    color = Math.floor(Math.random() * 1000000 + 1);
  } while (colors.indexOf(color) >= 0);
  colors.push('#' + ('000000' + color.toString(16)).slice(-6));
}

export default colors;
