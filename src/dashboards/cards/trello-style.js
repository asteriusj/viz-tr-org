console.log('loading trello-style.js... ')
console.log('trello-style.js v.2019.07.07.13.58')

// retrieve url params
var urlParams = new URLSearchParams(window.location.search);
if (DoNotCache === undefined) var DoNotCache = urlParams.get('nocache') || urlParams.get('DoNotCache') || null;
if (RefreshAll === undefined) var RefreshAll = urlParams.get('refresh') || urlParams.get('RefreshAll') || null;
if (RefreshAll) {
    console.log('trello-style.js RefreshAll:', RefreshAll)
    sessionStorage.clear();
    // console.log('sessionStorage:',sessionStorage)
}
console.log('trello-style.js DoNotCache:', DoNotCache)
console.log('trello-style.js RefreshAll:', RefreshAll)


function embed() {


    //
    //  get jsontree data from sessionStorage or get indictaor data transform into tree
    //
    //Check for session storage
    let jsontree = JSON.parse(sessionStorage.getItem('jsontree')) || null;
    if (DoNotCache) jsontree = null;
    console.log('trello-style.js jsontree from sessionStorage: ', jsontree)

    // check for jsontree before proccesing, else get it!
    if (jsontree != null) {

        // let root = jsontree.children[0]
        drawOutcomeCards(jsontree)

    }
    else {

        // var treeurl = 'https://phlh4tx1wl.execute-api.us-east-1.amazonaws.com/dev/entities//TREE'
        var treeurl = 'https://phlh4tx1wl.execute-api.us-east-1.amazonaws.com/dev/entities/1Vod362xQ__GehFbVfO3FrgN0Nawu4Nv74DeC5yPjjfw/TREE'
        // console.log('treeurl:',treeurl)

        fetch(treeurl)

            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                // console.log('data',data);
                // console.log(JSON.stringify(data));

                let _root = data['children']
                console.log('_root', _root);

                //
                // utility function to proces process a single node
                // convert groups to parent, name to label, parent_id to parnt
                //

                // set counter initial vals
                let BRANCH = 0
                let LEAF = 0
                let NUM = -1

                //
                // initial call processing function for nodes and callback function
                //
                processTreeNode(_root[0], 0, function(err, DATA) {
                    if (err) console.error(err)

                    console.log('RETURN processTreeNode call -> DATA:', DATA)
                    console.log('NUM BRANCH LEAF ::', NUM, BRANCH, LEAF)

                }) // end call processTreeNode
                let groups = [_root[0]];
                console.log("After Process call groups:", groups)
                console.log('NUM BRANCH LEAF ::', NUM, BRANCH, LEAF)

                //console.log("After Process Tree Node call groups:",groups)
                let Spoke_0 = groups[0]
                // console.log('Spoke_0',Spoke_0)

                //
                // loop over spoke0 children to find Outcomes
                // put in _Outcomes array
                //
                let _Outcomes = [];

                var sChildren = Spoke_0.children;
                // console.log('sChildren:',sChildren)

                for (var s = 0; s < sChildren.length; s++) {
                    var sChild = sChildren[s];
                    // console.log('sChild:',sChild)

                    var sChildChildren = sChild.children;
                    for (i = 0; i < sChildChildren.length; i++) {
                        var sChildChild = sChildChildren[i]

                        if (sChildChild.dbotype == 'foafiaf:Outcomes') {
                            // console.log('sChildChild:',sChildChild)
                            _Outcomes.push(sChildChild);
                        }; // end if
                    }; //end for i
                }; // end for s

                // console.log('trello-style.js _Outcomes:',_Outcomes)


                // after processing Outcomes 
                var Tree = _Outcomes
                // console.log('trello-style.js Tree):',Tree)
                var res = sessionStorage.setItem('jsontree', JSON.stringify(Tree));
                console.log("sessionStorage.setItem 'jsontree' ", res)

                drawOutcomeCards(Tree)


                //
                // utility function to proces process a single node
                // convert groups to parent, name to label, parent_id to parnt
                //
                function processTreeNode(_node, _level, cb) {
                    // console.log('processTreeNode _node: _level:',_node,_level);

                    // increment node counter
                    NUM = NUM + 1;
                    // console.log('NUM: ',NUM)

                    let newNode = _node;
                    newNode.label = _node.name;
                    newNode.parent = _node.parent_id;
                    newNode.groups = _node.children;

                    newNode.full = _node.full || "";
                    newNode.description = _node.description || "";


                    newNode.weight = _node.weight || null;
                    newNode.status = _node.status || null;
                    newNode.gcolor = _node.gcolor || null;

                    newNode.polarity = _node.polarity || null;
                    newNode.units = _node.units || null;
                    newNode.target = _node.target || null;
                    newNode.value = _node.datavalues;
                    newNode.year = _node.year;
                    newNode.datatrend = _node.datatrend || null;

                    newNode.fiveyearvalue = _node.fiveyearvalue;
                    newNode.fiveyearquartile = _node.fiveyearquartile;
                    newNode.fiveyearrank = _node.fiveyearrank;

                    newNode.rank = _node.rank || null;
                    newNode.ranktrend = _node.ranktrend || null;

                    newNode.ingroup = _node.ingroup || null;
                    newNode.group = _node.group || null;
                    newNode.parent = _node.parent || null;

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
                    if ((newNodeGroups != undefined) && (newNodeGroups.length > 0)) {

                        // set nodetype as branch because has children
                        newNode.NTYPE = 'branch'
                        BRANCH = BRANCH + 1; // new branch
                        // console.log('BRANCH:',BRANCH)

                        for (let g = 0; g < newNodeGroups.length; g++) {
                            let groupNode = newNodeGroups[g]
                            // console.log('groupNode:',groupNode)

                            //
                            // recursively call processor
                            //
                            processTreeNode(groupNode, _level + 1, function(err, results) {
                                if (err) console.error(err)
                                // console.log('end of branch groupNode results:',results)
                                // if (cb) cb(null, results)
                                return
                            }) // end call processTreeNode

                        } // end for 

                    }
                    else {
                        // console.log(' - else newNodeGroup is empty or undefined _node',_node)
                        // recursive on banch complete - return to caller
                        // set nodetype as leaf because has children thus end of branch
                        newNode.NTYPE = 'leaf'
                        LEAF = LEAF + 1; // new branch
                        // console.log('LEAF:',LEAF)
                        // console.log('calling callback -> newNode:',newNode)
                        // if (cb) cb(null, newNode)
                        return;

                    } // end if


                };

                //
                // end processTreeNode utility function
                //    


            }); // end fetch

    }; // end else if Groups null




    //
    //
    //
    function drawOutcomeCards(jsontree) {
        console.log('drawOutcomeCards Tree:', jsontree)


        //
        //  create wrapper html and append to page
        //
        var cardsDiv = document.getElementById("cardsdiv");

        var newSectionNode = document.createElement('section');
        var newSectionNodeId = "section_";
        newSectionNode.setAttribute("id", newSectionNodeId);
        newSectionNode.setAttribute("class", "wrapper");
        cardsDiv.appendChild(newSectionNode)

        var sectionDiv = document.getElementById(newSectionNodeId);

        var topUlNode = document.createElement('ul');
        var topUlNodeId = "column__list_";
        topUlNode.setAttribute("id", topUlNodeId);
        topUlNode.setAttribute("class", "column__list");
        sectionDiv.appendChild(topUlNode)

        var topUlDiv = document.getElementById(topUlNodeId);

        let gOutcomeItems = jsontree
        // console.log('gOutcomeItems:',gOutcomeItems)

        if (gOutcomeItems.length > 0) {
            for (let g = 0; g < gOutcomeItems.length; g++) {
                let gOutcome = gOutcomeItems[g]
                // console.log('gOutcome:',gOutcome)

                //
                //  create li for outcome content
                //

                var newLiNode = document.createElement('li');
                var newLiNodeId = "column__item_" + gOutcome.id;
                newLiNode.setAttribute("id", newLiNodeId);
                newLiNode.setAttribute("class", "column__item");
                topUlDiv.appendChild(newLiNode)

                var newLiContainer = document.getElementById(newLiNodeId);

                var outcomeHTML = createOutcomeHTML(gOutcome)

                newLiContainer.innerHTML = outcomeHTML;


                //
                // loop over gOutcomeChildren
                //

                let gOutcomeChildren = gOutcome.children || [];
                // console.log('gOutcomeChildren:',gOutcomeChildren)

                if (gOutcomeChildren.length > 0) {
                    for (let t = 0; t < gOutcomeChildren.length; t++) {
                        let gMetric = gOutcomeChildren[t]
                        // console.log('gMetric:',gMetric)

                        if ((gMetric.id != "") && (gMetric.datavalues != undefined)) {
                            // console.log('id not blank:',gMetric)

                            var cardsContainerId = 'card__list_' + gOutcome.id
                            var cardsContainer = document.getElementById(cardsContainerId);

                            // create new li code for metric then append to container
                            let cardHTML = createCardHTML(gMetric)
                            // console.log('cardHTML',cardHTML)

                            var newCardNode = document.createElement('li');
                            var newCardNodeId = 'card__list_' + gMetric.id
                            newCardNode.setAttribute("id", newCardNodeId);
                            newCardNode.setAttribute("class", "card__item");
                            newCardNode.innerHTML = cardHTML;

                            cardsContainer.appendChild(newCardNode)
                            // console.log('cardsContainer:',cardsContainer)

                        }

                    } // end for gMetric
                } // end if gOutcomeChildren


            } // end for gOutcomeItems
        } // end if gOutcomeItems

    } // end function drawOutcomeCards


    // function createWrapperHTML(group) {

    //     let wrapperHTML = "" ;   

    //     wrapperHTML += ' <section class="wrapper"> '
    //     wrapperHTML += '  <ul class="column__list"> '
    //     // wrapperHTML += '  <ul id="ul_column_' + group.id + '" class="column__list"> '


    //     // wrapperHTML += '   <li id="li_column_' +  group.id + '" class="column__item"> '
    //     // wrapperHTML += '    <div class="column__title--wrapper"> '
    //     // wrapperHTML += '      <h2>' + getGrpPrefLabel(group) + '</h2><br><p>' + getGrpTitle(group) + '</p><i class="fas fa-ellipsis-h"></i> '
    //     // wrapperHTML += '    </div> '

    //     // wrapperHTML += '    <ul id="ul_cards_' + group.id + '" class="card__list"> '
    //     // wrapperHTML += '    </ul> '

    //     // wrapperHTML += '   </li> '

    //     wrapperHTML += '  </ul> '
    //     wrapperHTML += ' </section> '

    //     wrapperHTML += "" ;

    //     // console.log('wrapperHTML:',wrapperHTML)       
    //     return wrapperHTML ;
    // }   
    // function createThemeHTML(group) {
    //     let _id = "theme_" + group.id
    //     let _color = group.gcolor || ""

    //     let themeHTML = "" ;

    //     themeHTML += ' <div class="themelabel" style="background-color:'+ _color + '" >' + getGrpFull(group)  + '</div>  '

    //     themeHTML += "" ;

    //     // console.log('themeHTML:',themeHTML)       
    //     return themeHTML ;
    // }
    function createOutcomeHTML(group) {

        let outcomeHTML = "";

        outcomeHTML += '    <div class="column__title--wrapper"> '
        outcomeHTML += '      <h2>' + getGrpPrefLabel(group) + '</h2> <i class="fas fa-ellipsis-h"></i> '
        outcomeHTML += '    </div> '

        outcomeHTML += '    <div> '
        outcomeHTML += '      <br/><p>' + getGrpTitle(group) + '</p><br/> '
        outcomeHTML += '    </div> '



        outcomeHTML += '    <ul id="card__list_' + group.id + '" class="card__list"> '

        outcomeHTML += '    </ul> '


        outcomeHTML += '    <div class="column__item--cta"> '

        outcomeHTML += '      <i class="fas fa-plus"></i> '
        outcomeHTML += '      <h4>XXX YYY ZZZ</h4> '
        // outcomeHTML += '      <h2>' + getGrpPrefLabel(group) + '</h2><br><p>' + getGrpTitle(group) + '</p><i class="fas fa-ellipsis-h"></i> '

        outcomeHTML += '    </div> '

        outcomeHTML += "";

        // console.log('outcomeHTML:',outcomeHTML)       
        return outcomeHTML;
    }

    function createCardHTML(metric) {
        // console.log('createCardHTML metric ', metric)
        let _id = "metric_" + metric.id
        // console.log('_id:',_id)


        let cardHTML = "";


        if (metric.year) cardHTML += ' <span class="card__tag card__tag--low">' + metric.year + '</span> '
        if (metric.theme) cardHTML += ' <span class="card__tag card__tag--browser">' + metric.theme + '</span> '
        if (metric.category) cardHTML += ' <span class="card__tag card__tag--design">' + metric.category + '</span> '



        // START CARD

        // cardHTML +=   ' <h4 class="card__title">' + getGrpLabel(metric) + '</h5>  '
        cardHTML += ' <h4 class="card__title">' + getGrpPrefLabel(metric) + '</h5>  '

        if (metric.description) cardHTML += ' <span id="grpDescription"   class="card__description" >' + getGrpDescription(metric) + '</span>  '


        if (metric.value) cardHTML += ' <span id="grpValue"             class="card__el" >' + getGrpValue(metric) + '</span>  '

        if (metric.status) cardHTML += ' <span id="grpStatus"            class="card__el" >' + getGrpStatus(metric) + '</span>  '

        if (metric.datatrend) cardHTML += ' <span id="grpTrend"             class="card__el" >' + getGrpTrend(metric) + '</span>  '

        if (metric.rank) cardHTML += ' <br/><span id="grpRank"          class="card__el" >' + getGrpRank(metric) + '</span>  '

        if (metric.ranktrend) cardHTML += ' <br/><span id="grpTrendRank"     class="card__el" >' + getGrpTrendRank(metric) + '</span>  '


        if (metric.definition) cardHTML += ' <br/><span id="grpDefinition"     class="card__el" >' + metric.definition + '</span>  '



        //
        // insert dial control
        //
        var dial_value = metric.datavalues.split('i')[0];
        var dial_units = metric.units || "";
        var dial_stroke_dasharray = '99, 100';
        var dial_fill_color = "circular-chart blue";

        let dialHTML = "";

        dialHTML += ' <link rel="stylesheet" href="../dials/dial.css" /> ';
        dialHTML += ' <script src="../dials/dial.js"></script> ';
        dialHTML += ' <div class="single-chart container-metric-dial" style="max-width: 100%; min-width: 100%;"> ';
        dialHTML += '     <svg id="svg_color" viewBox="0 0 36 36" class="' + dial_fill_color + '"> ';
        dialHTML += '       <path id="svg_path_circle_bg" class="circle-bg" ';
        dialHTML += '         d="M18 2.0845 ';
        dialHTML += '           a 15.9155 15.9155 0 0 1 0 31.831 ';
        dialHTML += '           a 15.9155 15.9155 0 0 1 0 -31.831" ';
        dialHTML += '       /> ';
        dialHTML += '       <path id="svg_path_circle" class="circle" ';
        dialHTML += '         stroke-dasharray="' + dial_stroke_dasharray + '" ';
        dialHTML += '         d="M18 2.0845 ';
        dialHTML += '           a 15.9155 15.9155 0 0 1 0 31.831 ';
        dialHTML += '           a 15.9155 15.9155 0 0 1 0 -31.831" ';
        dialHTML += '       /> ';
        dialHTML += '       <text id="svg_text_percentage" x="18" y="20.35" class="percentage">' + dial_value + '</text> ';
        cardHTML += '     </svg> ';
        dialHTML += ' </div> ';
        dialHTML += ' <div id="insertContentCallback" class="insertContentCallbacks" style="visibility: hidden; display: none; color: #fff;">updateDialFunctions()</div> ';


        // end insert dial control


        cardHTML += ' <br> '
        cardHTML += ' <ol class="card__actions"> '
        cardHTML += '   <li class="card__actions--wrapper"> '
        cardHTML += '       <i class="fas fa-align-left"></i> '
        cardHTML += '   </li> '
        cardHTML += ' </ol> '



        // END CARD

        // console.log('cardHTML:',cardHTML)       
        return cardHTML;
    }


    // prep title of element 
    function getText(d) {
        // var txt = d.depth ? d.name.split(" ")[0] : "" ;
        // //console.log('txt', txt)
        // return txt;
    };
    // prep title of element 
    function getLabel(t) {
        //console.log(t)

        var _label = t.data.label || null;

        return _label
    };

    // prep title of element 
    function getTitle(t) {
        // console.log('getTitle t:',t)
        // title content for mouseover

        // var _dbotype = t.dbotype || "";
        // var _group = t.group || "";
        var _name = t.data.name || "";
        var _label = t.data.label || _name;
        var _description = t.data.description || "";
        var _datavalues = t.data.datavalues || "";
        // // var _startdate = t.startdate || "";
        // // var _status = t.status || "";
        // //var _colour = t.colour || "";
        // var _color = t.color || "" ;
        // var _id = t.id || "";

        // var _title =  _group + ": " + _label + "\n" + _description + _color + "\n" ;
        var _title = _label + ": " + _description + '     ' + _datavalues + "\n";
        // console.log('_title', _title)
        return _title
    };

    // prep previw of element contents
    function getDetails(t) {
        console.log('getDetails', t)
        // title content for mouseover

        var _dbotype = t.dbotype || "";
        var _group = t.group || "";
        var _name = t.name || "";
        var _label = t.label || _name;
        var _description = t.description || "";
        // var _startdate = t.startdate || "";
        // var _status = t.status || "";
        //var _colour = t.colour || "";
        var _color = t.color || "";
        var _id = t.id || "";

        var _preview = "<h3>" + _label + "</h3>" + "\n\n<p>" + _description + _color + "</p>\n\n";
        //console.log('_preview', _preview)
        return _preview
    };

    function getGrpLabel(group) {
        return group.label || group.title;
    }

    function getGrpPrefLabel(group) {
        return group.preflabel || group.label;
    }

    function getGrpFull(group) {
        let _full = group.full || null;
        if (_full != null) {
            group.full = group.full.replace("- null", "")
            return group.full;
        }
        else {
            return ""
        }
    }

    function getGrpTitle(group) {
        let _title = group.title || null;
        if (_title != null) {
            return group.title;
        }
        else {
            return ""
        }
    }

    function getGrpDescription(group) {
        let _description = group.description || null;
        if (_description != null) {
            return group.description;
        }
        else {
            return ""
        }
    }

    function getGrpStatus(group) {
        let _status = group.status || null;
        if (_status != null) {
            return '<em>status:</em> <span style="display: inline-block; width: 10px;"></span>    <span id="statusText" ><font color="' + group.status + '">' + group.status + '</font></span>';
        }
        else {
            return ""
        }
    }

    function getGrpValue(group) {
        let _value = group.value || null;
        let yr = group.year || null;
        if ((!_value.includes('in')) && (yr != null)) {
            // console.log(_value.includes('in')? 'is' : 'is not')
            _value = _value + ' in ' + yr;


        }

        if (_value != null) {
            return '<i>value:</i>  ' + _value;
        }
        else {
            return ""
        }
    }
    //
    // !!! add condition of increasing red and decresing green !!
    //
    //
    function getGrpTrend(group) {
        let _datatrend = group.datatrend || null;
        if ((_datatrend != null) && (_datatrend != undefined)) {
            let _ico = null
            if (_datatrend.includes('Better')) _ico = '&nbsp; <i class="fas fa-arrow-up    fa-2x"  title="' + _datatrend + '" aria-hidden style="color: Green;"></i>'
            if (_datatrend.includes('Steady')) _ico = '&nbsp; <i class="far fa-arrow-alt-circle-right fa-2x"  title="' + _datatrend + '" aria-hidden style="color: Black;"></i>'
            if (_datatrend.includes('Worse')) _ico = '&nbsp; <i class="fas fa-arrow-down  fa-2x"  title="' + _datatrend + '"  aria-hidden style="color: Red;"></i>'
            if (_ico != null) return '<em>5-yr trend:</em> ' + _ico;
        }
        else {
            return ""
        }
    }

    function getGrpRank(group) {
        let _rank = group.rank || null;
        let yr = group.year || null;
        if ((!_rank.includes('in')) && (yr != null)) {
            // console.log(_rank.includes('in')? 'is' : 'is not')
            _rank = _rank + ' in ' + yr;
            console.log(_rank, yr)
            return '<em>rank:</em> ' + group.rank;

        }
        else if (_rank !== null) {
            return '<em>rank:</em> ' + group.rank;

        }
        else {
            return ""
        }
    }

    function getGrpTrendRank(group) {
        let _ranktrend = group.ranktrend || null;
        if ((_ranktrend != null) && (_ranktrend != undefined)) {
            let _rankico = null
            if (_ranktrend.includes('Better')) _rankico = '&nbsp; <i class="fas fa-arrow-up    fa-2x"  title="' + _ranktrend + '" aria-hidden style="color: Green;"></i>'
            if (_ranktrend.includes('Steady')) _rankico = '&nbsp; <i class="far fa-arrow-alt-circle-right fa-2x"  title="' + _ranktrend + '" aria-hidden style="color: Black;"></i>'
            if (_ranktrend.includes('Worse')) _rankico = '&nbsp; <i class="fas fa-arrow-down  fa-2x"  title="' + _ranktrend + '"  aria-hidden style="color: Red;"></i>'
            if (_rankico != null) return '<i>trend in rank:</i> ' + _rankico;
        }
        else {
            return ""
        }
    }


}; // end function embed
embed();
