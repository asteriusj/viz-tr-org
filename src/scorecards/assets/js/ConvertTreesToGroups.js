console.log('loading ConvertTreesToGroups')///////////////////////////////////////////////////////////////////////////////////    
            //
            // Convert Tree to Groups
            //
            // old
            // {
            // "children": [
            //   {
            //     "id": "foafiaf:Scorecard_Top_25",
            //     "name": "Top 25",
            //     "children": [
            
            // new
            // {
                // "id": "foafiaf:Indicator_%_Ready_for_College_Coursework_",
                // "label": "% Ready for College Coursework",
                // "name": "% Ready for College Coursework",
                // "full": "% Ready for College Coursework - Informs us of high school graduate who are ready for college when they first enter into a school",
                // "description": "Informs us of high school graduate who are ready for college when they first enter into a school",
                // "polarity": null,
                // "weight": 5,
                // "status": null,
                // "gcolor": "#ffffff",
                // "units": null,
                // "target": null,
                // "value": null,
                // "datatrend": null,
                // "rank": null,
                // "ranktrend": null,
                // "ingroup": "foafiaf:Scorecard_Education",
                // "group": "foafiaf:Scorecard_Education",
                // "parent": null,
                
function T2G(data,cb) {

            
            
            // convert function that lookps and call processor
            // called by starting root node
            //traverse tree and add/change property names

            let _root = data['children']
            console.log('_root',_root);    
            
            // set counter initial vals
            let BRANCH = 0
            let LEAF = 0
            let NUM = -1
            
            //
            // initial call processing function for nodes and callback function
            //
            processTreeNode(_root[0], 0, function(err,DATA){
                if(err) console.error(err)
                
                console.log('RETURN processTreeNode call -> DATA:',DATA)
                console.log('NUM BRANCH LEAF ::',NUM, BRANCH, LEAF)
              
            }) // end call processTreeNode
            let groups = [ _root[0] ];
            console.log("After Process call groups:",groups)
            console.log('NUM BRANCH LEAF ::',NUM, BRANCH, LEAF)   
    
    // after processing action 
    var res = sessionStorage.setItem('groups', JSON.stringify(groups));
    console.log("sessionStorage.setItem('groups'",res)
    drawCards(groups)
    //
                
            //
            // utility function to proces process a single node
            // convert groups to parent, name to label, parent_id to parnt
            //
            function processTreeNode(_node, _level, cb) {
                // console.log('processTreeNode _node: _level:',_node,_level);
                
                // increment node counter
                NUM = NUM + 1;
                // console.log('NUM: ',NUM)
                
                let newNode         = _node;
                newNode.label       = _node.name;
                newNode.parent      = _node.parent_id;
                newNode.groups      = _node.children;
                
                newNode.full        = _node.full || "";
                newNode.description = _node.description || "";
                newNode.polarity    = _node.polarity || null;
                newNode.weight      = _node.weight || null;
                newNode.status      = _node.status || null;
                newNode.gcolor      = _node.gcolor || null;
                newNode.units       = _node.units || null;
                newNode.target      = _node.target || null;
                newNode.datatrend   = _node.datatrend || null;
                newNode.rank        = _node.rank || null;
                newNode.ranktrend   = _node.ranktrend || null;
                newNode.ingroup     = _node.ingroup || null;
                newNode.group       = _node.group || null;
                newNode.parent      = _node.parent || null;
                
                newNode.BRANCH = BRANCH;
                newNode.LEVEL = _level;
                newNode.PROCESSED = true;
                newNode.NUM = NUM;
                newNode.NTYPE = null;
                
                // console.log('converted newNode:', newNode)
                
                //
                // recursively call function for node children
                //
                let newNodeGroups = newNode.groups
                // console.log('newNodeGroups:',newNodeGroups)
                
                //
                // if no children/groups set node type to leaf and retrun to caller
                // if children set node type to branch and recriesively call processer
                //
                if ( (newNodeGroups != undefined) && (newNodeGroups.length > 0)) {
                    
                    // set nodetype as branch because has children
                    newNode.NTYPE = 'branch'
                    BRANCH = BRANCH + 1; // new branch
                    // console.log('BRANCH:',BRANCH)
                    
                    for (let g=0; g<newNodeGroups.length; g++) {
                          let groupNode = newNodeGroups[g]
                          // console.log('groupNode:',groupNode)
                
                          //
                          // recursively call processor
                          //
                          processTreeNode(groupNode, _level + 1, function(err,results){
                              if(err) console.error(err)
                              
                              // console.log('end of branch groupNode results:',results)
                              // if (cb) cb(null, results)
                              return
              
                          }) // end call processTreeNode
                          
                    } // end for 
                    
                } else {
                    // console.log(' - else newNodeGroup is empty or undefined _node',_node)
                    // recursive on banch complete - return to caller
                    
                    // set nodetype as leaf because has children thus end of branch
                    newNode.NTYPE = 'leaf'
                    LEAF = LEAF + 1; // new branch
                    // console.log('LEAF:',LEAF)
                    
                    // console.log('calling callback -> newNode:',newNode)
                    // if (cb) cb(null, newNode)
                    return;
                  
                }// end if
                
            }; 
            //
            // end processTreeNode utility function
            //    
    
      ///////////////////////////////////////////////////////////////////////////////////            
           
                
                
                
                
                
                
                
                // console.log('transforing Groups from data:',data)
                
                // var groups = transformGroups(data,"", function(transformed) {
                    
                //     let d = new Date();
                //   	let returned  = new Date().getTime();
                // //   	console.log('returned',returned)
                  	
                // //   	console.log('transformed:',transformed)
                  	
                //   	var groups = transformed.groups;
                  	
                //     console.log('transformed Groups JSON:',JSON.stringify(groups))
                //     console.log('transformed Groups:',groups)
                
                //     var res = sessionStorage.setItem('groups', JSON.stringify(groups));
                    
                    
                //     console.log("sessionStorage.setItem('groups'",res)
                
                //     drawCards(groups)
                    //
                    //
                    // myPopupClose()
                    
                // })
                
} // end T2G