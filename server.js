const { CronJob } = require('cron')
const express = require('express')
const axios = require('axios');
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', async (req, res) => {
    res.status(200).json({message: "Hope you didnt wait 5 minutes for the cold start ;)"})
})

const job = new CronJob(
	'*/4 * * * *', // cronTime
	async function () {
		console.log('You will see this message every minute');
        try {
            const response = await axios.get('https://patch-fringe-pajama.glitch.me/test');
            console.log('Cron Job: Response from /test:', response.data);
        } catch (error) {
            console.log(error)
        }
	}, // onTick
	null, // onComplete
	true, // start
	'America/Los_Angeles' // timeZone
);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
