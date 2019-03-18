/**
 * Semantic Graph Utility functions
 * Copyright 2018, Asterius Media LLC, All Rights Reserved.
 */
'use strict';
function dtstamp() {
    let d = new Date();
    let dt  = new Date().getTime();
    return dt;
} 

function getBreadCrumb(_graph,_node,cb) {
    console.log(dtstamp(),'starting getBreadCrumb _node',_node)
    let CrumbTrail = [] 
    
    try {
       
        // let nodes = []
        let crumbNodes = [] ;
        
        // let aNode = getNodeById(_graph,_node)
        let aNode = _node ;
        
        // add to crumbs if not null
        if (aNode != null) {
            crumbNodes.push(aNode)
        
            if (aNode["skos:broader"] != null) {
                let aBroader = aNode["skos:broader"] || null;
                if (aBroader instanceof Array) aBroader = aBroader[0] || null ;
                console.log('aBroader:',aBroader)
                
                let bNode = getNodeById(_graph,aBroader) || null
                console.log('bNode:',bNode)
                // add to crumbs if not null
                if (bNode != null) {
                    crumbNodes.push(bNode)
                
                    if (bNode["skos:broader"] != null) {
                        let bBroader = bNode["skos:broader"] || null;
                        if (bBroader instanceof Array) bBroader = bBroader[0] || null ;
                        console.log('bBroader:',bBroader)
                        
                        let cNode = getNodeById(_graph,bBroader) || null
                        console.log('cNode:',cNode)
                        // add to crumbs if not null
                        if (cNode != null) {
                            crumbNodes.push(cNode)
                        
                            if (cNode["skos:broader"] != null) {
                                let cBroader = cNode["skos:broader"] || null;
                                if (cBroader instanceof Array) cBroader = cBroader[0] || null ;
                                console.log('cBroader:',cBroader)
                                
                                let dNode = getNodeById(_graph,cBroader) || null
                                console.log('dNode:',dNode)
                                    
                                if (dNode != null) {
                                    crumbNodes.push(dNode)
                                        // if (dNode["skos:broader"] != null) {
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
        
        
        console.log('crumbNodes',crumbNodes)
        // aNode.crumbNodes = crumbNodes
        
        console.log('crumbNodes.length',crumbNodes.length)
        for (let c=crumbNodes.length; c>0; c--) {
            // console.log('c ',c)
            // console.log('c-1 crumbNodes[c-1]',c-1,crumbNodes[c-1])
            
            let crumbNode = crumbNodes[c-1]
            
            let crumbId = crumbNode["@id"]
            let crumbLabel =  crumbNode["skos:prefLabel"]  || crumbNode["rdfs:label"]
            let crumbDescription = crumbNode["dc:description"]
            
            let Crumb = {
                id: crumbId ,
                label: crumbLabel ,
                description: crumbDescription 
            }
            
            CrumbTrail.push(Crumb)
            
        }
        
        
        aNode.CrumbTrail = CrumbTrail
        
       
    } catch (e) {
        console.error(dtstamp(),'getBreadCrumb error',e)
              	
    } finally {
        
      	console.log(dtstamp(),'ending getBreadCrumb')
      	console.log('CrumbTrail',CrumbTrail)
      	if (cb) cb(CrumbTrail)
      	return CrumbTrail
          	
    } // end try catch    
} //end getBreadCrumb
      
      
function makeBreadCrumbs(_graph,cb) {
    console.log(dtstamp(),'starting makeCrumbs')
    let Crumbs = [] ;
      
    try {
       
        let crumb = {} 
        
        for (let n=0; n<_graph.length; n++) {
            let aNode = _graph[n] ;
            // console.log("aNode:",aNode)
            // aNode.breadcrumbs = [] ;

            getBreadCrumb(_graph,aNode)
        
        } // end for n
        
        Crumbs.push(crumb)
       
    } catch (e) {
        console.error(dtstamp(),'makeCrumbs error',e)
              	
    } finally {
        
      	console.log(dtstamp(),'ending makeCrumbs')
      	
      	if (cb) cb(Crumbs)
      	return Crumbs
          	
    } // end try catch    
} //end makeCrumbs
      
function makeTreeFromGraph(_graph,startid,cb) {
      console.log(dtstamp(),'starting makeTreeFromGraph')
    
      let Tree = [] ;
      
      try {
        
        // let tmp = []
        
        // get starting id node first
        let rootNode = getNodeById(_graph,startid)
        console.log('rootNode:',rootNode)
        
        // set root node of tree
        Tree = rootNode
        
        
        // FIRST LEVEL
        // (a) level
        rootNode.parentOf = [] ;
        for (let n=0; n<rootNode.children.length; n++) {
	          let aNodeId = rootNode.children[n] ;
	         // console.log("aNodeId:",aNodeId)
	          let aNode = getNodeById(_graph,aNodeId)
	         // console.log("aNode:",aNode)
	          rootNode.parentOf.push(aNode)
	          aNode.parentOf = [] ;
	          
            
            
            // then do next (b) level...
            let aChilderen = aNode.children || []  // in case it does not exist
            for (let p=0; p<aChilderen.length; p++) {
  	          let bNodeId = aNode.children[p] ;
  	          let bNode = getNodeById(_graph,bNodeId)
  	          aNode.parentOf.push(bNode)
  	          bNode.parentOf = [] ;
  	         // console.log("bNode:",bNode)
  	          
              
              
              // then do next (c) level...
              let bChilderen = bNode.children || []  // in case it does not exist
              for (let p=0; p<bChilderen.length; p++) {
    	          let cNodeId = bNode.children[p] ;
    	          let cNode = getNodeById(_graph,cNodeId)
    	          bNode.parentOf.push(cNode)
    	          cNode.parentOf = [] ;
    	         // console.log("cNode:",cNode)
    	          
            
                
              } // end for
            } // end for
            
        } // end for
        
        
    } catch (e) {
        console.error(dtstamp(),'makeTreeFromGraph error',e)
          	
    } finally {
          
        
      	console.log(dtstamp(),'ending makeTreeFromGraph')
      	
      	if (cb) cb(Tree)
      	return Tree
          	
    } // end try catch    
} //end makeTreeFromGraph
  



//
// get child nodes of node and add ids to group
//
function getChildren(graph, node) {
    // console.log('getChildren')
    // console.log('getChildren of node',node)
    
    let parent_id = node.id || node['@id'];
    // if (parent_id === "foafiaf:Mission_Value_0") console.log('getChildren node',node)
    
    let childNodeIds = [];
    
    // if parant of...
    let childids1 = getChildNodeIds(node) ;
    // console.log('childids1',childids1)
    for (let x=0; x<childids1.length; x++) {
        if (childids1[x] != null) {
            if (!childNodeIds.includes(childids1[x])) {
                childNodeIds.push(childids1[x]);
            }  
        }
    }
    
    // if child of...
    let childids2 = getNodesByParentId(graph, parent_id) ;
    // console.log('childids2',childids2)
    for (let y=0; y<childids2.length; y++) {
        if (childids2[y] != null) {
            if (!childNodeIds.includes(childids2[y])) {
                childNodeIds.push(childids2[y]);
            }  
        }
    }
    
    // console.log(' childNodeIds', childNodeIds)
    // if (parent_id === "foafiaf:Scorecard_Adjacency") console.log('getChildren childNodeIds',childNodeIds)
    
    return childNodeIds
} // end getChildren



// get array of ids for child nodes of node
function getChildNodeIds(node) {        // get nodes are childeren if not narrower
    // console.log('getChildNodeIds')
    // console.log('getChildNodeIds',node)

    let NodeIds = []
    
    let parent_id = node.id || node['@id'];
    
    let _narrower = node.narrower || node['skos:narrower'] || null;
    let _supports = node.supports || node['skos:supports'] || null;
    
    // if narrower add appropriate ids
    if (_narrower != null)  {
        
        if ( (typeof _narrower) === 'string') {	
            let _nn = _narrower ;
            // console.log('_nn', _nn)
            NodeIds.push(_nn) ;
            
        } else {
            // console.log('_narrower.length',_narrower.length)
            for (let n = 0; n < _narrower.length; n++) {
                let _nn = _narrower[n]
                // console.log('_nn', _nn)
                NodeIds.push(_nn) ;
            }
        }
    } // end if _narrow
    
    // if supports add appropriate ids
    if (_supports != null)  {
        
        if ( (typeof _supports) === 'string') {	
            let _ss = _supports ;
            // console.log('_ss', _ss)
            NodeIds.push(_ss) ;
            
        } else {
            // console.log('_supports.length',_supports.length)
            for (let s = 0; s < _supports.length; s++) {
                let _ss = _supports[s]
                // console.log('_ss', _ss)
                NodeIds.push(_ss) ;
            }
        }
    } // end if _narrow

    // console.log('getChildNodeIds child NodeIds', NodeIds)
    return NodeIds;
} // end getChildNodeIds




function getParents(graph, node) {
    // console.log('getParents')
    let node_id = node.id || node['@id'];

    let parentNodeIds = [];

    let parentIds1 = getParentNodeIds(graph,node_id) ;
    // console.log('parentIds1',parentIds1)
    for (let x=0; x<parentIds1.length; x++) {
        if (parentIds1[x] != null) {
            if (!parentNodeIds.includes(parentIds1[x])) {
                parentNodeIds.push(parentIds1[x]);
            }  
        }
    }
    
    // if (parentNodeIds.length>0) console.log('node_id parentIds',node_id,parentNodeIds)
    return parentNodeIds
} // end getParents


function getNodesByParentId(graph, parent_id) {        // get nodes that have parent of parent_id  then add supports, predeccesor .... if not broader
    // console.log('getNodesByParentId')
    // console.log('getNodesByParentId parent_id: ', parent_id)
    
    let NodeIds = []
     // loop over nodes to determine if parent_id is parent and add id, group, title, label
	  for (let i = 0; i < graph.length; i++) {
	      let node = graph[i]
	   //   console.log('getNodesByParentId parent node: ',node)
  		  let _id = graph[i]['@id'];
  		// let _type = graph[i]['@type'];
  		// let _dbotype = graph[i]['dbo:type'] || null;
  		
  		    // let _scheme = graph[i]['skos:inScheme'] || null;
          let _broader = graph[i]['skos:broader'] || null;
          let _monitors = graph[i]['foafiaf:monitors'] || node['foafiaf:Monitors'] || null;
          let _supports = graph[i]['foafiaf:supports'] || node['foafiaf:Supports'] || null;
        //   let _predecessor = graph[i]['tmo:PredecessorDependency'] || null;
          // let _seccessor = graph[i]['tmo:SuccessorDependency'] || null;
          
          // let _scorecard = graph[i]['foafiaf:Scorecard'] || null;
          // let _measure = graph[i]['foafiaf:Measure'] || null;
          // let _project = graph[i]['foafiaf:Project'] || null;
          // let _strategy = graph[i]['foafiaf:Strategy'] || null;
          // let _spoke = graph[i]['foafiaf:Spoke'] || null;
          // let _segment = graph[i]['foafiaf:Segment'] || null;
          let _parent = graph[i]['foafiaf:Parent'] || null;
          let _parents = graph[i]['foafiaf:Parents'] || null;
          
          let addNode = false;
          
          if ( !(_id === parent_id) ) {              // filter our self as parent
              
              if (_parent === parent_id) {                                       // else if broader == parent then add node as a childe
                  addNode = true;
              }
              
              if (_parents != null)  {
                  // console.log('_parents.length',_parents.length)
                  for (let n = 0; n < _parents.length; n++) {
                      let _nn = _parents[n]
                      console.log('_nn', _nn)
                      if ( _nn === parent_id ) {
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
          
          if ( addNode ) {
              // console.log('_id ', _id)
              NodeIds.push(_id)
          }
          
  } // end for

//   console.log('getNodesByParentId  NodeIds: ',NodeIds)
  return NodeIds;
	
} // end getNodesByParentId	

  
function getParentNodeIds(graph, node_id) {        // get node ids that are parents of node
    // console.log('getParentNodeIds')
    // console.log('getParentNodeIds', node_id)
    
    let NodeIds = [] ;
    
    // loop over nodes to determine parent and and add ids
  	for (let i = 0; i < graph.length; i++) {
    	let _id = graph[i]['@id'];
    	let _broader = graph[i]['skos:broader'] || null;
        let _parent = graph[i]['foafiaf:Parent'] || null;
        let _parents = graph[i]['foafiaf:Parents'] || null;
          
        if ( (_id === node_id) ) {              // filter on node_id node
          
              NodeIds.push(_parent) ;
              
              if (_parents != null)  {
                  if ( (typeof _parents) === 'string') {	
                          NodeIds.push(_parents) ;
                          // if (node_id === "foafiaf:Scorecard_Strong_Economy") console.log('_id _parents',_id,_parents)
                  } else {
                      // console.log('_parents.length',_parents.length)
                      for (let n = 0; n < _parents.length; n++) {
                          NodeIds.push(_parents[n]) ;
                          // if (node_id === "foafiaf:Scorecard_Strong_Economy") console.log('_id _parents[n]',_id,_parents[n])
                      }
                  }
              } // end if _parents
              
              
              if (_broader != null)  {
                  if ( (typeof _broader) === 'string') {	
                          NodeIds.push(_broader) ;
                          // if (node_id === "foafiaf:Scorecard_Strong_Economy") console.log('_id _broader',_id,_broader)
                  } else {
                      // console.log('_broader.length',_broader.length)
                      for (let n = 0; n < _broader.length; n++) {
                          NodeIds.push(_broader[n]) ;
                          // if (node_id === "foafiaf:Scorecard_Strong_Economy") console.log('_id _broader[n]',_id,_broader[n])
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
		
		var obj = _nodes;
// 		var targetProp = 'id'
		var targetProp = '@id'
		var targetValue = _id
		var finalResults = [];
		var result = findFirstObject(obj, targetProp, targetValue, finalResults)

		theNode = finalResults[0] || null ;
		
// 		console.log('theNode',theNode)
// 		return theNode

	}
	catch(e) {
	    console.error(Math.floor(Date.now() / 1000), e)
	} 
	finally {
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
    let result = null;
    if (theObject instanceof Array) {
      for (let i = 0; i < theObject.length; i++) {
        getObject(theObject[i]);
      }
    }
    else {
      for (let prop in theObject) {
        if(theObject.hasOwnProperty(prop)){
          if (prop === targetProp) {
            // console.log('--found id');
            if (theObject[prop] === targetValue) {
            //   console.log('----found porop', prop, ', ', theObject[prop]);
              finalResults.push(theObject);
              
              // return after first find... a change from original
              return theObject
              
            }
          }
          if (theObject[prop] instanceof Object || theObject[prop] instanceof Array){
            getObject(theObject[prop]);
          }
        }
      }
    }
  }

  getObject(obj);

}