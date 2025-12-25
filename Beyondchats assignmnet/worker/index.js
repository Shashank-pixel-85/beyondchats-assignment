
import axios from 'axios';
import cheerio from 'cheerio';
import OpenAI from 'openai';

const api = axios.create({ baseURL: 'http://localhost:8000/api' });
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

async function scrape(url) {
  const html = await axios.get(url);
  const $ = cheerio.load(html.data);
  return $('article').text().slice(0,4000);
}

async function run() {
  const { data } = await api.get('/articles/latest');

  const refs = [
    'https://example.com/blog1',
    'https://example.com/blog2'
  ];

  const refContent = await Promise.all(refs.map(scrape));

  const prompt = `Rewrite the article based on references.
Original: ${data.content}
References: ${refContent.join('\n')}`;

  const res = await openai.chat.completions.create({
    model:'gpt-4o-mini',
    messages:[{role:'user',content:prompt}]
  });

  await api.post('/articles',{
    title: data.title + ' (Updated)',
    slug: data.slug + '-updated',
    content: res.choices[0].message.content + '\nReferences:\n' + refs.join('\n'),
    is_generated: true
  });

  console.log('Updated article published');
}

run();
