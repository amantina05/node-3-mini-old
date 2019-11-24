//creating a filter middleware that handles filtering messages with profanity

const notAllowed = ['pissflaps', 'fuck', 'twat', 'shitbag', 'poo'];

//use module.export to export a function that has req, res, next
module.exports = function(req, res, next) {
  //filter logic
  while (notAllowed.find(word => req.body.text.includes(word))) {
    const badWord = notAllowed.find(word => req.body.text.includes(word));
    req.body.text = req.body.text.replace(badWord, '*'.repeat(badWord.length));
  }
  next();
};
