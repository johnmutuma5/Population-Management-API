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

  describe('Update location', () => {
    it('should update a location', async () => {
      const karura = await Location.create({
        name: 'Karura',
        maleCount: 2000,
        femaleCount: 2100,
      });

      const resp = await chai.request(app)
        .put(`/v1/locations/${karura._id}`)
        .send({
          name: 'Karura update',
          maleCount: 2500,
          femaleCount: 2200,
        });

      expect(resp.statusCode).to.equal(200)
      expect(resp.body.data.updatedLocation.name).to.equal('Karura update');
      expect(resp.body.data.updatedLocation.femaleCount).to.equal(2200);
    });

    it('should validate request params', async () => {
      const resp = await chai.request(app)
        .put(`/v1/locations/invalidlocationidinparams}`)
        .send({
          name: 'Karura update',
          maleCount: 2500,
          femaleCount: 2200,
        });

      expect(resp.statusCode).to.equal(400);
      expect(resp.body.errorCode).to.equal('INVALIDPARAMS');
    });
  });

  describe ('Get locations', ()  => {
    it('lists created locations', async () => {
      const karura = await Location.create({
        name: 'Karura',
        maleCount: 2000,
        femaleCount: 2100,
      });

      const karuraChild = await Location.create({
        name: 'Karura Child',
        maleCount: 500,
        femaleCount: 1100,
        parentLocationId: karura._id,
      });

      const resp = await chai.request(app)
        .get('/v1/locations/')
        .send();

      expect(resp.statusCode).to.equal(200);
      expect(resp.body.data.locations.length).to.equal(2);
    });
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
