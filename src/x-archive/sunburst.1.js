console.log('loading sunburst.js... ')


function embed() {
    // We respin until the visualization container has non-zero area (there are race 
    // conditions on Chrome which permit that) and the visualization class is loaded.
    var container = document.getElementById("visualization");
    console.log('container',container)
    console.log('container.clientWidth',container.clientWidth)
    
    if (container.clientWidth <= 0 || container.clientHeight <= 0 || !window["CarrotSearchCircles"]) {
      window.setTimeout(embed, 250);
      return;
    }

    // Use the defaults for all parameters.
    
    var circles = new CarrotSearchCircles({
      id: "visualization",
      diameter: "90%",
      centerx: "50%",
      centery: "55%",
      captureMouseEvents: false,
      pixelRatio: Math.min(1.5, window.devicePixelRatio || 1),
      visibleGroupCount: 0,
      onBeforeSelection: function(info) { 
        console.log('    circles onBeforeSelection info:',info)
        //
        // remove grou zoom
        //
        // this.set("zoom", {
        //   groups: [info.group.id],
        //   zoomed: !info.group.zoomed
        // });
        return false;
      },
      onBeforeZoom: function(info) {
        console.log('    circles onBeforeZoom info:',info)
        this.set("selection", {
          groups:   [info.group.id],
          selected: !info.group.selected
        });
        return false;
      },
      // onGroupClick: function(info) {
      //   console.log('    circles onGroupClick info:',info)
      //   console.log("Click.");
      // }, 
      // onGroupDoubleClick: function(info) {
      //   console.log('    circles onGroupDoubleClick info:',info)
      //   console.log("Dbl Click.");
      // },
      // onGroupDoubleClick: function(info) {
      //   var state = info.group.selected ? true : false;
      //   this.set("selection", {
      //     groups: [info.group.id],
      //     selected: !state
      //   });
      //   console.log((state ? "Deselected" : "Selected") + " group " + info.group.id);
      // },
      
      
    //   dataObject: {}

    });
    console.log('VAR circles:',circles)
    
    circles.set({dataObject: {groups: [
      {}, {label: "loading..." }, {},
      {}, {label: "Please wait" }, {}
    ]}});
    
    circles.set({
          // titleBar: "topbottom",
          titleBar: "inscribed",
          // titleBarBackgroundColor: "rgba(0,0,0,.3)",
          titleBarTextColor: "#000",
          titleBarTextPaddingTopBottom: 20,
          titleBarMaxFontSize: 50,
          titleBarLabelDecorator: function(attrs) {
            if (attrs.hoverGroup != null) {
              // If we're hovering over a group, display the full title instead
              // of just the label shown in the circle.
              // attrs.label = attrs.hoverGroup.full;
              
              attrs.label = attrs.hoverGroup.preflabel || "";
              console.log('attrs.label:',attrs.label)
              // attrs.label = attrs.hoverGroup.title;  // editd JAS to use title
            }
          }
    });
    
    
    circles.set("onGroupHover", function(hover) {
        console.log("onGroupHover.", hover.group );
        
    //   console.log("onGroupHover.", hover.group ? hover.group.label : "(none)");
    
        // popupDetails(hover.group)    
        
    });
    
    circles.set("onGroupClick", function(info) {
        console.log("onGroupClick.", info );
        var state = info.group.selected ? true : false;
        this.set("selection", {
          groups: [info.group.id],
          selected: !state
        });
        console.log((state ? "Deselected" : "Selected") + " group " + info.group.id);
      
        event.preventDefault();
        let group = info.group;
        setGroupDetails(group) 
        myPopupOpen(group)
    });
    
    circles.set("onGroupDoubleClick", function(info) {
        console.log("onGroupDoubleClick.", info );
        
        // event.preventDefault();
        // let group = info.group;
        // setGroupDetails(group) 
        // myPopupOpen(group)
        myPopupClose()
    });
    

    
    
    function groupDoIt(Groups) {
          console.log('groupDoIt')
          //
          //
          myPopupClose()
          
          
          var _dataObject = {}
          _dataObject.open =true
          _dataObject.groups = Groups
          circles.set("dataObject", _dataObject); 
          
          var customAttributes = function(opts, params, vars) {
            // console.log("    fetch Color decorator callback.", params, vars);
            vars.groupColor = params.group.gcolor;
            vars.labelColor = "auto";
          };
          
          circles.set({
              groupColorDecorator: customAttributes,
          }); 
        
    }; // end groupDoIt
      
      
      
    //
    //  get groupd data from sessionStorage or get indictaor data transform into groups
    //
    var Groups = JSON.parse(sessionStorage.getItem('groups')) || null;
    // Groups = null;
    console.log('scorecard.js Groups from sessionStorage: ',Groups)
            
    // check for Groups before proccesing, else get it!
    if (Groups != null) {
        
        groupDoIt(Groups)
        
        
    } else {
      // COMMENT OUT DATA FILE FOr teSTING
      // fetch('../../things/jsonld/_Indicator_.jsonld')
    
      fetch('https://6nepl40j73.execute-api.us-east-1.amazonaws.com/dev/entities//JSONLD')
    
        .then(function (response) {
            
          return response.json();
        })
        .then(function (data) {
            console.log('data',data);
          
            console.log('transforing Groups from data:',data)
            
            // transform JSONLD data into Groups
            var groups = transformGroups(data,"", function(transformed) {
                
                let d = new Date();
              	let returned  = new Date().getTime();
              	console.log('returned',returned)
              	
              	console.log('transformed:',transformed)
              	
              	var groups = transformed.groups;
              	
                console.log('transformed Groups:',groups)
                
                var res = sessionStorage.setItem('groups', JSON.stringify(groups));
                console.log("sessionStorage.setItem('groups'",res)
                
                groupDoIt(groups)
            
              
            })
            
      }); // end fetch
      
      
    }; // end else if

    installResizeHandlerFor(circles, 0);
}
embed();
