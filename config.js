const user = JSON.parse(
  console.log('\n\nHOOK BODY', process.env.INCOMING_HOOK_BODY, '\n\n') ||
    process.env.INCOMING_HOOK_BODY ||
    JSON.stringify({
      faviconPhotoUri: '',
      customNavbarLinks: [],
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjQ3YzYwMTNkLWI2NzUtNDQ0OS1iNmI1LTE2YjI0ZDNhNGIxZSIsImVtYWlsIjoibG93bWFuc3RvbmVAY29sbGVnZS5oYXJ2YXJkLmVkdSJ9.WDY8jOmSjHEe3Jm1yBYUyb2oRTidbq-p988LLju_nWY',
      apiUrl: 'https://megaphone-api-prod.herokuapp.com',
      hasBeenInitialized: true,
    }),
)

module.exports = user