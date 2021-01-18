import React, { useState, useEffect } from 'react';
import Form from './components/Form'
import { JSON } from './source/nameNumbersData';
import NameNumbers from './data/NameNumberClass';
import M from 'materialize-css'
import './styles/style.css';

const nameNumber = new NameNumbers(JSON);

M.AutoInit();

function App() {

  const [language, setLanguage] = useState();
  const [gender, setGender] = useState();
  const [languages] = useState(nameNumber.languages);
  const [genders, setGenders] = useState();
  const [theNumber, setTheNumber] = useState();
  const [textNumber, setTextNumber] = useState('');
  const [lastNumber, setLastNumber] = useState(null);
  const [placeholder, setPlaceholder] = useState();

  useEffect(() => {

    const message =
      nameNumber.done
        ? 'Insira um valor no campo numérico'
        : !language
          ? 'Selecione um idioma para começar'
          : 'Selecione um gênero'

    setPlaceholder(message);
    if (nameNumber.done && theNumber) handleNumber(theNumber);

  }, [language, gender, theNumber]);

  const handleLanguageSelector = (e) => {

    const target = languages[e.target.value]
    setLanguage(target.label);
    nameNumber.chargeLanguage(target);
    if (nameNumber.isInflectedGender) setGenders(nameNumber.genders);
    document.getElementById("input-number").focus()
  };

  const handleGenderSelector = (e) => {

    const value = e.target.value
    const target = genders[value]

    nameNumber.pickGender(target);
    setGender(target.label);
    document.getElementById("input-number").focus()
  };

  const handleChangeInput = (e) => {
    const inputNumber = e.target.value;
    setLastNumber(theNumber);
    setTheNumber(inputNumber);
  };

  const handleNumber = (number) => {
    const max = nameNumber.maximumDigitsAllowed;

    if (number.length <= max)
      convertText(number)
    else {
      alert(`Não é possível ultrapassar o limite de ${max} digitos`);
      setTheNumber(
        lastNumber.length > max
          ? 0
          : lastNumber
      );
    };
  };

  const convertText = (number) => {
    const text =
      (nameNumber.done)
        ? nameNumber.getNumberText(number)
        : '';
    setTextNumber(text);

    M.textareaAutoResize(document.getElementById('text'));
  };

  return (
    <div className="App">

      <div className="header">
        <h1>Números por extenso</h1>
      </div>

      <Form
        languages={languages}
        genders={genders}
        handleLanguageSelector={handleLanguageSelector}
        handleGenderSelector={handleGenderSelector}
        number={theNumber}
        handleChangeInput={handleChangeInput}
        textNumber={textNumber}
        placeholder={placeholder} />

    </div >
  );
};

export default App;