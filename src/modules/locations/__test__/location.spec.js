import chai, { expect } from '../../../test-setup';
import app from '../../../app';
import Location from '../locations.model';

describe('Locations', () => {
  beforeEach(async () => {
    await Location.deleteMany({});
  });

  afterEach(async () => {
    await Location.deleteMany({});
  });

  describe('Create Location', async () => {
    it('creates a new location without parent locations', async () => {
      const resp = await chai.request(app)
        .post('/v1/locations/')
        .send({
          name: 'Karura',
          maleCount: 2000,
          femaleCount: 2100,
        });

      expect(resp.statusCode).to.equal(201);
      expect(resp.body.status).to.equal('success');
      expect(resp.body.data.createdLocation.name).to.equal('Karura');
    });

    it('should validate parent id as valid database ids', async () => {
      const resp = await chai.request(app)
        .post('/v1/locations/')
        .send({
          name: 'Karura',
          maleCount: 2000,
          femaleCount: 2000,
          parentLocationId: 'thisisaninvaliddatabaseid',
        });

      expect(resp.statusCode).to.equal(400);
      expect(resp.body.status).to.equal('fail');
      expect(resp.body.errorCode).to.equal('INVALIDBODY');
      expect(resp.body.error.path).to.equal('parentLocationId');
    });

    it('should create locations with parent ids', async () => {
      const parentLocation = await Location.create({
        name: 'Karura Main',
        femaleCount: 2100,
        maleCount: 2000,
      });
      
      const resp = await chai.request(app)
        .post('/v1/locations/')
        .send({
          name: 'Karura',
          maleCount: 2000,
          femaleCount: 2100,
          parentLocationId: parentLocation._id,
        });
      
      expect(resp.statusCode).to.equal(201);
      expect(resp.body.status).to.equal('success');
      expect(resp.body.data.createdLocation.parentLocationId)
        .to.equal(parentLocation._id.toString());
    });

    it('handles inadequate data in the request', async () => {
      const resp = await chai.request(app)
        .post('/v1/locations/')
        .send({
          name: 'Karura',
          maleCount: 2000,
        });

      expect(resp.statusCode).to.equal(400);
      expect(resp.body.status).to.equal('fail');
      expect(resp.body.errorCode).to.equal('INVALIDBODY');
      expect(resp.body.error.path).to.equal('femaleCount');
    });
  });
});
