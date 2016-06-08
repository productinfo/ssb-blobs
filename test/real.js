
var rimraf = require('rimraf')
var osenv = require('osenv')
var path = require('path')
var ref = require('ssb-ref')

var level = require('level')

var Blobs = require('../inject')
var create = require('../create')

function test_create(name, async) {
  var dir = path.join(
    osenv.tmpdir(),
    'test-blobstore_'+Date.now()+'_'+name
  )
  rimraf.sync(dir)
  return Blobs(create(dir), name)
}

//since we are using the real FS this time,
//we don't need to apply fake async.
var sync = require('./util').sync
require('./simple')(test_create, sync)
require('./integration')(test_create, sync)
require('./legacy')(test_create, sync)



