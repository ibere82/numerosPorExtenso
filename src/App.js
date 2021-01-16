import './App.css';
import { useState, useEffect } from 'react';
import { JSON } from './source/wordNames';
import WordNumbers from './data/Numbers';
import Selectors from './components/Selectors';
import Inputs from './components/Inputs';

const numberClass = new WordNumbers(JSON);

function App() {

  const [language, setLanguage] = useState();
  const [gender, setGender] = useState();
  const [languages] = useState(numberClass.languages);
  const [genders, setGenders] = useState();
  const [number, setNumber] = useState(0);
  const [textNumber, setTextNumber] = useState('');
  const [lastNumber, setLastNumber] = useState(null)

  useEffect(() => {
    if (numberClass.done) handleNumber(number);
  }, [language, gender, number]);

  const handleLanguageSelector = (e) => {
    setLanguage(e.label);
    numberClass.chargeLanguage(e);
    if (numberClass.isInflectedGender) {
      setGenders(numberClass.genders)
    };
  };

  const handleGenderSelector = (e) => {
    numberClass.pickGender(e);
    setGender(e.label);
  };

  const handleChangeInput = (e) => {
    const inputNumber = e.target.value;
    setLastNumber(number);
    setNumber(inputNumber);
  };

  const handleNumber = (n) => {
    const max = numberClass.maximumDigitsAllowed;
    if (n.length > max) {
      alert(`Não é possível ultrapassar o limite de ${max} digitos`);
      setNumber(
        lastNumber.length > max
          ? 0
          : lastNumber
      );
    }
    else
      convertText(n);
  }

  const convertText = (n) => {
    const text =
      (numberClass.done)
        ? numberClass.getNumberText(n)
        : '';
    setTextNumber(text);
  };

  return (
    <div className="App">
      <h1>Números por extenso</h1>
      <div >
        <Selectors
          languages={languages}
          genders={genders}
          handleLanguageSelector={handleLanguageSelector}
          handleGenderSelector={handleGenderSelector}
        />
        <Inputs number={number} handleChangeInput={handleChangeInput} textNumber={textNumber} />

      </div>
    </div >
  );
};

export default App;