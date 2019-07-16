console.log('loading index.js')
console.log('index.js v.2019.07.07.13.50')

// retrieve url params
var urlParams = new URLSearchParams(window.location.search);
if (DoNotCache === undefined) var DoNotCache = urlParams.get('nocache') || urlParams.get('DoNotCache') || null ;
if (RefreshAll === undefined) var RefreshAll = urlParams.get('refresh') || urlParams.get('RefreshAll') || null ;
if (RefreshAll) {
    console.log('index.js RefreshAll:',RefreshAll)
    sessionStorage.clear(); 
    // console.log('sessionStorage:',sessionStorage)
}
console.log('index.js DoNotCache:',DoNotCache)
console.log('index.js RefreshAll:',RefreshAll)

// embed function that is called at botton of this script
// Import {Layout} from '../../../src/layout';

// import {T2G} from '../ConvertTreesToGroups';
// import {Cards} from './cards';


const template = document.createElement('template')
template.innerHTML = `
  <style type="text/css"> 

  </style>
  <indicator-cards width="300" height="300" ></indicator-cards>
   
  <!--<script src="../assets/js/includes.js"></script>-->
  
   <link rel="stylesheet" href="//use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">
    <!--<script src="//code.jquery.com/jquery-1.12.4.js"></script>-->
    <!--<script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>-->
    
    <!--<script src="../assets/js/graphUtils.js"></script>-->
    <!--<script src="../assets/js/transformGroups.js"></script>-->
    <!--<script src="../ConvertTreesToGroups.js"></script>-->
   
    
    <!--// <link rel="stylesheet" href="../assets/css/metricpopup.css" />-->
    <!--// <script src="../assets/js/metricpopup.js"></script>		-->

     
    <div id="cardsdiv"></div>
 
    <!--// <link rel="stylesheet" href="./cards.css" />-->
    <!--// <script src="./cards.js"></script> -->
   
   
`;



// export class SunburstChart extends AMP.BaseElement {
class IndicatorCards extends HTMLElement {
  
  static get observedAttributes() {
    return ['disabled','width','height']
  }


  connectedCallback() {
    console.log('IndicatorCards connectedCallback')
    
    this.width = '300px';
    this.height = '300px'
    
    // console.log('template',template)
    // this.attachShadow({mode: 'open'})
    // this.shadowRoot.appendChild(template.content.cloneNode(true))
    
    // append template to this custom element
    this.appendChild(template.content.cloneNode(true))
    console.log('this:',this)
    
    // Caches <strong> DOM query
    // this.customtag = this.shadowRoot.querySelector('indicator-cards');
    this.customtag = this.querySelector('indicator-cards');
    console.log('this.customtag:',this.customtag)
    // get custom element from current document
    // const customtag = theDoc.getElementByName('indicator-cards')
    // console.log('customtag:',customtag)
    
    
    // populte tag with static viz image
    this.initialTagAppend(this.customtag)
    
    // start visualization
    this.finalTagUpdate(this.customtag) 
  }

  attributesChangedCallback(attr, oldVal, newVal) {
    console.log('IndicatorCards attributesChangedCallback')
    if (attr === 'width') {
            this.width(newVal);
    }
    console.log('this.width',this.width)
    if (attr === 'height') {
            this.height(newVal);
    }
    console.log('this.height',this.height)
  }
  
  initialTagAppend(element) {
      console.log(' IndicatorCards initialAppend element:',element)
    
      // populate tag with static viz image
      
      const staticImage = 'cards_screenshot.png';
      
      var img = document.createElement('img');
      img.setAttribute('width', this.width);
      img.setAttribute('height', this.height);
      
      var imgPath = null;
      let imgPath1 = '/src/images/' + staticImage;
      let imgPath2 = '../../images/' + staticImage;
      
      checkImageExists(imgPath1, function(existsImage) {
          // console.log('existsImage',existsImage)
          if(existsImage == true) {
              // image exist
              imgPath = imgPath1;
              img.src = imgPath;
              appendImg(img)
            
          }
          else {
              // image not exist
              imgPath = imgPath2;
              img.src = imgPath;
              appendImg(img)
            
          }
          console.log('imgPath:',imgPath);
      });
  
      function appendImg(img) { 
          // console.log('img',img)
          element.appendChild(img);
      }

  }; // end initialAppend


  finalTagUpdate(element) {
      console.log(' IndicatorCards finalTagUpdate element:',element)
      
      window.setTimeout(function(){ 
        console.log('after 500ms') 
        
        // first empty eleemnt contents
        element.innerHTML = ""
        
        // then append javascript function
        embedCards(element, function(){} )
        
      }, 500);
      
    //   console.log('  endding finalTagUpdate')
  }
    
    
} // class IndicatorCards

// AMP.registerElement('amp-hello-world', AmpHelloWorld);
window.customElements.define('tr-indicator-cards', IndicatorCards);

// document.create('tr-indicator-cards')
// new IndicatorCards()


// local functions
function checkImageExists(imageUrl, callBack) {
  try {
    var imageData = new Image();
    imageData.onload = function() {
        callBack(true);
    };
    imageData.onerror = function() {
        callBack(false);
    };
    imageData.src = imageUrl;
  } catch (e) {
    console.error('checkImageExists e',e)
  }
}


  
  
function embedCards(element, cb) {
    console.log('starting embedCards element',element)

  
    // We respin until the visualization container has non-zero area (there are race 
    // conditions on Chrome which permit that) and the visualization class is loaded.
    // var container = shadowRoot.getElementById("visualization");
    // var container = document.getElementById("visualization");
    
    // var container = shadowRoot.querySelector('sunburst-chart');
    var container = element
    console.log('container',container)



    // doCards() 
    
    
    
    var Groups = JSON.parse(sessionStorage.getItem('groups')) || null;
    if (DoNotCache) Groups = null
    console.log('scorecard.js Groups from sessionStorage: ',Groups)
            
            // Groups = JSON.parse('[{"id":"foafiaf:Scorecard_Top_25","type":"","dbotype":"foafiaf:Scorecard","category":null,"topic":"Community Transformation Scorecard","label":"Top 25","title":"A Top 25 Community","description":"","definition":"","abstract":"","categories":"Scorecard","inscheme":"foafiaf:Scorecard_0","parent_id":"foafiaf:Scorecard_0","name":"Top 25","full":"Top 25 - ","polarity":"Increasing is good","timeperiodtype":"Quarter","unitofmeasure":"ROYG","units":"ROYG","color":"#ffffff","gcolor":"#ffffff","groups":[{"id":"foafiaf:Scorecard_Recreate","type":"","dbotype":"foafiaf:Scorecard","category":null,"topic":"Scorecard: Recreate","label":"Recreate","title":"Recreating Sense of Place","description":"","definition":"","abstract":"","categories":"Scorecard","inscheme":"foafiaf:Scorecard_Top Level","parent_id":"foafiaf:Scorecard_Top_25","name":"Recreate","full":"Recreate - ","parent":"foafiaf:Scorecard_Top_25","polarity":"Increasing is good","timeperiodtype":"Quarter","unitofmeasure":"ROYG","units":"ROYG","status":"Yellow","color":"#f7ee67","gcolor":"#f7ee67","groups":[{"id":"foafiaf:Scorecard_Diversity","type":"","dbotype":"foafiaf:Scorecard","category":null,"topic":"Scorecard: Diversity","label":"Diversity","title":"","description":"","definition":"","abstract":"","keywords":"Recreate","categories":"Scorecard","inscheme":"foafiaf:Scorecard_Themes","parent_id":"foafiaf:Scorecard_Recreate","name":"Diversity","full":"Diversity - ","parent":"foafiaf:Scorecard_Recreate","polarity":"Increasing is good","timeperiodtype":"Quarter","unitofmeasure":"ROYG","units":"ROYG","status":"Yellow","color":"#f7ee67","gcolor":"#f7ee67","groups":[]}]}]}]')
            
    // check for Groups before proccesing, else get it!
    if (Groups != null) {
        
        drawCards(Groups)
        
        
    } else {
        
        // COMMENT OUT DATA FILE FOr teSTING
        // fetch('../../things/jsonld/_Indicator_.jsonld')
        
        //get Tree insread of JSONLD
        // fetch('https://6nepl40j73.execute-api.us-east-1.amazonaws.com/dev/entities//JSONLD')  OLD
        
        // let apiurl = 'https://phlh4tx1wl.execute-api.us-east-1.amazonaws.com/dev/entities//TREE';
        let apiurl = 'https://phlh4tx1wl.execute-api.us-east-1.amazonaws.com/dev/entities//TREE';
        console.log('apiurl',apiurl)
        fetch(apiurl)
      
            .then(function (response) {
                
              return response.json();
            })
            .then(function (data) {
                console.log('data',data);
                console.log(JSON.stringify(data));
                
                ///////////////////////////////////////////////////////////////////////////////////    
                //
                // Convert Tree to Groups
                //
                
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
                // processTreeNode
                
                //
                // end processTreeNode utility function
                //    
    
                
        }); // end fetch
        
        
      
    }; // end else if Groups null
  
    
}; // end function embedCards


//
//
//
function drawCards(groups) {
        console.log('drawCards groups:',groups)
        let aGroup = groups[0]
        // console.log('aGroup:',aGroup)
        
        let gTopLevelGroups = aGroup.groups
        // console.log('gTopLevelGroups:',gTopLevelGroups)
        
        //
        // loop over top level groups
        //
        if (gTopLevelGroups.length > 0) {
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
                
                // console.log(' newTopLevelNode  ',newTopLevelNode)
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
                        if (gIndicatorGroups.length > 0) {
                            for (let i=0; i<gIndicatorGroups.length; i++) {
                                let gIndicator = gIndicatorGroups[i]
                                // console.log('gIndicator:',gIndicator)
                                
                                if ( (gIndicator.id != "") && (gIndicator.datavalues != undefined) ){
                                    console.log('id not blank:',gIndicator)
                                    
                                    
                                    
                                    let cardHTML = createCardHTML(gIndicator)
                                
                                    var themeDiv = document.getElementById(themeContainerId);
                                    var newNode = document.createElement('div');
                                    var indicatorDivId = "metricindicator" + gIndicator.id
                                    
                                    newNode.setAttribute("id", indicatorDivId );
                                    newNode.setAttribute("class", "metricindicator");
                                    newNode.innerHTML = cardHTML;
                                    
                                    themeDiv.appendChild( newNode )
                                
                                }
                                
                                
                            } // end for gIndicator
                        } // end if gIndicatorGroups
                                
                    } // end for gTheme
                } // end if gThemeGroups
        
            } // end for gTopLevel
        } // end if gTopLevelGroups
        
    } // end function drawCards
      function createTopLevelHTML(group) {
        let _id = "toplevel_" + group.id
        let _color = group.gcolor || ""
        
        let topLevelHTML = "" ;
        
        topLevelHTML += ' <div class="toplevellabel" style="background-color:'+ _color + '">' + getGrpPrefLabel(group) + '</div>  '
        
        topLevelHTML += "" ;
        
        // console.log('topLevelHTML:',topLevelHTML)       
        return topLevelHTML ;
    }
    function createThemeHTML(group) {
        let _id = "theme_" + group.id
        let _color = group.gcolor || ""
        
        let themeHTML = "" ;
        
        themeHTML += ' <div class="themelabel" style="background-color:'+ _color + '" >' + getGrpFull(group)  + '</div>  '
    
        themeHTML += "" ;
       
        // console.log('themeHTML:',themeHTML)       
        return themeHTML ;
    }
    function createCardHTML(group) {
        let _id = "crd_" + group.id
        // console.log('_id:',_id)
        
        let cardHTML = "" ;
        
        cardHTML +=   '<div id="' + _id  +'" class=" ui-widget-content">'
        cardHTML +=   '<h2 class="metricindicator indicatorlabel"><span id="" style="darker">' + getGrpLabel(group) + '</span></h2>  '
    	cardHTML +=   ' <br/>  '
    	cardHTML +=   ' <div class="content  '
    // 	cardHTML += 	'  <br/>  '
    // 	cardHTML += 	'   <span id=""   >' + getGrpFull(group) + '</span>  '
    // 	cardHTML += 	'	<br/>  '
    // 	cardHTML += 	'	<br/>  '
    	cardHTML += 	'   <span id="" class="indicatordescription" >' + getGrpDescription(group) + '</span>  '
    	cardHTML += 	'	<br/>  '
    	cardHTML += 	'	<br/>  '
    	cardHTML += 	'	<span id="" class="" >' + getGrpStatus(group) + '</span>  '
    	cardHTML += 	'	<br/>  '
    	cardHTML += 	'	<br/>  '
    	cardHTML += 	'	<span id=""  class="" >' + getGrpValue(group) + '</span>   <span style="display: inline-block; width: 30px;"> </span>  '  
    	cardHTML += 	'	<br/>  '
    	cardHTML += 	'	<br/>  '
    	cardHTML += 	'	<span id=""  class="" >' + getGrpTrend(group) + '</span>  '
    	cardHTML += 	'	<br/>  ' 
    	cardHTML += 	'	<br/>  '
    	cardHTML += 	'	<br/>  '
    	cardHTML += 	'	<span id=""  class=""  >' + getGrpRank(group) + '</span>    <span style="display: inline-block; width: 30px;"> </span>  '
    	cardHTML += 	'	<br/>  '
    	cardHTML += 	'	<br/>  '
    	cardHTML += 	'	<span id="">' + getGrpTrendRank(group) + '</span>  '
    	cardHTML += 	'	<br/>  '
    	cardHTML += 	' </div>  '
        cardHTML +=     '</div>  '
       
       
        // console.log('cardHTML:',cardHTML)       
        return cardHTML ;
    }
        
    //
// 
//
function getGrpLabel(group){
    return group.label || group.title;
}
function getGrpPrefLabel(group){
    return group.preflabel || group.label;
}
function getGrpFull(group){
    let _full = group.full  || null ;
    if (_full != null) {
        group.full = group.full.replace("- null", "")
        return group.full;
    } else {
        return ""
    }
}
function getGrpDescription(group){
    let _description = group.description  || null ;
    if (_description != null) {
        return group.description;
    } else {
        return ""
    }
}
function getGrpStatus(group){
    let _status = group.status  || null ;
    if (_status != null) {
        return '<em>status:</em> <span style="display: inline-block; width: 10px;"></span>    <span id="statusText" ><font color="'+ group.status + '">' + group.status + '</font></span>';
    } else {
        return ""
    }
}
function getGrpValue(group){
    let _value = group.value  || null ;
    if (_value != null) {
        return'<i>value:</i>  <span style="display: inline-block; width: 5px;"></span>' + group.value  ;
    } else {
        return ""
    }
}
//
// !!! add condition of increasing red and decresing green !!
//
function getGrpTrend(group){
    let _datatrend = group.datatrend  || null ;
    if ((_datatrend != null) && (_datatrend != undefined)){
        let _ico = null
        if (_datatrend.includes('Better')) _ico = '&nbsp; <i class="fas fa-arrow-up    fa-2x"  title="' +_datatrend + '" aria-hidden style="color: Green;"></i>'
        if (_datatrend.includes('Steady')) _ico = '&nbsp; <i class="far fa-arrow-alt-circle-right fa-2x"  title="' +_datatrend + '" aria-hidden style="color: Black;"></i>'
        if (_datatrend.includes('Worse'))  _ico = '&nbsp; <i class="fas fa-arrow-down  fa-2x"  title="' +_datatrend + '"  aria-hidden style="color: Red;"></i>'
        if (_ico != null) return '<em>5-year Trend:</em> ' + _ico ;
    } else {
        return ""
    }
}
function getGrpRank(group){
    let _rank = group.rank  || null ;
    if (_rank!== null) {
        return '<em>rank:</em>  <span style="display: inline-block; width: 5px;"></span>' + group.rank ;
    } else {
        return ""
    }
}
function getGrpTrendRank(group){
    let _ranktrend = group.ranktrend || null ;
    if ((_ranktrend != null) && (_ranktrend != undefined)) {
        let _rankico = null
        if (_ranktrend.includes('Better')) _rankico = '&nbsp; <i class="fas fa-arrow-up    fa-2x"  title="' +_ranktrend + '" aria-hidden style="color: Green;"></i>'
        if (_ranktrend.includes('Steady')) _rankico = '&nbsp; <i class="far fa-arrow-alt-circle-right fa-2x"  title="' +_ranktrend + '" aria-hidden style="color: Black;"></i>'
        if (_ranktrend.includes('Worse'))  _rankico = '&nbsp; <i class="fas fa-arrow-down  fa-2x"  title="' +_ranktrend + '"  aria-hidden style="color: Red;"></i>'
        if (_rankico != null) return'<i>Trend in rank:</i> '  + _rankico ;
    } else {
        return ""
    }
}







