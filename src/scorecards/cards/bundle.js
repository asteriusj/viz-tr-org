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
var inject = require('./../../node_modules/cssify');
var css = "/*body {*/\n/*  font-family: Arial, sans-serif;*/\n/*  background: url(http://www.shukatsu-note.com/wp-content/uploads/2014/12/computer-564136_1280.jpg) no-repeat;*/\n/*  background-size: cover;*/\n/*  height: 100vh;*/\n/*}*/\n\n/*h1 {*/\n/*  text-align: center;*/\n/*  font-family: Tahoma, Arial, sans-serif;*/\n/*  color: #06D85F;*/\n/*  margin: 80px 0;*/\n/*}*/\n\nspan#statusText {\n   font-family: Monospace;\n   font-size: 22px;\n   font-weight: bold;\n}\nspan#grpRank {\n   margin-top: 25px;\n}\nspan#grpDescription {\n   font-size: 18px;\n   font-weight: normal;\n   font-style: italic;\n   margin-bottom: 11px;\n}\n\n.metrictoplevel {\n    /*position: absolute;*/\n    /*width: 17%;*/\n    float: left;\n    z-index:100;\n    margin-top: 20px;\n    /*cursor: move;*/\n    border-style: solid;\n}\n.metrictheme {\n    /*position: absolute;*/\n    /*width: 17%;*/\n    float: left;\n    z-index:100;\n    margin-top: 10px;\n    /*cursor: move;*/\n    border-style: solid;\n}\n.metricpopup {\n    /*position: absolute;*/\n    width: 17%;\n    float: left;\n    z-index:100;\n    margin-top: 5px;\n    cursor: move;\n}\n\ndiv#myPopupBox {\n  display: none;\n    position: fixed;\n    width: 20%;\n    float: left;\n    z-index:100;\n    cursor: move;\n}\n#resizable { width: 150px; height: 150px; padding: 0.5em; }\n#resizable h3 { text-align: center; margin: 0; }\n.ui-draggable, .ui-droppable {\n\tbackground-position: top;\n}\n#draggable { width: 150px; height: 150px; padding: 0.5em; }\n  \n.popup {\n  margin-top: 1%;\n  margin-right: auto;\n  margin-bottom: auto;\n  margin-left: 1%;\n  padding: 11px;\n  background: #fff;\n  border-color: #ddd;\n  border: 1px solid grey;\n  border-radius: 5px;\n  width: 99%;\n  position: relative;\n  /*transition: all 5s ease-in-out;*/\n}\n/*h1 {*/\n/*  text-align: center;*/\n/*  font-family: Tahoma, Arial, sans-serif;*/\n/*  color: #06D85F;*/\n/*  margin: 80px 0;*/\n/*}*/\n.popup h2 {\n  margin-top: 0;\n  margin-bottom: 2px;\n  margin-right: 5px;\n  color: #333;\n  font-size: 18px;\n  font-weight: bold;\n  font-family: Tahoma, Arial, sans-serif;\n}\n.popup .close {\n  position: absolute;\n  top: 3px;\n  right: 5px;\n  transition: all 200ms;\n  font-size: 28px;\n  font-weight: bold;\n  text-decoration: none;\n  color: #333;\n}\n.popup .close:hover {\n  color: #06D85F;\n}\n.popup .content {\n  max-height: 30%;\n  padding-top: 4px;\n  /*overflow: auto;*/\n}\n\n@media screen and (max-width: 700px){\n  .box{\n    width: 70%;\n  }\n  .popup{\n    width: 70%;\n  }\n}";
inject(css, undefined, '_ec048g');
module.exports = css;

},{"./../../node_modules/cssify":1}],3:[function(require,module,exports){
"use strict";

console.log('loading graphUtils.js... ');
console.log('graphUtils.js v.2019.07.06.17.12');
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

},{}],4:[function(require,module,exports){
"use strict";

console.log('loading metricpopup.js... ');
console.log('metricpopup.js v.2019.07.07.15.53');
/**
 * Semantic Data Metric Detials Card
 * Copyright 2018, Asterius Media LLC, All Rights Reserved.
 */

'use strict'; // $(function(){
//     $('#full-width').draggable({
//       handle: ".modal-header"
//   });
//     $('#full-width').resizable();
// });


$(function () {
  $("#resizable").resizable();
  $("#myPopupBox").resizable();
});
$(function () {
  $("#draggable").draggable();
  $("#myPopupBox").draggable();
  $("metricpopup").draggable();
});

function myPopupFunction(group) {
  console.log('myPopupFunction', group);
  var x = document.getElementById("myPopupBox");

  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function myPopupClose(group) {
  console.log('myPopupClose');
  var x = document.getElementById("myPopupBox");
  x.style.display = "none";
}

function myPopupOpen(group) {
  console.log('myPopupOpen');
  var x = document.getElementById("myPopupBox");
  x.style.display = "block";
} //
// 
//


function getGrpLabel(group) {
  return group.label;
}

function getGrpPrefLabel(group) {
  return group.preflabel;
}

function getGrpFull(group) {
  var _full = group.full || null;

  if (_full != null) {
    return group.full;
  } else {
    return "";
  }
}

function getGrpDescription(group) {
  var _description = group.description || null;

  if (_description != null) {
    return group.description;
  } else {
    return "";
  }
}

function getGrpStatus(group) {
  var _status = group.status || null;

  if (_status != null) {
    return '<em>status:</em> <span style="display: inline-block; width: 10px;"></span>    <span id="statusText" ><font color="' + group.status + '">' + group.status + '</font></span>';
  } else {
    return "";
  }
}

function getGrpValue(group) {
  var _value = group.value || null;

  var yr = group.year || null;

  if (!_value.includes('in') && yr != null) {
    // console.log(_value.includes('in')? 'is' : 'is not')
    _value = _value + ' in ' + yr;
  }

  if (_value != null) {
    return '<i>value:</i>  <span style="display: inline-block; width: 5px;"></span>' + _value;
  } else {
    return "";
  }
} //
// !!! add condition of increasing red and decresing green !!
//


function getGrpTrend(group) {
  var _datatrend = group.datatrend || null;

  if (_datatrend != null && _datatrend != undefined) {
    var _ico = null;
    if (_datatrend.includes('Better')) _ico = '&nbsp; <i class="fas fa-arrow-up    fa-2x"  title="' + _datatrend + '" aria-hidden style="color: Green;"></i>';
    if (_datatrend.includes('Steady')) _ico = '&nbsp; <i class="far fa-arrow-alt-circle-right fa-2x"  title="' + _datatrend + '" aria-hidden style="color: Black;"></i>';
    if (_datatrend.includes('Worse')) _ico = '&nbsp; <i class="fas fa-arrow-down  fa-2x"  title="' + _datatrend + '"  aria-hidden style="color: Red;"></i>';
    if (_ico != null) return '<em>5-year Trend:</em> ' + _ico;
  } else {
    return "";
  }
}

function getGrpRank(group) {
  var _rank = group.rank || null;

  var yr = group.year || null;

  if (!_rank.includes('in') && yr != null) {
    // console.log(_value.includes('in')? 'is' : 'is not')
    _rank = _rank + ' in ' + yr;
  }

  if (_rank !== null) {
    return '<em>rank:</em>  <span style="display: inline-block; width: 5px;"></span>' + group.rank;
  } else {
    return "";
  }
}

function getGrpTrendRank(group) {
  var _ranktrend = group.ranktrend || null;

  if (_ranktrend != null && _ranktrend != undefined) {
    var _rankico = null;
    if (_ranktrend.includes('Better')) _rankico = '&nbsp; <i class="fas fa-arrow-up    fa-2x"  title="' + _ranktrend + '" aria-hidden style="color: Green;"></i>';
    if (_ranktrend.includes('Steady')) _rankico = '&nbsp; <i class="far fa-arrow-alt-circle-right fa-2x"  title="' + _ranktrend + '" aria-hidden style="color: Black;"></i>';
    if (_ranktrend.includes('Worse')) _rankico = '&nbsp; <i class="fas fa-arrow-down  fa-2x"  title="' + _ranktrend + '"  aria-hidden style="color: Red;"></i>';
    if (_rankico != null) return '<i>Trend in rank:</i> ' + _rankico;
  } else {
    return "";
  }
}

function setGroupDetails(group) {
  // console.log('setGroupDetails',group)
  var x = document.getElementById("myPopupBox");
  var grpLabel = document.getElementById("grpLabel"); // grpLabel.innerHTML = getGrpLabel(group);

  grpLabel.innerHTML = getGrpPrefLabel(group); // var grpFull = document.getElementById("grpFull");
  // let _full = group.full  || null ;
  // if (_full != null) {
  //     grpFull.innerHTML = getGrpFull(group);
  // } else {
  //     grpFull.innerHTML = ""
  // }

  var grpDescription = document.getElementById("grpDescription");

  var _description = group.description || null;

  if (_description != null) {
    grpDescription.innerHTML = getGrpDescription(group);
  } else {
    grpDescription.innerHTML = "";
  }

  var grpStatus = document.getElementById("grpStatus");

  var _status = group.status || null;

  if (_status != null) {
    grpStatus.innerHTML = getGrpStatus(group);
  } else {
    grpStatus.innerHTML = "";
  } // var grpUnits = document.getElementById("grpUnits");
  // grpUnits.innerHTML = '<em>units:</em> ' + group.units;


  var grpValue = document.getElementById("grpValue");

  var _value = group.value || null;

  if (_value != null) {
    grpValue.innerHTML = getGrpValue(group);
  } else {
    grpValue.innerHTML = "";
  }

  var grpTrend = document.getElementById("grpTrend");

  var _trend = group.datatrend || null;

  if (_trend != null) {
    grpTrend.innerHTML = getGrpTrend(group);
  } else {
    grpTrend.innerHTML = "";
  }

  var grpRank = document.getElementById("grpRank");

  var _rank = group.rank || null;

  if (_rank !== null) {
    grpRank.innerHTML = getGrpRank(group);
  } else {
    grpRank.innerHTML = "";
  }

  var grpTrendRank = document.getElementById("grpTrendRank");

  var _ranktrend = group.ranktrend || null;

  if (_ranktrend != null & _ranktrend != undefined) {
    // let _rankico = null
    grpTrendRank.innerHTML = getGrpTrendRank(group);
  } else {
    grpTrendRank.innerHTML = "";
  }

  return true;
}

},{}],5:[function(require,module,exports){
"use strict";

console.log('loading resolveGraph.js... ');
console.log('resolveGraph.js v.2019.07.06.17.12');
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

},{}],6:[function(require,module,exports){
var inject = require('./../../../node_modules/cssify');
var css = "\n#cardsdiv {\n    \n}\n\n.metrictoplevel {\n    float: left;\n    z-index:100;\n    width: 99%;\n    margin-top: 10;\n    margin-bottom: 10;\n    padding-top: 0;\n    padding-left: 0;\n    padding-right: 0;\n    padding-bottom: 0;\n    border: 3px solid #ddd;\n    border-radius: 5px;\n    font-size: large;\n    /*padding: 1em;*/\n}\n.toplevellabel {\n    padding: 10;\n    color: #333;\n    font-size: 1.2em;\n    font-weight: bold;\n    \n    margin: 2px;\n    border: 2px solid #ddd;\n    border-radius: 5px;\n    padding: 1em;\n}\n\n.metrictheme {\n    float: left;\n    z-index:99%;\n    width: 100%;\n    /*margin-top: 10;*/\n    /*padding-top: 0;*/\n    /*padding-left: 0;*/\n    /*padding-right: 0;*/\n    /*padding-bottom: 0;*/\n    /*padding: 2px;*/\n    /*border: 1px solid black;*/\n    /*border-top: 1px solid black;*/\n    /*border-bottom: 1px solid black;*/\n    /*border-left: none;*/\n    /*border-right: none;*/\n    \n}\n.themelabel {\n    /*padding: 10;*/\n    font-size: 1.0em;\n    font-weight: bold;\n    margin: 2px;\n    border: 2px solid #ddd;\n    border-radius: 5px;\n    padding: 1em;\n}\n.themecontainer {\n    min-height: 100px ;\n    display: grid;\n    \n    \n    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;\n/*    grid-template-columns: repeat(5, 1fr);*/\n    grid-auto-rows: minmax(80px, auto);\n}\n\n\n\n.metricindicator {\n\n    float: left;\n    z-index:100;\n    \n    margin: 2;\n    border: 2px solid #ddd;\n    border-radius: 5px;\n    background-color: #FFFFFF;\n    padding: 1em;\n    /*color: rgb(8,8,8);*/\n\n}\n.metricindicator h2 {\n    font-size: 0.9em;\n    font-weight: bold;\n}\n.indicatorlabel {\n    padding: 10;\n    font-size: 0.8em;\n    font-weight: bold;\n    background: yellow;\n}\n.indicatordescription {\n   font-size: 0.7em;\n   font-weight: normal;\n   margin-top: 5px;\n   margin-bottom: 5px;\n}\n\n\n@media screen and (max-width: 700px){\n  .box{\n    width: 70%;\n  }\n  .popup{\n    width: 70%;\n  }\n}";
inject(css, undefined, '_daiz8d');
module.exports = css;

},{"./../../../node_modules/cssify":1}],7:[function(require,module,exports){
"use strict";

// list of dependencies to include in bundle
// var js0  = require('./index.js');
var css2 = require('../../css/metricpopup.css');

var js2 = require('../../js/metricpopup.js');

var css1 = require('./cards.css'); // var js1  = require('./cards.js');


var js3 = require('../../js/graphUtils.js');

var js4 = require('../../js/resolveGraph.js'); // var js3  = require('../ConvertTreesToGroups.js');

},{"../../css/metricpopup.css":2,"../../js/graphUtils.js":3,"../../js/metricpopup.js":4,"../../js/resolveGraph.js":5,"./cards.css":6}]},{},[7]);
