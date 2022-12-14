/*const dotenv = require('dotenv');*/
const Pusher = require('pusher');

//dotenv.config();

const pusher = new Pusher({
  appId: process.env.APP_ID,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: process.env.CLUSTER,
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');

  if(req.method === 'OPTIONS') {
    return res.status(200).json(({
        body: "OK"
    }))
  }

  const { channel, type, data } = req.body;

  const eventRes = await pusher.trigger(channel, type, data);
  return res.status(200).json({ message: `Event sent successfuly`, eventRes });

  /*if (req.method === 'POST') {
    const eventRes = await sendEvent(req.body);
    if (eventRes) {
      return res.status(200).json({ message: `Event sent successfuly` });
    }

    return res.status(400).json({ message: 'Error sending event' });
  }

  return res.status(400).json({ message: `Incorrect method: ${req.method}. Did you mean POST?` });*/
}