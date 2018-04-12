const router = require('express').Router();
// const astroidController = require('../../controllers/astroidController');
const request = require('request');
const wikipedia = require("node-wikipedia");
const fs = require('fs')


router.post('/post', function(req, res) {
  let wikiObject = {}

  // Getting img url and text excerpt
  request({
    url: `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cpageimages%7Ccategories&exintro=&titles=${req.body.article}`,
    method: 'GET'
  }, (error, response, body)=> {
    let parse = JSON.parse(body)
    let img;
    console.log(JSON.stringify(parse))
    // Getting the first index from the object
    for (var prop in parse.query.pages){
      try {img = parse.query.pages[prop].thumbnail.source}
      catch(err){img = ''}
      extract = parse.query.pages[prop].extract
      break
    }
    wikiObject.img = img
    wikiObject.body = extract

    // Calling function to get the related topics
    getRelated(wikiObject)
    
  })
   function getRelated(wikiObject) {
     // **** NEED TO REDUE THIS!! 

    // Currently it is grabbing the first 15 links after the "Major subfields"
    // text on the wikipage, but not all pages have this text. Might need to grab
    // them from the page itself instead? 


     // Wiki library that returns the whole page for finding links
    wikipedia.page.data(req.body.article, { content: true }, function(response) {
      // grabbing the html text
      let string = response.text['*']
      let linkArray = [];
      let i = 0;
      let majorSubfields = string.indexOf('Major subfields')
      if (majorSubfields) {
        
        getLinks(string.substr('<a href'), majorSubfields)
      } else {
        return
      }
      // finding the first ten links ---------------
      function getLinks(startPoint){
        let linkStart = string.indexOf('title="', startPoint)
        let linkEnd = string.indexOf('">', linkStart)
        let linkName = string.substr(linkStart + 7, linkEnd-(linkStart+7))
        linkArray.push(linkName)
        i ++
        if(i < 15) {
          getLinks(linkEnd)
        }
      }
      wikiObject.subCategories = linkArray
      res.send(wikiObject)
    })
  }
})
  
module.exports = router;
