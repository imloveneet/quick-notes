import { RotatingLines } from 'react-loader-spinner';

const SavingLoader = ({ height, width }) => (
  <RotatingLines
    visible={true}
    height={height || '30'}
    width={width || '30'}
    strokeColor='var(--white)'
    strokeWidth='3'
    animationDuration='0.75'
  />
);

export default SavingLoader;
