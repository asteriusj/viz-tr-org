# viz-tr-org
Transform Rockford Visualization Web Components

Publishing endpoints for Indictaor Scorecard and Performance Metrics Dashboard

Webcomponents for incorporation in Front-End browser environments. HTML/CSS/JS widgets load and pull data in near real time from tr-entity-data-service REST API's. As soon as data source stores are updated, indictator and metric datasets are availa to any embeded wen component.


## visualizations
The visualizations available include:

### Scorecard Sunburst Diagram 

### Scorecard Indicator Cards

### Scorecard Tree Diagram

### Scorecard Browse & Search


## web service urls

// defaults for Indicators sheet

https://6nepl40j73.execute-api.us-east-1.amazonaws.com/dev/entities//JSONLD

# Setup

## upgrade version of nodejs and npm versions
```
nvm i v8 i
```

## install browserify & watchify
```
npm install -g browserify
```
```
npm install cssify
```


```
browserify main.js -o bundle.js
```

## package build
```
npm run build
```

# Serverless setup
```
npm install serverless -g
```
```
serverless create -t hello-world -n viz-tr-org
```
```
serverless plugin install -n serverless-s3-sync
```

## example deploy commands
```
serverless deploy -v
serverless client deploy -v
serverless client deploy --stage dev -v
```


## github pulls, adds, pushed
```
git pull git@github.com:asteriusj/viz-tr-org
git add <folders and files>
git add *
git commit -m "initial push from c9"
git push git@github.com:asteriusj/viz-tr-org
```



## 3rd party

```
npm install array-to-tree
```


