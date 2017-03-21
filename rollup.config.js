import buble from "rollup-plugin-buble";
const pkg = require("./package.json");

export default {
	entry: 'src/index.js',
	plugins: [
		buble({
      // For object spread
      objectAssign: "Object.assign",
    }),
	],
	targets: [
    {
      dest: pkg.main,
      format: 'umd',
      moduleName: 'polychrome',
      sourceMap: true
    },
    {
      dest: pkg.module,
      format: 'es',
      sourceMap: true
    }
  ]
};
