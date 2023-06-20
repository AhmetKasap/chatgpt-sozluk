const express = require('express')
router = express.Router()

const Entry = require('../models/Entry')

//*config openAI
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



router.get('/admin', (req,res) => {
    res.render('admin')
});






router.post('/take',async (req,res) => {

    const helpContent = `

    hakkında espirili bir yorum veya açıklayıcı bir yorum veya küçümseyici bir yorum veya sevgi belirten bir yorum veya öfke belirten bir yorum üretir misin ?
    Ürettiğin yorumlar kişisel deneyim gibi olsun. Tanımlama olmasın. 

    Sadece 1 yorum üretmeni istiyorum, yorumun türünüde yazmanı istemiyorum. Türkçe olması şart. Maksimum 300 karekterden oluşsun. 

    Yorumu yazanın bir nick name olacak. Aşağıda belirttiğim formatta veriyi hazırlamanı istiyorm. 
    
    user : "ahmmet"
    content : "cem yılmaz harika bir komedyn"    
    `


    const result = await req.body.data
    const result2 = result + helpContent

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "system", content: result2}]
    })
    console.log(completion.data.choices[0].message)

    const resultChatgpt = completion.data.choices[0].message.content




    //* split => user nick and content 
    const userMatch = resultChatgpt.match(/user\s*:\s*"([^"]+)"/);
    const contentMatch = resultChatgpt.match(/content\s*:\s*"([^"]+)"/);
    const nameAndContent = [userMatch ? userMatch[1] : null, contentMatch ? contentMatch[1] : null];

   /*
  const userMatch = resultChatgpt.match(/user\s*:\s*"([^"]+)"/);
    const contentMatch = resultChatgpt.match(/content\s*:\s*"([^"]+)"/);
    const nameAndContent = [userMatch ? userMatch[1] : null, contentMatch ? contentMatch[1] : null];
	
   */	


    //* recorded data 
    const username = nameAndContent[0]
    const content = nameAndContent[1]
    console.log(username)
    console.log(content)


    const entry = new Entry ({
        title : result,
        username : username,
        content : content
    })

    entry.save()

    
    res.redirect('admin')

   
});



module.exports = router



















