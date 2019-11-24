let messages = [];
let id = 0;

module.exports = {
  //modify the create method to add the new message object to he messages array on session as well
  create: (req, res) => {
    const { text, time } = req.body;
    const { user } = req.session;

    messages.push({ id, text, time });
    user.messages.push({ id, text, time });
    id++;

    res.status(200).send(messages);
  },

  read: (req, res) => {
    res.status(200).send(messages);
  },
  //modify the update method to use id off the request query
  //(changed in updateID from req.params.id to req.query.id)
  update: (req, res) => {
    const { text } = req.body;
    const updateID = req.query.id;
    const messageIndex = messages.findIndex(message => message.id == updateID);
    let message = messages[messageIndex];

    messages[messageIndex] = {
      id: message.id,
      text: text || message.text,
      time: message.time,
    };

    res.status(200).send(messages);
  },
  //modify the delete method to use id off the request query
  delete: (req, res) => {
    const deleteID = req.query.id;
    messageIndex = messages.findIndex(message => message.id == deleteID);
    messages.splice(messageIndex, 1);
    res.status(200).send(messages);
  },
  //create a history method that will return all messages on a user session
  history: (req, res) => {
    const { user } = req.session;
    res.status(200).send(user.messages);
  },
};
