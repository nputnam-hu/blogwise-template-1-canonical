const Jimp = require('jimp')
const fs = require('fs')
const { faviconPhotoUri } = require('./src/constants/user.json')
console.log(process.env.INCOMING_HOOK_BODY)

// eslint-disable-next-line import/newline-after-import
;(async () => {
  try {
    if (faviconPhotoUri) {
      const favicon = await Jimp.read(faviconPhotoUri)
      favicon.cover(32, 32)
      const buf32Fav = await favicon.getBufferAsync(Jimp.MIME_PNG)
      fs.writeFileSync('./static/img/favicon-32x32.png', buf32Fav)
      favicon.cover(16, 16)
      const buf16Fav = await favicon.getBufferAsync(Jimp.MIME_PNG)
      fs.writeFileSync('./static/img/favicon-16x16.png', buf16Fav)
    }
  } catch (err) {
    console.error(err)
  }
})()
