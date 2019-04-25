const fs = require('fs')

// Sent with production deployments.
const defaultConfig = {
  faviconPhotoUri: '',
  customNavbarLinks: [],
  token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImIwZWQzMTU4LTU3YTAtNGQxMS05Mjk5LWM2NTUwMDNhMzI4ZSIsImVtYWlsIjoiZGFyYUBibG9nd2lzZS5jbyJ9.J4sjfTqHcNH13jF2DXayzB1D3JobHKlK3zGfWalPnTA',
  apiUrl: 'https://megaphone-api-prod.herokuapp.com',
  hasBeenInitialized: false,
}

// Used for local development.
const devConfig = {
  faviconPhotoUri: '',
  customNavbarLinks: [],
  token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImIwZWQzMTU4LTU3YTAtNGQxMS05Mjk5LWM2NTUwMDNhMzI4ZSIsImVtYWlsIjoiZGFyYUBibG9nd2lzZS5jbyJ9.J4sjfTqHcNH13jF2DXayzB1D3JobHKlK3zGfWalPnTA',
  apiUrl: 'https://megaphone-api-prod.herokuapp.com',
  hasBeenInitialized: true,
}

let selectedConfig = defaultConfig

if (process.env.PREVIEW || process.env.DEV_ENV) {
  selectedConfig = devConfig
}

fs.writeFileSync(
  './config.json',
  process.env.INCOMING_HOOK_BODY || JSON.stringify(selectedConfig),
)
