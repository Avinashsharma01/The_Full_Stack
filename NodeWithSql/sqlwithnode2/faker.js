import { faker } from '@faker-js/faker';
let createRandomUser = () => {
  return [
    // userId: faker.string.uuid(),
    // username: faker.internet.userName(),
    // email: faker.internet.email(),
    // avatar: faker.image.avatar(),
    // password: faker.internet.password(),
    // birthdate: faker.date.birthdate(),
    // registeredAt: faker.date.past(),


    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.image.avatar(),
    faker.internet.password(),
    faker.date.birthdate(),
  ];

}

  export { createRandomUser };


