import React from 'react';
import Icon from '@mdi/react';
import { mdiContentCopy } from '@mdi/js';

export default function Inputs({ number, handleChangeInput, textNumber }) {
  const handle = () => {
    document.getElementById("text").select()
    document.execCommand('copy');
  };

  return (
    <div>
      <div className="input-container">

        <label htmlFor="input-number">
          Digite um número inteiro maior que 0
        </label>

        <input id="input-number"
          className="input-number"
          type="number" value={number}
          min="0"
          step="1"
          onChange={handleChangeInput}
          autoFocus />
      </div>

      <div className="disabled-inputs">
        <div className="text-area">

          <textarea
            className="input-text-number"
            name=""
            id="text"
            value={textNumber}
            readOnly
            cols="30"
            rows="10">
          </textarea>

          <Icon path={mdiContentCopy}
            className="icon"
            title="Copiar"
            size={2}
            onClick={handle}
          />
        </div>
      </div>
    </div>
  );
};