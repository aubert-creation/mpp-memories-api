const dotenv = require('dotenv');
const Pusher = require('pusher');

dotenv.config();

const pusher = new Pusher({
  appId: process.env.APP_ID,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: process.env.CLUSTER,
});

async function sendEvent({ channel, type, data }) {
  const event = {
    channel: channel,
    type: type,
    data: JSON.parse(data),
  };

  pusher.trigger(event.channel, event.type, JSON.stringify(event.data), () => {
    return 'ok';
  });
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const eventRes = await sendEvent(req.body);
    if (eventRes) {
      return res.status(200).json({ message: `Event sent successfuly` });
    }

    return res.status(400).json({ message: 'Error sending event' });
  }

  return res.status(400).json({ message: `Incorrect method: ${req.method}. Did you mean POST?` });*/
}