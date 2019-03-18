console.log('loading index.js')

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
    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    
    // Caches <strong> DOM query
    this.customtag = this.shadowRoot.querySelector('indicator-cards');

    // populte tag with static viz image
    this.initialTagAppend(this.customtag)
    
    // start visualization
    this.finalTagUpdate(this.shadowRoot) 
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
  
  initialTagAppend(myTag) {
      console.log(' IndicatorCards initialAppend')
    
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
          myTag.appendChild(img);
      }

  }; // end initialAppend


  finalTagUpdate(shadowRoot) {
      console.log(' IndicatorCards finalTagUpdate')
       console.log('shadowRoot',shadowRoot)
      
      window.setTimeout(function(){ 
        console.log('after 500ms') 
        
        // specitic javascript functiom
        embedCards(shadowRoot, function(){} )
        
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


  
  
function embedCards(shadowRoot, cb) {
    console.log('starting embedCards shadowRoot',shadowRoot)

  
    // We respin until the visualization container has non-zero area (there are race 
    // conditions on Chrome which permit that) and the visualization class is loaded.
    // var container = shadowRoot.getElementById("visualization");
    // var container = document.getElementById("visualization");
    
    var container = shadowRoot.querySelector('sunburst-chart');
    console.log('container',container)



    doCards() 
    // var Groups = JSON.parse(sessionStorage.getItem('groups')) || null;
    // console.log('scorecard.js Groups from sessionStorage: ',Groups)
            
    // // check for Groups before proccesing, else get it!
    // if (Groups != null) {
        
    //     drawCards(Groups)
        
        
    // } else {
    //     // COMMENT OUT DATA FILE FOr teSTING
    //     // fetch('../../things/jsonld/_Indicator_.jsonld')
        
    //     fetch('https://6nepl40j73.execute-api.us-east-1.amazonaws.com/dev/entities//JSONLD')
        
    //         .then(function (response) {
                
    //           return response.json();
    //         })
    //         .then(function (data) {
    //             console.log('fetch returned data',data);
              
    //             console.log(' call Convert Trees To Groups:',data)

    //             var groups = ConvertTreesToGroups(data,"", function(transformed) {
                    
    //                 let d = new Date();
    //               	let returned  = new Date().getTime();
    //             //   	console.log('returned',returned)
                 	
    //               	var groups = transformed.groups;
                  	
    //                 // console.log('transformed Groups:',groups)
    //                 console.log('transformed Groups:',groups)
                
    //                 var res = sessionStorage.setItem('groups', JSON.stringify(groups));
    //                 console.log("sessionStorage.setItem('groups'",res)
                
    //                 drawCards(groups)
    //                 //
    //                 //
    //                 // myPopupClose()
    //                 console.log('finish embedCards shadowRoot',shadowRoot)
    //             })
                
    //     }); // end fetch
      
    // }; // end else if Groups null
  
    
}; // end function embedCards


//   function drawCards(groups) {
//         console.log('drawCards groups:',groups)
//         let aGroup = groups[0]
//         // console.log('aGroup:',aGroup)
        
//         let gTopLevelGroups = aGroup.groups
//         // console.log('gTopLevelGroups:',gTopLevelGroups)
        
//         //
//         // loop over top level groups
//         //
//         if (gTopLevelGroups.length > 0) {
//             for (let g=0; g<gTopLevelGroups.length; g++) {
//                 let gTopLevel = gTopLevelGroups[g]
//                 // console.log('gTopLevel:',gTopLevel)
            
//                 //
//                 //  create top level html and append to page
//                 //
//                 let topLevelHTML = createTopLevelHTML(gTopLevel)
                
//                 var topLevelDiv = document.getElementById("cardsdiv");
//                 var newTopLevelNode = document.createElement('div');
//                 var topLevelDivId = "metrictoplevel" + gTopLevel.id
                
//                 newTopLevelNode.setAttribute("id", topLevelDivId );
//                 newTopLevelNode.setAttribute("class", "metrictoplevel");
//                 // newTopLevelNode.style.backgroundColor = gTopLevel.gcolor;
//                 newTopLevelNode.innerHTML = topLevelHTML;
                
//                 topLevelDiv.appendChild( newTopLevelNode )
                
                
//                 let gThemeGroups = gTopLevel.groups
//                 // console.log('gThemes:',gThemeGroups)
            
//                 //
//                 // loop over theme groups
//                 //
//                 if (gThemeGroups.length > 0) {
//                     for (let t=0; t<gThemeGroups.length; t++) {
//                         let gTheme = gThemeGroups[t]
//                         // console.log('gTheme:',gTheme)
                    
//                         //
//                         // create top level html and append to page
//                         //
//                         let themeHTML = createThemeHTML(gTheme)
                        
//                         var topLevelDiv = document.getElementById(topLevelDivId);
//                         var newThemeNode = document.createElement('div');
                        
//                         var themeDivId = "metrictheme" + gTheme.id
//                         newThemeNode.setAttribute("id", themeDivId );
//                         newThemeNode.setAttribute("class", "metrictheme");
//                         // newThemeNode.style.backgroundColor = gTheme.gcolor;
                        
//                         newThemeNode.innerHTML = themeHTML;
                        
//                         topLevelDiv.appendChild( newThemeNode )
                    
//                         var newThemeContainer = document.createElement('div');
//                         var themeContainerId = "container" + gTheme.id
//                         newThemeContainer.setAttribute("id", themeContainerId );
//                         newThemeContainer.setAttribute("class", "themecontainer");
                        
//                         newThemeNode.appendChild( newThemeContainer )
                        
                        
//                         let gIndicatorGroups = gTheme.groups
//                         // console.log('gIndicatorGroups:',gIndicatorGroups)
                    
//                         //
//                         // loop through indicator children
//                         //
//                         if (gIndicatorGroups.length > 0) {
//                             for (let i=0; i<gIndicatorGroups.length; i++) {
//                                 let gIndicator = gIndicatorGroups[i]
//                                 // console.log('gIndicator:',gIndicator)
                                
//                                 let cardHTML = createCardHTML(gIndicator)
                                
//                                 var themeDiv = document.getElementById(themeContainerId);
//                                 var newNode = document.createElement('div');
//                                 var indicatorDivId = "metricindicator" + gIndicator.id
                                
//                                 newNode.setAttribute("id", indicatorDivId );
//                                 newNode.setAttribute("class", "metricindicator");
//                                 newNode.innerHTML = cardHTML;
                                
//                                 themeDiv.appendChild( newNode )
//                             } // end for gIndicator
//                         } // end if gIndicatorGroups
                                
//                     } // end for gTheme
//                 } // end if gThemeGroups
        
//             } // end for gTopLevel
//         } // end if gTopLevelGroups
        
//     } // end function drawCards
//      function createTopLevelHTML(group) {
//         let _id = "toplevel_" + group.id
//         let _color = group.gcolor || ""
        
//         let topLevelHTML = "" ;
        
//         topLevelHTML += ' <div class="toplevellabel" style="background-color:'+ _color + '">' + getGrpLabel(group) + '</div>  '
        
//         topLevelHTML += "" ;
        
//         // console.log('topLevelHTML:',topLevelHTML)       
//         return topLevelHTML ;
//     }
//     function createThemeHTML(group) {
//         let _id = "theme_" + group.id
//         let _color = group.gcolor || ""
        
//         let themeHTML = "" ;
        
//         themeHTML += ' <div class="themelabel" style="background-color:'+ _color + '" >' + getGrpFull(group)  + '</div>  '
    
//         themeHTML += "" ;
       
//         // console.log('themeHTML:',themeHTML)       
//         return themeHTML ;
//     }
//     function createCardHTML(group) {
//         let _id = "crd_" + group.id
        
//         let cardHTML = "" ;
        
//         cardHTML +=   '<div id="' + _id  +'" class=" ui-widget-content">'
//         cardHTML +=   '<h2><span id="" style="darker">' + getGrpLabel(group) + '</span></h2>  '
//     	cardHTML +=   ' <div class="content  '
//     	cardHTML += 	'  <br/>  '
//     // 	cardHTML += 	'   <span id=""   >' + getGrpFull(group) + '</span>  '
//     // 	cardHTML += 	'	<br/>  '
//     // 	cardHTML += 	'	<br/>  '
//     	cardHTML += 	'   <span id=""   >' + getGrpDescription(group) + '</span>  '
//     	cardHTML += 	'	<br/>  '
//     	cardHTML += 	'	<br/>  '
//     	cardHTML += 	'	<span id="" >' + getGrpStatus(group) + '</span>  '
//     	cardHTML += 	'	<br/>  '
//     	cardHTML += 	'	<br/>  '
//     	cardHTML += 	'	<span id=""  >' + getGrpValue(group) + '</span>   <span style="display: inline-block; width: 30px;"> </span>  '  
//     	cardHTML += 	'	<br/>  '
//     	cardHTML += 	'	<br/>  '
//     	cardHTML += 	'	<span id=""  >' + getGrpTrend(group) + '</span>  '
//     	cardHTML += 	'	<br/>  ' 
//     	cardHTML += 	'	<br/>  '
//     	cardHTML += 	'	<br/>  '
//     	cardHTML += 	'	<span id=""   >' + getGrpRank(group) + '</span>    <span style="display: inline-block; width: 30px;"> </span>  '
//     	cardHTML += 	'	<br/>  '
//     	cardHTML += 	'	<br/>  '
//     	cardHTML += 	'	<span id="">' + getGrpTrendRank(group) + '</span>  '
//     	cardHTML += 	'	<br/>  '
//     	cardHTML += 	' </div>  '
//         cardHTML +=     '</div>  '
       
       
//         // console.log('cardHTML:',cardHTML)       
//         return cardHTML ;
//     }
        
//     //
// // 
// //
// function getGrpLabel(group){
//     return group.label;
// }
// function getGrpFull(group){
//     let _full = group.full  || null ;
//     if (_full != null) {
//         return group.full;
//     } else {
//         return ""
//     }
// }
// function getGrpDescription(group){
//     let _description = group.description  || null ;
//     if (_description != null) {
//         return group.description;
//     } else {
//         return ""
//     }
// }
// function getGrpStatus(group){
//     let _status = group.status  || null ;
//     if (_status != null) {
//         return '<em>status:</em> <span style="display: inline-block; width: 10px;"></span>    <span id="statusText" ><font color="'+ group.status + '">' + group.status + '</font></span>';
//     } else {
//         return ""
//     }
// }
// function getGrpValue(group){
//     let _value = group.value  || null ;
//     if (_value != null) {
//         return'<i>value:</i>  <span style="display: inline-block; width: 5px;"></span>' + group.value  ;
//     } else {
//         return ""
//     }
// }





