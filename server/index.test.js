const request = require('request-promise');

describe('GET API route', () => {
  it('responds with JSON object', () => (
    request('http://localhost:2000/api/restaurant/34')
      .then(JSON.parse)
      .then(restaurant => expect(typeof restaurant).toBe('object'))
  ));

  it('responds with object with the correct properties', () => {
    const expectedProperties = ['id', 'name', 'description', 'address', 'estdelivery', 'location', 'hours'];

    return request('http://localhost:2000/api/restaurant/34')
      .then(JSON.parse)
      .then(restaurant => (
        expect(Object.keys(restaurant)).toEqual(
          expect.arrayContaining(expectedProperties),
        )
      ));
  });

  it('responds with object with values of the correct type', () => {
    const expectedObject = {
      id: expect.any(Number),
      name: expect.any(String),
      description: expect.any(String),
      address: expect.any(String),
      location: expect.any(Array),
      hours: expect.any(Array),
    };

    return request('http://localhost:2000/api/restaurant/34')
      .then(JSON.parse)
      .then(restaurant => expect(restaurant).toEqual(expect.objectContaining(expectedObject)));
  });
});
