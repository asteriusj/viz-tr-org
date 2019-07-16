console.log('loading metricpopup.js... ')
console.log('metricpopup.js v.2019.07.07.15.53')
/**
 * Semantic Data Metric Detials Card
 * Copyright 2018, Asterius Media LLC, All Rights Reserved.
 */
 'use strict';

// $(function(){
//     $('#full-width').draggable({
//       handle: ".modal-header"
//   });
//     $('#full-width').resizable();
  
  
// });
$( function() {
    $( "#resizable" ).resizable();
    $( "#myPopupBox" ).resizable();
  } );
$( function() {
    $( "#draggable" ).draggable();
    $( "#myPopupBox" ).draggable();
    $( "metricpopup" ).draggable();
  } );
function myPopupFunction(group) {
    console.log('myPopupFunction',group)
    var x = document.getElementById("myPopupBox");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
function myPopupClose(group) {
    console.log('myPopupClose')
    var x = document.getElementById("myPopupBox");
    x.style.display = "none"
}
function myPopupOpen(group) {
    console.log('myPopupOpen')
    var x = document.getElementById("myPopupBox");
    x.style.display = "block"
}

//
// 
//
function getGrpLabel(group){
    return group.label;
}
function getGrpPrefLabel(group){
    return group.preflabel;
}
function getGrpFull(group){
    let _full = group.full  || null ;
    if (_full != null) {
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
    let yr = group.year || null;
    if ((!_value.includes('in')) && (yr != null)) {
        // console.log(_value.includes('in')? 'is' : 'is not')
        _value = _value + ' in ' + yr ;
    }
    
    if (_value != null) {
        return'<i>value:</i>  <span style="display: inline-block; width: 5px;"></span>' + _value  ;
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
function setGroupDetails(group) {
    // console.log('setGroupDetails',group)
    var x = document.getElementById("myPopupBox");
    
    var grpLabel = document.getElementById("grpLabel");
    // grpLabel.innerHTML = getGrpLabel(group);
    grpLabel.innerHTML = getGrpPrefLabel(group);
    
    // var grpFull = document.getElementById("grpFull");
    // let _full = group.full  || null ;
    // if (_full != null) {
    //     grpFull.innerHTML = getGrpFull(group);
    // } else {
    //     grpFull.innerHTML = ""
    // }
    
    var grpDescription = document.getElementById("grpDescription");
    let _description = group.description  || null ;
    if (_description != null) {
        grpDescription.innerHTML = getGrpDescription(group);
    } else {
        grpDescription.innerHTML = ""
    }
    
    var grpStatus = document.getElementById("grpStatus");
    let _status = group.status  || null ;
    if (_status != null) {
        grpStatus.innerHTML = getGrpStatus(group) ;
    } else {
        grpStatus.innerHTML = ""
    }
    
    // var grpUnits = document.getElementById("grpUnits");
    // grpUnits.innerHTML = '<em>units:</em> ' + group.units;
    
    var grpValue = document.getElementById("grpValue");
    let _value = group.value  || null ;
    if (_value != null) {
        grpValue.innerHTML = getGrpValue(group) ;
    } else {
        grpValue.innerHTML = ""
    }
    
    var grpTrend = document.getElementById("grpTrend");
    let _trend = group.datatrend  || null ;
    if (_trend != null) {
        grpTrend.innerHTML =  getGrpTrend(group) ;
    } else {
        grpTrend.innerHTML = ""
    }
    
    var grpRank = document.getElementById("grpRank");
    let _rank = group.rank  || null ;
    if (_rank!== null) {
        grpRank.innerHTML = getGrpRank(group) ;
    } else {
        grpRank.innerHTML = ""
    }
    
    var grpTrendRank = document.getElementById("grpTrendRank");
    let _ranktrend = group.ranktrend || null ;
    if ( (_ranktrend != null) & (_ranktrend != undefined) ) {
        // let _rankico = null
        grpTrendRank.innerHTML = getGrpTrendRank(group) ;
    } else {
        grpTrendRank.innerHTML = ""
    }
    
    return true
}

