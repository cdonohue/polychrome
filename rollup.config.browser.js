import buble from "rollup-plugin-buble";
const pkg = require("./package.json");

export default {
	entry: 'src/browser.js',
	plugins: [
		buble({
      // For object spread
      objectAssign: "Object.assign",
    }),
	],
	targets: [
    {
      dest: pkg.browser,
      format: 'umd',
      moduleName: 'polychrome',
      sourceMap: true
    }
  ]
};
