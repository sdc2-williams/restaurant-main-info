const { makeRestaurant } = require('./seedHelpers');

describe('Restaurant constructor', () => {
  const restaurant = makeRestaurant(1);

  it('returns an object', () => {
    expect(typeof restaurant).toBe('object');
  });

  it('returns an object with the correct keys', () => {
    const expectedKeys = ['id', 'name', 'description', 'address', 'estDelivery', 'location', 'hours'];
    expect(Object.keys(restaurant)).toEqual(expectedKeys);
  });

  it('returns an object with values of the correct type', () => {
    const expectedObject = {
      id: expect.any(Number),
      name: expect.any(String),
      description: expect.any(String),
      address: expect.any(String),
      estDelivery: expect.any(Number),
      location: expect.any(String),
      hours: expect.any(String),
    };

    expect(restaurant).toEqual(expect.objectContaining(expectedObject));
  });
});
