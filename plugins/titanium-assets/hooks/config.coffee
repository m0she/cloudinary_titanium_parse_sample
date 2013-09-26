exports.config =
  compile_dirs: [
    'app',
  ]

### for separate dirs:
exports.config =
  compile_dirs: [
    ['Resources-compile', 'Resources'],
    ['app-compile', 'app'],
  ]
  static_dirs: [
    ['Resources-static', 'Resources'],
    ['app-static', 'app'],
  ]
###
