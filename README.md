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

1. upgrade version of nodejs and npm versions
```
nvm i v10 i
nvm alias default 10
```

2. install browserify & watchify
```
npm install -g browserify
```
```
npm install cssify
```


```
browserify main.js -o bundle.js
```

2.1 package build
```
npm run build
```

2.2 aws
```
npm install aws-cli
```


3. AWS Credentials reference material
## https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/setup-credentials.html
## http://bit.ly/aws-creds-setup
## https://serverless.com/framework/docs/providers/aws/guide/credentials/
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=

3.1 add ~/.aws/credentials file

3.2 add .env file??

3.3 set environmental variables
export AWS_ACCESS_KEY_ID=your_access_key_id
export AWS_SECRET_ACCESS_KEY=your_secret_access_key
export AWS_REGION=your_aws_region

3.4 create a signing certificate

```
serverless config credentials --provider aws --key AKIAJ72EGGQUUGWWP5SQ --secret b4NytprxG4tvGyWkcnleGHFG

openssl req -new -x509 -nodes -sha256 -days 365 -key private-key.pem -outform PEM -out certificate.pem

```



3.5 Setup AWS Profile with serverless config credentials command
serverless config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY






4. Serverless setup
```
npm install serverless -g
```
```
serverless create -t hello-world -n viz-tr-org
```

then plug-ins

```
serverless plugin install -n serverless-s3-sync
```
```
npm install --save serverless-finch
```


4.1 serverless.yml

### see comversation on bucketname, sitename and external dns
https://forums.aws.amazon.com/thread.jspa?threadID=84927

* You must name your S3 bucket the same as your domain, "www.example.com" Make sure you include the "www." subdomain prefix as part of the bucket name.

* Set up your bucket as a web site. Make sure you have an "index.htm" file name entered and the correct bucket policy setup under Permissions. 

* Under Godaddy DNS settings make just one entry, set Host WWW CNAME, points to, "s3-website-us-east-1.amazonaws.com" or whatever s3 domain Amazon supplies for your bucket. You leave off the "http://www.example.com." heading in the url that Amazon supplies.

* The last step under Forwarding/manage is to "forward only" your naked domain name "example.com" to "www.example.com"

## CLI install
https://docs.aws.amazon.com/cli/latest/userguide/install-linux.html
```
$ pip3 install awscli --upgrade --user
$ aws --version
```

## COnfigure .aws/credentials and .aws/config
https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html#cli-quick-configuration

```
aws configure
```

5. Use serverless cli to deploy to cloud host
```
$ export AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
$ export AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
$ export AWS_DEFAULT_REGION=us-east-1
```

export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=


## example deploy commands
```
serverless client deploy -v
serverless client deploy --stage dev -v
```


6. Install 3rd party packages

```
npm install array-to-tree
```

7. Github

## github pulls, adds, pushed
```
git pull git@github.com:asteriusj/viz-tr-org
git add <folders and files>
git add *
git commit -m "initial push from c9"
git push git@github.com:asteriusj/viz-tr-org
```


8. Point DNS CNAME to S3 Bucket

Sign into GoDaddy.com account Customer #:71843172

Add a CNAME to transformrockford.org domain:

Host: viz 
Points to: s3-website-us-east-1.amazonaws.com

test http://viz.transformrockford.org/



TODo: get HTTPS certificate??
