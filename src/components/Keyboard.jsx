import { calcData } from '../components/shared/data';
import Button from './shared/Button';

function Keyboard({ handleInput }) {
  return (
    <>
      {calcData.map((key) => (
        <Button
          key={key.id}
          keyData={key}
          handleInput={handleInput}
          version={key.version}
        >
          {key.value}
        </Button>
      ))}
    </>
  );
}

export default Keyboard;
