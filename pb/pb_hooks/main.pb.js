// onAfterBootstrap(e => {
//   console.log('helllooooo', e.app);
// });

onRecordBeforeAuthWithOAuth2Request(e => {
  e.oAuth2User.email = e.oAuth2User.email.toLowerCase();

  //   console.log(e.httpContext);
  //   console.log(e.providerName);
  //   console.log(e.providerClient);
  //   console.log(e.record); // could be null
  //   console.log(e.isNewRecord);
});
