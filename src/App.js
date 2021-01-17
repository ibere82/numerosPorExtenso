import { useState, useEffect } from 'react';
import Selectors from './components/Selectors';
import Inputs from './components/Inputs';
import { JSON } from './source/nameNumbersData';
import NameNumbers from './data/NameNumberClass';
import './styles/App.css';
import './styles/style.css';

const nameNumber = new NameNumbers(JSON);

function App() {

  const [language, setLanguage] = useState();
  const [gender, setGender] = useState();
  const [languages] = useState(nameNumber.languages);
  const [genders, setGenders] = useState();
  const [theNumber, setTheNumber] = useState();
  const [textNumber, setTextNumber] = useState('');
  const [lastNumber, setLastNumber] = useState(null);

  useEffect(() => {
    if (nameNumber.done && theNumber) handleNumber(theNumber);
  }, [language, gender, theNumber]);

  const handleLanguageSelector = (e) => {
    setLanguage(e.label);
    nameNumber.chargeLanguage(e);
    if (nameNumber.isInflectedGender) {
      setGenders(nameNumber.genders);
    };
    document.getElementById("input-number").focus()
  };

  const handleGenderSelector = (e) => {
    nameNumber.pickGender(e);
    setGender(e.label);
    document.getElementById("input-number").focus()
  };

  const handleChangeInput = (e) => {
    const inputNumber = e.target.value;
    setLastNumber(theNumber);
    setTheNumber(inputNumber);
  };

  const handleNumber = (number) => {
    const max = nameNumber.maximumDigitsAllowed;
    if (number.length > max) {
      alert(`Não é possível ultrapassar o limite de ${max} digitos`);
      setTheNumber(
        lastNumber.length > max
          ? 0
          : lastNumber
      );
    }
    else
      convertText(number);
  };

  const convertText = (number) => {
    const text =
      (nameNumber.done)
        ? nameNumber.getNumberText(number)
        : '';
    setTextNumber(text);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Números por extenso</h1>
      </div>
      <div className="main-content" >
        <Selectors
          languages={languages}
          genders={genders}
          handleLanguageSelector={handleLanguageSelector}
          handleGenderSelector={handleGenderSelector}
        />
        <Inputs
          number={theNumber}
          handleChangeInput={handleChangeInput}
          textNumber={textNumber} />
      </div>
    </div >
  );
};

export default App;