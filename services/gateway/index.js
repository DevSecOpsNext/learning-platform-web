import express from 'express'

let app = express()

app.get('/', (req, res) => {
    res.status(200).send("Hello World!")
  })
  
  app.listen(3001, () => {
    console.log('[gateway] started on port 3001');
  });