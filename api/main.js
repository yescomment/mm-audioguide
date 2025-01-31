const VoiceResponse = require('twilio').twiml.VoiceResponse;

const validExtensions = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '62',
  '63',
  '64',
  '65',
  '66',
  '67',
  '68',
  '69',
  '70',
  '71',
  '72',
  '73',
  '74',
  '75',
  '76',
  '77',
  '78',
  '79',
  '80',
  '81',
  '82',
  '83',
  '84',
  '85',
  '86',
  '87',
  '88',
  '89',
  '90',
  '91',
  '92',
  '93',
  '94',
  '95',
  '96',
  '97',
  '98',
  '99',
  '100',
  '101',
  '102',
  '103',
  '104',
  '105',
  '106',
  '107',
  '108',
  '109',
  '110',
  '111',
  '112',
  '113',
  '114',
  '115',
  '116',
  '117',
  '118',
  '119',
  '120',
  '121',
  '122',
  '123',
  '124',
  '125',
  '126',
  '127',
  '128',
  '129',
  '130',
  '131',
  '132',
  '133',
  '134',
  '135',
  '136',
  '137',
  '138',
  '139',
  '140',
  '141',
  '142',
  '143',
  '144',
  '145',
  '146',
  '147',
  '148',
  '149',
  '150',
  '151',
  '152',
  '153',
  '154',
  '155',
  '156',
  '157',
  '158',
  '159',
  '160',
]

module.exports = (req, res) => {
  const twimlResponse = new VoiceResponse();

  if (req.body?.Digits) {
    const digits = req.body.Digits;

    if (digits === '777') {
      // easter egg (and for phone verifications)
      twimlResponse.say('Connecting you to human: Jacob Ford')
      twimlResponse.dial('267-421-9885')
      twimlResponse.say('Human contact terminated')
    }

    else if (validExtensions.includes(digits)) {
      // Construct the audio file URL using the provided reference number.
      const audioUrl = `https://audioguide.mmm.museum/2024/${digits}.mp3`;
      twimlResponse.play(audioUrl);
    }

    else {
      // If the input is out of range, ask again.
      twimlResponse.say('There is no audio for that reference number. Please try another.');
    }

    twimlResponse.redirect('/api/main');

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
