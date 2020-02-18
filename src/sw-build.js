const workboxBuild = require('workbox-build');
const buildSW = () => {
  return workboxBuild
    .injectManifest({
      swSrc: 'src/sw-template.js',
      swDest: 'build/sw.js',
      globDirectory: 'build',
      globPatterns: [
        '../public/index.html',
        'static/css/*.css',
        'static/media/*.*',
        'static/js/*.js'
      ]
    })
    .then(({ count, size, warnings }) => {
      warnings.forEach(console.warn);
      console.log(`${count} files will be precached, totaling ${size} bytes.`);
    });
};
buildSW();
