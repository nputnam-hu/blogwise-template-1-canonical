const fs = require('fs')

const defaultConfig = {
  faviconPhotoUri: '',
  customNavbarLinks: [],
  token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjQ5YmRmMmM5LTFkMjctNDViOS04MGMwLTgwNzhjNmE3MWEyYSIsImVtYWlsIjoibGlzYUBjYXJlem9vbWluZy5jb20ifQ.R4mIPI5y1Q7ox-95nwRU-Lu5QXDLmaXjEH-HRlcV8KQ',
  apiUrl: 'https://megaphone-api-prod.herokuapp.com',
  hasBeenInitialized: true,
}

fs.writeFileSync(
  './config.json',
  process.env.INCOMING_HOOK_BODY || JSON.stringify(defaultConfig),
)
