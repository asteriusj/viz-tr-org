
console.log('loading cards.js... ')

// ! function() {
// 	"use strict";


//
// has two functions, firt doCards executing ...
// which calls drawCards
//


// export class Cards {

    // function drawCards(groups) {
    function drawCards(groups) {
        console.log('drawCards groups:',groups)
        // console.log('groups JSON:',JSON.stringify(groups))
        let aGroup = groups[0]
        // console.log('aGroup:',aGroup)
        
        let gTopLevelGroups = aGroup.groups
        console.log('gTopLevelGroups:',gTopLevelGroups)
        
        //
        // loop over top level groups
        //
        if ( (gTopLevelGroups != undefined) && (gTopLevelGroups.length > 0)) {
            for (let g=0; g<gTopLevelGroups.length; g++) {
                let gTopLevel = gTopLevelGroups[g]
                // console.log('gTopLevel:',gTopLevel)
            
                //
                //  create top level html and append to page
                //
                let topLevelHTML = createTopLevelHTML(gTopLevel)
                
                var topLevelDiv = document.getElementById("cardsdiv");
                var newTopLevelNode = document.createElement('div');
                var topLevelDivId = "metrictoplevel" + gTopLevel.id
                
                newTopLevelNode.setAttribute("id", topLevelDivId );
                newTopLevelNode.setAttribute("class", "metrictoplevel");
                // newTopLevelNode.style.backgroundColor = gTopLevel.gcolor;
                newTopLevelNode.innerHTML = topLevelHTML;
                
                topLevelDiv.appendChild( newTopLevelNode )
                
                
                let gThemeGroups = gTopLevel.groups
                // console.log('gThemes:',gThemeGroups)
            
                //
                // loop over theme groups
                //
                if (gThemeGroups.length > 0) {
                    for (let t=0; t<gThemeGroups.length; t++) {
                        let gTheme = gThemeGroups[t]
                        // console.log('gTheme:',gTheme)
                    
                        //
                        // create top level html and append to page
                        //
                        let themeHTML = createThemeHTML(gTheme)
                        
                        var topLevelDiv = document.getElementById(topLevelDivId);
                        var newThemeNode = document.createElement('div');
                        
                        var themeDivId = "metrictheme" + gTheme.id
                        newThemeNode.setAttribute("id", themeDivId );
                        newThemeNode.setAttribute("class", "metrictheme");
                        // newThemeNode.style.backgroundColor = gTheme.gcolor;
                        
                        newThemeNode.innerHTML = themeHTML;
                        
                        topLevelDiv.appendChild( newThemeNode )
                    
                        var newThemeContainer = document.createElement('div');
                        var themeContainerId = "container" + gTheme.id
                        newThemeContainer.setAttribute("id", themeContainerId );
                        newThemeContainer.setAttribute("class", "themecontainer");
                        
                        newThemeNode.appendChild( newThemeContainer )
                        
                        
                        let gIndicatorGroups = gTheme.groups
                        // console.log('gIndicatorGroups:',gIndicatorGroups)
                    
                        //
                        // loop through indicator children
                        //
                        if ( (gIndicatorGroups != undefined) && (gIndicatorGroups.length > 0) ) {
                            for (let i=0; i<gIndicatorGroups.length; i++) {
                                let gIndicator = gIndicatorGroups[i]
                                // console.log('gIndicator:',gIndicator)
                                
                                let cardHTML = createCardHTML(gIndicator)
                                
                                var themeDiv = document.getElementById(themeContainerId);
                                var newNode = document.createElement('div');
                                var indicatorDivId = "metricindicator" + gIndicator.id
                                
                                newNode.setAttribute("id", indicatorDivId );
                                newNode.setAttribute("class", "metricindicator");
                                newNode.innerHTML = cardHTML;
                                
                                themeDiv.appendChild( newNode )
                            } // end for gIndicator
                        } // end if gIndicatorGroups
                                
                    } // end for gTheme
                } // end if gThemeGroups
        
            } // end for gTopLevel
        } // end if gTopLevelGroups
        
    } // end function
    export { drawCards }; 
    // function createTopLevelHTML(group) {
    //     let _id = "toplevel_" + group.id
    //     let _color = group.gcolor || ""
        
    //     let topLevelHTML = "" ;
        
    //     topLevelHTML += ' <div class="toplevellabel" style="background-color:'+ _color + '">' + getGrpLabel(group) + '</div>  '
        
    //     topLevelHTML += "" ;
        
    //     // console.log('topLevelHTML:',topLevelHTML)       
    //     return topLevelHTML ;
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
    // function createCardHTML(group) {
    //     let _id = "crd_" + group.id
        
    //     let cardHTML = "" ;
        
    //     cardHTML +=   '<div id="' + _id  +'" class=" ui-widget-content">'
    //     cardHTML +=   '<h2><span id="" style="darker">' + getGrpLabel(group) + '</span></h2>  '
    // 	cardHTML +=   ' <div class="content  '
    // 	cardHTML += 	'  <br/>  '
    // // 	cardHTML += 	'   <span id=""   >' + getGrpFull(group) + '</span>  '
    // // 	cardHTML += 	'	<br/>  '
    // // 	cardHTML += 	'	<br/>  '
    // 	cardHTML += 	'   <span id=""   >' + getGrpDescription(group) + '</span>  '
    // 	cardHTML += 	'	<br/>  '
    // 	cardHTML += 	'	<br/>  '
    // 	cardHTML += 	'	<span id="" >' + getGrpStatus(group) + '</span>  '
    // 	cardHTML += 	'	<br/>  '
    // 	cardHTML += 	'	<br/>  '
    // 	cardHTML += 	'	<span id=""  >' + getGrpValue(group) + '</span>   <span style="display: inline-block; width: 30px;"> </span>  '  
    // 	cardHTML += 	'	<br/>  '
    // 	cardHTML += 	'	<br/>  '
    // 	cardHTML += 	'	<span id=""  >' + getGrpTrend(group) + '</span>  '
    // 	cardHTML += 	'	<br/>  ' 
    // 	cardHTML += 	'	<br/>  '
    // 	cardHTML += 	'	<br/>  '
    // 	cardHTML += 	'	<span id=""   >' + getGrpRank(group) + '</span>    <span style="display: inline-block; width: 30px;"> </span>  '
    // 	cardHTML += 	'	<br/>  '
    // 	cardHTML += 	'	<br/>  '
    // 	cardHTML += 	'	<span id="">' + getGrpTrendRank(group) + '</span>  '
    // 	cardHTML += 	'	<br/>  '
    // 	cardHTML += 	' </div>  '
    //     cardHTML +=     '</div>  '
       
       
    //     // console.log('cardHTML:',cardHTML)       
    //     return cardHTML ;
    // }
       
       
    // function to call this???        
    // function doCards() {
    function doCards() {   
        console.log('doCards')
        var Groups = JSON.parse(sessionStorage.getItem('groups')) || null;
        // Groups = null;
        
        console.log('scorecard.js Groups from sessionStorage: ',Groups)
        // Groups = null   
        
        // check for Groups before proccesing, else get it!
        if (Groups != null) {
            
            drawCards(Groups)
            
            
        } else {
            // COMMENT OUT DATA FILE FOr teSTING
            // fetch('../../things/jsonld/_Indicator_.jsonld')
            
            //get Tree insread of JSONLD
            // fetch('https://6nepl40j73.execute-api.us-east-1.amazonaws.com/dev/entities//JSONLD')
            fetch('https://6nepl40j73.execute-api.us-east-1.amazonaws.com/dev/entities//TREE')
          
                .then(function (response) {
                    
                  return response.json();
                })
                .then(function (data) {
                    console.log('data',data);
                    // console.log(JSON.stringify(data));
                    
                
                    
            }); // end fetch
          
        }; // end else if
    } //end doCards
    export { doCards }; 
// }

// }();    