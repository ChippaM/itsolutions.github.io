 
let DB = {
    user: {username: null},
    appSetting : {},
    stats: {
      passed: [],
      failed: [],
      skipped: [],
      submission: 0,
    },
    session: []
};
const dictionaryObj = []
const questionDB = {
     course: { 
        
        lastUpdate: null,
    },
    questions: [],
    alph: ['A','B','C','D'],
    num: [0,1,2,3],
    selectedQuiz :[],
    chats: [],
    tempPassed: [],
    tempFailed: [],
    tempSkipped: [],
    tempAnswered: [],
    session: {}
   
   
}

const appSett = {
  theme : colorTheme[1],// { d_bgc, a_bgc: , h_lblc:}

}

questionDB.course.courseName = courseTitle 
let colors = [
               ...colorTheme.map(color => color.a_bgc),
              
               ...colorTheme.map(color => color.h_lblc), 
              ]

const database = {
  save : () => localStorage.setItem('testDB',JSON.stringify(DB)),
  get:() => JSON.parse(localStorage.getItem('testDB'))
}
let countdownInterv;
if (localStorage.hasOwnProperty('testDB')) {
  DB = JSON.parse(localStorage.getItem('testDB'))
}
 
const getElem = (ele) => document.querySelector(ele)
const getElems = (ele) => document.querySelectorAll(ele)
cleanQuestions()
        
const {questions, alph,num } = questionDB 

const takeTest = getElem("#take-test")
const shuffleAnswers = getElem("#shuffle-answers")
const message = getElem("#message")
const shuffleQuiz = getElem("#shuffle-questions")
const numQuiz = getElem('#num-questions')
const startQuizNum = getElem("#startFromQuiz")
startQuizNum.max = questions.length

const canvasWidth = (screen.availWidth) 
const canvasHeight = 550
numQuiz.max = questions.length
getElem('#set-max-quizlen-sp').textContent = questions.length -1
numQuiz.addEventListener('input', validateNumQuizVal)




- (screen.availWidth/2) + (DB.session.length)
function validateNumQuizVal() {
    if ( numQuiz.value > questions.length) 
        numQuiz.value = questions.length - 1
    if ( numQuiz.value == undefined )
        numQuiz.value = questions.length > 40 ? 40 : 1 

    const totQuizLen = questions.length
    const startNum = Number(startQuizNum.value)
    const quizLen = Number(numQuiz.value)
   
  if ( quizLen + startNum > totQuizLen ) 
        startQuizNum.value = totQuizLen - quizLen+1

}

startQuizNum.addEventListener('input', validateStartQuizNum)
function validateStartQuizNum() {
  if ( startQuizNum.value > questions.length) 
        startQuizNum.value = questions.length -1
    if ( startQuizNum.value == undefined )
        startQuizNum.value = 1

    const totQuizLen = questions.length
    const startNum = Number(startQuizNum.value)
    const quizLen = Number(numQuiz.value)
    let remaininLen = totQuizLen - startNum
    
    if ( quizLen + startNum > totQuizLen ) 
        numQuiz.value = totQuizLen - startNum
}

function cleanQuestions() { 
  const completeQ = q_a.trim().split('*****')
  if ( completeQ.length !== ansID.length ) {
    alert(`The number questions (${completeQ.length}) and answers (${ansID.length}) provided into this webpage are not equal.`)
    return
   
}
  completeQ.forEach((question, id) => {
    const quiz = (question
    .match(/(?<=Question\s*\d+\s).+(?=A\.)/msg)||['No Questions'])[0]

    const choices = question.replace(`${quiz}`, '')
    .trim().replace(/question\s\d+/,"").trim().match(/(?<=[A-E]\s*.).+/gm)
    
    questionDB.questions.push({id, question:quiz, choices})

  })


}



getElem('#load-questions-btn').addEventListener('click', renderQuestions)
 
function renderQuestions() {
 
  if ( questions.length == 0 ) {
      message.textContent = 'There is nothing to display.'
      return
  }

  
   let testQuiz = [...questions]

   const startNum = startQuizNum.value - 1

 
   if( shuffleQuiz.checked ) {
   
    const failedQuiz = questions
            .map( id => {
        return  {id, count: (DB.stats.failed[id] || 0) }
          })
       .sort( (a,b) => b.count - a.count )

    failedQuiz.length = numQuiz.value 
    testQuiz =[...failedQuiz.map( ({id, count}) => questions[id])]
    
    let uniqueQuiz = new Set()

    while(uniqueQuiz.size <= Number(numQuiz.value) ) {
        const ran = Math.floor(Math.random()*questions.length)
        uniqueQuiz.add(questions[ran])
    }

    testQuiz = Array.from(uniqueQuiz)
  
   }  

   if ( !startQuizNum.disabled )
        testQuiz = testQuiz.slice(startNum, ) 

  testQuiz.length = (numQuiz.value || 1)
  questionDB.selectedQuiz = [...testQuiz]


  getElem('#question-container').innerHTML
       = questionDB.selectedQuiz.map(({id, question, choices},i) => {

        let answerOptions = [...choices]

        if ( shuffleAnswers.checked ) {

             let shuffledAnswers = new Set()
             while(shuffledAnswers.size < 4) {
              const ran = Math.floor(Math.random()*4)
               shuffledAnswers.add(choices[ran])
              }
            AnswerOptions = Array.from(shuffledAnswers)

        }
    const choiceAnswers = answerOptions.map((choice, x) => {
      return `
      <li>
         <label>
            <input type="radio" value="${choice}" onclick="updateAnswer(${id})"
               name="chosen-answer${id}" class="chosen-answer">
                ${alph[x]}. ${choice}
             </label> 
      </li>`
    }).join("")

    return `
            <article id="question-box${id}">
                <div class="score-starts">
                    Your stats:
                    [
                     passed : <span class="passedStat">0</span> |
                     Failed : <span class="failedStat">0</span> |
                     Skipped : <span class="skippedStat">0</span>
                    ]
                </div>
                <div class="speaker play speaker-icons" data-state=""onclick="readText(${id});">
                  <div></div>
                </div>   
                <div class="question-box">
                    <span> Question ${++i}</span><br>
                    <span> ${question}</span><br>
                    <ul class="choices">
                      ${choiceAnswers}
                    </ul>
                
                </div>        
                <div class="answers-display">
                  <ul id="answer-label">
                    <li class="user-answer"> - </li>
                    <li class="correct-answer"> - </li>
                    <li class="answer-feedback"> - </li>
                  </ul>
                  </div>
                <div class="reference">Reference: QA<span>${++id}</span></div>
            </article>
    `
    }).join("")
    getElem('#question-container').scrollTop = 0;
  updateClassElems("selected-questions-length", questionDB.selectedQuiz.length )
  
  getElem("#progress-bar").value = 0
  getElem("#answered-questions").textContent = 0
  getElem("#scored-marks").textContent = 0
  questionDB.tempPassed.length = 0
  questionDB.tempAnswered.length = 0
  questionDB.tempSkipped = questionDB.selectedQuiz.map( ( {id} ) => id )
  getElem("#progress-bar").value = 0
  getElem("#progress-bar").max = questionDB.selectedQuiz.length
  getElem("#result-quiz-count").textContent = questionDB.selectedQuiz.length
  renderStats()
 
  getElem("#submit-btn").textContent = takeTest.checked ? 'Submit Answer' : 'Read mode only';
  getElem("#submit-btn").disabled = !takeTest.checked
  getElem("#question-types").disabled = !takeTest.checked
  disableElems( !takeTest.checked )
 
  

  if (!takeTest.checked) 
      showAnswers() 
  

  questionDB.session.startTime = Date.now()
  clearInterval(countdownInterv)
  getRemainingTime()

 if (DB.session.length > 1 ) 
    getElem('#open-report').classList.remove('hide')
  }

  const choiceAnswers = getElems('#question-container [name^="chosen-answer"]')

  takeTest.addEventListener('change', enabledReviewMode)
  function enabledReviewMode() {
  

      shuffleAnswers.checked = takeTest.checked 
      shuffleQuiz.checked = takeTest.checked 
      if (takeTest.checked) {
        
          shuffleAnswers.disabled = true
          shuffleAnswers.title = "Disabled for test."

      }
      else
      {
        shuffleAnswers.disabled = false
        shuffleAnswers.title = "Only for reviewing questions and answers."

      }

  
  }
 
  function updateAnswer(id) {
       getElem(`#question-box${id} .user-answer`).textContent
        = 'Your answer : '+alph[getChosenChoicePos(id)]
        highlightCheckedAnswer(id)
      
       if ( !questionDB.tempAnswered.includes(id) ) {

        const pos = questionDB.tempSkipped.findIndex(value =>value == id) 

        questionDB.tempSkipped.splice(pos, 1)
        questionDB.tempAnswered.push(id)
   
         const answeredQuizLen = questionDB.tempAnswered.length
         getElem("#progress-bar").value = answeredQuizLen
         getElem("#answered-questions").textContent = answeredQuizLen
    }
    
  }

getElem("#submit-btn").onclick = upgrade

if (typeof dictionary !== "undefined") {
  loadDictionaryDt()
document.onselectionchange = () => {
    const selectedText = document.getSelection().toString();

    if ( (selectedText.match(/\w+/gi) || '').length >= 4 ){
        getElem('#selected-text').textContent = 'Max words are four for dictionary'
        getElem('#definition').textContent = ' '
        return
    } else {

      
      getElem('#selected-text').textContent = selectedText
      getElem('#definition').innerHTML = '<span class="span-title">Definition : </span> ' + defineTerm( selectedText )
    }
};
}

function defineTerm(userInput = ''){

   let term = userInput.toLowerCase().trim()
   .replace(/^[A-D]{1}\.\s|^\W*|\W$/g,'')
    .replace(/^(the\s+|^\s+|\s$|an\s+|[a-d](\s|\.\s+|\s{2,}))/gi,'')
   .replace(/\W/g,' ')
  //  .replace(/(?:mean.*\s|defin.+\s|explain.*))*/gi,'')
    .replace(/ed$/gi,'e')
    .replace(/ed/gi,'es')
    .replace(/s$/gi,'')
    .replace(/^(?:an|the|a)\s+/i,'').trim()
   let findMatched = dictionaryObj.find(({def})=>def.toLowerCase() == term)
   //https://api.dictionaryapi.dev/api/v2/entries/en/${word}
   return !findMatched?`${term} is not found`:`${findMatched.def.replace(/\w/,r=>r.toUpperCase())}: ${findMatched.desc}`

}

function loadDictionaryDt() {
    const dictionDt = dictionary.trim()
    const dicEntry = dictionDt.replace(/^\s*/gm,'').split('\n')
    
    for (let r = 0; r < dicEntry.length; r++) {
         const dicEntries = dicEntry[r].split('#')
         const defEntry = dicEntries[0]
         const descEntry = dicEntries[1]
         dictionaryObj.push({def:defEntry,desc:descEntry})
    }

}
function upgrade() {
   clearInterval(countdownInterv)
   disableElems(true)
   getElem("#submit-btn").disabled = true
   getElem("#submit-btn").textContent = "Submitted answers"
   getElem("#question-container").scrollTop = 0

   saveSubmissionStats()
   database.save()
   renderStats()
   
  }

  function saveSubmissionStats() {
  
   let correctAnsCount = 0 
    questionDB.tempPassed.length = 0
    questionDB.tempFailed.length = 0
    

   questionDB.selectedQuiz.forEach(({id})=>{
    
    const getchosenChoicePos = getChosenChoicePos(id)
      
    const correctChoiceStr = questionDB.questions[id].choices[ansID[id]]

    const answerElems =  getElems(`#question-box${id} .chosen-answer`)
    
    const correctAnswerPos = 
     [...answerElems].findIndex( ele => ele.value == correctChoiceStr )

    if (getchosenChoicePos >= 0 ) {
      

      const isChoiceCorrect = getchosenChoicePos === correctAnswerPos 
      
      getElem(`#question-box${id} .answer-feedback`)
      .textContent =  isChoiceCorrect ? 'Congratulations':'Try again later.'

      if (isChoiceCorrect) {

        DB.stats.passed[id] = ( DB.stats.passed[id] || 0 ) + 1
        correctAnsCount += 1
         questionDB.tempPassed.push(id)

      }else {
        DB.stats.failed[id] = ( DB.stats.failed[id] || 0 ) + 1
         questionDB.tempFailed.push(id)
      }
    }else {
      DB.stats.skipped[id] = ( DB.stats.skipped[id] || 0 ) + 1
    }

    getElem(`#question-box${id} .correct-answer`).innerHTML 
       =`Correct answer is : <span>${alph[correctAnswerPos]}</span>`
   })
   DB.stats.submission = DB.stats.submission + 1
   

   getElem("#scored-marks").textContent = correctAnsCount

      questionDB.session.endTime = Date.now()
      questionDB.session.quizShuffled = shuffleQuiz.checked
      questionDB.session.answersShuffled = getElem("#shuffle-answers").checked
      questionDB.session.scored = correctAnsCount
      questionDB.session.quizLen = questionDB.selectedQuiz.length
      questionDB.session.skippedQuizCount = questionDB.tempSkipped.length

     DB.session.push(questionDB.session)
     
     const passStatusScore = 
     Math.round((correctAnsCount / questionDB.selectedQuiz.length)*100)
     getElem("#pass-status").innerHTML = 
       `<span id="pass-status-label">[ ${passStatusScore}% - Pass status:
        ${passStatusScore > 69 ? 'Passed':'Try again'}]</span> `
     

  }


  function renderStats() {
   
    questionDB.selectedQuiz.forEach( ({id})=> {

      getElem(`#question-box${id} .passedStat`).textContent = DB?.stats?.passed[id] || 0
      getElem(`#question-box${id} .failedStat`).textContent = DB?.stats?.failed[id] || 0
      getElem(`#question-box${id} .skippedStat`).textContent = DB?.stats?.skipped[id] || 0

    })

  }

  function highlightCheckedAnswer(id) {

    const checked = getElem(`#question-box${id} li:has(input:checked)`);

  if (checked) {
   
    getElems(`#question-box${id} li:has([name^="chosen-answer"])`)
    .forEach(li =>li.style.background = "")
    getElem(`#question-box${id} li:has(input:checked)`)
    .style.background = appSett.theme.h_lblc
    getElem(`#question-box${id}`).style.background = appSett.theme.d_bgc

   }
  }

  function getChosenChoicePos(id) {
    const answerElems =  getElems(`#question-box${id} .chosen-answer`)
    const chosenAnsPos = [...answerElems].findIndex(ele => ele.checked)
    return chosenAnsPos   
  }
  function disableElems(disable) {
    
      const answerChoices = getElems("#question-container [type='radio']")
      answerChoices.forEach(radio =>radio.disabled = disable)
      
     
  }

  getElem("#question-types").addEventListener('change', chooseQuestions)

  function chooseQuestions() {

    const questionGrp = getElem("#question-types") 
    const {tempAnswered,tempSkipped, tempFailed, tempPassed} = questionDB

    let quiz = null;

    switch(questionGrp.value) {
      case 'all': 
        quiz = questionDB.selectedQuiz.map(({id}) => id)
      break
      case 'answered':
        quiz = tempAnswered
      break
      case 'skipped':
        quiz = questionDB.selectedQuiz
        .filter(quiz => !tempAnswered.includes(quiz.id) )
        .map(({id})=>id)
      break;
      case 'passed':
       quiz = tempPassed
       break
        case 'failed':
       quiz = tempFailed
       break

    }
   const cleanQuiz = [...new Set(quiz)]
   questionDB.selectedQuiz.forEach(({id}) => getElem(`#question-box${id}`).style.display = 'none')
   getElem("#result-quiz-count").textContent  = quiz.length
   cleanQuiz.forEach(id => getElem(`#question-box${id}`).style.display = '')
 
   getElem("#question-container").scrollTop = 0


  }
 
  function openTestWindow() {
     speechSynthesis.cancel();
    getElem("#test-settings-window").style.display = "flex"
  }

  function closeSettingWindow() {
     getElem("#test-settings-window").style.display = "none"
  }
  updateClassElems("total-questions", questions.length)
  function updateClassElems(elemsname, value){

    getElems(`.${elemsname}`)
    .forEach(ele => ele.textContent = value)
  }

  function showAnswers() {
      questionDB.selectedQuiz.forEach(({id, choices})=>{
  
        const answerElems =  [...getElems(`#question-box${id} .chosen-answer`)]
    
        const correctAnsPos = answerElems.findIndex( ele => ele.value == choices[ansID[id]] )

      if ( correctAnsPos > -1) {
        getElem(`#question-box${id} .correct-answer`).innerHTML = 'Correct answer is : '+alph[correctAnsPos]
      
        getElems(`#question-box${id} .choices li`)[correctAnsPos].style.background = appSett.theme.h_lblc
        ///theme : colorTheme[0],// { d_bgc, a_bgc: , h_lblc:} appSett.theme.h_lblc
    
      }
        })
  }

 

function getRemainingTime() {
    const timeDown = getElem("#countdown-time");
    const minutes = Number(getElem("#num-minutes").value) || 60;

    let totalSeconds = minutes*60;

    clearInterval(countdownInterv); // Stop any previous timer

    countdownInterv = setInterval(() => {

        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
        const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
        const secs = String(totalSeconds % 60).padStart(2, "0");

        timeDown.textContent = `${hours}:${mins}:${secs}`;

        if ( totalSeconds <= 0 ) {
            clearInterval(countdownInterv);
            getElem("#submit-btn").click()
            alert('done')
            return;
        }

        
        totalSeconds--;

    }, 1000);
}


   function openDictionary() {
     const showState = getElem('#dictionary-ach').dataset.show

      if (showState) {
        getElem('#dictionary-box').style.display = 'flex'
        getElem('#dictionary-ach').dataset.show = ''
        
      }else {
        getElem('#dictionary-ach').dataset.show = 'show'
        getElem('#dictionary-box').style.display = 'none'
      }

   }
getElem("#speaker-button").onclick = showSpeakIcons


function showSpeakIcons() {

  const isShow = getElem("#speaker-button").dataset.show ? true : false
 
getElems(".speaker-icons").forEach(elem => 
  elem.style.visibility = !isShow ? 'visible':'hidden'
)
 
  getElem("#speaker-button").dataset.show = isShow ?'':'show'

  if ( isShow )
    stopReading() 
 
}
  
const voices = speechSynthesis.getVoices();
let speech = null;
function readText(id){
  const readState = getElem(`#question-box${id} .speaker`)
  const currentState = readState.dataset.state

  getElems(`.speaker`).forEach( elem => {
    elem.classList.remove('stop')
    elem.classList.add('play')
    elem.dataset.state = ''
  })

  if (currentState == 'playing') {
    speechSynthesis.cancel()
    return
  }
  getElem(`#question-box${id} .speaker`).classList.add('stop')
  getElem(`#question-box${id} .speaker`).dataset.state = 'playing'



  speechSynthesis.cancel(); // stop previous speech
    
   const voices = speechSynthesis.getVoices();

    const questionText = getElem(`#question-box${id}`).textContent
    .trim().replace(/.*(?=Question \d+)/s, '')
    .trim().replace(/Reference: .*$/,'')
  
    speech = new SpeechSynthesisUtterance(questionText);
    if (voices.length>=2)
        speech.voice = voices[2];
    
    speech.rate = 1;      // 0.1 - 10
    speech.pitch = 1;     // 0 - 2
    speech.volume = 1;    // 0 - 1
    speechSynthesis.speak(speech);
          
   }

  getElem("#num-minutes").addEventListener('blur', validateMinutesValue)
function validateMinutesValue() {
  const numMin = getElem("#num-minutes")
  if (!/^[1-6]\d?$/.test(numMin.value)) {
    numMin.value = 60
  }
}

   function stopReading() {
     getElems(`.speaker`).forEach( elem => {
    elem.classList.remove('stop')
    elem.classList.add('play')
    elem.dataset.state = ''
  })
   speechSynthesis.cancel()
   }
shuffleQuiz.addEventListener("click",disableStartFromQuiz )

function disableStartFromQuiz() {

      startQuizNum.disabled = shuffleQuiz.checked
    
}

if (!Object.keys(DB).includes('session')) {
     localStorage.removeItem("testData")
}
getElem("#open-report").addEventListener('click', RunCanvasLibraries)
    


 if (DB.session.length > 5 ) 
    getElem('#open-report').classList.remove('hide')


document.addEventListener('resize', showScoreInCanv)
const rangeInput = getElem('#range-input')
rangeInput.addEventListener('input', showScoreInCanv)

getElem("#report-title").textContent = questionDB.course.courseName 
+' Test Report'


 
const tot = DB.stats.submission
rangeInput.value = tot % 2 == 1 ? (tot+1)/2 : tot/2 

function showScoreInCanv() {

 
  const totSubmis = DB.stats.submission - 1
  rangeInput.max = totSubmis

  
  rangeInput.style.setProperty("--before-left", (totSubmis-rangeInput.value)+'px') 
  const highestScores = DB.session.map( ({ scored, quizLen }) => scored)
  const highNum = Math.max(...highestScores)

  DB.session.forEach( (obj , y) => obj.id = y )

   const canv = getElem('#scores-canv')
   const cx = canv.getContext("2d")

   canv.width = canvasWidth
   canv.height = canvasHeight

   const w = canv.width
   const h = canv.height
   const lineW = w - 10
   const lineH = 455
   const offset = 50
   cx.clearRect(0 , 0, w, h)
    const fontSize = '18px sans-serif'

    for(let x = 0;   x <= 20; x++ ) {
          if ( x > 0) {
            cx.beginPath()
            cx.moveTo(20, lineH - (x*20))
            cx.lineTo(lineW, lineH - (x*20))
            cx.setLineDash([10,5]);
            cx.strokeStyle ='#c0b5b5'
            cx.stroke()
            cx.closePath()
            cx.font = fontSize
            cx.fillText(x*5, 20, lineH - (x*20))

          }
        } 
   
  
   cx.save()
   cx.translate(8, lineH/2)
   cx.rotate(-Math.PI/2)
   cx.textAlign = "center";
   cx.textBaseline = "middle";
   cx.font = fontSize;
   cx.fillStyle = "steelblue";
   cx.fillText( 'Percentage (%)', 0, 0)
   cx.restore()
   
   cx.fillStyle = "steelblue"
   //cx.translate(canvasWidth /2, 50)
   cx.fillText( 'Percentage (%), Score & Time spent (Minutes : Seconds) ',offset+100, 30 )
   cx.beginPath()
   cx.moveTo( offset, offset )
   cx.lineTo( offset, lineH )
   cx.lineTo( lineW, lineH)
   cx.stroke()
   cx.closePath()

   cx.font = fontSize
   cx.fillStyle = "steelblue"
  
      

    cx.fillText ('Scores', lineW / 2, lineH + offset + 40)
    cx.fillText ('Test :', 0, lineH + offset + 20)
   const startNum = Number(rangeInput.value)

   const points = []
   DB.session.slice(startNum).forEach( ({id, startTime, endTime, scored, quizLen}, i) =>{
        
        const percent = scored*10

        const barW = 20
        const xPos = offset + ( (barW+3) * i)
        const yPos = lineH - percent
      
        const barH = percent
        
     
         points.push({x:xPos+10, y:yPos})

     
        cx.beginPath()
        cx.font = "15px arial"
        cx.fillStyle = `hsl(${id * 137.508}deg, 60%, 80%)`
      if ( getElem("#bars-canvas").checked ) 
        cx.fillRect(xPos, yPos, barW, barH )
        cx.fill()
 
        
         cx.fillStyle = "steelblue"
        cx.fill()
        
       
        cx.save()
        cx.translate(xPos+15, yPos)
        cx.rotate(-Math.PI/2)
        cx.font = "15px sans-serif"
        if ( getElem("#time-speed-canvas").checked ) 
        cx.fillText(getMinutesSpent(startTime,endTime) , 0, 0)
        cx.restore()
       
         cx.fillStyle = "#2897b6"
         cx.fillText (++id, xPos, lineH + offset + 20)
       
           cx.save()
           cx.rotate(-Math.PI / 2)
           cx.fillStyle = "#000"
           cx.font = fontSize
           cx.textBaseline = "middle"
          if ( getElem("#marks-canvas").checked ) 
           cx.fillText(`${scored}/${quizLen}`, -lineH-offset, xPos + barW/2+5)
           cx.restore()
      
           cx.beginPath()
           cx.fillStyle = 'rgb(16, 169, 207)'
          if ( getElem("#dots-canvas").checked ) 
           cx.arc( xPos+10, yPos, 3, 0 , Math.PI*2)
           cx.fill()
         
  
         
        
    
      })
    if ( getElem("#progress-line-canvas").checked ) {
      cx.beginPath()
      cx.moveTo(points[0].x , points[0].y)
      for(let h = 1; h<points.length; h++)
         cx.lineTo(points[h].x , points[h].y)
  
        cx.strokeStyle = 'rgb(100, 127, 246)'
        cx.lineWidth = 3
        cx.stroke()
      }


}
getElem("#canvas-items-box").addEventListener('click', RunCanvasLibraries )
function getReportFeedback() {

  const curDate = new Date();
  const hours = curDate.getHours()
  let greetings = 'Morning'
  if (hours > 12) 
      greetings = 'Afternoon'
  else if (hours > 17) 
      greetings = 'Evening'

  const allCount = DB.stats.submission

  const { startTime, endTime, scored, quizLen, quizShuffled = false, skippedQuizCount = 0 }= DB.session[allCount-1]

  const highestScores = DB.session.map( test => test.scored )

  const topScore = Math.max(...highestScores)
  const topScorePos = DB.session.findIndex( test => test.scored == topScore)
  const topScoreTest = DB.session[topScorePos]
  let star = ''

  if(allCount>3) {
    const starCount = DB.session.slice(allCount-4,)
    .every(test => ( (test.scored / test.quizLen)/100 >= 70 ) )
    star = starCount ? 'Gold': 'None'
  }
 if (Math.round((scored/quizLen)*100)>= 70)
    star = 'Green'
 
  let improvement = ''
  if (allCount>1) {
    improvement = scored > DB.session[topScorePos-1].scored ? 'Better than last test' : 'Lower than last test' 
  }
  
 const passedQuesions = countPassedTest().length
  const feedback =
  `<legend>--- Test feedback ---</legend>
  <div>
  <p><b>Minimum Score To Pass: +70%</b></p><br>
  <p> Test taken on : <span> ${new Date(startTime).toLocaleString("en-ZA",
    {formatMatcher:"basic"}
  )}</span></p>
  <p> Your Marks : <span> ${scored}/${quizLen} </span>
  <p> Your Score   : <span> ${Math.round((scored/quizLen)*100)}%</span></p>
   <p>Feedback : <span>${Math.round((scored/quizLen)*100)>= 70 ?'Congratulations' : 'Try Again, later'}</span></p>
  <br>
    <p>Questions Shuffled : <span>${quizShuffled?'Yes':'No'}</span></p>
    <p>Skipped Questions : <span>${skippedQuizCount}</span></p>
  <p> Time Spent : <span> ${getMinutesSpent(startTime, endTime)
    .replace(/M.+/, c=>' Minutes and '+ (c.match(/\d+/g)||['00'])[0])} seconds</span></p><br>


  <p>Improvement : <span>${improvement}</span></p><br>
  <p> Star Obtained   : <span>${star}</span></p>
  </div>
  <div>
  <p> Star meaning: 
   <ul> 
      <li>Gold Star - Passed at least 3 tests in row.</li>  
      <li>Green Star - Passed the test.</li>  
    </ul>
  </p><br>

  </div>
  <div>
  <p>--- About All Tests ---</p>
  <p>Total Tests Taken : <span> ${allCount} </span></p><br>
  <p>Highest Score Achieved : <span> ${topScoreTest.scored}/${topScoreTest.quizLen}</span><p/>
  <p>Questions shuffled : <span>${quizShuffled?'Yes':'No'}</span></p><br>

  <p>Overall Score : <span title="Number of passed questions / number of submissions"> ${passedQuesions}/${allCount} </span></p>
  <p>Overall Pass Rate :<span title="Number of passed questions / number of submissions * 100"> ${Math.round((passedQuesions/allCount)*100)}%</span></p></br>
  <p>Gold Star Collected: <span> ${CountGoldStar()} </span></p>
  <p>Green Star Collected: <span> ${passedQuesions} </span></p><br>
  <p>Remaining Questions to passed : <span>${countRemainingToPass()}</span></p>
  </div>
  `
  getElem("#report-summary").innerHTML = feedback

}

 
function countPassedTest() {
     const passedTests = DB.session.filter( test => ((test.scored / test.quizLen)*100) >= 70)
     return passedTests
  }
function CountGoldStar() {
     const passedTests = DB.session.map( test => (test.scored / test.quizLen)*100 >= 70?1:0).join("")
     return (passedTests.match(/1{3,}/g)||[]).length
  }
 
function countRemainingToPass() {
  const failed = questionDB.questions
   .map((test, i) => DB.stats.passed[i] ?'':'1')
   
  return failed.join("").length
}
function showCanvSubmission() {
  
  const canv = getElem("#submission-history")
  const cx = canv.getContext("2d")
   canv.width = canvasWidth 
   canv.height = canvasHeight

   const w = canv.width
   const h = canv.height
   const lineW = w 
   const lineH = h - 230
   const offset = 50  
   const barW = 40
   

   cx.beginPath()
   cx.strokeStyle = 'grey'
   cx.moveTo(offset, offset)
   cx.lineTo(offset, lineH)
   cx.lineTo(lineW, lineH)
   cx.stroke()
   cx.closePath()

   cx.font = `18px sans-serif`
   cx.fillStyle = 'steelblue'
   cx.fillText(`Submission history (${DB.stats.submission} tests)`, w/2, 30)
   
   let submissionCounts = []
   const startDates = DB.session.map( ({startTime}) => new Date(startTime).toLocaleDateString('en-ZA',{}) )

   const uniqueStartDates = [...new Set(startDates)]
  uniqueStartDates.forEach( (value , i) => {

      const dateCount = DB.session.filter( 
        ({startTime}) => new Date(startTime).toLocaleDateString('en-ZA',{}) == value ).length
      
      submissionCounts.push(dateCount)
        
      cx.save()
      cx.translate(offset+(barW*i) +20, lineH+100)
      cx.rotate(-Math.PI/2)
      cx.fillText(`${value}`  , 0, 0 )
      cx.restore()

      cx.fillStyle = `steelblue`
      cx.fillRect(offset+(barW*i), lineH-dateCount, barW-5, dateCount)
      
      cx.fillStyle = "steelblue"
      cx.fillText(`${dateCount}`, offset+(barW*i)+10, lineH-dateCount)
      
      
      if (i <= 0){
        cx.beginPath()
        cx.moveTo(offset+(barW*i)+20, lineH-dateCount)
    
      }else  {
        cx.lineTo(offset+(barW*i)+20, lineH-dateCount)

      }
      cx.setLineDash([10,10]);
      cx.strokeStyle = 'rgb(214, 64, 92)'
      cx.lineCap = 'square'
      cx.stroke()

  })
   

}

//RunCanvasLibraries() 
function RunCanvasLibraries() {
 if (DB.session.length === 0) return;

    showScoreInCanv()
    showCanvSubmission()
    getReportFeedback()
 
    getElem("#report-window").style.display = 'flex'
}

getElem("#delete-data-btn").onclick =()=> {
  const confirmDel = confirm('You are about to delete all the data that is helping to track your progress.')
  if (confirmDel) {
    localStorage.removeItem('testDB')
    location.reload()
  }
} 
function getMinutesSpent(date1, date2) {
    const totalSeconds = Math.floor(
        Math.abs(new Date(date2) - new Date(date1)) / 1000
    );

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    
      return `${minutes}M:${seconds}s`
    
}

