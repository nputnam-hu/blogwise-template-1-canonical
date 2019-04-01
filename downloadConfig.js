const fs = require('fs')

const defaultConfig = {
  faviconPhotoUri: '',
  customNavbarLinks: [],
  token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjQ3YzYwMTNkLWI2NzUtNDQ0OS1iNmI1LTE2YjI0ZDNhNGIxZSIsImVtYWlsIjoibG93bWFuc3RvbmVAY29sbGVnZS5oYXJ2YXJkLmVkdSJ9.WDY8jOmSjHEe3Jm1yBYUyb2oRTidbq-p988LLju_nWY',
  apiUrl: 'https://megaphone-api-prod.herokuapp.com',
  hasBeenInitialized: false,
}

console.log(process.env.INCOMING_HOOK_BODY)

setTimeout(
  () =>
    fs.writeFileSync(
      './config.json',
      process.env.INCOMING_HOOK_BODY || JSON.stringify(defaultConfig),
    ),
  3000,
)
