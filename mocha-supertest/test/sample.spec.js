const {
  request,
  expect,
  articlesUrl,
  commentsUrl,
  numberOfRuns,
} = require('../config.js');
const {
  authUser,
  generateValidArticleData,
} = require('../helpers/general.helpers.js');

describe('GAD sample tests', () => {
  for (let index = 0; index < numberOfRuns; index++) {
    it(`[${index}] get all comments and create valid article`, async () => {
      // Arrange:
      const expectedResponseCode = 200;

      // Act:
      const responseCommnets = await request
        .get(commentsUrl)
        .set('User-Agent', 'Chrome');

      // Assert:
      expect(responseCommnets.status).to.equal(expectedResponseCode);
      expect(responseCommnets.body.length).to.be.greaterThan(1);

      // Arrange:
      const expectedCreationResponseCode = 201;
      const data = await authUser();
      const headers = data.headers;

      const testData = generateValidArticleData();

      // Act:
      const response = await request
        .post(articlesUrl)
        .set(headers)
        .send(testData);

      // Assert:
      expect(response.status).to.equal(expectedCreationResponseCode);
      testData.id = response.body.id;
      expect(response.body).to.deep.equal(testData);
    });
  }
});
