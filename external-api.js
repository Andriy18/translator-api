import translatte from 'translatte';
import Reverso from 'reverso-api';

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36';
const reverso = new Reverso({ headers: { 'User-Agent': userAgent } })

async function translate(srt) {
  try {
    const result = await translatte(srt, {
      from: 'en',
      to: 'uk',
      agents: [ userAgent ]
    });

    if (result.text) {
      return result.text;
    } else {
      return null;
    }
  } catch {
    return null;
  }

  return null;
}

async function synonyms(str) {
  try {
    const result = await reverso.getSynonyms(str, 'english');

    if (result.synonyms && result.synonyms.length > 0) {
      return result.synonyms.slice(0, 5).map(i => i.synonym);
    } else {
      return null;
    }
  } catch {
    return null;
  }

  return null;
}

export { translate, synonyms };