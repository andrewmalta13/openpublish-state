var test = require('tape');

var openpublishState = require('./')({
  network: "testnet"
});

test('should find a document with a sha1 of 2dd0b83677ac2271daab79782f0b9dcb4038d659', function(t) {

  openpublishState.findDoc({
    sha1: "2dd0b83677ac2271daab79782f0b9dcb4038d659"
  }, function(err, openpublishDoc) {
    t.equal(openpublishDoc.txid, '2587d9a8662afb37fc32bfdb4914c2d08a134fd709cb7a84db08a22ca578dedf', 'txid');
    t.equal(openpublishDoc.sourceAddresses[0], 'msLoJikUfxbc2U5UhRSjc2svusBSqMdqxZ', 'sourceAddresses');
    t.equal(openpublishDoc.name, 'ega_art_detail.gif', 'name');
    t.equal(openpublishDoc.btih, '9028e4200b976662d11159c2b16a6c12ef83d967', 'btih');
    t.equal(openpublishDoc.sha1, '2dd0b83677ac2271daab79782f0b9dcb4038d659', 'sha1');
    t.ok(!openpublishDoc.tips, 'no tips');
    t.end();
  });

});

test('should find a document with a sha1 of 2dd0b83677ac2271daab79782f0b9dcb4038d659 and include the tips', function(t) {

  openpublishState.findDoc({
    sha1: "2dd0b83677ac2271daab79782f0b9dcb4038d659",
    includeTips: true
  }, function(err, openpublishDoc) {
    t.equal(openpublishDoc.txid, '2587d9a8662afb37fc32bfdb4914c2d08a134fd709cb7a84db08a22ca578dedf', 'txid');
    t.equal(openpublishDoc.sourceAddresses[0], 'msLoJikUfxbc2U5UhRSjc2svusBSqMdqxZ', 'sourceAddresses');
    t.equal(openpublishDoc.name, 'ega_art_detail.gif', 'name');
    t.equal(openpublishDoc.btih, '9028e4200b976662d11159c2b16a6c12ef83d967', 'btih');
    t.equal(openpublishDoc.sha1, '2dd0b83677ac2271daab79782f0b9dcb4038d659', 'sha1');
    t.ok(openpublishDoc.tipCount > 0, 'tipCount');
    t.ok(openpublishDoc.totalTipAmount > 0, 'totalTipAmount');
    t.ok(openpublishDoc.tips.length > 0, 'tips');
    t.end();
  });

});

test('should not find a document with a sha1 of XXX', function(t) {

  openpublishState.findDoc({
    sha1: "XXX"
  }, function(err, openpublishDoc) {
    t.ok(err, 'err is true');
    t.ok(openpublishDoc === false, 'openpublishDoc is false');
    t.end();
  });

});

test('should find the tips for a document with a sha1 of 2dd0b83677ac2271daab79782f0b9dcb4038d659', function(t) {

  openpublishState.findTips({
    sha1: "2dd0b83677ac2271daab79782f0b9dcb4038d659",
  }, function(err, tipInfo) {
    t.ok(tipInfo.tipCount > 0, 'tipCount');
    t.ok(tipInfo.totalTipAmount > 0, 'totalTipAmount');
    t.ok(tipInfo.tips.length > 0, 'tips');
    t.end();
  });

});

test('should not find the tips for a document with a sha1 of XXX', function(t) {

  openpublishState.findTips({
    sha1: "XXX"
  }, function(err, tipInfo) {
    // this should actually return an err and tipInfo == false, but we need an api change on bsync
    t.ok(!err, 'err is false');
    t.ok(tipInfo.tips.length === 0, 'tipInfo.tips is empty');
    t.end();
  });

});

test('should find all documents that have been registered with Open Publish', function(t) {

  openpublishState.findAll({}, function(err, openpublishDocuments) {
    t.ok(openpublishDocuments.length > 0, 'has some documents');
    var openpublishDoc = openpublishDocuments[0];
    t.ok(openpublishDoc.txid, 'txid');
    t.ok(openpublishDoc.sourceAddresses[0], 'sourceAddresses');
    t.ok(openpublishDoc.name, 'name');
    t.ok(openpublishDoc.btih, 'btih');
    t.ok(openpublishDoc.sha1, 'sha1');
    t.end();
  });

});

test('should find all images that have been registered with Open Publish', function(t) {

  openpublishState.findAllByType({type:'image'}, function(err, openpublishDocuments) {
    t.ok(openpublishDocuments.length > 0, 'has some documents');
    var openpublishDoc = openpublishDocuments[0];
    t.ok(openpublishDoc.txid, 'txid');
    t.ok(openpublishDoc.sourceAddresses[0], 'sourceAddresses');
    t.ok(openpublishDoc.name, 'name');
    t.ok(openpublishDoc.btih, 'btih');
    t.ok(openpublishDoc.sha1, 'sha1');
    t.end();
  });

});