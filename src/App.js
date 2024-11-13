import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [inputText, setInputText] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // ページ読み込み時にinputにフォーカスを当てる
    document.getElementById('input').focus();
  }, []);

  const handleButtonClick = async (event) => {
    event.preventDefault(); // フォームのデフォルトの送信動作を防ぐ
    setIsDisabled(true);

    // 1. inputとbuttonを使えなくする
    const inputElement = document.getElementById('input');
    const buttonElement = document.getElementById('button');
    inputElement.disabled = true;
    buttonElement.disabled = true;

    // 2. inputの文字を取り出して、chatにclass=inputのdivを作成
    const chatElement = document.querySelector('.chat');
    const newInputDiv = document.createElement('div');
    newInputDiv.className = 'input';
    newInputDiv.textContent = inputText;
    chatElement.appendChild(newInputDiv);

    // inputの文字をなしにする
    setInputText('');

    // 3. 適当に1秒待つ
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 4. chatにclass=outputのdivを作成して、その中にあるtextContentを「（入力された文字）に対する回答」にする
    const newOutputDiv = document.createElement('div');
    newOutputDiv.className = 'output';
    newOutputDiv.textContent = `「${inputText}」に対する回答`;
    chatElement.appendChild(newOutputDiv);

    // 5. inputとbuttonを使えるようにする
    inputElement.disabled = false;
    buttonElement.disabled = false;
    setIsDisabled(false);

    // 回答が返ってきたときにinputにフォーカスを当てる
    inputElement.focus();
  };

  return (
    <div className="App">
      <header>
        ポジレコ
      </header>
      <div className="chat">
      </div>
      <form className="form" onSubmit={handleButtonClick}>
        <input
          id="input"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isDisabled}
          autocomplete="off" // 自動補完を無効化
        />
        <button id="button" type="submit" disabled={isDisabled}></button>
      </form>
    </div>
  );
}

export default App;