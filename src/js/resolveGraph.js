/**
 * Semantic Graph Internal Relationship link resolver
 * Copyright 2018, Asterius Media LLC, All Rights Reserved.
 */
 'use strict';
function dtstamp() {
    let d = new Date();
    let dt  = new Date().getTime();
    return dt;
} 
let LD = {};

function resolveLinkedData(_ld, cb) {
    try {
        console.log(dtstamp(),'starting resolveLinkedData')
        
        let LD = _ld;
        // console.log('initial LD:',LD)
        let newGraph = [];
          
        let graph = LD["@graph"]
        for (let z = 0; z < graph.length; z++) {
    	    let node = graph[z]
            // console.log('z node',z,node)
            
            let _id = node['@id'];    
            
            if ( (_id != "./") && (_id != "") ) {
    
                let newNode = node ;
                // let newNode = prepNewNode(node) ;
                // console.log('returned newNode:',newNode)
                
                if (newNode != null) {
                  
                  var childIds = getChildren(graph, node)
                  if (childIds.length>0) {
                      // console.log('childIds',childIds)
                      newNode.children = childIds ;
                    
                      if (node["skos:narrower"] == ""){
                          node["skos:narrower"] = childIds ;
                      } else{
                          //
                          //process each and push
                          //
                      }
                  }
                  
                  var parentIds = getParents(graph, node)
                  console.log('resolveLinkedData parentIds: ',parentIds)
                  if (parentIds.length>0) {
                    // console.log('node parentIds',node,parentIds)
                    newNode.parents = parentIds;
                    
                    if (node["skos:broader"] == ""){
                          node["skos:broader"] = parentIds ;
                      } else{
                          //
                          //process each and push
                          //
                      }
                  }
                  
                
                //   console.log('newNode',newNode)
                  newGraph.push(newNode)
                  
                } // end if !null
    
            
            } // end if _id
        } // end for  
              
        // console.log('newGraph:',newGraph)  
        
        //
        // using new trimmed graph loop over nodes and links within to
        // test linkabilty and remove link with bad url or non-graph element
        //            
        
        for (let g = 0; g < graph.length; g++) {
    	    let node = graph[g]
    	    
            //test skos:broader
            let inscheme = node["skos:inScheme"] ;
            let n_inscheme = []
            if (Array.isArray(inscheme)) {
                for (let s=0; s<inscheme.length; s++) {
                    let link = inscheme[s];
                    if (testLinkability(newGraph,link)) {
                        n_inscheme.push(link) ;
                    }
                 } // end for s
            } else {
                if (testLinkability(newGraph,inscheme)) n_inscheme.push(inscheme) ;
            }    
            node["skos:inScheme"] = n_inscheme ;
        
            //test skos:broader
            let broader = node["skos:broader"] ;
            let n_broader = []
            if (Array.isArray(broader)) {
                for (let b=0; b<broader.length; b++) {
                    let link = broader[b];
                    if (testLinkability(newGraph,link)) {
                        n_broader.push(link) ;
                    }
                } // end for b
            } else {
                if (testLinkability(newGraph,broader)) n_broader.push(broader) ;
            }
            node["skos:broader"] = n_broader ;
        
        } // edn for g
        
        
        LD["@graph"] = newGraph ;
        // console.log('completed LD:',LD)
        if (cb) cb(LD)
  	    return LD
  	    
    } catch (e) {
        console.error(dtstamp(),'resolveLinkedData error',e)
      	
    } finally {

        console.log(dtstamp(),'ending resolveLinkedData')
        
      	
    } // end try catch    
} //end resolveLinkedData


   

function testLinkability(_nodes, link) {
// 	console.log('start testLinkability', link)
	try {
		var isLinkable = true;
		let id = getNodeById(_nodes,link)
		if ( id === null) {
		    isLinkable = false ;
		} else if ( id ) {
		    isLinkable = true ;
		}
	}
	catch(e) {
	    console.error(Math.floor(Date.now() / 1000),'testLinkability e:', e)
	} 
	finally {
		// finally
// 		console.log('finally testLinkability theNode',theNode)
		return isLinkable;
	}
} // end testLinkability
		
		
		