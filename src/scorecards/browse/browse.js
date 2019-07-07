/**
 * Semantic Data Browser HTML5 (demo variant)
 * Copyright 2018, Asterius Media LLC, All Rights Reserved.
 */
'use strict';
console.log('loading browse.js... ')
console.log('browse.js v.2019.07.07.13.48')

// retrieve url params
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
    let d = new Date();
    let dt  = new Date().getTime();
    return dt;
} 

//
// After page loads get graph data and process selected element
//
function whenPageLoaded() {
    console.log('whenPageLoaded ...')
    
    	
    var reset = getUrlVars()["reset"] || null;
    
    // var datalink = getUrlVars()["datalink"] || '../../things/jsonld/_Indicator_.jsonld'
    
    var datalink = getUrlVars()["datalink"] || 'https://phlh4tx1wl.execute-api.us-east-1.amazonaws.com/dev/entities//JSONLD'

    setElement('datalink', datalink);

	var startid = getUrlVars()["startid"] || null;
    setElement('startid', startid);
	
	var nextid = getUrlVars()["nextid"] || null;
    
    console.log('datalink: ',datalink)
    console.log('reset: ',reset)
    console.log('startid: ',startid)
    console.log('nextid: ',nextid)
    
    if (getElement('datalink') != datalink ) {
        console.log("getElement('datalink'): ",getElement('datalink'))
        console.log(" != ")
        console.log('datalink: ',datalink)
    }
    
    // console.log('reset=true',reset=true)
    // console.log('reset==true',reset==true)
    // console.log('reset===true',reset===true)
    if ( ( reset != null ) ) { 
    // if ( ( reset === true ) && ( reset == true ) ) { 
        if (typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            console.log('localStorage:',localStorage)
            console.log('clearing localStorage')
            localStorage.clear();
            console.log('sessionStorage:',sessionStorage)
            console.log('clearing sessionStorage')
            sessionStorage.clear();
        } else {
            // Sorry! No Web Storage support..
            console.log('Sorry! No Web Storage support..')
        }
        
    } else {
        console.log('localStorage:',sessionStorage)
        console.log('sessionStorage:',sessionStorage)
    }
    
    
    console.log("getElement('datalink'): ",getElement('datalink'))
    console.log("getElement('startid'): ",getElement('startid'))
    // let mg = getMyGraph() || null ;
    let mg = null ;
    // console.log('mg', mg )
    // console.log('getMyGraph()',getMyGraph() )
    
    if ( isEmpty(mg) ) {
    
        console.log('isEmpty',mg)
        
        var myGraph = JSON.parse(sessionStorage.getItem('graph')) || null;
        console.log('browse.js myGraph from sessionStorage: ',myGraph)
                
        // check for Groups before proccesing, else get it!
        if (myGraph != null) {
            
            let localgraph = setMyGraph(myGraph);
            processGraph(myGraph);
            
            
        } else {
        
        
            fetchMyLinkedData(datalink, function(json) {
                console.log('after fetchMyLinkedData')
                let myLD = JSON.parse(json) || json ;
                // console.log('myLD',myLD)
                
                
                resolveLinkedData(myLD, function(_LD){
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
                    
                    
                    let defaultId = _LD["startId"] || startid || null ;
                    
                    //
                    // TODO select info from LD to set LD Bwowser Title Description and Source URL
                    //
                    function makeSchemaJsonld () {
                    //   "@id": "_Indicator_",
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
                    } // end 
                    
                    //
                    // TODO set graph storage name to form of path that unique identifies it
                    //
                    let myGraph = _LD["@graph"] || null ;
                    console.log('myGraph: ',myGraph)
                    
                    
                    var res = sessionStorage.setItem('graph', JSON.stringify(myGraph));
                    console.log("browse.js sessionStorage.setItem('graph'",res)
                
                    let localgraph = setMyGraph(myGraph);
                    processGraph(myGraph);
                   
                    
                })
            
            
            }) // end fetchMyLinkedData
        
        }; // end else if
        
        
        
    } else if ( !isEmpty(mg) ) {
            
            console.log('not Empty',mg)
            let myGraph = JSON.parse(mg) || mg ;
            console.log(myGraph)
            
            processGraph(myGraph);
    
    } else {            // temp until logic figured out
        console.log('unknown')
        // fetchMyLinkedData(datalink, function(json) {
        //     let myLD = JSON.parse(json) || json ;
        //     console.log('myLD',myLD)
            
            
            
        //     let myGraph = myLD["@graph"] || null ;
        //     console.log('myGraph: ',myGraph)
        //     setMyGraph(myGraph);
            
        //     processGraph(myGraph);
            
            
        // }) // end getMyLinkedData
    } // end !null

} // end 
function processGraph(graph,cb) {
    console.log('processGraph ...')
    try {

//     var reset = getUrlVars()["reset"];
// 	var datalink = getUrlVars()["datalink"] || sessionStorage.getItem('datalink');
	var startid = getUrlVars()["startid"] || sessionStorage.getItem('startid');
	var nextid = getUrlVars()["nextid"] || sessionStorage.getItem('nextid');
	var defaultid = startid || sessionStorage.getItem('defaultid') || 'foafiaf:Scorecard_Top_25' || null ;
// 	console.log('reset: ',reset)
// 	console.log('datalink: ',datalink) 
	console.log('startid: ',startid)
    console.log('nextid: ',JSON.stringify(nextid))
    console.log('defaultid: ',defaultid)


   // get startingid element
    let _elID = null
    if ( !isEmpty(nextid) ) {
        _elID =  nextid ; 
        // console.log('nextid _elID: ', _elID)
    } else if ( !isEmpty(startid) ) {
        _elID =  startid ; 
        // console.log('startid _elID: ', _elID)
    } else if ( !isEmpty(defaultid) ) {
        _elID =  defaultid ; 
        // console.log('defaultid _elID: ', _elID)
    } else {
        //
        // else select first array element
        //
        // let firstEl = graph[0]["@id"]
        // let _elID = firstEl || null;
        // _elID =  "foafiaf:Spoke_Education" ; 
        // console.log('else _elID: ', _elID)
    }
    if ( _elID === null ) _elID = graph[0]["@id"] || null
    // console.log('_elID: ', _elID)
    
    let _eL = getElement(_elID) ;
    // console.log('_eL: ', _eL)
    
    let _elData = getElementData(graph,_elID)
    // console.log('_elData: ', _elData)
    
    processElementData(_elData)
    
    } catch (e) {
        console.error(dtstamp(),'processGraph error',e)
      	
    } finally {

        console.log(dtstamp(),'ending processGraph')
        if (cb) cb(null);
  	    return null
      	
    } // end try catch   
} // end processGraph
function processElementData(element) {
    console.log('processElementData ...',element)
   
    // PLACEHOLDER FOR ADDITION DATA ENHANCEMENT OF ELEMENT
    
    // save data element in local store by id
    // let _id = setElement(element) ;
    
    let _breadcrumb = buildNodeBreadcrumb(element)
    // console.log('_breadcrumb: ', _breadcrumb)
    //set node element breadcrumb
    var container = document.getElementById("breadcrumb");
    container.innerHTML = _breadcrumb;
    
    
    let _nodeC = buildNodeContent(element)
    // console.log('_nodeC: ', _nodeC)
    //set node element content
    var container = document.getElementById("node");
    container.innerHTML = _nodeC; 
    
    
    
}
//
// Helper functions
//
let myGraph= null;
function getMyGraph(){
  console.log('getMyGraph')
  myGraph = sessionStorage.getItem('myGraph');
//   console.log('myGraph',myGraph)
  return myGraph
}
function setMyGraph(data){
//   console.log('setMyGraph')
  myGraph = data
  
                // Temporarily do not save
                //

  
//   sessionStorage.setItem('myGraph', JSON.stringify(myGraph));
//   console.log('myGraph',myGraph)
  return myGraph
}
function getElement(identifier){
  console.log('getElement identifier: ',identifier)
  try {
      var _element = localStorage.getItem('identifier');
    //   console.log('getElement   _element: ',_element)
      var element = JSON.parse(_element)  //|| _element ;
    //   console.log('getElement    element: ',element)
      return element
  } catch (e) {
      console.error('e',e)
  }
}
function setElement(identifier,element){
  console.log('setElement identifier: ',identifier)
  try {
    //   console.log('setElement    element: ',element)
      localStorage.setItem(identifier, JSON.stringify(element));
      return identifier
  } catch (e) {
      console.error('e',e)
  }
}
// collect URL query string parameters
function getUrlVars() {
    console.log('getUrlVars ...')
	var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    	vars[key] = value;
	});
	return vars;
} // end getUrlVars
// is object empty
function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null) return true;
    if (obj == "null") return true;
    if (obj == "null undefined") return true;
    // if (obj == "[Function: String]") return true;
    
    if (Array.isArray(obj)) {
      let el = obj[0] 
      if (el == null) return true;
    }  
    
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0)    return false;
    if (obj.length === 0)  return true;
    
    if ( obj === {} )  return true;
    
    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and toValue enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
 
    return true;
}
// retrieve JSON-LD data from url
function fetchMyLinkedData(_url,cb){
    console.log('fetchMyLinkedData ...', _url)
    
    let url = _url || 'sample.json' ; 
    console.log('url',url)
    fetch(url , {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
      })
      .then(function(response) {
        // console.log(response.text())   
        return response.text();
      })
      .then(function(json) {
        // console.log('fetch json',json);
        console.log('fetch completed');
        if (cb) cb(json)
        return json ;
      });	
    
} // end fetchMyLinkedData

// get JSON object from array
function getById(arr, value) {
    if (arr) {
      for (var i=0, iLen=arr.length; i<iLen; i++) {
        if (arr[i]["@id"] == value) return arr[i];
      }
    }
}
// find object element data from graph array
function getElementData(_graph, _elID, cb) {
    console.log('getElementData ...',_elID)
    let ed = {};
 
    let _el = getById(_graph,_elID) || null ;
    console.log('getElementData _el: ', _el)
    
    if (!isEmpty( _el )){
        
        ed["_id"] =              _el["@id"] || "" ;
        ed["_type"] =            _el["@type"] || "" ;
        ed["rdf:type"] =         _el["rdf:type"] || "" ;
        
        ed["rdfs:label"] =       _el["rdfs:label"] || _el["rdf:label"] || "" ;
        ed["rdfs:comment"] =     _el["rdfs:comment"] ||  _el["rdf:comment"] || "" ;
        
        ed["dbo:type"] =         _el["dbo:type"] || "" ;
        ed["dbo:abstract"] =     _el["dbo:abstract"] || "" ;
        
        ed["dc:title"] =         _el["dc:title"] || "" ;
        ed["dc:description"] =   _el["dc:description"] || "" ;
        
        ed["owl:sameAs"] =       _el["owl:sameAs"] || "" ;
        ed["owl:seeAlso"] =      _el["owl:seeAlso"] || "" ;
        
        ed["skos:prefLabel"] =   _el["skos:prefLabel"] || "" ;
        ed["skos:definition"] =  _el["skos:definition"] || "" ;
        ed["skos:related"] =     _el["skos:related"] || "" ;
        ed["skos:inScheme"] =    _el["skos:inScheme"] || "" ;
        ed["skos:broader"] =     _el["skos:broader"] || "" ;
        ed["skos:narrower"] =    _el["skos:narrower"] || "" ;
        
        ed["foaf:topic"] =       _el["foaf:topic"] || "" ;
        if (!isEmpty( _el["foafiaf:image"] )) {
            ed["foaf:image"] = 'http://foafiaf.transformrockford.org/img/' + _el["foafiaf:image"] 
        } else {
            ed["foaf:image"] = "" ;
        }
        
        ed["tmo:PredecessorDependency"] =    _el["tmo:PredecessorDependency"] || "" ;
        ed["tmo:SuccessorDependency"]   =    _el["tmo:SuccessorDependency"] || "" ;

        ed["CrumbTrail"] = _el["CrumbTrail"] || getBreadCrumb( _graph , _el )
       
        //
        // dbo data elements
        //
        let _dbo = []
        for (var key in _el) {
            if (key.substring(0, 4) == "dbo:") {
                _dbo[key] = _el[key];
            }
        }
        console.log('_dbo: ',_dbo)
        ed["dbo"] = _dbo
        
        //
        // foaf data elements
        //
        let _foaf = []
        for (var key in _el) {
            if (key.substring(0, 5) == "foaf:") {
                _foaf[key] = _el[key];
            }
        }
        console.log('_foaf: ',_foaf)
        ed["foaf"] = _foaf
        
        //
        // foafiaf data elements
        //
        let _foafiaf = []
        for (var key in _el) {
            if (key.substring(0, 8) == "foafiaf:") {
                _foafiaf[key] = _el[key];
            }
        }
        console.log('_foafiaf: ',_foafiaf)
        ed["foafiaf"] = _foafiaf
        
    }    
    
    console.log('getElementData ed: ',ed)
    if (cb) cb(ed) 
    return ed ; 
} // end getElementData
// build content html for node element
function buildNodeBreadcrumb(_ed, cb) {
    console.log('buildNodeBreadcrumb ...',_ed)
    
    // <!--<a href="foafiaf:Segment">Segments</a> -->
    let breadcrumb = "/"
    
    var datalink = getUrlVars()["datalink"] || "";
	var startid = getUrlVars()["startid"] || "";
	
    let baseUrl = "?datalink=" + datalink + "&startid=" + startid 
    
    let CrumbTrail = _ed["CrumbTrail"]
    console.log('CrumbTrail.length',CrumbTrail.length)
    
    for (let i=0; i<CrumbTrail.length-1; i++) {
        let item = CrumbTrail[i] ;
        console.log('buildNodeBreadcrumb item: ', item)
        
        let qs = '&nextid=' + item.id ;
        
        breadcrumb += ' <a href="' + baseUrl + qs + '" title="'+ item.description + '" >' + item.label + "</a> / " 
        
        // https://preview.c9users.io/asteriusj/foafiaf/public/browse/index.html?datalink=../things/jsonld/_Indicator_.jsonld&startid=foafiaf:Scorecard_Diversity&nextid=foafiaf:Scorecard_Recreate
    }
    
    
    // console.log('breadcrumb:',breadcrumb)
    if (cb) cb(breadcrumb) 
    return breadcrumb ; 
} // buildNodeBreadcrumb    
function buildNodeContent(_ed, cb) {
    console.log('buildNodeContent ...',_ed)
    
    var datalink = getUrlVars()["datalink"] || "";
	var startid = getUrlVars()["startid"] || "";
	var nextid = getUrlVars()["nextid"] || "";
	
    let baseUrl = "?datalink=" + datalink + "&startid=" + startid + "&nextid="

    let content = "" ;
    content += '<div id="node" about="' + _ed["_id"] + '" typeof="' + _ed["_type"] + '">'
    
    content += '<h2 class="Header">' 
    content += '<span property="skos:notation"></span>'  
    if (!isEmpty(_ed["skos:prefLabel"] )) {
        content += '<span property="skos:prefLabel" xml:lang="en">' + _ed["skos:prefLabel"] + '</span> '
    } else if (!isEmpty(_ed["rdf:label"] )) {
        content += '<span property="rdfs:label" xml:lang="en">' + _ed["rdfs:label"] + '</span> '
    } else if (!isEmpty(_ed["dc:title"] )) {
        content += '<span property="dc:title" xml:lang="en">' + _ed["dc:title"] + '</span> '
    }
    // content += '<br/> <small>' + _ed["_id"]  + ' < is type > ' + _ed["_type"] + ' </small>'
    content += '</h1>' 

    if (!isEmpty( _ed["rdf:type"] )) {
        // content += '<h3>RDF Type (<a href="" title="ADD LINK TO SPEC">rdf:type</a>)</h3>'
        content += '<h3 class="rdftype">RDF Type</h3>'
        content += '	<span class="Content rdftype" property="rdf:type" style="">'
        content +=          _ed["rdf:type"] 
        content += '	</span>'
    }
     
    if (!isEmpty( _ed["dbo:type"] )) {
        // content += '<h3>Type (<a href="" title="ADD LINK TO SPEC">dbo:type</a>)</h3>'
        content += '<h3 class="dbotype">Type</h3>'
        content += '	<span class="Content dbotype" property="dbo:type">'
        content +=          _ed["dbo:type"] 
        content += '	</span>'
    }
    
    if (!isEmpty( _ed["rdfs:label"] )) {
        // content += '<h3>Label (<a href="" title="ADD LINK TO SPEC">rdfs:label</a>)</h3>'
        content += '<h3>Label</h3>'
        content += '	<span class="Content" property="rdfs:label">'
        content +=          _ed["rdfs:label"] 
        content += '	<</span>'
    }
    
    if (!isEmpty( _ed["dbo:abstract"] )) {
        // content += '<h3> Abstract (<a href="" title="ADD LINK TO SPEC">dbo:abstract</a>)</h3>'
        content += '<h3> Abstract </h3>'
        content += '	<span class="Content" property="dbo:abstract">'
        content +=          _ed["dbo:abstract"] 
        content += '	</span>'
    }
    
    if (!isEmpty( _ed["rdfs:comment"] )) {
        // content += '<h3>Comment (<a href="" title="ADD LINK TO SPEC">rdfs:comment</a>)</h3>'
        content += '<h3>Comment</h3>'
        content += '	<span class="Content" property="rdfs:comment">'
        content +=          _ed["rdfs:comment"]
        content += '	</span>'
        
    }
    
    if (!isEmpty( _ed["dc:title"] )) {
        // content += '<h3>Title (<a href="" title="ADD LINK TO SPEC">dc:title</a>)</h3>'
        content += '<h3>Title</h3>'
        content += '	<span class="Content" property="dc:title">'
        content +=          _ed["dc:title"] 
        content += '	</span>'
    }
    
    if (!isEmpty( _ed["dc:description"] )) {
        // content += '<h3>Description (<a href="" title="ADD LINK TO SPEC">dc:description</a>)</h3>'
        content += '<h3>Description</h3>'
        content += '	<span class="Content" property="dc:description">'
        content +=          _ed["dc:description"] 
        content += '	</span>'
    }
    
    if (!isEmpty( _ed["skos:prefLabel"] )) {
        // content += '<h3>Pref Label (<a href="" title="ADD LINK TO SPEC">skos:prefLabel</a>)</h3>'
        content += '<h3>Pref Label</h3>'
        content += '	<span class="Content" property="skos:prefLabel">'
        content +=          _ed["skos:prefLabel"] 
        content += '	</span>'
    }
    
    if (!isEmpty( _ed["foaf:image"] )) {
        // content += '<h3>Image (<a href="" title="ADD LINK TO SPEC">foaf:image</a>)</h3>'
        content += '<h3>Image</h3>'
        content += '	<span class="Content" property="foaf:image">'
        content += '         <img src="'+ _ed["foaf:image"] + '">'
        content += '	</span>'
        
    }
    
    if (!isEmpty( _ed["foaf:topic"] )) {
        // content += '<h3>Topic (<a href="" title="ADD LINK TO SPEC">foaf:topic</a>)</h3>'
        content += '<h3>Topic</h3>'
        content += '	<span class="Content" property="foaf:topic">'
        content +=          _ed["foaf:topic"]
        content += '	</span>'
        
    }
    
    if (!isEmpty( _ed["skos:inScheme"] )) {
        // content += '<h3>Concept Scheme (<a href="" title="ADD LINK TO SPEC">skos:inScheme</a>)</h3>'
        content += '<h3>Concept Scheme</h3>'
        content += '<ul class="Content" rel="skos:inScheme">'
        content += '    <li resource="' + _ed["skos:inScheme"] + '">'
        content += '		 <a href="' + baseUrl + _ed["skos:inScheme"] + '">' + _ed["skos:inScheme"] + '</a>'
        content += '	</li>'
        content += '</ul>'
    }
    
    if (!isEmpty( _ed["skos:broader"] )) {
        // content += '<h3>Broader Concepts (<a href="" title="ADD LINK TO SPEC">skos:broader</a>)</h3>'
        content += '<h3>Broader</h3>'
        content += '<ul class="Content" rel="skos:broader">'
        content += '    <li resource="' + _ed["skos:broader"] + '">'
        content += '		 <a href="' + baseUrl + _ed["skos:broader"] + '">' + _ed["skos:broader"] + '</a>'
        content += '	</li>'
        content += '</ul>'
    }
    
    if (!isEmpty( _ed["skos:narrower"] )) {
        // content += '<h3>Narrower Concepts (<a href="" title="ADD LINK TO SPEC">skos:narrower</a>)</h3>'
        content += '<h3>Narrower</h3>'
        content += '<ul class="Content" rel="skos:narrower">'
        if ( Array.isArray(_ed["skos:narrower"]) ) {
            for (var n=0; n<_ed["skos:narrower"].length; n++) {
                let nn = _ed["skos:narrower"][n]
                content += '    <li resource="' + nn + '">'
                content += '		 <a href="' + baseUrl + nn + '">' + nn + '</a>'
                content += '	</li>'
            }
        } else {
                content += '    <li resource="' + _ed["skos:narrower"] + '">'
                content += '		 <a href="' + baseUrl + _ed["skos:narrower"] + '">' + _ed["skos:narrower"] + '</a>'
                content += '	</li>'
        }
        content += '</ul>'
    }
    
    
    if (!isEmpty( _ed["skos:definition"] )) {
        // content += '<h3>Definition (<a href="" title="ADD LINK TO SPEC">skos:definition</a>)</h3>'
        content += '<h3>Definition</h3>'
        content += '	<span class="Content" property="skos:definition"><p>'
        content +=          _ed["skos:definition"]
        content += '	</p></span>'
    }
        
    if (!isEmpty( _ed["skos:related"] )) {
        // content += '<h3>Related Concept (<a href="" title="ADD LINK TO SPEC">skos:related</a>)</h3>'
        content += '<h3>Related</h3>'
        content += '<ul class="Content" rel="skos:related">'
        if ( Array.isArray(_ed["skos:related"]) ) {
            for (var n=0; n<_ed["skos:related"].length; n++) {
                let nn = _ed["skos:related"][n]
                content += '    <li resource="' + nn + '">'
                content += '		 <a href="' + baseUrl + nn + '">' + nn + '</a>'
                content += '	</li>'
            }
        } else {
                content += '    <li resource="' + _ed["skos:related"] + '">'
                content += '		 <a href="' + baseUrl + _ed["skos:related"] + '">' + _ed["skos:related"] + '</a>'
                content += '	</li>'
        }
        content += '</ul>'
    }
    
    if (!isEmpty( _ed["owl:sameAs"] )) {
        // content += '<h3>Same As (<a href="" title="ADD LINK TO SPEC">owl:sameAs</a>)</h3>'
        content += '<h3>Same As</h3>'
        content += '<ul class="Content" rel="owl:sameAs">'
        if ( Array.isArray(_ed["owl:sameAs"]) ) {
            for (var n=0; n<_ed["owl:sameAs"].length; n++) {
                let nn = _ed["owl:sameAs"][n]
                content += '    <li resource="' + nn + '">'
                content += '		 <a target="_blank" href="' + nn + '">' + nn + '</a>'
                content += '	</li>'
            }
        } else {
                content += '    <li resource="' + _ed["owl:sameAs"] + '">'
                content += '		 <a target="_blank" href="' + _ed["owl:sameAs"] + '">' + _ed["owl:sameAs"] + '</a>'
                content += '	</li>'
        }
        content += '</ul>'
    }
    
    if (!isEmpty( _ed["owl:seeAlso"] )) {
        // content += '<h3>See Also (<a href="" title="ADD LINK TO SPEC">owl:seeAlso</a>)</h3>'
        content += '<h3>See Also</h3>'
        content += '<ul class="Content" rel="owl:seeAlso">'
        if ( Array.isArray(_ed["owl:seeAlso"]) ) {
            for (var n=0; n<_ed["owl:seeAlso"].length; n++) {
                let nn = _ed["owl:seeAlso"][n]
                content += '    <li resource="' + nn + '">'
                content += '		 <a target="_blank" href="'+ nn + '">' + nn + '</a>'
                content += '	</li>'
            }
        } else {
                content += '    <li resource="' + _ed["owl:seeAlso"] + '">'
                content += '		 <a target="_blank" href="'+ _ed["owl:seeAlso"] + '">' + _ed["owl:seeAlso"] + '</a>'
                content += '	</li>'
        }
        content += '</ul>'
    }
    
    
    //
    // dbo data elements
    //
    console.log('_ed["dbo"] ',_ed["dbo"])
    if (!isEmpty( _ed["dbo"] )) {
        content += '<h3>dbo ()</h3>'
        content += '<ul rel="dob">'
        if ( Array.isArray(_ed["dbo"]) ) {
            for (var n=0; n<_ed["dbo"].length; n++) {
                let nn = _ed["dbo"][n]
                content += '    <li resource="' + nn + '">'
                content += '	' +	 nn
                content += '	</li>'
            }
        } else {
                content += '    <li resource="' + _ed["dbo"] + '">'
                content += '	' +	  _ed["dbo"] 
                content += '	</li>'
        }
        content += '</ul>'
    }
    
    //
    // foaf data elements
    //
    console.log('_ed["foaf"] ',_ed["foaf"])
    if (!isEmpty( _ed["foaf"] )) {
        content += '<h3>foaf ()</h3>'
        content += '<ul rel="foaf">'
        if ( Array.isArray(_ed["foaf"]) ) {
            for (var n=0; n<_ed["foaf"].length; n++) {
                let nn = _ed["foaf"][n]
                content += '    <li resource="' + nn + '">'
                content += '	' +	 nn
                content += '	</li>'
            }
        } else {
                content += '    <li resource="' + _ed["foaf"] + '">'
                content += '	' +	  _ed["foaf"] 
                content += '	</li>'
        }
        content += '</ul>'
    }
    
    
    
    content += '</div>'
    
    if (cb) cb(content) 
    return content ; 
} // buildNodeContent

  

(function() {
    console.log('function browse.js ...')
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