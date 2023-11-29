import { translate, synonyms } from "./external-api.js"

import express from 'express';
import cors  from 'cors';

const app = express();
// add middleware for the future instead
const ID = '12345678';
const port = 5000;

app.use(express.json());
app.use(cors())

//http://localhost:5000/translate/12345678/hello
//http://localhost:5000/synonyms/12345678/go
//http://localhost:5000/all/12345678/go

app.get('/translate/:id/:text', async (req, res) => {
  if (req.params.id && req.params.id === ID) {
    if (req.params.text) {
      const result = await translate(req.params.text);

      res.send({ translate: result });
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(401);
  }
});

app.get('/synonyms/:id/:text', async (req, res) => {
  if (req.params.id && req.params.id === ID) {
    if (req.params.text) {
      const result = await synonyms(req.params.text);

      res.send({ synonyms: result });
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(401);
  }
});

app.get('/all/:id/:text', async (req, res) => {
  if (req.params.id && req.params.id === ID) {
    if (req.params.text) {
      const translateResult = await translate(req.params.text);
      const synonymsResult = await synonyms(req.params.text);

      res.send({ translate: translateResult, synonyms: synonymsResult });
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(401);
  }
});

app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`));