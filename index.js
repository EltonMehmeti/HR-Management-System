require('dotenv').config();
const express = require('express');
const axios = require('axios');

 const app = express();
 const port = 3001;

 app.get('/', async(req,res)=>{
    const code = req.query.code;
    try{
        const response = await axios.post('https://zoom.us/oauth/token',null,{ params: { 
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: 'http://localhost:3001'
        },
        headers: {
            'Authorization': `Basic ${Buffer.from(`${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`).toString('base64')}`
        }
    });
    res.send(response.data.access_token)
    } catch(error){
        console.error(error);
        res.send('An error occurred while fetching access token')
    }
 })

 app.listen(port, () => {
    console.log(`Server is running and listening on port ${port}`)
  } )