
            const color = d3.scaleOrdinal(d3.schemePaired);
            
            // marketing / strategy
            // var treeurl = 'https://e8apsbxd32.execute-api.us-east-1.amazonaws.com/dev/entities/1W_3HbMs0XLNsFHM7tNMdo5W7Con5zXUav-gXBpfjvJM/TREE'
            // _Indicators_
            // var treeurl = 'https://6nepl40j73.execute-api.us-east-1.amazonaws.com/dev/entities/1Y_15ezF4J2fQKsiv6cHmMA9TMWH6isXrebR0fdBxTNA/TREE'
            // _Metrics_
            var treeurl = 'https://6nepl40j73.execute-api.us-east-1.amazonaws.com/dev/entities/1Vod362xQ__GehFbVfO3FrgN0Nawu4Nv74DeC5yPjjfw/TREE'
      
            console.log('treeurl:',treeurl)
            
            
            // d3.json('../../json/entityTree.json').then(data => {
            d3.json(treeurl).then(data => {
              Sunburst()
                .data(data)
                .label('name')
                .size('size')
                .color((d, parent) => color(parent ? parent.data.name : null))
                .tooltipContent((d, node) => `Size: <i>${node.value}</i>`)
                (document.getElementById('sunburst-chart'));
            });