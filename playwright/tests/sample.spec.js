import { test, expect } from '@playwright/test';
import { hooks } from '../hooks';
import { authUser, generateValidArticleData } from '../helpers/general.helpers';
import { articlesUrl, commentsUrl, numberOfRuns } from '../config';

test.describe('GAD sample tests', () => {
  test.beforeEach(async () => {
    hooks.beforeEach();
  });
  test.afterEach(async () => {
    hooks.afterEach();
  });
  test.afterAll(async () => {
    hooks.afterAll();
  });
  for (let index = 0; index < numberOfRuns; index++) {
    test(`[${index}] get all comments and create valid article`, async ({
      request,
    }) => {
      // Arrange:
      const expectedResponseCode = 200;

      // Act:
      const responseCommnets = await request.get(commentsUrl, {
        headers: {
          'User-Agent': 'Chrome',
        },
      });

      // Assert:
      const code = responseCommnets.status();
      expect(code).toBe(expectedResponseCode);
      const jsonBody = await responseCommnets.json();
      expect(jsonBody.length).toBeGreaterThan(1);

      // Arrange:
      const expectedCreationResponseCode = 201;
      const headers = await authUser(request, expect);

      const testData = generateValidArticleData();

      // Act:
      const response = await request.post(articlesUrl, {
        data: testData,
        headers,
      });

      // Assert:
      const codeAfterPost = response.status();
      expect(codeAfterPost).toBe(expectedCreationResponseCode);
      const jsonBodyAfterPost = await response.json();
      testData.id = jsonBodyAfterPost.id;
      expect(jsonBodyAfterPost).toEqual(testData);
    });
  }
});
