class NameNumbers {

  constructor(JSON) {
    const { schemaVersion, algorithmVersion, data } = JSON;

    this.data = data;
    this.content = null;
    this.isCharged = false;
    this.isAble = false;
    this.done = null;
    this.languages = [];
    this.genders = [];
    this.genderDefault = null;
    this.language = { value: null, label: null };
    this.gender = { value: null, label: null };
    this.isInflectedGender = null;
    this.maximumDigitsAllowed = null;

    if (!this.testVersion(schemaVersion, algorithmVersion)) {
      console.log('algoritmo incompativel');
    }
    else {
      this.languages = data
        .map(({ language }, index) => {
          return { value: index, label: language.friendlyName }
        });
      this.isAble = true;
    };
  };

  testVersion = (schema, algorithm) => {
    const ALGORITHM_VERSION = '1.0.0';
    const SCHEMA_VERSION = '1.0.0';
    return ((schema === SCHEMA_VERSION) && (algorithm === ALGORITHM_VERSION));
  };

  chargeLanguage = ({ label, value }) => {
    const { content } = this.data[value];
    this.language = { label, value };
    this.genderDefault = this.data[value].genderInformations.default;
    this.content = content;
    this.isCharged = true;
    this.maximumDigitsAllowed = content.periodNames
      .reduce((acc, curr) => {
        return acc + curr.periodSize;
      }, 0);
    this.analiseGenderBehavior(value);
  };

  analiseGenderBehavior = (lang) => {
    const { genderInformations } = this.data[lang];
    const { inflection, names } = genderInformations;
    this.isInflectedGender = inflection;
    inflection
      ? this.genders = names
        .map((elem, index) => {
          return { label: elem, value: index }
        })
      : this.done = true;
  };

  pickGender = ({ label, value }) => {
    this.gender = { label, value };
    this.done = true;
  };

  getNumberText = (stringNumber) => {
    const theNumber = parseInt(stringNumber);
    const exception = this.content.exceptions.wholeNumber;

    const textTest = findException(exception, theNumber);
    if (textTest) return textTest;

    const arrayNumber = createArrayNumbers(stringNumber);
    const arrayText = this.arrayNumberToarrayText(arrayNumber);

    return this.arrayTextToStringWithConnectors(arrayText);
  };

  arrayNumberToarrayText = (arrayNumber) => {
    const exception = this.content.exceptions.partialNumbers;
    const connector = this.content.connectors.beforePeriodName;

    return arrayNumber
      .map((item, index) => {
        const textTest = exception
          .periods
          .find(({ periodIndex, periodNumber }) => {
            return ((periodIndex === index) && (periodNumber === parseInt(item)))
          });
        if (textTest) return { text: textTest.wordNumber, hasSyndeton: false } //  return textTest.wordNumber;

        const periodGender = this.getPeriodGender(index);
        const periodName = this.getPeriodName(item, index);

        const { text: periodText, hasSyndeton } = this.wholePeriodText(item, periodGender);

        const text = periodText + (
          (periodText && periodName)
            ? connector
            : '')
          + (periodText ? periodName : '')

        return { text, hasSyndeton }
      });
  };


  getPeriodGender = (index) => {
    const period = this.content.periodNames[index];
    return period.genderInflection
      ? this.gender.label
      : this.genderDefault;
  };

  getPeriodName = (period, index) => {
    const { singularName, pluralName } = this.content.periodNames[index];
    return (parseInt(period) === 1)
      ? singularName
      : pluralName;
  };

  wholePeriodText = (period, periodGender) => {
    const partialNumber = leftPad(period, 3, '0');  // '2'    =>  '002'
    const stringTens = partialNumber.slice(1, 3);   // '235'  =>  '35'
    const partial = parseInt(partialNumber);        // '235   =>  235
    const partialReverse = reverse(partialNumber);  // '235'  =>  '532'
    const digitHundreds = parseInt(partialReverse.slice(2, 3)); //  '532' =>  2
    const hundreds = this.getOrdinaryArray(this.content.ordinaryDigitNames.hundreds, periodGender);
    const hundredText = hundreds[digitHundreds];
    const exception = this.content.exceptions.numberInsidePeriod;
    const connection = this.content.connectors.insidePeriod;

    const textTest = findException(exception, partial);
    if (textTest) return { text: textTest, hasSyndeton: false };

    const { text: tensText, hasSyndeton } = this.tensToText(stringTens, periodGender);

    const isSyndetic = (tensText && hundredText) ? true : false;
    const text = hundredText + (isSyndetic ? connection : '') + tensText;

    return { text, hasSyndeton: (hasSyndeton || isSyndetic) };
  };

  tensToText = (stringTens, periodGender) => {
    const ones = this.getOrdinaryArray(this.content.ordinaryDigitNames.ones, periodGender);
    const tens = this.getOrdinaryArray(this.content.ordinaryDigitNames.tens, periodGender);
    const connection = this.content.connectors.insidePeriod;
    const exception = this.content.exceptions.partialNumbers.tens;

    const textTest = findException(exception, parseInt(stringTens));
    if (textTest) return { text: textTest, hasSyndeton: false };

    const digitUnit = parseInt(stringTens.slice(1, 2));
    const digitTens = parseInt(stringTens.slice(0, 1));

    const unit = ones[digitUnit];
    const ten = tens[digitTens];

    const isSyndetic = (unit && ten) ? true : false;
    const text = ten + (isSyndetic ? connection : '') + unit;

    return { text, hasSyndeton: isSyndetic };
  };

  arrayTextToStringWithConnectors = (array) => {

    let wholeText = '';
    const comma = this.content.connectors.betweenPeriods;
    const conjunction = this.content.connectors.insidePeriod;

    const arrayWithoutEmptyElems = array.filter(({ text }) => text);

    arrayWithoutEmptyElems
      .reverse()
      .forEach(({ text, hasSyndeton }, index) => {
        const connection = (
          !hasSyndeton)
          ? conjunction
          : comma;
        wholeText += ((index === 0) ? '' : connection) + text;
      });
    return wholeText;
  };

  getOrdinaryArray = (array, periodGender) => {
    return array.genderInflection
      ? array
        .genderContents
        .filter(({ gender }) => (gender === periodGender)
        )[0].wordNumbers
      : array.defaultContent.wordNumbers;
  };
};

function reverse(text) {
  return text.split('').reverse().join('');
};

function findException(array, comparative) {
  const founded = array.find(({ number }) => number === comparative);
  return founded ? founded.wordNumber : '';
};

function leftPad(textNumber, digits, char) {
  return char.repeat(digits - textNumber.length) + textNumber;
};

function createArrayNumbers(stringNumber) {
  const digits = stringNumber.length;
  const periods = Math.round((digits + 1) / 3);
  const arrayNumber = new Array(periods);
  const reverseNumber = reverse(stringNumber);

  for (let i = 1; i <= periods; i++) {
    const index = i - 1;
    const position = (i - 1) * 3;
    arrayNumber[index] = reverse(reverseNumber.slice(position, position + 3));
  };

  return arrayNumber;
};

export default NameNumbers;