const { twiml } = require('twilio').voice;

module.exports = (req, res) => {
  const twimlResponse = new twiml.VoiceResponse();

  if (req.body.Digits) {
    const digits = req.body.Digits;
    if (digits >= 1 && digits <= 151) {
      // Construct the audio file URL using the provided reference number.
      const audioUrl = `${req.headers['x-forwarded-proto']}://${req.headers.host}/audio/MM24-${digits}-*.mp3`;
      twimlResponse.play(audioUrl);
    } else {
      // If the input is out of range, ask again.
      twimlResponse.say('Invalid input. Please enter a number between 1 and 151.');
      twimlResponse.redirect('/api/mmuseumm'); // Redirect to the same endpoint to try again.
    }
  } else {
    // Initial prompt for the user.
    twimlResponse.gather({
      input: 'speech dtmf',
      timeout: 10,
      numDigits: 3,
      action: '/api/mmuseumm',
    }).say('Welcome to Mmuseumm. Please enter an artifact reference number.');
  }

  res.setHeader('Content-Type', 'text/xml');
  res.send(twimlResponse.toString());
};
