import chai, { expect } from '../src/test-setup';
import app from './app';

describe('App', () => {
  it('handles unknown paths', async () => {
    const resp = await chai.request(app)
      .post('/v1/unknown/')
      .send();
    expect(resp.statusCode).to.equal(404);
    expect(resp.body.message).to.equal('Not found');
  })
})
