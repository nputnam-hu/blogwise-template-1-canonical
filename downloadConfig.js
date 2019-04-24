const fs = require('fs')

const defaultConfig = {
  faviconPhotoUri: '',
  customNavbarLinks: [],
  token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImY3ZTExYzZhLWM2N2EtNDI2ZS04ZTM1LWQ1OTM5YzhlMzUwZSIsImVtYWlsIjoic2FtK2JhcmFja0BydWJpbmthcGxhbi5jb20ifQ.R4cHtEvrgLiPw3SpNzg0jbvThWB9bi_8471oaTxyRZ8',
  apiUrl: 'https://megaphone-api-prod.herokuapp.com',
  hasBeenInitialized: true,
}

fs.writeFileSync(
  './config.json',
  process.env.INCOMING_HOOK_BODY || JSON.stringify(defaultConfig),
)
