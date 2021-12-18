'use strict';

{
  const question = document.getElementById('question');
  const btn = document.getElementById('btn');
  const choices = document.getElementById('choices');
  const quizes = [
    {q: 'うんこはおいしいですか?', c: ['おいしい', 'うまい', 'げりはうまい']},
    {q: 'まんがはたべれますか?', c: ['のめます', '卒業式にたべます', '家に帰りたいです']},
    {q: '化粧水で水分補給できますか?', c: ['アロエクリームならオッケー', '化粧水ってなに？', '教科書でなぐる']},
  ];
  let currentNum = 0;
  let isAnsewered;
  let score = 0;    //正当数の管理

  function shuffle(arr) {
    for(let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if(isAnsewered === true) {
      return;
    }
    isAnsewered = true;
    if(li.textContent === quizes[currentNum].c[0]) {
      li.classList.add('correct');
      score++;    //正解したらscoreを1ずつ増やす
    } else {
      li.classList.add('wrong');
    }
  }

  function setQuiz() {
    isAnsewered = false;    //次の問題に行ったときに、falseにしておくことで、選択肢を選べるようにしておく。
    question.textContent = quizes[currentNum].q;
    while(choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }
    const shuffledChoices = shuffle([...quizes[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.addEventListener('click', () => {
        checkAnswer(li);   //正誤判定するcheckAnswerにここで作った、liを引数として渡す。関数内の仮引数と個々のliは同じ意味を示す。
        btn.classList.remove('disabled');   //選択肢を推したら、ネクストボタンからdisabledを外す。そうすると次の問題に行ける。
      });
      li.textContent = choice;
      choices.appendChild(li);
    });

    if(currentNum === quizes.length - 1) {    //この条件分岐は、btnのイベントリスナー内の currentNum++;とsetQuiz();の間で書いてもよい。ここに書いてのは、処理をまとめる
      btn.textContent = 'Show Score';
    }
    
  }
  
  
  btn.addEventListener('click', () => {
    if(btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');    //次の問題に言ったら = ボタンを押したら、disabledをつけて、選択肢を推してなくても次に行けるというバグを直す。

    if(currentNum === quizes.length - 1) {
      // console.log(`Score: ${score} / ${quizes.length}`);
      const result = document.getElementById('result');
      const point = document.getElementById('score');
      result.classList.remove('hidden');
      point.textContent = `Score: ${score} / ${quizes.length}`;
      return;
    } 
    currentNum++;
    setQuiz();
  });

  setQuiz();


}






// {
//   const question = document.getElementById('question');
//   const choices = document.getElementById('choices');
//   const btn = document.getElementById('btn');
//   const quizSet = [
//     {q: 'What is A?', c: ['A0', 'A1', 'A2']},
//     {q: 'What is B?', c: ['B0', 'B1', 'B2']},
//     {q: 'What is C?', c: ['C0', 'C1', 'C2']},
//   ];
//   let currentNum = 0;

//   function shuffle(arr) {
//     for(let i = arr.length -1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [arr[j], arr[i]] = [arr[i], arr[j]];
//     }
//     return arr;
//   }

//   function setQuiz() {
//     question.textContent = quizSet[currentNum].q;
//     const shuffled = shuffle([...quizSet[currentNum].c]);
//     shuffled.forEach(choice => {
//       const li = document.createElement('li');
//       li.textContent = choice;
//       choices.appendChild(li);
//     });
//   }

//   setQuiz();

// }