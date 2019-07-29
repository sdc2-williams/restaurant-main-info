import '@babel/polyfill';

const express = require('express');
const request = require('supertest');

const PORT = 2000;

xdescribe('Server API Testing', () => {
  it('Responds to a GET request', async () => {
    const res = await request('http://localhost:2000').get('/api/restaurant/1');
    expect(res.statusCode).toBe(200);
  });
});
