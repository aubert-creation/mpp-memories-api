const Pusher = require('pusher');


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

  const { socketId, channel } = req.body;

  const auth = pusher.authenticate(socketId, channel);
  res.send(auth);
}