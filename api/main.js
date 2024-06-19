const VoiceResponse = require('twilio').twiml.VoiceResponse;

module.exports = (req, res) => {
  const twimlResponse = new VoiceResponse();

  if (req.body?.Digits) {
    const digits = req.body.Digits;
    if (digits >= 1 && digits <= 160) {
      // Construct the audio file URL using the provided reference number.
      const audioUrl = `https://audioguide.mmm.museum/2024/${digits}.mp3`;
      try {
        twimlResponse.play(audioUrl);
      } catch (error) {
        console.error(error);
        twimlResponse.say('There is no audio for that reference number. Please try another.');
      }
      twimlResponse.redirect('/api/main');
    } else {
      // If the input is out of range, ask again.
      twimlResponse.say('There is no audio for that reference number. Please try another.');
      twimlResponse.redirect('/api/main'); // Redirect to the same endpoint to try again.
    }
  } else {
    // Initial prompt for the user.
    twimlResponse.gather({
      input: 'speech dtmf',
      timeout: 2,
      numDigits: 3,
      action: '/api/main',
    }).play('https://audioguide.mmm.museum/prompts/welcome.mp3');
    twimlResponse.redirect('/api/main');
  }

  res.setHeader('Content-Type', 'text/xml');
  res.send(twimlResponse.toString());
};
