import chai from 'chai';
import chaiHttp from 'chai-http';

import app from './app';


chai.use(chaiHttp);

const { expect } = chai;

describe('App', () => {
  it('handles unknown paths', async () => {
    const resp = await chai.request(app)
      .post('/v1/unknown/')
      .send();
    expect(resp.statusCode).to.equal(404);
    expect(resp.body.message).to.equal('Not found');
  })
})
