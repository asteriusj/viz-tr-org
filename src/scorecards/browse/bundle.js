(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict'

function injectStyleTag (document, fileName, cb) {
  var style = document.getElementById(fileName)

  if (style) {
    cb(style)
  } else {
    var head = document.getElementsByTagName('head')[0]

    style = document.createElement('style')
    if (fileName != null) style.id = fileName
    cb(style)
    head.appendChild(style)
  }

  return style
}

module.exports = function (css, customDocument, fileName) {
  var doc = customDocument || document
  /* istanbul ignore if: not supported by Electron */
  if (doc.createStyleSheet) {
    var sheet = doc.createStyleSheet()
    sheet.cssText = css
    return sheet.ownerNode
  } else {
    return injectStyleTag(doc, fileName, function (style) {
      /* istanbul ignore if: not supported by Electron */
      if (style.styleSheet) {
        style.styleSheet.cssText = css
      } else {
        style.innerHTML = css
      }
    })
  }
}

module.exports.byUrl = function (url) {
  /* istanbul ignore if: not supported by Electron */
  if (document.createStyleSheet) {
    return document.createStyleSheet(url).ownerNode
  } else {
    var head = document.getElementsByTagName('head')[0]
    var link = document.createElement('link')

    link.rel = 'stylesheet'
    link.href = url

    head.appendChild(link)
    return link
  }
}

},{}],2:[function(require,module,exports){
/**
 * Semantic Graph Utility functions
 * Copyright 2018, Asterius Media LLC, All Rights Reserved.
 */
'use strict';

function dtstamp() {
  var d = new Date();
  var dt = new Date().getTime();
  return dt;
}

function getBreadCrumb(_graph, _node, cb) {
  console.log(dtstamp(), 'starting getBreadCrumb _node', _node);
  var CrumbTrail = [];

  try {
    // let nodes = []
    var crumbNodes = []; // let aNode = getNodeById(_graph,_node)

    var aNode = _node; // add to crumbs if not null

    if (aNode != null) {
      crumbNodes.push(aNode);

      if (aNode["skos:broader"] != null) {
        var aBroader = aNode["skos:broader"] || null;
        if (aBroader instanceof Array) aBroader = aBroader[0] || null;
        console.log('aBroader:', aBroader);
        var bNode = getNodeById(_graph, aBroader) || null;
        console.log('bNode:', bNode); // add to crumbs if not null

        if (bNode != null) {
          crumbNodes.push(bNode);

          if (bNode["skos:broader"] != null) {
            var bBroader = bNode["skos:broader"] || null;
            if (bBroader instanceof Array) bBroader = bBroader[0] || null;
            console.log('bBroader:', bBroader);
            var cNode = getNodeById(_graph, bBroader) || null;
            console.log('cNode:', cNode); // add to crumbs if not null

            if (cNode != null) {
              crumbNodes.push(cNode);

              if (cNode["skos:broader"] != null) {
                var cBroader = cNode["skos:broader"] || null;
                if (cBroader instanceof Array) cBroader = cBroader[0] || null;
                console.log('cBroader:', cBroader);
                var dNode = getNodeById(_graph, cBroader) || null;
                console.log('dNode:', dNode);

                if (dNode != null) {
                  crumbNodes.push(dNode); // if (dNode["skos:broader"] != null) {
                  //     let dBroader = dNode["skos:broader"] || null;
                  //     if (dBroader instanceof Array) dBroader = dBroader[0] || null ;
                  //     console.log('dBroader:',dBroader)
                  //     // add to crumbs array
                  // } // end of dNode["skos:broader"]
                } // end if dNode

              } // end of cNode["skos:broader"]

            } // end if cNode

          } // end of bNode["skos:broader"]

        } // end of bNode

      } // end of aNode["skos:broader"]   

    } // end if aNode


    console.log('crumbNodes', crumbNodes); // aNode.crumbNodes = crumbNodes

    console.log('crumbNodes.length', crumbNodes.length);

    for (var c = crumbNodes.length; c > 0; c--) {
      // console.log('c ',c)
      // console.log('c-1 crumbNodes[c-1]',c-1,crumbNodes[c-1])
      var crumbNode = crumbNodes[c - 1];
      var crumbId = crumbNode["@id"];
      var crumbLabel = crumbNode["skos:prefLabel"] || crumbNode["rdfs:label"];
      var crumbDescription = crumbNode["dc:description"];
      var Crumb = {
        id: crumbId,
        label: crumbLabel,
        description: crumbDescription
      };
      CrumbTrail.push(Crumb);
    }

    aNode.CrumbTrail = CrumbTrail;
  } catch (e) {
    console.error(dtstamp(), 'getBreadCrumb error', e);
  } finally {
    console.log(dtstamp(), 'ending getBreadCrumb');
    console.log('CrumbTrail', CrumbTrail);
    if (cb) cb(CrumbTrail);
    return CrumbTrail;
  } // end try catch    

} //end getBreadCrumb


function makeBreadCrumbs(_graph, cb) {
  console.log(dtstamp(), 'starting makeCrumbs');
  var Crumbs = [];

  try {
    var crumb = {};

    for (var n = 0; n < _graph.length; n++) {
      var aNode = _graph[n]; // console.log("aNode:",aNode)
      // aNode.breadcrumbs = [] ;

      getBreadCrumb(_graph, aNode);
    } // end for n


    Crumbs.push(crumb);
  } catch (e) {
    console.error(dtstamp(), 'makeCrumbs error', e);
  } finally {
    console.log(dtstamp(), 'ending makeCrumbs');
    if (cb) cb(Crumbs);
    return Crumbs;
  } // end try catch    

} //end makeCrumbs


function makeTreeFromGraph(_graph, startid, cb) {
  console.log(dtstamp(), 'starting makeTreeFromGraph');
  var Tree = [];

  try {
    // let tmp = []
    // get starting id node first
    var rootNode = getNodeById(_graph, startid);
    console.log('rootNode:', rootNode); // set root node of tree

    Tree = rootNode; // FIRST LEVEL
    // (a) level

    rootNode.parentOf = [];

    for (var n = 0; n < rootNode.children.length; n++) {
      var aNodeId = rootNode.children[n]; // console.log("aNodeId:",aNodeId)

      var aNode = getNodeById(_graph, aNodeId); // console.log("aNode:",aNode)

      rootNode.parentOf.push(aNode);
      aNode.parentOf = []; // then do next (b) level...

      var aChilderen = aNode.children || []; // in case it does not exist

      for (var p = 0; p < aChilderen.length; p++) {
        var bNodeId = aNode.children[p];
        var bNode = getNodeById(_graph, bNodeId);
        aNode.parentOf.push(bNode);
        bNode.parentOf = []; // console.log("bNode:",bNode)
        // then do next (c) level...

        var bChilderen = bNode.children || []; // in case it does not exist

        for (var _p = 0; _p < bChilderen.length; _p++) {
          var cNodeId = bNode.children[_p];
          var cNode = getNodeById(_graph, cNodeId);
          bNode.parentOf.push(cNode);
          cNode.parentOf = []; // console.log("cNode:",cNode)
        } // end for

      } // end for

    } // end for

  } catch (e) {
    console.error(dtstamp(), 'makeTreeFromGraph error', e);
  } finally {
    console.log(dtstamp(), 'ending makeTreeFromGraph');
    if (cb) cb(Tree);
    return Tree;
  } // end try catch    

} //end makeTreeFromGraph
//
// get child nodes of node and add ids to group
//


function getChildren(graph, node) {
  // console.log('getChildren')
  // console.log('getChildren of node',node)
  var parent_id = node.id || node['@id']; // if (parent_id === "foafiaf:Mission_Value_0") console.log('getChildren node',node)

  var childNodeIds = []; // if parant of...

  var childids1 = getChildNodeIds(node); // console.log('childids1',childids1)

  for (var x = 0; x < childids1.length; x++) {
    if (childids1[x] != null) {
      if (!childNodeIds.includes(childids1[x])) {
        childNodeIds.push(childids1[x]);
      }
    }
  } // if child of...


  var childids2 = getNodesByParentId(graph, parent_id); // console.log('childids2',childids2)

  for (var y = 0; y < childids2.length; y++) {
    if (childids2[y] != null) {
      if (!childNodeIds.includes(childids2[y])) {
        childNodeIds.push(childids2[y]);
      }
    }
  } // console.log(' childNodeIds', childNodeIds)
  // if (parent_id === "foafiaf:Scorecard_Adjacency") console.log('getChildren childNodeIds',childNodeIds)


  return childNodeIds;
} // end getChildren
// get array of ids for child nodes of node


function getChildNodeIds(node) {
  // get nodes are childeren if not narrower
  // console.log('getChildNodeIds')
  // console.log('getChildNodeIds',node)
  var NodeIds = [];
  var parent_id = node.id || node['@id'];

  var _narrower = node.narrower || node['skos:narrower'] || null;

  var _supports = node.supports || node['skos:supports'] || null; // if narrower add appropriate ids


  if (_narrower != null) {
    if (typeof _narrower === 'string') {
      var _nn = _narrower; // console.log('_nn', _nn)

      NodeIds.push(_nn);
    } else {
      // console.log('_narrower.length',_narrower.length)
      for (var n = 0; n < _narrower.length; n++) {
        var _nn2 = _narrower[n]; // console.log('_nn', _nn)

        NodeIds.push(_nn2);
      }
    }
  } // end if _narrow
  // if supports add appropriate ids


  if (_supports != null) {
    if (typeof _supports === 'string') {
      var _ss = _supports; // console.log('_ss', _ss)

      NodeIds.push(_ss);
    } else {
      // console.log('_supports.length',_supports.length)
      for (var s = 0; s < _supports.length; s++) {
        var _ss2 = _supports[s]; // console.log('_ss', _ss)

        NodeIds.push(_ss2);
      }
    }
  } // end if _narrow
  // console.log('getChildNodeIds child NodeIds', NodeIds)


  return NodeIds;
} // end getChildNodeIds


function getParents(graph, node) {
  // console.log('getParents')
  var node_id = node.id || node['@id'];
  var parentNodeIds = [];
  var parentIds1 = getParentNodeIds(graph, node_id); // console.log('parentIds1',parentIds1)

  for (var x = 0; x < parentIds1.length; x++) {
    if (parentIds1[x] != null) {
      if (!parentNodeIds.includes(parentIds1[x])) {
        parentNodeIds.push(parentIds1[x]);
      }
    }
  } // if (parentNodeIds.length>0) console.log('node_id parentIds',node_id,parentNodeIds)


  return parentNodeIds;
} // end getParents


function getNodesByParentId(graph, parent_id) {
  // get nodes that have parent of parent_id  then add supports, predeccesor .... if not broader
  // console.log('getNodesByParentId')
  // console.log('getNodesByParentId parent_id: ', parent_id)
  var NodeIds = []; // loop over nodes to determine if parent_id is parent and add id, group, title, label

  for (var i = 0; i < graph.length; i++) {
    var node = graph[i]; //   console.log('getNodesByParentId parent node: ',node)

    var _id = graph[i]['@id']; // let _type = graph[i]['@type'];
    // let _dbotype = graph[i]['dbo:type'] || null;
    // let _scheme = graph[i]['skos:inScheme'] || null;

    var _broader = graph[i]['skos:broader'] || null;

    var _monitors = graph[i]['foafiaf:monitors'] || node['foafiaf:Monitors'] || null;

    var _supports = graph[i]['foafiaf:supports'] || node['foafiaf:Supports'] || null; //   let _predecessor = graph[i]['tmo:PredecessorDependency'] || null;
    // let _seccessor = graph[i]['tmo:SuccessorDependency'] || null;
    // let _scorecard = graph[i]['foafiaf:Scorecard'] || null;
    // let _measure = graph[i]['foafiaf:Measure'] || null;
    // let _project = graph[i]['foafiaf:Project'] || null;
    // let _strategy = graph[i]['foafiaf:Strategy'] || null;
    // let _spoke = graph[i]['foafiaf:Spoke'] || null;
    // let _segment = graph[i]['foafiaf:Segment'] || null;


    var _parent = graph[i]['foafiaf:Parent'] || null;

    var _parents = graph[i]['foafiaf:Parents'] || null;

    var addNode = false;

    if (!(_id === parent_id)) {
      // filter our self as parent
      if (_parent === parent_id) {
        // else if broader == parent then add node as a childe
        addNode = true;
      }

      if (_parents != null) {
        // console.log('_parents.length',_parents.length)
        for (var n = 0; n < _parents.length; n++) {
          var _nn = _parents[n];
          console.log('_nn', _nn);

          if (_nn === parent_id) {
            addNode = true;
          }
        }
      } // end if _parents
      //// Fix to ensure not just blank
      //   if (_broader === parent_id) {                                       // else if broader == parent then add node as a childe
      //       addNode = true;
      //     //   console.log('_broader _id: ', _broader, _id)
      //   }
      // //   if (_monitors === parent_id) {                                       // else if broader == parent then add node as a childe
      //   if (_monitors  != null) {      
      //       addNode = true;
      //       console.log('_monitors _id: ', _monitors, _id)
      //   }
      //   if (_supports === parent_id) {                                       // else if broader == parent then add node as a childe
      //       addNode = true;
      //     //   console.log('_supports _id: ', _supports, _id)
      //   }

    } // end if self


    if (addNode) {
      // console.log('_id ', _id)
      NodeIds.push(_id);
    }
  } // end for
  //   console.log('getNodesByParentId  NodeIds: ',NodeIds)


  return NodeIds;
} // end getNodesByParentId	


function getParentNodeIds(graph, node_id) {
  // get node ids that are parents of node
  // console.log('getParentNodeIds')
  // console.log('getParentNodeIds', node_id)
  var NodeIds = []; // loop over nodes to determine parent and and add ids

  for (var i = 0; i < graph.length; i++) {
    var _id = graph[i]['@id'];

    var _broader = graph[i]['skos:broader'] || null;

    var _parent = graph[i]['foafiaf:Parent'] || null;

    var _parents = graph[i]['foafiaf:Parents'] || null;

    if (_id === node_id) {
      // filter on node_id node
      NodeIds.push(_parent);

      if (_parents != null) {
        if (typeof _parents === 'string') {
          NodeIds.push(_parents); // if (node_id === "foafiaf:Scorecard_Strong_Economy") console.log('_id _parents',_id,_parents)
        } else {
          // console.log('_parents.length',_parents.length)
          for (var n = 0; n < _parents.length; n++) {
            NodeIds.push(_parents[n]); // if (node_id === "foafiaf:Scorecard_Strong_Economy") console.log('_id _parents[n]',_id,_parents[n])
          }
        }
      } // end if _parents


      if (_broader != null) {
        if (typeof _broader === 'string') {
          NodeIds.push(_broader); // if (node_id === "foafiaf:Scorecard_Strong_Economy") console.log('_id _broader',_id,_broader)
        } else {
          // console.log('_broader.length',_broader.length)
          for (var _n = 0; _n < _broader.length; _n++) {
            NodeIds.push(_broader[_n]); // if (node_id === "foafiaf:Scorecard_Strong_Economy") console.log('_id _broader[n]',_id,_broader[n])
          }
        }
      } // end if _parents

    } // end if self

  } // end for


  return NodeIds;
} // end getParentNodeIds


function getNodeById(_nodes, _id) {
  // 	console.log('start getNodeById', _id)
  try {
    var theNode = null;
    var obj = _nodes; // 		var targetProp = 'id'

    var targetProp = '@id';
    var targetValue = _id;
    var finalResults = [];
    var result = findFirstObject(obj, targetProp, targetValue, finalResults);
    theNode = finalResults[0] || null; // 		console.log('theNode',theNode)
    // 		return theNode
  } catch (e) {
    console.error(Math.floor(Date.now() / 1000), e);
  } finally {
    // finally
    // 		console.log('finally getNodeById theNode',theNode)
    return theNode;
  }
}

function findFirstObject(obj, targetProp, targetValue, finalResults) {
  // https://jsfiddle.net/alexQch/5u6q2ybc/
  //   console.log('findFirstObject ')
  //   console.log('findFirstObject obj: ', obj)
  //   console.log('findFirstObject targetProp: ', targetProp)
  //   console.log('findFirstObject targetValue: ', targetValue)
  function getObject(theObject) {
    var result = null;

    if (theObject instanceof Array) {
      for (var i = 0; i < theObject.length; i++) {
        getObject(theObject[i]);
      }
    } else {
      for (var prop in theObject) {
        if (theObject.hasOwnProperty(prop)) {
          if (prop === targetProp) {
            // console.log('--found id');
            if (theObject[prop] === targetValue) {
              //   console.log('----found porop', prop, ', ', theObject[prop]);
              finalResults.push(theObject); // return after first find... a change from original

              return theObject;
            }
          }

          if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
            getObject(theObject[prop]);
          }
        }
      }
    }
  }

  getObject(obj);
}

},{}],3:[function(require,module,exports){
/**
 * Semantic Graph Internal Relationship link resolver
 * Copyright 2018, Asterius Media LLC, All Rights Reserved.
 */
'use strict';

function dtstamp() {
  var d = new Date();
  var dt = new Date().getTime();
  return dt;
}

var LD = {};

function resolveLinkedData(_ld, cb) {
  try {
    console.log(dtstamp(), 'starting resolveLinkedData');
    var _LD = _ld; // console.log('initial LD:',LD)

    var newGraph = [];
    var graph = _LD["@graph"];

    for (var z = 0; z < graph.length; z++) {
      var node = graph[z]; // console.log('z node',z,node)

      var _id = node['@id'];

      if (_id != "./" && _id != "") {
        var newNode = node; // let newNode = prepNewNode(node) ;
        // console.log('returned newNode:',newNode)

        if (newNode != null) {
          var childIds = getChildren(graph, node);

          if (childIds.length > 0) {
            // console.log('childIds',childIds)
            newNode.children = childIds;

            if (node["skos:narrower"] == "") {
              node["skos:narrower"] = childIds;
            } else {//
              //process each and push
              //
            }
          }

          var parentIds = getParents(graph, node);
          console.log('resolveLinkedData parentIds: ', parentIds);

          if (parentIds.length > 0) {
            // console.log('node parentIds',node,parentIds)
            newNode.parents = parentIds;

            if (node["skos:broader"] == "") {
              node["skos:broader"] = parentIds;
            } else {//
              //process each and push
              //
            }
          } //   console.log('newNode',newNode)


          newGraph.push(newNode);
        } // end if !null

      } // end if _id

    } // end for  
    // console.log('newGraph:',newGraph)  
    //
    // using new trimmed graph loop over nodes and links within to
    // test linkabilty and remove link with bad url or non-graph element
    //            


    for (var g = 0; g < graph.length; g++) {
      var _node = graph[g]; //test skos:broader

      var inscheme = _node["skos:inScheme"];
      var n_inscheme = [];

      if (Array.isArray(inscheme)) {
        for (var s = 0; s < inscheme.length; s++) {
          var link = inscheme[s];

          if (testLinkability(newGraph, link)) {
            n_inscheme.push(link);
          }
        } // end for s

      } else {
        if (testLinkability(newGraph, inscheme)) n_inscheme.push(inscheme);
      }

      _node["skos:inScheme"] = n_inscheme; //test skos:broader

      var broader = _node["skos:broader"];
      var n_broader = [];

      if (Array.isArray(broader)) {
        for (var b = 0; b < broader.length; b++) {
          var _link = broader[b];

          if (testLinkability(newGraph, _link)) {
            n_broader.push(_link);
          }
        } // end for b

      } else {
        if (testLinkability(newGraph, broader)) n_broader.push(broader);
      }

      _node["skos:broader"] = n_broader;
    } // edn for g


    _LD["@graph"] = newGraph; // console.log('completed LD:',LD)

    if (cb) cb(_LD);
    return _LD;
  } catch (e) {
    console.error(dtstamp(), 'resolveLinkedData error', e);
  } finally {
    console.log(dtstamp(), 'ending resolveLinkedData');
  } // end try catch    

} //end resolveLinkedData


function testLinkability(_nodes, link) {
  // 	console.log('start testLinkability', link)
  try {
    var isLinkable = true;
    var id = getNodeById(_nodes, link);

    if (id === null) {
      isLinkable = false;
    } else if (id) {
      isLinkable = true;
    }
  } catch (e) {
    console.error(Math.floor(Date.now() / 1000), 'testLinkability e:', e);
  } finally {
    // finally
    // 		console.log('finally testLinkability theNode',theNode)
    return isLinkable;
  }
} // end testLinkability

},{}],4:[function(require,module,exports){
var inject = require('./../../../node_modules/cssify');
var css = "html {\n    min-height: 75%;\n    max-height: 100%;\n    position: relative\n}\n\n@font-face {\n    font-family: 'Material Icons';\n    font-style: normal;\n    font-weight: 400;\n    src: local('Material Icons'), local(MaterialIcons-Regular), url(//raw.githubusercontent.com/the-coders-hub/MHRDApp-WebClient/master/css/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2) format(\"woff2\")\n}\n/*https://raw.githubusercontent.com/the-coders-hub/MHRDApp-WebClient/master/css/icons.css*/\n.material-icons {\n    font-family: 'Material Icons';\n    font-weight: 400;\n    font-style: normal;\n    font-size: 2em;\n    line-height: 1;\n    letter-spacing: normal;\n    text-transform: none;\n    display: inline-block;\n    white-space: nowrap;\n    word-wrap: normal;\n    direction: ltr\n}\n\nbody {\n    font-family: sans-serif;\n    background-color: #FFF;\n    color: #000;\n    margin: 0;\n    padding: 0;\n    width: 99%;\n    height: 99%;\n    overflow: auto\n}\n\na:link {\n    color: #005a9c;\n    background-color: rgba(255, 255, 255, 0);\n    text-decoration: none\n}\n\na:visited {\n    color: #005a9c;\n    background-color: rgba(255, 255, 255, 0);\n    text-decoration: none\n}\n\na:hover {\n    color: #005a9c;\n    background-color: rgba(255, 255, 255, 0);\n    text-decoration: underline\n}\n\n#alphabet {\n    display: inline-block;\n    width: 90%;\n    padding: 1em;\n    color: #000;\n    background: #f9f9f9;\n    border-top: 1px solid #ccc;\n    border-bottom: 1px solid #ccc\n}\n\n#alphabet li {\n    display: inline\n}\n\n#alphabet li a {\n    float: left;\n    margin-left: 15px\n}\n\n#skipnav {\n    display: none\n}\n\n#pagina {\n    width: 100%;\n    margin: 0 auto;\n    background-color: #fff;\n    color: #000\n}\n\n#cabecera {\n    display: block;\n    padding: 5pt;\n    width: auto;\n}\n\n#cabecera p {\n    margin: 0\n}\n\n#cabecera .tituloweb {\n    margin: 0;\n    padding: 0;\n    padding-bottom: 0;\n    background-color: rgba(255, 255, 255, 0);\n    color: #005a9c;\n    font-weight: 700;\n    font-size: 3em\n}\n\n#cabecera a {\n    text-decoration: none;\n    display: inline-block;\n}\n\n#cabecera .home {\n    padding-left: 4em;\n    right: 1em;\n    position: absolute;\n    top: 1.5em;\n}\n\n#cabecera .material-icons {\n    font-size: 1em;\n    vertical-align: bottom\n}\n\n#sidebar {\n    float: left;\n    width: 15em\n}\n\n#sidebar ul {\n    list-style: none;\n    margin: 15px 0 0 15px;\n    padding: 0;\n    width: 15em;\n    display: block;\n    font-size: 1em\n}\n\n#sidebar ul li {\n    margin: 3px;\n    padding: 5px;\n    color: #000;\n    background: #ddd;\n    display: block;\n    font-size: 1em\n}\n\n#sidebar ul li a {\n    display: block;\n    font-size: 1em\n}\n\n#sidebar ul li:hover {\n    color: #000;\n    background: #eee\n}\n\n#sidebar #nav[type=\"checkbox\"],\n#sidebar label {\n    display: none\n}\n\n#info {\n    padding: 1em;\n    /*margin-left: 16em;*/\n    min-height: 300px;\n    position: relative\n}\n\n#info table {\n    width: 60%;\n    border-collapse: collapse;\n    margin-top: 1em;\n}\n\n#info th {\n    width: 40%;\n    text-align: left;\n    border: 1px solid #CCC;\n    padding: 5px;\n    color: #000;\n    background: #CCC;\n}\n\n#info table > thead > tr > th {\n    width: 60%\n}\n\n#info tr:nth-child(even) {\n    color: #000;\n    background: #EEE;\n}\n\n#info tr:nth-child(odd) {\n    color: #000;\n    background: #FFF;\n}\n\n#info td {\n    border: 1px solid #CCC;\n    padding: 5px;\n}\n\n#info dt {\n    font-weight: bold;\n}\n\n#contenido {\n    overflow: auto\n}\n\n#infocontenido {\n    padding: 15px;\n}\n\n#fichalibro {\n    margin-left: 170px\n}\n\ndiv.noticia {\n    padding: 10px;\n    clear: both\n}\n\n\n#contenido span.Content {\n    \n    /*color: Red;*/\n    \n    padding: 0px;\n    margin-left: 20px;\n    margin-top: 15px;\n}\n\n#contenido h1 {\n    /*margin: 0;*/\n    /*padding: .25em;*/\n    /*padding-left: .5em;*/\n    /*background: #005a9c;*/\n    /*font-weight: 700;*/\n    /*color: #FFF;*/\n    /*font-size: 1.4em*/\n    padding: .2em;\n    padding-bottom: 0;\n    font-weight: 600;\n    font-size: 2.2em;\n    margin-top: 0px;\n    margin-bottom: 0;\n    /*font-weight: bold;*/\n    background-color: rgba(255, 255, 255, 0);\n    color: #036\n}\n\n#contenido h1.Title {\n    padding: .2em;\n    padding-bottom: 0;\n    font-weight: 500;\n    font-size: 2em;\n    margin-top: auto;\n    margin-bottom: auto;\n    font-weight: bold;\n    background-color: rgba(255, 255, 255, 0);\n    color: #036\n}\n\n#contenido h2 {\n    padding: .2em;\n    padding-bottom: 0;\n    font-weight: 400;\n    font-size: 1.4em;\n    margin-top: 10px;\n    margin-bottom: 0;\n    font-weight: bold;\n    background-color: rgba(255, 255, 255, 0);\n    color: #036\n}\n#contenido h2.Header {\n    padding: .2em;\n    padding-bottom: 0;\n    font-weight: 400;\n    font-size: 1.4em;\n    margin-top: 15px;\n    margin-bottom: 10;\n    font-weight: bold;\n    background-color: rgba(255, 255, 255, 0);\n    color: #036\n}\n\n#contenido h3 {\n    padding: .2em;\n    padding-bottom: 0;\n    font-weight: 300;\n    font-size: 1.1em;\n    margin-top: 0px;\n    margin-bottom: 0;\n    /*font-weight: bold;*/\n    background-color: rgba(255, 255, 255, 0);\n    color: #036\n}\n\n.rdftype, .dbotype {\n    display: none;\n}\n\n#contenido h4 {\n    padding: .2em;\n    padding-bottom: 0;\n    font-weight: 200;\n    font-size: 1em;\n    margin-top: 10px;\n    margin-bottom: 0;\n    /*font-weight: bold;*/\n    background-color: rgba(255, 255, 255, 0);\n    color: #036\n}\n\n\n#pie {\n    clear: both;\n    padding: 0;\n    margin: 0;\n    border-top: 3px solid #ccc;\n    padding-bottom: 10px\n}\n\n#pie p {\n    padding: .5em;\n    margin: 0;\n    border: none\n}\n\n#pie hr {\n    display: none\n}\n\n#infositenote {\n    padding: 10px;\n    border: 1px solid #ccc;\n    color: #000;\n    background-color: #b6d3ef\n}\n\n.bloqueportada {\n    border: 1px solid #ddd;\n    color: #FFF;\n    color: #000;\n    background-color: #EEE;\n    padding: 5px;\n    margin-top: 15px\n}\n\n.bloqueportada p {\n    margin-left: 10px\n}\n\n.portadaentexto {\n    float: left;\n    margin-right: 20px;\n    margin-bottom: 20px;\n    margin-left: 20px\n}\n\n.roundedbutton {\n    border-radius: 10px;\n    background: #000066;\n    color: #FFFFFF;\n    margin: 2px 2px 2px 5px;\n    padding: 3px 5px;\n    text-align: center;\n    display: inline-block;\n    vertical-align: top\n}\n\n.roundedbuttonactive {\n    border-radius: 10px;\n    background: #005a9c;\n    color: #FFFFFF;\n    margin: 2px 2px 2px 5px;\n    padding: 3px 5px;\n    text-align: center;\n    display: inline-block;\n    vertical-align: top;\n    font-weight: 700\n}\n\n.roundedbutton a {\n    background-color: rgba(255, 255, 255, 0);\n    color: #FFF\n}\n\n.roundedbuttonactive a {\n    background-color: rgba(255, 255, 255, 0);\n    color: #FFF\n}\n\n#breadcrumb {\n    border-top: 1px solid #ccc;\n    padding-top: 1em;\n    padding-bottom: 1em;\n    color: #000;\n    background: #eee;\n    padding-left: 1em\n}\n\n#node {\n    border-top: 1px solid #ccc\n}\n\n#loader {\n    display: none;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    color: #000;\n    background: rgba(255, 255, 255, 0.9);\n    z-index: 20000\n}\n\n#searchresults dt {\n    margin-top: 1em\n}\n\ndd.uri {\n    font-size: .9em\n}\n\n.sk-fading-circle {\n    width: 40px;\n    height: 40px;\n    margin: 0 auto;\n    position: fixed;\n    left: 50%;\n    top: 50%;\n    margin-left: -20px;\n    margin-top: -20px\n}\n\n.sk-fading-circle .sk-circle {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    left: 0;\n    top: 0\n}\n\n.sk-fading-circle .sk-circle:before {\n    content: '';\n    display: block;\n    margin: 0 auto;\n    width: 15%;\n    height: 15%;\n    color: #FFF;\n    background-color: #333;\n    border-radius: 100%;\n    animation: sk-circleFadeDelay 1.2s infinite ease-in-out both\n}\n\n.sk-fading-circle .sk-circle2 {\n    transform: rotate(30deg)\n}\n\n.sk-fading-circle .sk-circle3 {\n    transform: rotate(60deg)\n}\n\n.sk-fading-circle .sk-circle4 {\n    transform: rotate(90deg)\n}\n\n.sk-fading-circle .sk-circle5 {\n    transform: rotate(120deg)\n}\n\n.sk-fading-circle .sk-circle6 {\n    transform: rotate(150deg)\n}\n\n.sk-fading-circle .sk-circle7 {\n    transform: rotate(180deg)\n}\n\n.sk-fading-circle .sk-circle8 {\n    transform: rotate(210deg)\n}\n\n.sk-fading-circle .sk-circle9 {\n    transform: rotate(240deg)\n}\n\n.sk-fading-circle .sk-circle10 {\n    transform: rotate(270deg)\n}\n\n.sk-fading-circle .sk-circle11 {\n    transform: rotate(300deg)\n}\n\n.sk-fading-circle .sk-circle12 {\n    transform: rotate(330deg)\n}\n\n.sk-fading-circle .sk-circle2:before {\n    animation-delay: -1.1s\n}\n\n.sk-fading-circle .sk-circle3:before {\n    animation-delay: -1s\n}\n\n.sk-fading-circle .sk-circle4:before {\n    animation-delay: -.9s\n}\n\n.sk-fading-circle .sk-circle5:before {\n    animation-delay: -.8s\n}\n\n.sk-fading-circle .sk-circle6:before {\n    animation-delay: -.7s\n}\n\n.sk-fading-circle .sk-circle7:before {\n    animation-delay: -.6s\n}\n\n.sk-fading-circle .sk-circle8:before {\n    animation-delay: -.5s\n}\n\n.sk-fading-circle .sk-circle9:before {\n    animation-delay: -.4s\n}\n\n.sk-fading-circle .sk-circle10:before {\n    animation-delay: -.3s\n}\n\n.sk-fading-circle .sk-circle11:before {\n    animation-delay: -.2s\n}\n\n.sk-fading-circle .sk-circle12:before {\n    animation-delay: -.1s\n}\n\n@keyframes sk-circleFadeDelay {\n    0%,\n    39%,\n    100% {\n        opacity: 0\n    }\n    40% {\n        opacity: 1\n    }\n}\n\n@media only screen and (max-width:850px) {\n    #sidebar ul {\n        display: none;\n        list-style: none;\n        margin: 0;\n        padding: 0;\n        color: #000;\n        background: #fff\n    }\n    #sidebar label {\n        display: block;\n        cursor: pointer;\n        padding: 0;\n        z-index: 10000;\n        position: absolute;\n        left: 1em;\n        top: 0;\n        line-height: 4em\n    }\n    #sidebar label:after {\n        content: '\\2261';\n        font-size: 4em;\n        background-color: rgba(255, 255, 255, 0);\n        color: #888\n    }\n    #sidebar #nav[type=\"checkbox\"]:checked ~ ul {\n        display: block;\n        z-index: 9998;\n        position: absolute;\n        left: 0;\n        top: 0;\n        bottom: 0;\n        right: 0;\n        color: #000;\n        background: rgba(255, 255, 255, 1);\n        border-bottom: 2px solid #888;\n        padding-top: 60pt;\n        padding-bottom: 10pt;\n        background: rgba(0, 90, 156, 0.95);\n        font-size: 1em;\n    }\n    #sidebar #nav[type=\"checkbox\"]:checked ~ label:after {\n        content: '×';\n        background-color: rgba(255, 255, 255, 0);\n        color: #fff\n    }\n    #sidebar ul li {\n        text-align: left;\n        color: #000;\n        background: rgba(255, 255, 255, 0);\n        line-height: 1.5em;\n        padding: 0\n    }\n    #sidebar ul li a {\n        background-color: rgba(255, 255, 255, 0);\n        color: #fff;\n        padding: 5px\n    }\n    #sidebar ul li a:hover {\n        text-decoration: none;\n        background: rgba(255, 255, 255, 0.95);\n        color: #005A9C\n    }\n    #sidebar ul li:hover {\n        text-decoration: none;\n        background: rgba(255, 255, 255, 0.95);\n        color: #005A9C\n    }\n    #info {\n        padding: 15px;\n        margin-left: 0;\n        position: relative\n    }\n    #searchform {\n        clear: both;\n        display: block;\n        margin-top: 1em;\n        margin-left: 0\n    }\n    #info table {\n        width: 100%;\n    }\n}\n\n#treeview div {\n    margin-left: 30px;\n}\n\n\n/* #treeview article *:not(:nth-child(2)) { margin-left: 15px; } */\n\n#treeview label {\n    cursor: pointer;\n    background-color: rgba(255, 255, 255, 0);\n    color: #005a9c;\n}\n\n#treeview label:hover {\n    text-decoration: underline;\n}\n\n#treeview .treeview {\n    display: none;\n}\n\n#treeview .treeview:not(:checked) ~ label {\n    background: rgba(0, 90, 156, 1);\n    color: white;\n}\n\n#treeview .treeview:not(:checked) ~ label:hover {\n    text-decoration: none\n}\n\n.treeview:checked + label:before {\n    content: \"\\000A0+\\000A0\";\n    font-size: 1.2em;\n}\n\n.treeview:not(:checked) ~ label:before {\n    content: \"\\000A0\\02500\\000A0\";\n    font-size: 1.2em;\n}\n\n.treeview:checked + label:after {\n    content: \"\\000A0\";\n    font-size: 1.2em;\n}\n\n.treeview:not(:checked) ~ label:after {\n    content: \"\\000A0\";\n    font-size: 1.2em;\n}\n\n.treeview:checked ~ *:not(:nth-child(2)) {\n    display: none;\n}\n\n.treeview:disabled ~ * {\n    background-color: rgba(255, 255, 255, 0);\n    color: #707070;\n}\n\n.uri {\n    margin-top: .2em;\n    font-style: italic;\n    background-color: rgba(255, 255, 255, 0);\n    color: green\n}\n\n#toolbar {\n    font-size: 1em;\n    overflow: auto;\n    margin-bottom: 1em\n}\n\n.formats {\n    font-size: 1em\n}\n\n#langbuttons {\n    float: left\n}\n\n#searchform {\n    float: left;\n    margin-left: 40px\n}\n\n#searchform input {\n    border-radius: 10px;\n    border: 2px solid #ccc;\n    padding: 3px\n}\n\nlabel[for=q] span {\n    display: none\n}\n\n#searchbutton {\n    background: none;\n    color: #000;\n    border: none;\n    cursor: pointer\n}\n\n@media only screen and (max-width:850px) {\n    #cabecera {\n        margin-left: 4em\n    }\n    #searchform {\n        clear: both;\n        display: block;\n        margin-top: 1em;\n        margin-left: 0\n    }\n}";
inject(css, undefined, '_1kp4whp');
module.exports = css;

},{"./../../../node_modules/cssify":1}],5:[function(require,module,exports){
/**
 * Semantic Data Browser HTML5 (demo variant)
 * Copyright 2018, Asterius Media LLC, All Rights Reserved.
 */
'use strict';

console.log('loading browse.js... ');
console.log('browse.js v.2019.06.22.11.52'); // retrieve url params
// var urlParams = new URLSearchParams(window.location.search);
// if (DoNotCache === undefined) var DoNotCache = urlParams.get('nocache') || urlParams.get('DoNotCache') || null ;
// if (RefreshAll === undefined) var RefreshAll = urlParams.get('refresh') || urlParams.get('RefreshAll') || null ;
// if (RefreshAll) {
//     // console.log('sunburst.js RefreshAll:',RefreshAll)
//     sessionStorage.clear(); 
//     // console.log('sessionStorage:',sessionStorage)
// }
// console.log('sunburst.js DoNotCache:',DoNotCache)
// console.log('sunburst.js RefreshAll:',RefreshAll)

function dtstamp() {
  var d = new Date();
  var dt = new Date().getTime();
  return dt;
} //
// After page loads get graph data and process selected element
//


function whenPageLoaded() {
  console.log('whenPageLoaded ...');
  var reset = getUrlVars()["reset"] || null; // var datalink = getUrlVars()["datalink"] || '../../things/jsonld/_Indicator_.jsonld'

  var datalink = getUrlVars()["datalink"] || 'https://6nepl40j73.execute-api.us-east-1.amazonaws.com/dev/entities//JSONLD';
  setElement('datalink', datalink);
  var startid = getUrlVars()["startid"] || null;
  setElement('startid', startid);
  var nextid = getUrlVars()["nextid"] || null;
  console.log('datalink: ', datalink);
  console.log('reset: ', reset);
  console.log('startid: ', startid);
  console.log('nextid: ', nextid);

  if (getElement('datalink') != datalink) {
    console.log("getElement('datalink'): ", getElement('datalink'));
    console.log(" != ");
    console.log('datalink: ', datalink);
  } // console.log('reset=true',reset=true)
  // console.log('reset==true',reset==true)
  // console.log('reset===true',reset===true)


  if (reset != null) {
    // if ( ( reset === true ) && ( reset == true ) ) { 
    if (typeof Storage !== "undefined") {
      // Code for localStorage/sessionStorage.
      console.log('localStorage:', localStorage);
      console.log('clearing localStorage');
      localStorage.clear();
      console.log('sessionStorage:', sessionStorage);
      console.log('clearing sessionStorage');
      sessionStorage.clear();
    } else {
      // Sorry! No Web Storage support..
      console.log('Sorry! No Web Storage support..');
    }
  } else {
    console.log('localStorage:', sessionStorage);
    console.log('sessionStorage:', sessionStorage);
  }

  console.log("getElement('datalink'): ", getElement('datalink'));
  console.log("getElement('startid'): ", getElement('startid')); // let mg = getMyGraph() || null ;

  var mg = null; // console.log('mg', mg )
  // console.log('getMyGraph()',getMyGraph() )

  if (isEmpty(mg)) {
    console.log('isEmpty', mg);
    var myGraph = JSON.parse(sessionStorage.getItem('graph')) || null;
    console.log('browse.js myGraph from sessionStorage: ', myGraph); // check for Groups before proccesing, else get it!

    if (myGraph != null) {
      var localgraph = setMyGraph(myGraph);
      processGraph(myGraph);
    } else {
      fetchMyLinkedData(datalink, function (json) {
        console.log('after fetchMyLinkedData');
        var myLD = JSON.parse(json) || json; // console.log('myLD',myLD)

        resolveLinkedData(myLD, function (_LD) {
          // console.log('after resolveLinkedData')
          // TODO: seelctively set innerHTML from obj
          // let objName = document.getElementById("objName").innerHTML = _LD["name"] || null ;
          // let objDescription = document.getElementById("objDescription").innerHTML = _LD["description"] || null ;
          // let objId        = document.getElementById("objId").innerHTML        = _LD["@id"] || null ;
          // let objType      = document.getElementById("objType").innerHTML      = _LD["@type"] || null ;
          // let objUrl       = document.getElementById("objUrl").innerHTML       = _LD["url"] || null ;
          // let objUpdated   = document.getElementById("objUpdated").innerHTML   = _LD["updated"] || null ;
          // let objPublished = document.getElementById("objPublished").innerHTML = _LD["published"] || null ;
          // let objSameAs = _LD["sameAs"] || null ;
          // let objIsBasedOn = _LD["isBasedOn"] || null ;
          // let objCreator= _LD["keywords"] || null ;
          var defaultId = _LD["startId"] || startid || null; //
          // TODO select info from LD to set LD Bwowser Title Description and Source URL
          //

          function makeSchemaJsonld() {} //   "@id": "_Indicator_",
          //   "@type": "Dataset",
          //   "startid": "foafiaf:Scorecard_Top_25",
          //   "name": "Transform Rockford Scorecard Indicators",
          //   "description": "A updated dataset of scorecard indicator relationships, values and metrics to provide insight into were the comminuty transformation process is at and where is it going",
          //   "url": "",
          //   "sameAs": "",
          //   "keywords": [
          //   ],
          //   "creator": {
          //     "@type": "Organization",
          //     "url": "",
          //     "name": "",
          //     "contactPoint": {
          //       "@type": "ContactPoint",
          //       "contactType": "customer service",
          //       "telephone": "",
          //       "email": ""
          //     }
          //   },
          //   "includedInDataCatalog": {
          //   },
          //   "distribution": [
          //   ],
          //   "temporalCoverage": "",
          //   "spatialCoverage": {
          //   },
          //   "updated": "2018-12-25T12:34:56Z",
          //   "published": "2018-12-25T12:34:56Z"
          // end 
          //
          // TODO set graph storage name to form of path that unique identifies it
          //


          var myGraph = _LD["@graph"] || null;
          console.log('myGraph: ', myGraph);
          var res = sessionStorage.setItem('graph', JSON.stringify(myGraph));
          console.log("browse.js sessionStorage.setItem('graph'", res);
          var localgraph = setMyGraph(myGraph);
          processGraph(myGraph);
        });
      }); // end fetchMyLinkedData
    }

    ; // end else if
  } else if (!isEmpty(mg)) {
    console.log('not Empty', mg);

    var _myGraph = JSON.parse(mg) || mg;

    console.log(_myGraph);
    processGraph(_myGraph);
  } else {
    // temp until logic figured out
    console.log('unknown'); // fetchMyLinkedData(datalink, function(json) {
    //     let myLD = JSON.parse(json) || json ;
    //     console.log('myLD',myLD)
    //     let myGraph = myLD["@graph"] || null ;
    //     console.log('myGraph: ',myGraph)
    //     setMyGraph(myGraph);
    //     processGraph(myGraph);
    // }) // end getMyLinkedData
  } // end !null

} // end 


function processGraph(graph, cb) {
  console.log('processGraph ...');

  try {
    //     var reset = getUrlVars()["reset"];
    // 	var datalink = getUrlVars()["datalink"] || sessionStorage.getItem('datalink');
    var startid = getUrlVars()["startid"] || sessionStorage.getItem('startid');
    var nextid = getUrlVars()["nextid"] || sessionStorage.getItem('nextid');
    var defaultid = startid || sessionStorage.getItem('defaultid') || 'foafiaf:Scorecard_Top_25' || null; // 	console.log('reset: ',reset)
    // 	console.log('datalink: ',datalink) 

    console.log('startid: ', startid);
    console.log('nextid: ', JSON.stringify(nextid));
    console.log('defaultid: ', defaultid); // get startingid element

    var _elID = null;

    if (!isEmpty(nextid)) {
      _elID = nextid; // console.log('nextid _elID: ', _elID)
    } else if (!isEmpty(startid)) {
      _elID = startid; // console.log('startid _elID: ', _elID)
    } else if (!isEmpty(defaultid)) {
      _elID = defaultid; // console.log('defaultid _elID: ', _elID)
    } else {//
        // else select first array element
        //
        // let firstEl = graph[0]["@id"]
        // let _elID = firstEl || null;
        // _elID =  "foafiaf:Spoke_Education" ; 
        // console.log('else _elID: ', _elID)
      }

    if (_elID === null) _elID = graph[0]["@id"] || null; // console.log('_elID: ', _elID)

    var _eL = getElement(_elID); // console.log('_eL: ', _eL)


    var _elData = getElementData(graph, _elID); // console.log('_elData: ', _elData)


    processElementData(_elData);
  } catch (e) {
    console.error(dtstamp(), 'processGraph error', e);
  } finally {
    console.log(dtstamp(), 'ending processGraph');
    if (cb) cb(null);
    return null;
  } // end try catch   

} // end processGraph


function processElementData(element) {
  console.log('processElementData ...', element); // PLACEHOLDER FOR ADDITION DATA ENHANCEMENT OF ELEMENT
  // save data element in local store by id
  // let _id = setElement(element) ;

  var _breadcrumb = buildNodeBreadcrumb(element); // console.log('_breadcrumb: ', _breadcrumb)
  //set node element breadcrumb


  var container = document.getElementById("breadcrumb");
  container.innerHTML = _breadcrumb;

  var _nodeC = buildNodeContent(element); // console.log('_nodeC: ', _nodeC)
  //set node element content


  var container = document.getElementById("node");
  container.innerHTML = _nodeC;
} //
// Helper functions
//


var myGraph = null;

function getMyGraph() {
  console.log('getMyGraph');
  myGraph = sessionStorage.getItem('myGraph'); //   console.log('myGraph',myGraph)

  return myGraph;
}

function setMyGraph(data) {
  //   console.log('setMyGraph')
  myGraph = data; // Temporarily do not save
  //
  //   sessionStorage.setItem('myGraph', JSON.stringify(myGraph));
  //   console.log('myGraph',myGraph)

  return myGraph;
}

function getElement(identifier) {
  console.log('getElement identifier: ', identifier);

  try {
    var _element = localStorage.getItem('identifier'); //   console.log('getElement   _element: ',_element)


    var element = JSON.parse(_element); //|| _element ;
    //   console.log('getElement    element: ',element)

    return element;
  } catch (e) {
    console.error('e', e);
  }
}

function setElement(identifier, element) {
  console.log('setElement identifier: ', identifier);

  try {
    //   console.log('setElement    element: ',element)
    localStorage.setItem(identifier, JSON.stringify(element));
    return identifier;
  } catch (e) {
    console.error('e', e);
  }
} // collect URL query string parameters


function getUrlVars() {
  console.log('getUrlVars ...');
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
} // end getUrlVars
// is object empty


function isEmpty(obj) {
  // null and undefined are "empty"
  if (obj == null) return true;
  if (obj == "null") return true;
  if (obj == "null undefined") return true; // if (obj == "[Function: String]") return true;

  if (Array.isArray(obj)) {
    var el = obj[0];
    if (el == null) return true;
  } // Assume if it has a length property with a non-zero value
  // that that property is correct.


  if (obj.length && obj.length > 0) return false;
  if (obj.length === 0) return true;
  if (obj === {}) return true; // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and toValue enumeration bugs in IE < 9

  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
} // retrieve JSON-LD data from url


function fetchMyLinkedData(_url, cb) {
  console.log('fetchMyLinkedData ...', _url);
  var url = _url || 'sample.json';
  console.log('url', url);
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(function (response) {
    // console.log(response.text())   
    return response.text();
  }).then(function (json) {
    // console.log('fetch json',json);
    console.log('fetch completed');
    if (cb) cb(json);
    return json;
  });
} // end fetchMyLinkedData
// get JSON object from array


function getById(arr, value) {
  if (arr) {
    for (var i = 0, iLen = arr.length; i < iLen; i++) {
      if (arr[i]["@id"] == value) return arr[i];
    }
  }
} // find object element data from graph array


function getElementData(_graph, _elID, cb) {
  console.log('getElementData ...', _elID);
  var ed = {};

  var _el = getById(_graph, _elID) || null;

  console.log('getElementData _el: ', _el);

  if (!isEmpty(_el)) {
    ed["_id"] = _el["@id"] || "";
    ed["_type"] = _el["@type"] || "";
    ed["rdf:type"] = _el["rdf:type"] || "";
    ed["rdfs:label"] = _el["rdfs:label"] || _el["rdf:label"] || "";
    ed["rdfs:comment"] = _el["rdfs:comment"] || _el["rdf:comment"] || "";
    ed["dbo:type"] = _el["dbo:type"] || "";
    ed["dbo:abstract"] = _el["dbo:abstract"] || "";
    ed["dc:title"] = _el["dc:title"] || "";
    ed["dc:description"] = _el["dc:description"] || "";
    ed["owl:sameAs"] = _el["owl:sameAs"] || "";
    ed["owl:seeAlso"] = _el["owl:seeAlso"] || "";
    ed["skos:prefLabel"] = _el["skos:prefLabel"] || "";
    ed["skos:definition"] = _el["skos:definition"] || "";
    ed["skos:related"] = _el["skos:related"] || "";
    ed["skos:inScheme"] = _el["skos:inScheme"] || "";
    ed["skos:broader"] = _el["skos:broader"] || "";
    ed["skos:narrower"] = _el["skos:narrower"] || "";
    ed["foaf:topic"] = _el["foaf:topic"] || "";

    if (!isEmpty(_el["foafiaf:image"])) {
      ed["foaf:image"] = 'http://foafiaf.transformrockford.org/img/' + _el["foafiaf:image"];
    } else {
      ed["foaf:image"] = "";
    }

    ed["tmo:PredecessorDependency"] = _el["tmo:PredecessorDependency"] || "";
    ed["tmo:SuccessorDependency"] = _el["tmo:SuccessorDependency"] || "";
    ed["CrumbTrail"] = _el["CrumbTrail"] || getBreadCrumb(_graph, _el); //
    // dbo data elements
    //

    var _dbo = [];

    for (var key in _el) {
      if (key.substring(0, 4) == "dbo:") {
        _dbo[key] = _el[key];
      }
    }

    console.log('_dbo: ', _dbo);
    ed["dbo"] = _dbo; //
    // foaf data elements
    //

    var _foaf = [];

    for (var key in _el) {
      if (key.substring(0, 5) == "foaf:") {
        _foaf[key] = _el[key];
      }
    }

    console.log('_foaf: ', _foaf);
    ed["foaf"] = _foaf; //
    // foafiaf data elements
    //

    var _foafiaf = [];

    for (var key in _el) {
      if (key.substring(0, 8) == "foafiaf:") {
        _foafiaf[key] = _el[key];
      }
    }

    console.log('_foafiaf: ', _foafiaf);
    ed["foafiaf"] = _foafiaf;
  }

  console.log('getElementData ed: ', ed);
  if (cb) cb(ed);
  return ed;
} // end getElementData
// build content html for node element


function buildNodeBreadcrumb(_ed, cb) {
  console.log('buildNodeBreadcrumb ...', _ed); // <!--<a href="foafiaf:Segment">Segments</a> -->

  var breadcrumb = "/";
  var datalink = getUrlVars()["datalink"] || "";
  var startid = getUrlVars()["startid"] || "";
  var baseUrl = "?datalink=" + datalink + "&startid=" + startid;
  var CrumbTrail = _ed["CrumbTrail"];
  console.log('CrumbTrail.length', CrumbTrail.length);

  for (var i = 0; i < CrumbTrail.length - 1; i++) {
    var item = CrumbTrail[i];
    console.log('buildNodeBreadcrumb item: ', item);
    var qs = '&nextid=' + item.id;
    breadcrumb += ' <a href="' + baseUrl + qs + '" title="' + item.description + '" >' + item.label + "</a> / "; // https://preview.c9users.io/asteriusj/foafiaf/public/browse/index.html?datalink=../things/jsonld/_Indicator_.jsonld&startid=foafiaf:Scorecard_Diversity&nextid=foafiaf:Scorecard_Recreate
  } // console.log('breadcrumb:',breadcrumb)


  if (cb) cb(breadcrumb);
  return breadcrumb;
} // buildNodeBreadcrumb    


function buildNodeContent(_ed, cb) {
  console.log('buildNodeContent ...', _ed);
  var datalink = getUrlVars()["datalink"] || "";
  var startid = getUrlVars()["startid"] || "";
  var nextid = getUrlVars()["nextid"] || "";
  var baseUrl = "?datalink=" + datalink + "&startid=" + startid + "&nextid=";
  var content = "";
  content += '<div id="node" about="' + _ed["_id"] + '" typeof="' + _ed["_type"] + '">';
  content += '<h2 class="Header">';
  content += '<span property="skos:notation"></span>';

  if (!isEmpty(_ed["skos:prefLabel"])) {
    content += '<span property="skos:prefLabel" xml:lang="en">' + _ed["skos:prefLabel"] + '</span> ';
  } else if (!isEmpty(_ed["rdf:label"])) {
    content += '<span property="rdfs:label" xml:lang="en">' + _ed["rdfs:label"] + '</span> ';
  } else if (!isEmpty(_ed["dc:title"])) {
    content += '<span property="dc:title" xml:lang="en">' + _ed["dc:title"] + '</span> ';
  } // content += '<br/> <small>' + _ed["_id"]  + ' < is type > ' + _ed["_type"] + ' </small>'


  content += '</h1>';

  if (!isEmpty(_ed["rdf:type"])) {
    // content += '<h3>RDF Type (<a href="" title="ADD LINK TO SPEC">rdf:type</a>)</h3>'
    content += '<h3 class="rdftype">RDF Type</h3>';
    content += '	<span class="Content rdftype" property="rdf:type" style="">';
    content += _ed["rdf:type"];
    content += '	</span>';
  }

  if (!isEmpty(_ed["dbo:type"])) {
    // content += '<h3>Type (<a href="" title="ADD LINK TO SPEC">dbo:type</a>)</h3>'
    content += '<h3 class="dbotype">Type</h3>';
    content += '	<span class="Content dbotype" property="dbo:type">';
    content += _ed["dbo:type"];
    content += '	</span>';
  }

  if (!isEmpty(_ed["rdfs:label"])) {
    // content += '<h3>Label (<a href="" title="ADD LINK TO SPEC">rdfs:label</a>)</h3>'
    content += '<h3>Label</h3>';
    content += '	<span class="Content" property="rdfs:label">';
    content += _ed["rdfs:label"];
    content += '	<</span>';
  }

  if (!isEmpty(_ed["dbo:abstract"])) {
    // content += '<h3> Abstract (<a href="" title="ADD LINK TO SPEC">dbo:abstract</a>)</h3>'
    content += '<h3> Abstract </h3>';
    content += '	<span class="Content" property="dbo:abstract">';
    content += _ed["dbo:abstract"];
    content += '	</span>';
  }

  if (!isEmpty(_ed["rdfs:comment"])) {
    // content += '<h3>Comment (<a href="" title="ADD LINK TO SPEC">rdfs:comment</a>)</h3>'
    content += '<h3>Comment</h3>';
    content += '	<span class="Content" property="rdfs:comment">';
    content += _ed["rdfs:comment"];
    content += '	</span>';
  }

  if (!isEmpty(_ed["dc:title"])) {
    // content += '<h3>Title (<a href="" title="ADD LINK TO SPEC">dc:title</a>)</h3>'
    content += '<h3>Title</h3>';
    content += '	<span class="Content" property="dc:title">';
    content += _ed["dc:title"];
    content += '	</span>';
  }

  if (!isEmpty(_ed["dc:description"])) {
    // content += '<h3>Description (<a href="" title="ADD LINK TO SPEC">dc:description</a>)</h3>'
    content += '<h3>Description</h3>';
    content += '	<span class="Content" property="dc:description">';
    content += _ed["dc:description"];
    content += '	</span>';
  }

  if (!isEmpty(_ed["skos:prefLabel"])) {
    // content += '<h3>Pref Label (<a href="" title="ADD LINK TO SPEC">skos:prefLabel</a>)</h3>'
    content += '<h3>Pref Label</h3>';
    content += '	<span class="Content" property="skos:prefLabel">';
    content += _ed["skos:prefLabel"];
    content += '	</span>';
  }

  if (!isEmpty(_ed["foaf:image"])) {
    // content += '<h3>Image (<a href="" title="ADD LINK TO SPEC">foaf:image</a>)</h3>'
    content += '<h3>Image</h3>';
    content += '	<span class="Content" property="foaf:image">';
    content += '         <img src="' + _ed["foaf:image"] + '">';
    content += '	</span>';
  }

  if (!isEmpty(_ed["foaf:topic"])) {
    // content += '<h3>Topic (<a href="" title="ADD LINK TO SPEC">foaf:topic</a>)</h3>'
    content += '<h3>Topic</h3>';
    content += '	<span class="Content" property="foaf:topic">';
    content += _ed["foaf:topic"];
    content += '	</span>';
  }

  if (!isEmpty(_ed["skos:inScheme"])) {
    // content += '<h3>Concept Scheme (<a href="" title="ADD LINK TO SPEC">skos:inScheme</a>)</h3>'
    content += '<h3>Concept Scheme</h3>';
    content += '<ul class="Content" rel="skos:inScheme">';
    content += '    <li resource="' + _ed["skos:inScheme"] + '">';
    content += '		 <a href="' + baseUrl + _ed["skos:inScheme"] + '">' + _ed["skos:inScheme"] + '</a>';
    content += '	</li>';
    content += '</ul>';
  }

  if (!isEmpty(_ed["skos:broader"])) {
    // content += '<h3>Broader Concepts (<a href="" title="ADD LINK TO SPEC">skos:broader</a>)</h3>'
    content += '<h3>Broader</h3>';
    content += '<ul class="Content" rel="skos:broader">';
    content += '    <li resource="' + _ed["skos:broader"] + '">';
    content += '		 <a href="' + baseUrl + _ed["skos:broader"] + '">' + _ed["skos:broader"] + '</a>';
    content += '	</li>';
    content += '</ul>';
  }

  if (!isEmpty(_ed["skos:narrower"])) {
    // content += '<h3>Narrower Concepts (<a href="" title="ADD LINK TO SPEC">skos:narrower</a>)</h3>'
    content += '<h3>Narrower</h3>';
    content += '<ul class="Content" rel="skos:narrower">';

    if (Array.isArray(_ed["skos:narrower"])) {
      for (var n = 0; n < _ed["skos:narrower"].length; n++) {
        var nn = _ed["skos:narrower"][n];
        content += '    <li resource="' + nn + '">';
        content += '		 <a href="' + baseUrl + nn + '">' + nn + '</a>';
        content += '	</li>';
      }
    } else {
      content += '    <li resource="' + _ed["skos:narrower"] + '">';
      content += '		 <a href="' + baseUrl + _ed["skos:narrower"] + '">' + _ed["skos:narrower"] + '</a>';
      content += '	</li>';
    }

    content += '</ul>';
  }

  if (!isEmpty(_ed["skos:definition"])) {
    // content += '<h3>Definition (<a href="" title="ADD LINK TO SPEC">skos:definition</a>)</h3>'
    content += '<h3>Definition</h3>';
    content += '	<span class="Content" property="skos:definition"><p>';
    content += _ed["skos:definition"];
    content += '	</p></span>';
  }

  if (!isEmpty(_ed["skos:related"])) {
    // content += '<h3>Related Concept (<a href="" title="ADD LINK TO SPEC">skos:related</a>)</h3>'
    content += '<h3>Related</h3>';
    content += '<ul class="Content" rel="skos:related">';

    if (Array.isArray(_ed["skos:related"])) {
      for (var n = 0; n < _ed["skos:related"].length; n++) {
        var _nn = _ed["skos:related"][n];
        content += '    <li resource="' + _nn + '">';
        content += '		 <a href="' + baseUrl + _nn + '">' + _nn + '</a>';
        content += '	</li>';
      }
    } else {
      content += '    <li resource="' + _ed["skos:related"] + '">';
      content += '		 <a href="' + baseUrl + _ed["skos:related"] + '">' + _ed["skos:related"] + '</a>';
      content += '	</li>';
    }

    content += '</ul>';
  }

  if (!isEmpty(_ed["owl:sameAs"])) {
    // content += '<h3>Same As (<a href="" title="ADD LINK TO SPEC">owl:sameAs</a>)</h3>'
    content += '<h3>Same As</h3>';
    content += '<ul class="Content" rel="owl:sameAs">';

    if (Array.isArray(_ed["owl:sameAs"])) {
      for (var n = 0; n < _ed["owl:sameAs"].length; n++) {
        var _nn2 = _ed["owl:sameAs"][n];
        content += '    <li resource="' + _nn2 + '">';
        content += '		 <a target="_blank" href="' + _nn2 + '">' + _nn2 + '</a>';
        content += '	</li>';
      }
    } else {
      content += '    <li resource="' + _ed["owl:sameAs"] + '">';
      content += '		 <a target="_blank" href="' + _ed["owl:sameAs"] + '">' + _ed["owl:sameAs"] + '</a>';
      content += '	</li>';
    }

    content += '</ul>';
  }

  if (!isEmpty(_ed["owl:seeAlso"])) {
    // content += '<h3>See Also (<a href="" title="ADD LINK TO SPEC">owl:seeAlso</a>)</h3>'
    content += '<h3>See Also</h3>';
    content += '<ul class="Content" rel="owl:seeAlso">';

    if (Array.isArray(_ed["owl:seeAlso"])) {
      for (var n = 0; n < _ed["owl:seeAlso"].length; n++) {
        var _nn3 = _ed["owl:seeAlso"][n];
        content += '    <li resource="' + _nn3 + '">';
        content += '		 <a target="_blank" href="' + _nn3 + '">' + _nn3 + '</a>';
        content += '	</li>';
      }
    } else {
      content += '    <li resource="' + _ed["owl:seeAlso"] + '">';
      content += '		 <a target="_blank" href="' + _ed["owl:seeAlso"] + '">' + _ed["owl:seeAlso"] + '</a>';
      content += '	</li>';
    }

    content += '</ul>';
  } //
  // dbo data elements
  //


  console.log('_ed["dbo"] ', _ed["dbo"]);

  if (!isEmpty(_ed["dbo"])) {
    content += '<h3>dbo ()</h3>';
    content += '<ul rel="dob">';

    if (Array.isArray(_ed["dbo"])) {
      for (var n = 0; n < _ed["dbo"].length; n++) {
        var _nn4 = _ed["dbo"][n];
        content += '    <li resource="' + _nn4 + '">';
        content += '	' + _nn4;
        content += '	</li>';
      }
    } else {
      content += '    <li resource="' + _ed["dbo"] + '">';
      content += '	' + _ed["dbo"];
      content += '	</li>';
    }

    content += '</ul>';
  } //
  // foaf data elements
  //


  console.log('_ed["foaf"] ', _ed["foaf"]);

  if (!isEmpty(_ed["foaf"])) {
    content += '<h3>foaf ()</h3>';
    content += '<ul rel="foaf">';

    if (Array.isArray(_ed["foaf"])) {
      for (var n = 0; n < _ed["foaf"].length; n++) {
        var _nn5 = _ed["foaf"][n];
        content += '    <li resource="' + _nn5 + '">';
        content += '	' + _nn5;
        content += '	</li>';
      }
    } else {
      content += '    <li resource="' + _ed["foaf"] + '">';
      content += '	' + _ed["foaf"];
      content += '	</li>';
    }

    content += '</ul>';
  }

  content += '</div>';
  if (cb) cb(content);
  return content;
} // buildNodeContent


(function () {
  console.log('function browse.js ...');
  'use strict';
  /**/
  // var param = {
  //         stop_browser_behavior: {
  //             userSelect: "none",
  //             touchCallout: "none",
  //             touchAction: "none",
  //             contentZooming: "none",
  //             userDrag: "none",
  //             tapHighlightColor: "rgba(0,0,0,0)"
  //         }
  //     },
  //     startid = getUrlVars()["startid"] || null,
  //     datalink = getUrlVars()["datalink"] || null,
  //     showall = getUrlVars()["showall"] || null;
  // // temporary hard code jsonld data
  // let jsonLD = {"@graph":[{"@id":"foafiaf:Segment_REVITALIZATION","@type":"skos:Concept","dbo:abstract":"","dbo:type":"foafiaf:Segment","foafiaf:Segment":"","foafiaf:Spoke":"","foafiaf:Strategy":"","foafiaf:categories":"","foafiaf:documents":"","foafiaf:group":"foafiaf:TR_Revitalization_Team","foafiaf:image":"","foafiaf:keywords":"","foafiaf:monitors":"","foafiaf:ownedby":"","foafiaf:owner":"","foafiaf:perspective":"foafiaf:perspective_Segment","foafiaf:shortname":"Revitalization","foafiaf:supports":"","foafiaf:theme":"","foafiaf:userdefinedfields":"","dc:description":"","dc:title":"Revitalization Segment","rdf:type":"sioc:topic","rdfs:comment":"","rdfs:label":"Revitalization","owl:sameAs":"","owl:seeAlso":"","skos:broader":"","skos:definition":"","skos:inScheme":"foafiaf:Segment_0","skos:narrower":"","skos:prefLabel":"","skos:related":"","foaf:topic":"Segment: Revitalization"},{"@id":"foafiaf:Spoke_Education","@type":"skos:Concept","dbo:abstract":"","dbo:type":"foafiaf:Spoke","foafiaf:Segment":"foafiaf:Segment_RENEWAL","foafiaf:Spoke":"","foafiaf:Strategy":"","foafiaf:categories":"","foafiaf:documents":"","foafiaf:group":"foafiaf:TR_Education_Spoke_Team","foafiaf:image":"edu-new-3-2.jpg","foafiaf:keywords":"","foafiaf:monitors":"","foafiaf:ownedby":"","foafiaf:owner":"","foafiaf:perspective":"foafiaf:perspective_Spoke","foafiaf:shortname":"Education","foafiaf:supports":"","foafiaf:theme":"","foafiaf:userdefinedfields":"","dc:description":"Our pre-K through 12 schools and students are the pride of our community and are nationally recognized for excellence. All education and training programs are dynamic, provide accessible paths to fulfilling careers, and are highly valued by our citizens and employers.","dc:title":"Education Spoke Impact Statement","rdf:type":"sioc:topic","rdfs:comment":"","rdfs:label":"Education","owl:sameAs":"","owl:seeAlso":"","skos:broader":"foafiaf:Segment_RENEWAL","skos:definition":"","skos:inScheme":"foafiaf:Spoke_0","skos:narrower":"","skos:prefLabel":"Education","skos:related":"","foaf:topic":"Spoke: Education"},]}
  // let graph = jsonLD["@graph"]
  // console.log('graph: ',graph)
  // TODO
  // preprocess Linked Data while page is loading
  // determin datalink url
  // fecth JSON-LD data
  // resolve relationships between entitities i.e. broader and narrower match
  // loop over elements
  // save each element in localstore by id

})(); // end of function

},{}],6:[function(require,module,exports){
"use strict";

var jsg = require('../../js/graphUtils.js');

var jsr = require('../../js/resolveGraph.js');

var css1 = require('./browse.css');

var js1 = require('./browse.js');

},{"../../js/graphUtils.js":2,"../../js/resolveGraph.js":3,"./browse.css":4,"./browse.js":5}]},{},[6]);
