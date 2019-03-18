console.log('loading tree.js... ')


function embed() {
    
        
    var margin = {top: 30, right: 20, bottom: 30, left: 20},
        width = 960,
        barHeight = 20,
        barWidth = (width - margin.left - margin.right) * 0.8;
    
    var i = 0,
        duration = 400,
        root;
    
    var diagonal = d3.linkHorizontal()
        .x(function(d) { return d.y; })
        .y(function(d) { return d.x; });
    
    var svg = d3.select("body").append("svg")
        .attr("width", width) // + margin.left + margin.right)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    
    
    var Tree = JSON.parse(sessionStorage.getItem('tree')) || null;
    console.log('scorecard.js Tree from sessionStorage: ',Tree)
    
    
    // NEED TO ADD DIFFERENT LOGIC FOR D3 CALL!!!!
    
    
    var treeurl = 'https://6nepl40j73.execute-api.us-east-1.amazonaws.com/dev/entities//TREE'
    console.log('treeurl:',treeurl)
    // d3.json("flare.json", function(error, flare) {
    // d3.json("myTree.json", function(error, flare) {
    d3.json(treeurl, function(error, jsontree) {
      if (error) throw error;
      console.log('jsontree.children[0]:',jsontree.children[0])
      root = d3.hierarchy(jsontree.children[0]);
      root.x0 = 0;
      root.y0 = 0;
      update(root);
    });
    
    function update(source) {
    
      // Compute the flattened node list.
      var nodes = root.descendants();
    
      var height = Math.max(400, nodes.length * barHeight + margin.top + margin.bottom);
    
      d3.select("svg").transition()
          .duration(duration)
          .attr("height", height);
    
      d3.select(self.frameElement).transition()
          .duration(duration)
          .style("height", height + "px");
    
      // Compute the "layout". TODO https://github.com/d3/d3-hierarchy/issues/67
      var index = -1;
      root.eachBefore(function(n) {
        n.x = ++index * barHeight;
        n.y = n.depth * 20;
      });
    
      // Update the nodes…
      var node = svg.selectAll(".node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });
    
      var nodeEnter = node.enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
          .style("opacity", 0);
    
      // Enter any new nodes at the parent's previous position.
      nodeEnter.append("rect")
          .attr("y", -barHeight / 2)
          .attr("height", barHeight)
          .attr("width", barWidth)
          .style("fill", color)
          .attr("title",getLabel)
          .on("click", click)
          .on("dblclick", dblclick)
          .on("mouseover", mouseover);

            
      nodeEnter.append("text")
          .attr("dy", 3.5)
          .attr("dx", 5.5)
          .text(function(d) { return d.data.name; })
          
      nodeEnter.append("title")
          .text(function(d) { return getTitle(d); })
  
    
    
    
      // Transition nodes to their new position.
      nodeEnter.transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
          .style("opacity", 1);
    
      node.transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
          .style("opacity", 1)
        .select("rect")
          .style("fill", color);
    
      // Transition exiting nodes to the parent's new position.
      node.exit().transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
          .style("opacity", 0)
          .remove();
    
      // Update the links…
      var link = svg.selectAll(".link")
        .data(root.links(), function(d) { return d.target.id; });
    
      // Enter any new links at the parent's previous position.
      link.enter().insert("path", "g")
          .attr("class", "link")
          .attr("d", function(d) {
            var o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
          })
        .transition()
          .duration(duration)
          .attr("d", diagonal);
    
      // Transition links to their new position.
      link.transition()
          .duration(duration)
          .attr("d", diagonal);
    
      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
          .duration(duration)
          .attr("d", function(d) {
            var o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
          })
          .remove();
    
      // Stash the old positions for transition.
      root.each(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }
    
    // Toggle children on click.
    function click(d) {
        console.log('click', d)
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }
    
    function color(d) {
      // console.log('color d:',d)
      return d.data.gcolor;
      // return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
    }

    function dblclick(d) {
        console.log('dblclick', d)
        var msg = getText(d)
          window.confirm(msg)
    }

    function mouseover(d) {
        // if (!d.children) return;
        // console.log('mouseover', d)

        // var header = document.getElementsByClassName('propsheet-header');
        // header[0].innerHTML = getGroup(d)
        
        // var body = document.getElementsByClassName('propsheet-body');
        // body[0].innerHTML = htmlPreview(d)

        // var footer = document.getElementsByClassName('propsheet-footer');
        // footer[0].innerHTML = getIdentifer(d);
    }
    
    
// prep title of element 
function getText(d){
    // var txt = d.depth ? d.name.split(" ")[0] : "" ;
    // //console.log('txt', txt)
    // return txt;
};
    // prep title of element 
function getLabel(t){
    //console.log(t)

    var _label = t.data.label || null ;

    return _label
};

// prep title of element 
function getTitle(t){
    console.log('getTitle t:',t)
    // title content for mouseover

    // var _dbotype = t.dbotype || "";
    // var _group = t.group || "";
    var _name = t.data.name || "";
    var _label = t.data.label || _name ;
    var _description = t.data.description || "";
    var _datavalues = t.data.datavalues || "";
    // // var _startdate = t.startdate || "";
    // // var _status = t.status || "";
    // //var _colour = t.colour || "";
    // var _color = t.color || "" ;
    // var _id = t.id || "";
    
    // var _title =  _group + ": " + _label + "\n" + _description + _color + "\n" ;
    var _title =  _label + ": " + _description + '     ' + _datavalues + "\n" ;
    console.log('_title', _title)
    return _title
};

// prep previw of element contents
function getDetails(t){
    console.log('getDetails', t)
    // title content for mouseover

    var _dbotype = t.dbotype || "";
    var _group = t.group || "";
    var _name = t.name || "";
    var _label = t.label || _name ;
    var _description = t.description || "";
    // var _startdate = t.startdate || "";
    // var _status = t.status || "";
    //var _colour = t.colour || "";
    var _color = t.color || "" ;
    var _id = t.id || "";
    
    var _preview =   "<h3>" + _label + "</h3>" + "\n\n<p>" + _description + _color + "</p>\n\n" ;
    //console.log('_preview', _preview)
    return _preview
};
    
}
embed();