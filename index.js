const twilio = require("twilio");

// initialize twilio
const accountSid = "";
const authToken = "";
const from = ""; // your twilio number

const twilioClient = new twilio(accountSid, authToken);

// participants go in here with the shape e.g. { to: "+19171234567", name: "John" },
const contacts = [];

const message = (body, to) => {
  twilioClient.messages
    .create({ body, to, from })
    .then(message => {
      console.log(message.sid);
    })
    .catch(err => console.log(err));
};

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// make sure no one gets matched with themself
let shuffled = shuffle([...contacts]);
while (shuffled.some((c, i) => c.name === contacts[i].name)) {
  shuffled = shuffle(shuffled);
}

while (shuffled.length) {
  const next = shuffled.pop();
  const contact = contacts.pop();
  message(
    `This year for Secret Santa, you've been selected to buy a gift for ${next.name}.`,
    contact.to
  );
}
