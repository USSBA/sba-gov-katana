import data from "./temp-slideshow-response.json";
import config from "config";
import axios from "axios";
import path from "path";
import querystring from "querystring";

function nodeReal(req, res, next){
    if(req.query){
        var givenQueryString = querystring.stringify(req.query);
        axios.get(path.join(config.drupal.hostname,config.drupal.endpoint+"?"+givenQueryString))
        .then(function(response){
            res.status(200).send(response.data);
        })
        .catch(function(error){
            console.error(error);
            res.status(error.response.status).send("Error retrieving content");
        })
    }else{
        res.send(400).send("Too few query params");
    }

    res.status(200).send(data);
}


function node(req, res, next){
    res.status(200).send(data);
}

function singleNode(req, res, next){
    res.status(200).send(data);
}

module export {node, singleNode, nodeReal};
