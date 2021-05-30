import { delay } from '../util/util';
import { sampleData } from './sampleData';

const fetchSampleData = () => {
  return delay(1000).then(() => {
    return Promise.resolve(sampleData);
  });
};

export default fetchSampleData;
