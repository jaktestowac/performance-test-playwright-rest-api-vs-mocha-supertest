const {
  existingUserEmail,
  existingUserPass,
  existingUserId,
  request,
  faker,
  expect,
  loginUrl,
} = require('../config');

function generateValidUserLoginData() {
  const testData = {
    email: existingUserEmail,
    password: existingUserPass,
  };
  return testData;
}

function generateValidArticleData() {
  const testData = {
    title: faker.lorem.sentence(),
    body: 'Test cases are the backbone of any testing process. They define what to test, how to test, and what to expect. Writing effective test cases can save time, effort, and resources. Here are some tips for writing effective test cases:\n- Use clear and concise language\n- Follow a consistent format and structure\n- Include preconditions, steps, expected results, and postconditions\n- Cover positive, negative, and boundary scenarios\n- Prioritize test cases based on risk and importance\n- Review and update test cases regularly',
    user_id: existingUserId,
    date: '2021-07-13T16:35:00Z',
    image: '.\\data\\images\\256\\chuttersnap-9cCeS9Sg6nU-unsplash.jpg',
  };

  return testData;
}

async function authUser() {
  const userData = generateValidUserLoginData();
  const response = await request
    .post(loginUrl)
    .send(userData)
    .set('User-Agent', 'Chrome');
  expect(response.status).to.equal(200);

  const token = response.body.access_token;
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'User-Agent': 'Chrome',
  };

  return {
    headers,
    userId: existingUserId,
  };
}

module.exports = { authUser, generateValidArticleData };
