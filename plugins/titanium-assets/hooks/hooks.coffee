fs = require 'fs'
path = require 'path'
async = require 'async'
_ = require 'underscore'
spawn = require('child_process').spawn
coffeescript = require 'coffee-script'
less = require 'less'
compileFileType = require './compile-file-type'
utils = require './utils'
asset_config = require('./config').config


exports.build_pre_compile = (logger, config, cli, build, finished) ->
  projectDir = build.projectDir || process.cwd()
  logger.info "Compiling source files at: " + projectDir
  logger.info "Config: " + JSON.stringify asset_config

  # Setup
  resourcesOutputDir = projectDir + '/Resources'

  async.parallel [
    (cb) ->
      # make sure output directory exists
      try
        fs.mkdirSync resourcesOutputDir
      catch err
        return cb(err) if not err or err.code != 'EEXIST'
      cb null
  ].concat(
    for entry in asset_config.compile_dirs || []
      [inDir, outDir] = (projectDir+'/'+name for name in if _.isArray(entry) then entry else [entry, entry] )
      (cb) ->
        logger.info "Compiling source files from: " + inDir + " to: " + outDir
        compileFiles(logger, inDir, outDir, cb)
  ).concat(
    for entry in asset_config.static_dirs || []
      [inDir, outDir] = (projectDir+'/'+name for name in if _.isArray(entry) then entry else [entry, entry] )
      (cb) ->
        logger.info "Copying static files from: " + inDir + " to: " + outDir
        copyStaticFiles(logger, inDir, outDir, cb)
  )
  , (err) ->
    if err
      logger.error "Error compiling files: #{err}"
      throw err

    logger.info 'Finished compiling source files'
    finished()

exports.clean_post = (logger, config, cli, build, finished) ->
  console.log cli.argv['project-dir']
  resourcesOutputDir = cli.argv['project-dir'] + '/Resources'
  for entry in (config.compile_dirs || []).concat(config.static_dirs || [])
    return if !_.isArray entry
    outDir = cli.argv['project-dir'] + '/' + entry[1]
    logger.info "Cleaning resources output directory: #{outDir}"
    cleanFiles outDir

copyStaticFiles = (inputDir, outputDir, cb) ->
  spawn 'cp', [
    '-r'
    inputDir + '/'
    outputDir
  ]

  # TODO: check for errors?
  cb null

compileFiles = (logger, inputDir, outputDir, cb) ->
  compileFunctions = _.map [
    { inSuffix: 'coffee', outSuffix: 'js', fnCompile: utils.funcAsAsync((code) ->
      coffeescript.compile(code, bare: true)) }
    { inSuffix: 'less', outSuffix: 'css', fnCompile: less.render }
  ], (funcDef) ->
    (cbCompile) ->
      compileFileType logger, funcDef.fnCompile, inputDir, funcDef.inSuffix, outputDir, funcDef.outSuffix, cbCompile

  async.parallel compileFunctions, (err) ->
    cb err

# TODO: integrate this somewhere
cleanFiles = (outputDir, cb) ->
  spawn 'rm', [
    '-r'
    outputDir + path.sep
  ]
  # TODO: errors?
