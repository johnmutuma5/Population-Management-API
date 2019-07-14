import chai from 'chai';
import chaiHttp from 'chai-http';

import app from './app';


chai.use(chaiHttp);

export const { expect } = chai;
export default chai;
