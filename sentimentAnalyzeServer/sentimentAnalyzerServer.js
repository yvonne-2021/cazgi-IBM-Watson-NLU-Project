const express = require('express');
const dotenv = require('dotenv');
const app = new express();

dotenv.config();

function getNLUInstance(){
    
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const {IamAuthenticator} = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
	    version: '2021-01-17',
	    authenticator: new IamAuthenticator({
		    apikey: api_key,
	    }),
	    serviceUrl: api_url,
    });

    return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {

    let naturalLanguageUnderstanding = getNLUInstance();

    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'entities': {
            'emotion': true,
            'sentiment': false,
            'limit': 1,
            }
        }
    };

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            return res.send(analysisResults.result.entities[0].emotion);
        })
        .catch(err => {
            console.log('error:', err);
    });

    //return res.send({"happy":"90","sad":"10"});
});

app.get("/url/sentiment", (req,res) => {

    let naturalLanguageUnderstanding = getNLUInstance();

    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'entities': {
            'sentiment': true,
            'limit': 1
            }
        }
    };

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            return res.send(analysisResults.result.entities[0].sentiment.label);
        })
        .catch(err => {
            console.log('error:', err);
    });

    //return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {

    let naturalLanguageUnderstanding = getNLUInstance();
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'entities': {
            'emotion': true,
            'sentiment': false,
            'limit': 1,
            },
            'keywords': {
            'emotion': true,
            'sentiment': false,
            'limit': 1,
            },
        },
    };

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            return res.send(analysisResults.result.entities[0].emotion);
        })
        .catch(err => {
            console.log('error:', err);
    });
   
});

app.get("/text/sentiment", (req,res) => {

    let naturalLanguageUnderstanding = getNLUInstance();

    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'entities': {
            'sentiment': true,
            'limit': 1
            }
        }
    };

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            return res.send(analysisResults.result.entities[0].sentiment.label);
        })
        .catch(err => {
            console.log('error:', err);
    });
    //return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

