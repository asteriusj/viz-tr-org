console.log('loading metrics.js... ')
console.log('metrics.js v.2019.08.06.07.56')

// retrieve url params
var urlParams = new URLSearchParams(window.location.search);
if (DoNotCache === undefined) var DoNotCache = urlParams.get('nocache') || urlParams.get('DoNotCache') || null;
if (RefreshAll === undefined) var RefreshAll = urlParams.get('refresh') || urlParams.get('RefreshAll') || null;
if (RefreshAll) {
    console.log('metrics.jsRefreshAll:', RefreshAll)
    sessionStorage.clear();
    // console.log('sessionStorage:',sessionStorage)
}
console.log('metrics.jsDoNotCache:', DoNotCache)
console.log('metrics.jsRefreshAll:', RefreshAll)

var columnitem = urlParams.get('columnitem') || null;
console.log('columnitem', columnitem)
var carditem = urlParams.get('carditem') || null;
console.log('carditem', carditem)


function embed() {

    //
    //  get graph data from sessionStorage or get indictaor data transform into tree
    //
    //Check for session storage
    let graph = JSON.parse(sessionStorage.getItem('graph')) || null;
    if (DoNotCache) graph = null;
    console.log('metrics.js graph from sessionStorage: ', graph)

    // check for jsontree before proccesing, else get it!
    if (graph != null) {

        drawMetricCards(graph)

    }
    else {

        // var treeurl = 'https://phlh4tx1wl.execute-api.us-east-1.amazonaws.com/dev/entities//TREE'
        // var treeurl = 'https://phlh4tx1wl.execute-api.us-east-1.amazonaws.com/dev/entities/1Vod362xQ__GehFbVfO3FrgN0Nawu4Nv74DeC5yPjjfw/TREE'
        var jsonldurl = 'https://phlh4tx1wl.execute-api.us-east-1.amazonaws.com/dev/entities/1Vod362xQ__GehFbVfO3FrgN0Nawu4Nv74DeC5yPjjfw/JSONLD'
        // console.log('jsonldurl:',jsonldurl)

        fetch(jsonldurl)

            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log('data',data);
                // console.log(JSON.stringify(data));

                let graph = data['@graph']
                var res = sessionStorage.setItem('graph', JSON.stringify(graph));
                console.log("sessionStorage.setItem 'graph' ", res)
                drawMetricCards(graph)


            }); // end fetch

    }; // end else if Groups null



    //
    //
    function drawOneCard(json) {
        console.log('drawOneCard Tree:', json)
        console.log('carditem', carditem)

    }

    //
    //
    //
    function drawMetricCards(graph) {
        console.log('drawMetricCards json:', graph)


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
        console.log('sectionDiv:',sectionDiv)
        
        var topUlNode = document.createElement('ul');
        var topUlNodeId = "column__list_";
        topUlNode.setAttribute("id", topUlNodeId);
        topUlNode.setAttribute("class", "column__list");
        sectionDiv.appendChild(topUlNode)

        var topUlDiv = document.getElementById(topUlNodeId);
        // console.log('topUlDiv:',topUlDiv)


        let gMetricItems = graph
        // console.log('gMetricItems:',gMetricItems)

        // flag for url match for column item or card item
        let columnmatch = false;
        let cardmatch = false;
        
        //loop over metrics
        if (gMetricItems.length > 0) {
            // loop over metrics
            for (let g = 0; g < gMetricItems.length; g++) {
                let gMetric = gMetricItems[g]
                // console.log('g gMetric',g,gMetric)
                
                
                //
                // check for urlparam and check for matching element
                //
                var skipthisone = false;
                let strColumnitem = gMetric['dc:title'].split(' ').join('_')
                // console.log('strColumnitem', strColumnitem)
                
                if (columnitem != null) {
                    if (columnitem != strColumnitem ) {
                        // console.log(' NO Match', columnitem, strColumnitem )
                        // console.log('g gMetric',g,gMetric)
                
                        // skip this loop iteration and continue to next
                        // skipthisone = true;
                        continue;
                    } else {
                        console.log(" Match",columnitem,strColumnitem)
                        // console.log('g gMetric',g,gMetric)
                    
                        columnmatch = true;
                        
                    } // end of match
                    
                } else {
                    
                    
                } //
                
                
              if  ( ( gMetric['dbo:type'] == 'foafiaf:Measure' ) && (skipthisone == false) )  {
    
                gMetric.id = gMetric['@id']
                gMetric.dbotype = gMetric['dbo.type'] || "";
                gMetric.title = gMetric['dc:title'] || null;
                gMetric.description = gMetric['dc.description'] || null;
                
                gMetric.label = gMetric['rdfs:label'] || null;
                
                gMetric.datavalues = gMetric['foafiaf:datavalues']  || null;
                gMetric.year = gMetric['foafiaf:year']  || null;
                gMetric.theme = gMetric['foafiaf:Theme']  || null;
                gMetric.catagory = gMetric['foafiaf:category']  || null;
                gMetric.value = gMetric['foafiaf:datavalues']  || null;
                gMetric.status = gMetric['foafiaf:status']  || null;
                gMetric.target = gMetric['foafiaf:targetvalue']  || null;
                
                // console.log('gMetric:', gMetric)
                
             
             
                //
                //  create li for container content
                //

                var newLiNode = document.createElement('li');
                var newLiNodeId = "column__item_" + gMetric.title.split(' ').join('_');
                newLiNode.setAttribute("id", newLiNodeId);
                newLiNode.setAttribute("class", "column__item");
                // console.log('newLiNode:',newLiNode)

                // check to see if exists
                        
                var checkExisting = document.getElementById(newLiNodeId)
                if (checkExisting) {
                    // console.log('EXISTS',newLiNodeId)
                    
                } else {
                    
                    topUlDiv.appendChild(newLiNode)
                    var newLiContainer = document.getElementById(newLiNodeId);
                    var containerHTML = createTitleContainerHTML(gMetric)
                    newLiContainer.innerHTML = containerHTML;
            
                } // end if exists
                
                        
                        
                // then add metric specific cards                
                        
                //
                // check for urlparam and check for matching element
                //
                
                let skipcard = false;
                // let strCarditem = 'carditem=' + gMetric.id
                // console.log('strCarditem', strCarditem)
                
                
                if (carditem != null) {
                    
                    if (carditem === gMetric.id) {
                        console.log('Metric MATCH', carditem, gMetric.id)

                        cardmatch = true;
                        // set column items hidden at the end to ensure all and made hidden
                        // var elements = document.getElementsByClassName('column__item');
                        // console.log('column__item elemnts:',elements)
                        // for (var i = 0; i < elements.length; i++) {
                        //     elements[i].style.visibility = 'hidden';
                        // }
                    }
                    
                    if (carditem != gMetric.id) {
                        // console.log('Metric NO Match', carditem, gMetric.id)

                        // skip this loop iteration and continue to next
                        skipcard = true;
                        continue;

                    } // 

                } // end of carditem


                if ((gMetric.id != "") && (gMetric.datavalues != undefined) && (skipcard == false)  ) {
                    // console.log('id not blank:',gMetric)

                    var cardsContainerId = 'card__list_' + gMetric.title || null;           // set container a title grouping
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

              } else {
                  //else not measure or skiponce
                //   console.log('else not measure or skiponce')
              
              } // end if type Measure

            } // end for gMetricItems
            
            // if card item was matched make columns hidden
            if (cardmatch == true) {

                // set column items hidden
                var elements = document.getElementsByClassName('column__item');
                // console.log('column__item elemnts:',elements)
                for (var i = 0; i < elements.length; i++) {
                    elements[i].style.visibility = 'hidden';
                    // elements[i].style.display = 'none';
                }
            } // end if cardmatch
                    
        } // end if gMetricItems

    } // end function drawMetricCards
    
    
    // //
    // //
    // //
    // function drawOutcomeCards(json) {
    //     console.log('drawOutcomeCards json:', json)


    //     //
    //     //  create wrapper html and append to page
    //     //
    //     var cardsDiv = document.getElementById("cardsdiv");

    //     var newSectionNode = document.createElement('section');
    //     var newSectionNodeId = "section_";
    //     newSectionNode.setAttribute("id", newSectionNodeId);
    //     newSectionNode.setAttribute("class", "wrapper");
    //     cardsDiv.appendChild(newSectionNode)

    //     var sectionDiv = document.getElementById(newSectionNodeId);

    //     var topUlNode = document.createElement('ul');
    //     var topUlNodeId = "column__list_";
    //     topUlNode.setAttribute("id", topUlNodeId);
    //     topUlNode.setAttribute("class", "column__list");
    //     sectionDiv.appendChild(topUlNode)

    //     var topUlDiv = document.getElementById(topUlNodeId);

    //     let gOutcomeItems = json
    //     console.log('gOutcomeItems:',gOutcomeItems)

    //     if (gOutcomeItems.length > 0) {
    //         // loop over outcomes
    //         for (let g = 0; g < gOutcomeItems.length; g++) {
    //             let gOutcome = gOutcomeItems[g]
    //             // console.log('gOutcome:', gOutcome)

    //             //
    //             // check for urlparam and check for matching element
    //             //
    //             let strColumnitem = 'columitem=' + gOutcome.id
    //             // console.log('strColumnitem', strColumnitem)
    //             if (columnitem != null) {
    //                 // var myOutcomeId = "foafiaf:" + columnitem
    //                 // console.log('myOutcomeId', myOutcomeId)
    //                 if (columnitem != gOutcome.id) {
    //                     console.log('Outcome NO Match', columnitem, gOutcome.id)
    //                     // skip this loop iteration and continue to next
    //                     continue;
    //                 } //
    //             } //


    //             //
    //             //  create li for outcome content
    //             //

    //             var newLiNode = document.createElement('li');
    //             var newLiNodeId = "column__item_" + gOutcome.id;
    //             newLiNode.setAttribute("id", newLiNodeId);
    //             newLiNode.setAttribute("class", "column__item");
    //             topUlDiv.appendChild(newLiNode)

    //             var newLiContainer = document.getElementById(newLiNodeId);

    //             var outcomeHTML = createOutcomeHTML(gOutcome)

    //             newLiContainer.innerHTML = outcomeHTML;


    //             //
    //             // loop over gOutcomeChildren
    //             //

    //             let gOutcomeChildren = gOutcome.children || [];
    //             // console.log('gOutcomeChildren:',gOutcomeChildren)

    //             if (gOutcomeChildren.length > 0) {
    //                 for (let t = 0; t < gOutcomeChildren.length; t++) {
    //                     let gMetric = gOutcomeChildren[t]
    //                     console.log('gMetric:', gMetric)



    //                     //
    //                     // check for urlparam and check for matching element
    //                     //
    //                     let strCarditem = 'carditem=' + gMetric.id
    //                     // console.log('strCardlist', strCardlist)
    //                     if (carditem != null) {
    //                         if (carditem != gMetric.id) {
    //                             console.log('Metric NO Match', carditem, gMetric.id)

    //                             // skip this loop iteration and continue to next
    //                             continue;

    //                         } //

    //                         if (carditem === gMetric.id) {
    //                             console.log('Metric MATCH', carditem, gMetric.id)

    //                             // set column items hidden
    //                             var elements = document.getElementsByClassName('column__item');
    //                             for (var i = 0; i < elements.length; i++) {
    //                                 elements[i].style.visibility = 'hidden';
    //                             }
    //                         }
    //                     }


    //                     if ((gMetric.id != "") && (gMetric.datavalues != undefined)) {
    //                         // console.log('id not blank:',gMetric)

    //                         var cardsContainerId = 'card__list_' + gOutcome.id
    //                         var cardsContainer = document.getElementById(cardsContainerId);

    //                         // create new li code for metric then append to container
    //                         let cardHTML = createCardHTML(gMetric)
    //                         // console.log('cardHTML',cardHTML)

    //                         var newCardNode = document.createElement('li');
    //                         var newCardNodeId = 'card__list_' + gMetric.id
    //                         newCardNode.setAttribute("id", newCardNodeId);
    //                         newCardNode.setAttribute("class", "card__item");
    //                         newCardNode.innerHTML = cardHTML;

    //                         cardsContainer.appendChild(newCardNode)
    //                         // console.log('cardsContainer:',cardsContainer)

    //                     }

    //                 } // end for gMetric
    //             } // end if gOutcomeChildren


    //         } // end for gOutcomeItems
    //     } // end if gOutcomeItems

    // } // end function drawOutcomeCards

    // function createOutcomeHTML(group) {

    //     let _r = window.location.href
    //     // console.log('_r', _r)

    //     let _s = window.location.protocol
    //     // console.log('_s', _s)

    //     let _h = window.location.hostname
    //     // console.log('_h', _h)

    //     let _p = window.location.pathname
    //     // console.log('_path', _p)

    //     let _id = group.id;
    //     let _param = "columnitem=" + _id;
    //     // console.log('_param', _param)
    //     let _url = _s + '//' + _h + _p + "?" + _param;
    //     // if (_page.includes('_id')) {
    //     //     console.log('_id already included')
    //     //     // donothing
    //     // }
    //     // else if (_page.includes("?")) {
    //     //     console.log('add ?')
    //     //     _url = _page + "&" + _param;
    //     // }
    //     // else if (!_page.includes("?")) {
    //     //     console.log('add &')
    //     //     _url = _page + "?" + _param;
    //     // }
    //     // console.log('_url', _url)


    //     let outcomeHTML = "";

    //     outcomeHTML += '    <div class="column__title--wrapper"> '

    //     outcomeHTML += '      <h2>' + '<a href=' + _url + ' class="card__link">' + getGrpPrefLabel(group) + '</a>' + '</h2> <i class="fas fa-ellipsis-h"></i> '
    //     outcomeHTML += '    </div> '

    //     outcomeHTML += '    <div> '
    //     outcomeHTML += '      <br/><p>' + getGrpTitle(group) + '</p><br/> '
    //     outcomeHTML += '    </div> '



    //     outcomeHTML += '    <ul id="card__list_' + group.id + '" class="card__list"> '

    //     outcomeHTML += '    </ul> '


    //     outcomeHTML += '    <div class="column__item--cta"> '

    //     outcomeHTML += '      <i class="fas fa-plus"></i> '
    //     outcomeHTML += '      <h4>XXX YYY ZZZ</h4> '
    //     // outcomeHTML += '      <h2>' + getGrpPrefLabel(group) + '</h2><br><p>' + getGrpTitle(group) + '</p><i class="fas fa-ellipsis-h"></i> '

    //     outcomeHTML += '    </div> '

    //     outcomeHTML += "";

    //     // console.log('outcomeHTML:',outcomeHTML)       
    //     return outcomeHTML;
    // }


    function createTitleContainerHTML(metric) {

        let _r = window.location.href
        // console.log('_r', _r)

        let _s = window.location.protocol
        // console.log('_s', _s)

        let _h = window.location.hostname
        // console.log('_h', _h)

        let _p = window.location.pathname
        // console.log('_path', _p)

        // let _id = metric.id;
        let _param = "columnitem=" + metric.title.split(' ').join('_');       //eg. column__item_% change in population
        // console.log('_param', _param)
        let _uri =  _s + '//' + _h + _p + "?" + _param ;
        let _url = encodeURI(_uri);
        _url = _url.replace('#','%23')  // fix # in url issue
        // console.log('_url', _url)


        let containerHTML = "";

        containerHTML += '    <div class="column__title--wrapper"> '

        containerHTML += '      <h2>' + '<a href=' + _url + ' class="card__link">' + metric.title + '</a>' + '</h2> <i class="fas fa-ellipsis-h"></i> '
        containerHTML += '    </div> '

        // containerHTML += '    <div> '
        // containerHTML += '      <br/><p>' + getGrpTitle(metric) + '</p><br/> '
        // containerHTML += '    </div> '

        containerHTML += '    <ul id="card__list_' + metric.title + '" class="card__list"> '

        containerHTML += '    </ul> '


        // containerHTML += '    <div class="column__item--cta"> '

        // containerHTML += '      <i class="fas fa-plus"></i> '
        // containerHTML += '      <h4>XXX YYY ZZZ</h4> '
        // // containerHTML += '      <h2>' + getGrpPrefLabel(metric) + '</h2><br><p>' + getGrpTitle(metric) + '</p><i class="fas fa-ellipsis-h"></i> '

        // containerHTML += '    </div> '

        containerHTML += "";

        // console.log('containerHTML:',containerHTML)       
        return containerHTML;
    } // end createTitleContainerHTML



    function createCardHTML(metric) {
        // console.log('createCardHTML metric ', metric)

        let _r = window.location.href
        let _s = window.location.protocol
        let _h = window.location.hostname
        let _p = window.location.pathname


        let _param = "carditem=" + metric.id;
        // console.log('_param', _param)
        let _url = encodeURI( _s + '//' + _h + _p + "?" + _param );
        _url = _url.replace('#','%23')  // fix # in url issue
        // console.log('_url', _url)

        let _id = "metric_" + metric.id


        // START CARD

        let cardHTML = "";

        if (metric.year) cardHTML += ' <span class="card__tag card__tag--low">' + metric.year + '</span> '
        if (metric.theme) cardHTML += ' <span class="card__tag card__tag--browser">' + metric.theme + '</span> '
        if (metric.category) cardHTML += ' <span class="card__tag card__tag--design">' + metric.category + '</span> '
        
        cardHTML += ' <h4 class="card__title">' + '<a href="' + _url + '">' + metric.label + '<\a>' + '</h5>  '

        if (metric.description) cardHTML += ' <span id="grpDescription"  class="card__description" >' + getGrpDescription(metric) + '</span>  '

        if (metric.status) cardHTML += ' <span id="grpStatus"       class="card__el" >' + getGrpStatus(metric) + '</span>  '

        if (metric.value) cardHTML += ' <span id="grpValue"        class="card__el" >' + getGrpValue(metric) + '</span>  '

        if (metric.target) cardHTML += ' <span id="grpTarget"       class="card__el" >' + getGrpTarget(metric) + '</span>  '


        //
        // insert dial control
        //
        var dial_value = metric.datavalues.split('i')[0] || null;
        var dial_target = metric.target || null;
        var dial_status = metric.status || "";
        var dial_units = metric.units || "";
        var dial_stroke_dasharray = '99, 100';
        var dial_fill_color = "circular-chart blue";

        // if target is not null calc percentage and color
        // calc percentages
        if ((dial_value != null) && (dial_target != null)) {
            var percentage = ((dial_value / dial_target) * 100) ;
        }
        else {
            var percentage = 0;
        }
        // console.log('percentage', dial_value, dial_target, percentage)
        
        //
        // donut center text 
        // if 0 set to value of metric and units
        //
        if (percentage === 0) {
            var dial_text_percentage = dial_value;
            // if (dial_units != "") dial_text_percentage += " " + dial_units;
        }
        else {
            var dial_text_percentage = Math.trunc(percentage) + '%' + ' of target';
            // set font to smaller? different color?
        }
        // console.log('dial_text_percentage', dial_text_percentage)
        
        //
        // dial fill percentage
        // if 0 set to fill 99%
        //
        if (percentage === 0) {
            dial_stroke_dasharray = '99, 100';
        }
        else {
            dial_stroke_dasharray = Math.trunc(percentage) + ', 100';

        }
        // console.log('dial_stroke_dasharray', dial_stroke_dasharray)
        //
        // dial color style
        //
        
        if ( (percentage != 0) && (percentage < 100) ) {
            dial_fill_color = "circular-chart yellow";
        }
        if ( (percentage != 0) && (percentage < 67) ) {
            dial_fill_color = "circular-chart orange";
        }
        if ( (percentage != 0) && (percentage < 34) ) {
            dial_fill_color = "circular-chart orange";
        }
        if ( (percentage === 0) && (dial_status === "Green") ) {
            dial_fill_color = "circular-chart green";
        }
        else if (  (percentage === 0) && (dial_status === "Yellow") ) {
            dial_fill_color = "circular-chart yellow";
        }
        else if ( (percentage === 0) && (dial_status === "Orange") ) {
            dial_fill_color = "circular-chart orange";
        }
        else if ( (percentage === 0) && (dial_status === "Red") ) {
            dial_fill_color = "circular-chart red";
        }
        else {
            dial_fill_color = "circular-chart blue";
        }
        // console.log('dial_fill_color', dial_fill_color)

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
        dialHTML += '       <text id="svg_text_percentage" x="18" y="20.35" class="percentage">' + dial_text_percentage + '</text> ';
        cardHTML += '     </svg> ';
        dialHTML += ' </div> ';
        dialHTML += ' <div id="insertContentCallback" class="insertContentCallbacks" style="visibility: hidden; display: none; color: #fff;">updateDialFunctions()</div> ';

        cardHTML += dialHTML;

        // end insert dial control
        //
        

        if (metric.datatrend) cardHTML += ' <span id="grpTrend"        class="card__el" >' + getGrpTrend(metric) + '</span>  '

        if (metric.rank) cardHTML += ' <br/><span id="grpRank"          class="card__el" >' + getGrpRank(metric) + '</span>  '

        if (metric.ranktrend) cardHTML += ' <br/><span id="grpTrendRank"     class="card__el" >' + getGrpTrendRank(metric) + '</span>  '

        if (metric.definition) cardHTML += ' <br/><span id="grpDefinition"     class="card__description_sm" >' + metric.definition + '</span>  '


        cardHTML += ' <br> '
        cardHTML += ' <ol class="card__actions"> '
        cardHTML += '   <li class="card__actions--wrapper"> '
        cardHTML += '       <i class="fas fa-align-left"></i> '
        cardHTML += '   </li> '
        cardHTML += ' </ol> '

        // END CARD

        // console.log('cardHTML:',cardHTML)       
        return cardHTML;
        
    } // end function createCardHTML




    // Helper Functions

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

    function getGrpTarget(group) {
        let _target = group.target || null;
        if (_target != null) {
            return '<em>target:</em> <span style="display: inline-block; width: 10px;"></span>    <span id="targetText" ><font >' + _target + '</font></span>';
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
            // console.log('_datatrend', _datatrend)
            let _ico = null
            if (_datatrend.includes('Better')) _ico = '&nbsp; <i class="fas fa-arrow-up    fa-2x"  title="' + _datatrend + '" aria-hidden style="color: Green;"></i>'
            if (_datatrend.includes('Steady')) _ico = '&nbsp; <i class="far fa-arrow-alt-circle-right fa-2x"  title="' + _datatrend + '" aria-hidden style="color: Black;"></i>'
            if (_datatrend.includes('Same')) _ico = '&nbsp; <i class="far fa-arrow-alt-circle-right fa-2x"  title="' + _datatrend + '" aria-hidden style="color: Black;"></i>'
            if (_datatrend.includes('Worse')) _ico = '&nbsp; <i class="fas fa-arrow-down  fa-2x"  title="' + _datatrend + '"  aria-hidden style="color: Red;"></i>'
            // console.log('_ico', _ico)
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
            // console.log(_rank, yr)
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
