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
    chatElement.insertBefore(newInputDiv, chatElement.querySelector('button'));

    // inputの文字をなしにする
    setInputText('');

    // 3. 適当に1秒待つ
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 4. chatにclass=outputのdivを作成して、その中にあるtextContentを「（入力された文字）に対する回答」にする
    const newOutputDiv = document.createElement('div');
    newOutputDiv.className = 'output';
    newOutputDiv.textContent = `「${inputText}」に対する回答`;
    chatElement.insertBefore(newOutputDiv, chatElement.querySelector('button'));

    // 5. inputとbuttonを使えるようにする
    inputElement.disabled = false;
    buttonElement.disabled = false;
    setIsDisabled(false);

    // 回答が返ってきたときにinputにフォーカスを当てる
    inputElement.focus();

    // 日記生成ボタンを表示する
    const diaryButton = chatElement.querySelector('button');
    diaryButton.style.display = 'block';
  };

  const handleDiaryButtonClick = async () => {
    // 1. formを消す
    const formElement = document.querySelector('.form');
    formElement.style.display = 'none';

    // 2. 日記生成ボタンを消す
    const diaryButton = document.querySelector('.chat button');
    diaryButton.style.display = 'none';

    // 2.5. 1秒待つ
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 3. chatにdivを生成、中にh2とpを作成
    const chatElement = document.querySelector('.chat');
    const diaryDiv = document.createElement('div');
    diaryDiv.className = 'diary';

    const diaryTitle = document.createElement('h2');
    const today = new Date();
    const formattedDate = `${today.getFullYear()}年${String(today.getMonth() + 1).padStart(2, '0')}月${String(today.getDate()).padStart(2, '0')}日`;
    diaryTitle.textContent = formattedDate;

    const diaryContent = document.createElement('p');
    diaryContent.innerHTML = `今日は8時から「データ構造とアルゴリズム」の講義。ソートアルゴリズムの説明が面白くて、日常にも応用できそうだと感じた。来週のテストに向けていい復習になった。<br>
午前中の講義後、友達と学食でランチ。期間限定の「チキン南蛮定食」を頼んだら、期待以上の味で大満足。みんなで次の旅行の計画も話して楽しかった。<br>
午後は図書館でAIの応用技術に関するレポート作成。医療分野の画像診断に関する最新の論文を見つけて参考にした。今日は集中できて予定より進められた。<br>
その後はテニスサークルの練習へ。風が強くて難しかったけれど、コントロールを意識したらいい感じにショットが決まって、少し成長を実感。<br>
夕方にはカフェで資格の勉強を少し。夜は簡単にパスタを作って食べ、明日に備えて早めに就寝。明日も頑張ろう！`;

    diaryDiv.appendChild(diaryTitle);
    diaryDiv.appendChild(diaryContent);
    chatElement.appendChild(diaryDiv);

    // 6. ダウンロードリンクを作成してクリック
    const downloadLink = document.createElement('a');
    const diaryText = diaryContent.innerHTML.replace(/<br>/g, '\n'); // <br>を改行に変換
    const blob = new Blob([diaryText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = `${formattedDate}.txt`;
    downloadLink.click();
    URL.revokeObjectURL(url); // メモリを解放
  };

  return (
    <div className="App">
      <header>
        ポジレコ
      </header>
      <div className="chat">
        <button onClick={handleDiaryButtonClick}>
          日記生成
        </button>
      </div>
      <form className="form" onSubmit={handleButtonClick}>
        <input
          id="input"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isDisabled}
          autoComplete="off" // 自動補完を無効化
        />
        <button id="button" type="submit" disabled={isDisabled}></button>
      </form>
    </div>
  );
}

export default App;