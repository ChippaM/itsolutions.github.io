
const getElem = (ele) => document.querySelector(ele);
const getElems = (ele) => document.querySelectorAll(ele);
const getEleByID = (ele) => document.getElementById(ele);
const getClassElem = (ele) =>document.getElementsByClassName(ele);


let database = {
  settings:[],
  isNewSetting: false,
  index : 0,

}

let sessionData = {
  currentMonth: null,
  delimiter: null,
  showInputOutput: true,
  currentSetting: null,
  draftId : null
}


let rosterDB = {}
const rosterConfig = {}
const tempSession = {}
const birthday = [{employee:"Chippa Mathebula", date:"03-03"}]

const DB = {
  save: () => saveSettings(),
  get: () => JSON.parse(localStorage.getItem("rosterDB")),
  delete: () => {
    localStorage.removeItem("rosterDB") 
    sessionStorage.removeItem("rosterSession") 
    rosterDB = {}
    database = {
  currentMonth: null,
  delimiter: null,
  showInputOutput: true,
  currentSetting: null}
    location.reload()
  }
}

///const cols = getElem(".week-roster tr:first-child").textContent.replace(/\s|Row No/g,"").split("")
const delim = getElem("span#delim")
const splitterBox = getElem("#splitter-box")
const delims = getElems("span.splitter")
const inputBox = getElem("#input-data")
const cellValue = getElem("#cell-number")
const hours = getElem("#standard-hours")
const shiftValue = getElem("#shift-values")
const employeeValue = getElem("#employee-name")
const totalNumShiftsPerEmp = getElem("#total-shifts-per-employee")
const formulaResult = getElem("#result-formula")
const rangeElems = getClassElem("range")
const hourLabel = getElem("#hour-label")
 
const timesheetEmpName = getElem("#timesheet-emp-name")
const copyStatus = getElem("#copy-status")

const leftShift = getElem("#leftShift")
const rightShift = getElem("#shiftRight")

try {
  const savedDB = DB.get();

  if (savedDB && typeof savedDB === "object") {
    database = savedDB 
    const id = database.index || 0
    sessionData.currentSetting = database.settings[id] 
    rosterDB = database.settings[id];

    //sessionStorage.setItem("rosterSession", JSON.stringify(sessionData))
    

    
    
  } 


  if (sessionStorage.hasOwnProperty("rosterSession")) { 
       sessionData = JSON.parse(sessionStorage.getItem("rosterSession"))
      getElem(".active-month").textContent = sessionData.currentMonth || 
      new Date().toLocaleDateString("en-ZA", {month:"long", year:"numeric"}) 

      
    }
    
   

  
  
  shiftValue.value = Array.isArray(rosterDB.shifts)
    ? rosterDB.shifts.map(({ shift }) => shift).join("\n"): "";

  hours.value = Number(rosterDB.hours) || 9;
  hourLabel.textContent =  hours.value 
  employeeValue.value = Array.isArray(rosterDB.employees)
    ? rosterDB.employees.map(({ employee }) => employee).join("\n"): "";
 

  

} catch (error) {
  alert("Error message occurried while loading the data")

  rosterDB = {};
  localStorage.removeItem("rosterDB");
  location.reload()


}


 


let yellowTable = null; 

const chosenMonth = getElem(".active-month")
 
const weekRoster = getElem('.week-roster')

inputBox.style.display = sessionData.showInputOutput ? "block" : "none"
getElem("#hide-input-output").textContent = sessionData.showInputOutput ? "Hide Input/Output" : "Show Input/Output"
getElem("#utility-icon").style.display =  sessionData.showInputOutput ? "none" : "block"
getElem("#hide-show-icons-label").textContent = sessionData.showInputOutput ? "Hide Side Icons" : "Show Side Icons"


const curDate = new Date()
 
chosenMonth.textContent = sessionData.currentMonth || curDate.toLocaleDateString("en-ZA", {month:"long", year:"numeric"})

delim.textContent = sessionData?.delimiter || ","


getElem("#shift-values").placeholder = 
`For example
06AM - 16PM
12PM - 22PM
20PM - 06AM
LEAVE
SICK
FRL
...

`

getElem("#employee-name").placeholder = 
`Emplyee name 1\nEmployee name 2
  ...
`

splitterBox.addEventListener("click", updateDelimiter)

function updateDelimiter(event) {
   const splt = event.target
    
if (splt.tagName !== "SPAN") return
  delim.textContent = splt.textContent
  const tempDelim = splt.textContent == delims[0].textContent ?delims[1].textContent : delims[0].textContent
 
  cellValue.value = cellValue.value.replaceAll(tempDelim, splt.textContent)
  formulaResult.value = formulaResult.value.replaceAll(`${tempDelim}`, `${splt.textContent}`)
  sessionStorage.setItem("rosterSession", JSON.stringify({ ...sessionData, delimiter: splt.textContent }))

  if(formulaResult.value)
  copyFormula()
}
function updateRosterDays() {
  const dayCells = getElems(".day-cell")
  let date = new Date(chosenMonth.textContent)


 getElem("#balance-shifts span").innerHTML =  totalNumShiftsPerEmp.value ?? 20 

  let firstPos  = date.getDay() > 0 ? date.getDay()-1 : 6 
 
  dayCells.forEach(day => {
    day.style.color = ""
    day.style.background = ""
    if (day.outerHTML.includes("activeDate")) {

      day.classList.remove("activeDate")
      day.removeAttribute('id')

    }

  })
 
   const daysID = []
   while( date.getMonth() === new Date(chosenMonth.textContent).getMonth() ) {
     
     dayCells[firstPos].textContent = formatCellDate(date)
     dayCells[firstPos].style.color = '#fff'
     dayCells[firstPos].style.background = '#000'

     dayCells[firstPos].setAttribute("id", `day${date.getTime()}`)
     daysID.push(`day${date.getTime()}`)
     dayCells[firstPos].classList.add("activeDate")
  
     date.setDate(date.getDate()+1)
     firstPos++
    
  }

  const activeDays = getElems(".activeDate")
  
  const colDays = ["Mon", "Tue","Wed","Thu","Fri","Sat","Sun"]

  const startDayPos = colDays.findIndex( day => day == activeDays[0].textContent.match(/\w+/))
  const lastDayPos = colDays.findIndex( day => day ==  activeDays[activeDays.length-1].textContent.match(/\w+/))
  const cols = getElems(".week-roster tr:first-child th")

   rosterConfig.startCellChar = `${cols[startDayPos+2].textContent.trim()}`
   rosterConfig.startCellNum = startDayPos+1
   rosterConfig.lastCellChar = `${cols[ lastDayPos+2].textContent.trim()}`
   rosterConfig.lastCellNum = lastDayPos+1
   rosterConfig.totWeeksShown = getElems(".week-roster:has(tr th.activeDate)").length

 const weeks = getElems(".week-roster .week-number")
  for(let w = 1; w < weeks.length; w++) 
    weeks[w].textContent = 'Week ' +Number(w+1)

 
let count = 1
 let startDate = new Date(getElems(".day-cell")[rosterConfig.startCellNum].textContent)

//Press dates before day one of selected month
for( let d = rosterConfig.startCellNum-2; d >= 0 ; d--) {
  ++count
  const dateNum = startDate.getTime()
    const daySecs = (24 * 60 *60 * 1000) * count
    const lastDay = dateNum - daySecs
    const finalDay = new Date(lastDay)
   dayCells[d].textContent = formatCellDate(finalDay)
}

//{"startCellChar":"G","startCellNum":6,"lastCellChar":"B","lastCellNum":1,"totWeeksShown":6}
 let remainingCellDate = getElems(".week-roster")[rosterConfig.totWeeksShown-1].rows[1].cells[rosterConfig.lastCellNum+1].textContent
 remainingCellDate = new Date(remainingCellDate)

 let lastWkCount = rosterConfig.lastCellNum+1
 for(let wl = rosterConfig.lastCellNum+1; wl <= 7; wl++) {
  ++lastWkCount
  remainingCellDate.setDate(remainingCellDate.getDate()+1)
  getElems(".week-roster")[rosterConfig.totWeeksShown-1].rows[1].cells[lastWkCount].textContent = formatCellDate(remainingCellDate)

 }


 //Update public holidays
 updatePublicHoliday()
const dateCells = getElems(".week-roster tr:nth-child(2) th")
const chosenYear = chosenMonth.textContent.replace(/\D/g, "")
rosterConfig.ph.forEach(holiday => {
  if (!/^\d{2}-\d{2}$/.test(holiday.date)) {
    holiday.id = null;
    return;
  }

  const holidayDate =
    `${chosenYear}-${holiday.date}T00:00:00`;

  holiday.date = holidayDate;
  holiday.id = `day${new Date(holidayDate).getTime()}`;
});


let matchedDays = []

for(let d = 0 ; d < dateCells.length; d++ ) {
 if (dateCells[d].id) {
   const tempDate = dateCells[d].id
   matchedDays.push(tempDate)

 }

}


const publicPH = rosterConfig.ph.map(({id})=> id)
const matchedPh = []
for(let p = 0; p < daysID.length; p++) {
  
  if (publicPH.includes(daysID[p])) 
      matchedPh.push(daysID[p])

}

daysID.forEach( ( id, x) => {
  if (publicPH.includes(id) && id ) {
      
      const cleanId = Number( id.replace(/\D/g,"")  )
      const weekday = new Date(cleanId).toLocaleDateString("en-ZA", {weekday:"long"}).toLowerCase()
      let thDate =  getElem(`#${id}`)
       
      /*/Sun, 09 Aug 26 National women's day
      if (weekday === "sunday") {
        
       if (rosterConfig?.totWeeksShown <= 6) {

         let th = thDate.parentElement.parentElement.parentElement
         .nextElementSibling.rows[1].cells[2]
          
           th.title = rosterConfig?.ph?.find( hd => hd?.id === id ).name
        th.style.background = "rgb(225, 79, 225)"
        th.style.color = "#000"
      }
         
          
           
     
      } else {?*/
      
         thDate.title = rosterConfig?.ph?.find( hd => hd?.id === id ).name
        thDate.style.background = "rgb(225, 79, 225)"
        thDate.style.color = "#000"
     // }
       
      

  }

})
  

addTimeSheetRows()

} 

hours.addEventListener("input", updateHourLabel) 

function updateHourLabel() {

  if (hours.value > 12) {

    hours.value = 12
  
  }
if (
      hours.value.trim() === "" ||
      isNaN(hours.value) 

  ) {
    hours.value = 12
  }
    hourLabel.textContent = hours.value 
    
}
 


getElem("#validate").addEventListener('click', cleanShifts)

function cleanShifts() {
  let shiftData = shiftValue.value.trim()
 
  if (shiftData.replace(/\W/g).length == 0) {
    alert('Shifts are required.')
    return false
  }

  if(/[^\s-\w:]/.test(shiftData)) {
    alert('Only accepted special characters are dash (-),(:) and underscore (_). Please remove the unwanted characters')
    return false
  }

  shiftData = ( shiftData.match(/\w.*/gm) || [''] )
  .map(shift => shift.trim().toUpperCase().replace(/\s{2,}/g," "))

 for(let shift of shiftData) { 
    if (shift.length > 25) {
      alert(`The shift "${shift}" is "${shift.length}" long, reduce to 25 or less characters.`)
    
      return false
    }

  if (shift.toLowerCase() === "off") {

      alert(shift +" is not a shift, please remove it.")
      return
  }
    
 }

 const shifts = []

 for(let shift of shiftData) {
    if(!shifts.includes(shift)){
      shifts.push(shift)
    }else{

      alert(`Please correct or remove duplicate shift "${shift}"`)
      return false
    }
 }

let employeeNames = employeeValue.value

if (employeeNames.trim().length === 0) {
    alert('Employee names are required')
    employeeValue.focus()
    return false
} 


let empl =  employeeValue.value.trim().match(/^\w.*/mg) || []
if (empl.length === 0) {
  alert("Enter employee names")
  employeeValue.focus()
  return false
}


shiftValue.value = shiftData.join("\n")


const shiftList = shiftData.map((shift, index) => {
    return {
        shift,
        shiftNo: `shift${index + 1}`,
        shiftColor: getRandomColor(),
        fontColor: "#ffffff",
        isNonFixedShift: /\d/.test(shift),
        shiftRepeats: [],
        allowance:false
    };
});

rosterDB = {}
rosterDB.shifts = shiftList 
const workers = empl.map( name => {

  return  {employee: name.substring(0, 10)}
}) 

rosterDB.employees = workers
rosterDB.hours = hours.value 
rosterDB.weekOneStartRowNo = 2  
rosterDB.weekTwoStartRowNo = workers.length + 4
rosterDB.settingName = 'Setting' + Date.now()
rosterDB.settingID = Date.now()
database.isNewSetting = true

sessionData.currentSetting = rosterDB
sessionStorage.setItem("rosterSession", JSON.stringify(sessionData))

renderNecessaryItems()

runAfterPassedValidation()
rosterPeople()


}
function renderNecessaryItems() {

  
  if (rosterDB.shifts) {
    getElems("main>section:not(section:nth-child(2))").forEach(sec => sec.style.display = "block")
    getElems("#settings-option>ul>li")
    .forEach( (li, liId) => {

      if (liId > 6 ) return
      li.style.display = "block" 
    })
     getElems("#action-buttons button").forEach( btn =>btn.style.display = "inline-block")
    return
  } 

   getElems("main>section").forEach((sec, secId) => {
  
    if (secId == 1) return
    sec.style.display = "none"
  
  })
   getElems("#settings-option>ul>li")
    .forEach( (li, liId) => {

      if (liId > 6 ) return
      li.style.display = "none" 
    })

   

}


getElem("#save-data").addEventListener("click", saveSettings)
getElem("#save-settings").addEventListener("click", saveSettings)


function deleteSavedDB() {
  if(Object.keys(rosterDB).length == 0) {
    alert("There is nothing to delete.")
    return
  }
  const conf = confirm("All shift settings data will be deleted. Do you want to continue?")
  if (conf) 
    DB.delete()
}

document.body.addEventListener("keydown", autoAddEmptyRows);

function autoAddEmptyRows(event) {
  if (event.ctrlKey && event.key.toLowerCase() === "c") {
     addEmptyRowsAfterWeeks()

    getElem(".week-roster tr").style.display = "none"
    getElem("#total-hours-tb tr").style.display = "none"
    showFormulas()
    getElem("#yellow-table tr").style.display = "none"

    getElems(".week-roster tr>*:first-child")
    .forEach(td => td.style.display = "none")


    setTimeout(()=> {
         getElem(".week-roster tr").style.display = ""

    getElems(".week-roster tr>*:first-child")
    .forEach(td => td.style.display = "")
    getElem("#total-hours-tb tr").style.display = ""
    getElem("#yellow-table tr").style.display = ""
     getEmployeesTotalHrs()

    },0)
   
  }
}


function runAfterPassedValidation() {

  addWeekTables()
  
  updateRosterDays()
 
  highlight()

  addTotalHoursTable()

  addYellowTable()



  clearShiftsBlocks();

  updateShiftSettingTb()
  restoreShiftSettingData()
  updateShiftRepeatValues()
  restoreShiftSettingData()
  
  
  updateUnallowedShifts()


  getElem(".week-roster .row-number").addEventListener("change", updateWeekOneRowNo)
  getElem(".week-roster:nth-child(2) .row-number").addEventListener("change", updateWeekSecondRowNo)

  
  updateWeekOneRowNo()
 updateWeekSecondRowNo()
  renderNecessaryItems()
  
  rosterPeople()



 
    
}
renderNecessaryItems()
  
function updateWeekOneRowNo() {
    const Wk1RowNumOne = getElem(".week-roster .row-number") 
    const Wk1RowNums = getElems(".week-roster:first-child .row-number")

     const Wk2RowNumOne = getElem(".week-roster:nth-child(2) .row-number") 

     const startNum = Number(Wk1RowNumOne.value)
 
     Wk2RowNumOne.value = rosterDB?.weekTwoStartRowNo || Number(getElem(".week-roster tr:last-child .row-number").value)

  Wk1RowNums.forEach( (rowNum, i) => {

    if (i == 0 ) return
    rowNum.disabled = true
    

    rowNum.value = startNum + i


  } )

 // rosterDB.weekOneStartRowNo = rosterDB?.weekOneStartRowNo ?? Wk1RowNumOne.value 

  updateWeekSecondRowNo()


 rosterDB.weekOneStartRowNo = Wk1RowNumOne.value 
 rosterDB.weekTwoStartRowNo = Wk2RowNumOne.value
 sessionData.currentSetting = rosterDB
 sessionStorage.setItem("rosterSession", JSON.stringify(sessionData))



}
function updateWeekSecondRowNo() {

 
  const Wk2RowNumOne = getElem(".week-roster:nth-child(2) .row-number") 
  const Wk2RowNums = getElems(".week-roster:nth-child(2) .row-number")
  

  const startNum = Number( Wk2RowNumOne.value) 

  rosterDB.weekTwoStartRowNo = startNum 
  sessionData.currentSetting = rosterDB

  sessionStorage.setItem("rosterSession", JSON.stringify(sessionData))
  let lastRowNum = 0
  Wk2RowNums.forEach( (rowNum, i) => {

    const rowNo = startNum + i
    if (i == 0 ) return

    rowNum.value = rowNo
    rowNum.disabled = true

    if (i === Wk2RowNums.length-1) {
      lastRowNum = Number(getElem(".week-roster:nth-child(2) tr:last-child .row-number").value)
    }

  } )
  
  const wk3RowNos = getElems(".week-roster:nth-child(3) .row-number")
  
  wk3RowNos.forEach( (rowNum, i) => {

    const rowNo = i + lastRowNum + 3

    rowNum.value = rowNo
    rowNum.disabled = true


    if (i === wk3RowNos.length-1) {
      lastRowNum = Number(getElem(".week-roster:nth-child(3) tr:last-child .row-number").value)
    }

  } )


    const wk4RowNos = getElems(".week-roster:nth-child(4) .row-number")
  
  wk4RowNos.forEach( (rowNum, i) => {

    const rowNo = i + lastRowNum + 3

    rowNum.value = rowNo
    rowNum.disabled = true


    if (i === wk4RowNos.length-1) {
      lastRowNum = Number(getElem(".week-roster:nth-child(4) tr:last-child .row-number").value)
    }

  } )


const wk5RowNos = getElems(".week-roster:nth-child(5) .row-number")
  
  wk5RowNos.forEach( (rowNum, i) => {

    const rowNo = i + lastRowNum + 3

    rowNum.value = rowNo
    rowNum.disabled = true


    if (i === wk5RowNos.length-1) {
      lastRowNum = Number(getElem(".week-roster:nth-child(5) tr:last-child .row-number").value)
    }

  } )


  const wk6RowNos = getElems(".week-roster:nth-child(6) .row-number")
  
  wk6RowNos.forEach( (rowNum, i) => {

    const rowNo = i + lastRowNum + 3
    rowNum.value = rowNo
    rowNum.disabled = true



 
  } )
    
 

 
    

} 

getElem("#reset-shifts").addEventListener("click",clearShiftInput)

function clearShiftInput() {
  cellValue.value = ""
  shiftValue.value = ""
  clearShiftsBlocks();

}



function formatCellDate(date) {
  return date.toString().replace(/(?<=\d{4}).+/, "")
 .replace(/(\w+) (\w+) (\d+) (\d+)/, `$1, $3 $2 $4`)
 .replace(/\d{2}(?=\d{2})/, "")
}

getElem(".next-month").addEventListener("click", getNextMonth)
getElem("#next-month").addEventListener("click", getNextMonth)


function getNextMonth() {
  
  const newDate = new Date(chosenMonth.textContent)
  
  newDate.setMonth(newDate.getMonth()+1)
  chosenMonth.textContent = newDate.toLocaleDateString("en-ZA", {month:"long", year:"numeric"})
  resetShiftCount()
  clearShiftsBlocks();
  updateRosterDays()
  highlight()

  sessionData.currentMonth = chosenMonth.textContent
  sessionStorage.setItem("rosterSession", JSON.stringify(sessionData))

 
}

getElem(".press-month").addEventListener("click", getPresMonth)
getElem("#pre-month").addEventListener("click", getPresMonth)
function getPresMonth() {
   const newDate = new Date(chosenMonth.textContent)

  newDate.setMonth(newDate.getMonth()-1)
  chosenMonth.textContent = newDate.toLocaleDateString("en-ZA", {month:"long", year:"numeric"})
  resetShiftCount()
  clearShiftsBlocks();
updateRosterDays()
highlight()

sessionData.currentMonth = chosenMonth.textContent
sessionStorage.setItem("rosterSession", JSON.stringify(sessionData))

}

function verifyMonth() {
  if ( rosterConfig.isMonthCorrect == false) {
      const activeMonth =  getElem(".active-month").textContent
      const confirmMonth = confirm(`Is this for "${activeMonth}" roster?`)

      if (confirmMonth) {
           rosterConfig.isMonthCorrect = true
           return false
      } 
        
        return true
   
  }
}


 getElem("#close-timesheet").onclick =() =>{

  getElem("#timesheet").style.display = "none"
 }

 

function addWeekTables() {


 let week = `
 
<table class="week-roster">
      
        <tr>  
          <th>Row No</th>
          <th>A</th>
          <th>B</th>
          <th>C</th>
          <th>D</th>
          <th>E</th>
          <th>F</th>
          <th>G</th>
          <th>H</th>
          <th>I</th>
        </tr>
        <tr>
          <th></th>
          <th>Employees</th>
          <th class="day-cell">Mon</th>
          <th class="day-cell">Tue</th>
          <th class="day-cell">Wed</th>
          <th class="day-cell">Thu</th>
          <th class="day-cell">Fri</th>
          <th class="day-cell">Sat</th>
          <th class="day-cell">Sun</th>
          <th class="week-number">Week 1</th>
      </tr>
       
 `

 
const  emplpyeeRows= rosterDB.employees.map( obj => {
  
  return `
     <tr>
          <td>
            <input type="number" class="row-number" min="1" value="2" max="500">
          </td>
          <td class="shift-cell employee-name">${obj.employee}</td>
          <td class="shift-cell">OFF</td>
          <td class="shift-cell">OFF</td>
          <td class="shift-cell">OFF</td>
          <td class="shift-cell">OFF</td>
          <td class="shift-cell">OFF</td>
          <td class="shift-cell">OFF</td>
          <td class="shift-cell">OFF</td>
          <td>0</td>
        
      </tr>
`}).join("")

week += emplpyeeRows + "</table>"

getElem("#roster-tables").innerHTML= week.repeat(6)

getElems(".week-roster tr td:last-child").forEach( hoursTD => hoursTD.addEventListener("click", getStandardShiftFormula ) )
    



}

function addAllowanceTable() {

   if (!rosterDB.employees) {
    return 
   }

   const allowanceTb = getElem("#allowanceTb")

    if (allowanceTb) {

      allowanceTb.remove()
    }
   
  let table = `
  <table id="allowanceTb" onclick="getAllowanceTbFormula()">
     <tr>
       <th>Employee</th>
       <th>Allowance</th>
       <th>Total hours</th>
     </tr>
     
        `

    const empRows = rosterDB.employees.map(({employee})=>{

      return `
      <tr> 
        <td class="employee-name">${employee}</td>
        <td> 0 </td>
        <td> 0 </td>
      </tr>
      `
    }).join("")

    table+= empRows + "</table>"


    getElem("main>section:last-child").insertAdjacentHTML("beforeend", table)
   

    

}


function getAllowanceTbFormula(event) {

  const target = event.target

 if (target.cellIndex == 0 || target.tagName === "TH") return
 
 //later



}


hours.onchange =()=> rosterDB.hours = hours.value
 
function addYellowTable() {  

 if (!rosterDB?.shifts?.length && !rosterDB.employees) return;

  if ( getElem("#yellow-table") ) {
      
    getElem("#yellow-table").remove()
      
  }


  const yellowTB = document.createElement("table")
  yellowTB.id = "yellow-table"
  const shiftLen = rosterDB.shifts.length+5
  let yTb_th = `<tr><th colspan="${shiftLen}">Yellow Table</th></tr>
  <tr><th>Employee</th>`

  rosterDB.shifts.forEach(({shift, shiftNo}) =>{

    yTb_th += `<th class="${shiftNo}">${shift}</th>`

  } )

             
  yTb_th += "<th class='off'>OFF</th><th>Sat</th><th>Sun</th><th>No of Shifts</th></tr>" 
  
  const employees = rosterDB.employees.map(({employee})=>employee)
  for(let employee of employees ) {
    yTb_th += `
    
    <tr><td class="employee-name">${employee}</td>
    `+`<td>0</td>`.repeat(shiftLen-1)+'</tr>'


  }

  yellowTB.innerHTML = yTb_th

  getElem("#below-totalhours-tb").insertAdjacentHTML("afterend",yellowTB.outerHTML)
  getElem("#yellow-table").addEventListener('click', getYellowTableFormulas)
  

}



function addTotalHoursTable() {


  if (!rosterDB.employees) {

    return 
  }

  getElems("#total-hours-tb  tr:has(td)").forEach( tr => tr.remove() ) 

  const table = getElem("#total-hours-tb") 


const empRows = rosterDB.employees.map( ({employee})=>{

  return `
  <tr>
    <td class="employee-name">${employee}</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
  </tr>
  
  `
}).join("")


table.insertAdjacentHTML("beforeend", empRows)

table.addEventListener("click", getTothoursFormula)

}


hours.addEventListener('change', validateHours)
 
function validateHours(event) {
  const hour = event.target
 

    if (!/^(?:[1-9]|1[0-2])$/.test(hour.value)) {
          hour.value = 10;
    }
}
function getStandardShiftFormula(event) {
  const target = event.target
  const tdNum =  event.target.parentElement.querySelector(".row-number").value 
 
  let tableIndex = 0
 for(let i = 0; i < rosterConfig.totWeeksShown; i++) {
    const weekRoster = [...getElems(".week-roster")[i].rows].includes(target.parentElement) 
   
    if (weekRoster) {
      tableIndex = i
      break
    }
  
  }

  let cellPos = ``
  const tdCols = getElems(".week-roster:first-child tr:first-child th")
  if ( tableIndex == 0 ) {

    cellPos = `${tdCols[rosterConfig.startCellNum+1].textContent}${tdNum}:H${tdNum}`

  } else if (tableIndex >0 && tableIndex < rosterConfig.totWeeksShown-1 ) {
       cellPos = `B${tdNum}:H${tdNum}`

  } else {
    cellPos = `B${tdNum}:${tdCols[rosterConfig.lastCellNum+1].textContent}${tdNum}`

  }

  
 if ( verifyMonth() ) return 
  const shifts = rosterDB.shifts.map(({shift}) => shift)
  const cellNum = cellPos
  const hr = hours.value 

  shiftValue.value = shifts.join("\n")
  let formula = '';
   for(let shift of shifts)
      formula+=`+countif(${cellNum}${delim.textContent}"${shift}")`

formulaResult.value = `=(${formula.replace('+','')})*${hr}`
copyFormula()
}

 

function getTothoursFormula(event) {
   const target = event.target
  
   if (target.tagName !== "TD" || 
    target.cellIndex === 0 
   
  
  ) return 

   const cellPos = target.cellIndex
   const rowPos = target.parentElement.rowIndex

   if ( target.cellIndex !== 7) {
     const weekV = getElem(`.week-roster:nth-child(${cellPos}) tr:nth-child(${rowPos+1}) .row-number`).value

     formulaResult.value = `=I${weekV}` 
   } else {

      let sumForm = ""
      getElems(`.week-roster tr:nth-child(${rowPos+1}) .row-number`).
      forEach( cellNum => {
          sumForm += `+I${cellNum.value}`

      })

      formulaResult.value = sumForm.replace("+","=")

   }


    copyFormula()
}



function getYellowTableFormulas(event) {
  const target = event.target

    if (target.tagName !== "TD" || 
    target.cellIndex === 0 
   
  
  ) return 

   const tdCols = getElems(".week-roster:first-child tr:first-child th")
   const shiftValues = getElems("#yellow-table tr:nth-child(2) th")
   const cellPos = target.cellIndex
   const rowPos = target.parentElement.rowIndex
   const shift = shiftValues[cellPos].textContent.toLowerCase()
   
   copyStatus.textContent = rowPos

   let formula = ""

  
      
    const headerChar = getElems(`.week-roster tr:nth-child(${rowPos+1})`)
    const rows = getElems(`.week-roster tr:nth-child(${rowPos+1})`)


   rows.forEach( (row, rowID)=> {
     const weekNum = [...getElems(".week-roster")].findIndex( wk =>wk.contains(row))
     const cells = [...row.cells]
    
    const rowNum = row.cells[0].children[0].value
    
    const wk1CellChar = tdCols[rosterConfig.startCellNum + 1].textContent
    const lastWkCellChar = tdCols[rosterConfig.lastCellNum + 1].textContent
    let cellNum = ''

    const fixedShift = ["sat","sun"]
    
    const endTr = [...getElems(`.week-roster:nth-child(${rosterConfig.totWeeksShown}) tr`)].includes(row)


 
    if (!fixedShift.includes(shift)) {
         if (rowID === 0) {
            cellNum = `${wk1CellChar}${rowNum}:H${rowNum}`     

          } else if (rowID > 0 & rowID <rosterConfig.totWeeksShown- 1) {

            cellNum = `B${rowNum}:H${rowNum}`     
          
          }else if (rowID === rosterConfig.totWeeksShown - 1)  {
               cellNum = `B${rowNum}:${lastWkCellChar}${rowNum}` 
          
          }

          formula += `+COUNTIF(${cellNum}${delim.textContent}"${shift}")` 
    }

    if (shift === "sat") 
      formula += `+countifs(G${rowNum}${delim.textContent} "<>off"${delim.textContent} G${rowNum}${delim.textContent} "<>")` 

    if (shift === "sun") 
      formula += `+countifs(H${rowNum}${delim.textContent} "<>off"${delim.textContent} H${rowNum}${delim.textContent} "<>")` 

     if (shift === "no of shifts") {

         for(let shift of rosterDB.shifts.map(({shift})=> shift)) {

             formula += `+COUNTIF(${cellNum}${delim.textContent}"${shift}")`
            
         }
     }
      


    


   })
 
 

  formulaResult.value = formula.replace("+","=")
    .replace(/\+COUNTIF\(\,\".*\"\)/ig, "")
  copyFormula()

  
}



// I will rewrite the this function later

function showYellowTableFormula(cell) {
  const target = cell

    if (target.tagName !== "TD" || 
    target.cellIndex === 0 
   
  
  ) return 

   const tdCols = getElems(".week-roster:first-child tr:first-child th")
   const shiftValues = getElems("#yellow-table tr:nth-child(2) th")
   const cellPos = target.cellIndex
   const rowPos = target.parentElement.rowIndex
   const shift = shiftValues[cellPos].textContent.toLowerCase()
   
   copyStatus.textContent = rowPos

   let formula = ""

  
      
    const headerChar = getElems(`.week-roster tr:nth-child(${rowPos+1})`)
    const rows = getElems(`.week-roster tr:nth-child(${rowPos+1})`)


    if (shift === "no of shifts") {
 
      return
    }
   rows.forEach( (row, rowID)=> {
     const weekNum = [...getElems(".week-roster")].findIndex( wk =>wk.contains(row))
     const cells = [...row.cells]
    
    const rowNum = row.cells[0].children[0].value
    
    const wk1CellChar = tdCols[rosterConfig.startCellNum + 1].textContent
    const lastWkCellChar = tdCols[rosterConfig.lastCellNum + 1].textContent
    let cellNum = ''

    const fixedShift = ["sat","sun","no of shifts"]
    
    const endTr = [...getElems(`.week-roster:nth-child(${rosterConfig.totWeeksShown}) tr`)].includes(row)


 
    if (!fixedShift.includes(shift)) {
         if (rowID === 0) {
            cellNum = `${wk1CellChar}${rowNum}:H${rowNum}`     

          } else if (rowID > 0 & rowID <rosterConfig.totWeeksShown- 1) {

            cellNum = `B${rowNum}:H${rowNum}`     
          
          }else if (rowID === rosterConfig.totWeeksShown - 1)  {
               cellNum = `B${rowNum}:${lastWkCellChar}${rowNum}` 
          
          }

          formula += `+COUNTIF(${cellNum}${delim.textContent}"${shift}")` 
    }

    if (shift === "sat") 
      formula += `+countifs(G${rowNum}${delim.textContent} "<>off"${delim.textContent} G${rowNum}${delim.textContent} "<>")` 

    if (shift === "sun") 
      formula += `+countifs(H${rowNum}${delim.textContent} "<>off"${delim.textContent} H${rowNum}${delim.textContent} "<>")` 

     if (shift === "no of shifts") 
      formula += `Please add this manually for now, I sort out later |` 


    


   })
 
 

 cell.textContent = formula.replace("+","=")
    .replace(/\+COUNTIF\(\,\".*\"\)/ig, "")
 

  
}
 
let clearCopyInterval = null

async function copyFormula() {
   
  if (!formulaResult.value.trim()) {

    return
  }
    const formula = formulaResult.value.trim();

    if (!formula) {
        alert("There is no formula to copy.");
        return;
    }

    try {
        await navigator.clipboard.writeText(formula);
        formulaResult.select();
    } catch (error) {
       

   
        formulaResult.select();

        const copied = document.execCommand("copy");

        if (!copied) {
            alert("Unable to copy the formula.");
        }
    }


    copyStatus.textContent = "Copied successfully!"
    clearInterval(clearCopyInterval)
   clearCopyInterval = setTimeout(()=>copyStatus.textContent = '.', 1000)
}


getElem("#copy").onclick = copyFormula

function updatePublicHoliday() {
const ph = 
[
  {
    "name": "New Year's Day",
    "date": "01-01"
  },
  {
    "name": "Human Rights Day",
    "date": "03-21"
  },
  {
    "name": "Good Friday",
    "date": "Easter - 2 days"
  },
  {
    "name": "Family Day",
    "date": "Easter + 1 day"
  },
  {
    "name": "Freedom Day",
    "date": "04-27"
  },
  {
    "name": "Workers' Day",
    "date": "05-01"
  },
  {
    "name": "Youth Day",
    "date": "06-16"
  },
  {
    "name": "National Women's Day",
    "date": "08-09"
  },
  {
    "name": "Heritage Day",
    "date": "09-24"
  },
  {
    "name": "Day of Reconciliation",
    "date": "12-16"
  },
  {
    "name": "Christmas Day",
    "date": "12-25"
  },
  {
    "name": "Day of Goodwill",
    "date": "12-26"
  },
  {
    "name": "Day of Goodwill",
    "date": "08-26"
  }
]
rosterConfig.ph = ph
 //formulaResult.value = JSON.stringify(rosterConfig)


}

getElem("#non-std-shifts-tb").addEventListener("click", nonStdShift);
getElem("#non-std-shifts-tb .non-shift-hours").addEventListener('change',validateHours)

function nonStdShift(event) {
    const target = event.target;

    if (target.classList.contains("add-non-std-row")) {
         if (getElem("#non-std-shifts-tb").rows.length > 4) {
              alert("The limit is 5")
              return
      }

        const row = target.closest("tr");

        row.insertAdjacentHTML("afterend", row.outerHTML);
        getElems("#non-std-shifts-tb .non-shift-hours")
        .forEach(nonstdHr =>nonstdHr.addEventListener('change',validateHours))
    }

    if (target.classList.contains("remove-non-std-row")) {

      if (getElem("#non-std-shifts-tb").rows.length === 1) {
        getElem("#non-shift-chkbox").checked = false
        return
      }

        const row = target.closest("tr");
        row.remove();
    }

    
    
}
//highlight()
function highlight() {

//startCellChar,C,startCellNum,2,lastCellChar,D,lastCellNum,3
for(let u = 2; u < 10 ; u++ ) {
   for(let r = 2 ; r< getElems(`.week-roster:first-child tr`).length; r++)  {
    const table = getElem(`.week-roster`) 
    if ( getElem(`.week-roster`) )
     getElem(`.week-roster`).rows[r].cells[u].style.background = ""
   
     if ( getElem(`.week-roster:nth-child(5)`) )
     getElem(`.week-roster:nth-child(5)`).rows[r].cells[u].style.background = ""
   
     if ( getElem(`.week-roster:nth-child(6)`) )
     getElem(`.week-roster:nth-child(6)`).rows[r].cells[u].style.background = ""
   
   }

}

for(let u = 2; u <= rosterConfig.startCellNum ; u++ ) {
  const weekRows = getElems(`.week-roster:first-child tr`)
   for(let r = 2 ; r < weekRows.length; r++) {
      const table = getElem(`.week-roster`)
      if ( table )
      //  table.rows[r].cells[u].textContent = "-"
          table.rows[r].cells[u].style.background = "lightgrey"
   }  

}

for(let u = rosterConfig.lastCellNum+2; u < 9 ; u++ ) {
   for(let r = 2 ; r< getElems(`.week-roster:first-child tr`).length; r++) {

   //  getElem(`.week-roster:nth-child(${rosterConfig.totWeeksShown})`).rows[r].cells[u].textContent = "-"
     getElem(`.week-roster:nth-child(${rosterConfig.totWeeksShown})`).rows[r].cells[u].style.background = "lightgrey"

   } 


}

clearShiftsBlocks() //check later, this should work within this function
rosterConfig.isMonthCorrect = false
}


getElem("main").addEventListener("contextmenu",repositionSettings)
getElem("main").addEventListener("click",closeSettingsBox)

function repositionSettings(event) {
 
  const menu =  getElem("#settings-option") 
  const xW = event.pageX - 100
  const xH = event.pageY - 30
  menu.style.display = "block"
  menu.style.left = `${xW}px`;
  menu.style.top = `${xH}px`;


   getElem("#shift-settings").style.display = "none"

}
function closeSettingsBox(event) {

if (getElem("#settings-option").style.display === "none") return

  getElem("#settings-option").style.display = "none"


}


function rosterPeople() {


  
    if (!rosterDB?.shifts?.length || !rosterDB?.employees?.length) {
        alert("Please load employees and shifts first.");
        return;
    }

  
 clearShiftsBlocks()
    getElem("#allowanceTb")?.remove();

    const tables = [...getElems(".week-roster")];

    if (!tables.length) {
        return;
    }

    const nonFixedShifts = rosterDB.shifts.filter(
        shift => shift.isNonFixedShift === true
    )

    if (!nonFixedShifts.length) {
       
        return;
    }

   


    function shuffle(array) {

        const result = [...array];

        for (let i = result.length - 1; i > 0; i--) {

            const j = Math.floor(
                Math.random() * (i + 1)
            );

            [result[i], result[j]] =
                [result[j], result[i]];
        }

        return result;
    }


 
 

    function getAllowedShifts(employee, weekIndex, dayIndex) {

         

        if (!Array.isArray(employee.workdays)) {
            return nonFixedShifts;
        }

        const weekKey = `week${weekIndex}`;

        const weekObj = employee.workdays.find(
            obj => Array.isArray(obj?.[weekKey])
        );

        if (!weekObj) {
            return nonFixedShifts;
        }

        const allowedShiftNos =
            weekObj[weekKey]?.[dayIndex];

        if (!Array.isArray(allowedShiftNos)) {
            return nonFixedShifts;
        }

        return nonFixedShifts.filter(
            shift => allowedShiftNos.includes(shift.shiftNo)
        );
    }

 
    

    function getMaximum(shift, dayIndex, weekIndex) {

        const value = shift.shiftRepeats?.[dayIndex]?.[weekIndex];

        const maximum = Number(value);

        return Number.isFinite(maximum) && maximum > 0
            ? maximum : 0;
    }


 
 

    function getShiftFromCell(cell) {

        if (!cell) {
            return null
        }

        return rosterDB.shifts.find(
            shift => cell.classList.contains(shift.shiftNo)
        ) || null
    }


 

    function getPreviousShift(employeeIndex, weekIndex, dayIndex) {

        let previousTable
        let previousDayIndex


        if (dayIndex > 0) {

            previousTable = tables[weekIndex]
            previousDayIndex = dayIndex - 1

        }

  

        else if (weekIndex > 0) {

            previousTable = tables[weekIndex - 1]
            previousDayIndex = 6;

        }


        else {

            return null
        }


        const rowIndex = employeeIndex + 2

        const row = previousTable?.rows[rowIndex]

        if (!row) {
            return null
        }

        const cellIndex = previousDayIndex + 2

        const cell = row.cells[cellIndex]

        if (!cell) {
            return null
        }

        return getShiftFromCell(cell);
    }

 
    function isShiftOrderAllowed(previousShift, newShift) {

        if (!previousShift || !newShift) {
            return true;
        }

        const unallowed =
            rosterDB?.unAllowedShiftOrder || [];

        if (!Array.isArray(unallowed) || !unallowed.length) {
            return true;
        }

        const order =
            `${previousShift.shift} > ${newShift.shift}`;

        return !unallowed.includes(order);
    }


 
 

    function assignShift(cell, shift) {

        for (const { shiftNo } of rosterDB.shifts) {
            cell.classList.remove(shiftNo);
        }

        cell.classList.add(shift.shiftNo);

        cell.textContent = shift.shift;

        cell.style.background =
            shift.shiftColor || "";

        cell.style.color =
            shift.fontColor || "#000";
    }



    tables.forEach((table, weekIndex) => {

        
      

        for (let dayIndex = 0; dayIndex < 7; dayIndex++) {

    

            if (
                weekIndex === 0 &&
                dayIndex < Number(rosterConfig.startCellNum) - 1
            ) {
                continue;
            }


            if (
                weekIndex === rosterConfig.totWeeksShown - 1 &&
                dayIndex > Number(rosterConfig.lastCellNum) - 1
            ) {
                continue;
            }


            const cellIndex = dayIndex + 2
       

            const randomEmployees = shuffle(rosterDB.employees)
       

            const remaining = new Map();

            for (const shift of nonFixedShifts) {

                remaining.set(
                    shift.shiftNo,
                    getMaximum(
                        shift,
                        dayIndex,
                        weekIndex
                    )
                )
            }


            for (const employee of randomEmployees) {

                const employeeIndex =
                    rosterDB.employees.indexOf(employee);

                if (employeeIndex === -1) {
                    continue
                }


                const rowIndex =
                    employeeIndex + 2;

                const row =
                    table.rows[rowIndex]

                if (!row) {
                    continue
                }


                const cell =
                    row.cells[cellIndex];

                if (!cell) {
                    continue
                }



                const hasFixedShift =
                    rosterDB.shifts.some(shift =>
                        shift.isNonFixedShift !== true &&
                        cell.classList.contains(shift.shiftNo)
                    );

                if (hasFixedShift) {
                    continue
                }


       

                if (cell.textContent.trim() !== "OFF") {
                    continue
                }


                const allowed =
                    getAllowedShifts(
                        employee,
                        weekIndex,
                        dayIndex
                    )

                const previousShift =
                    getPreviousShift(
                        employeeIndex,
                        weekIndex,
                        dayIndex
                    )


         
          
             
                let available =
                    allowed.filter(shift =>
                        (remaining.get(shift.shiftNo) ?? 0) > 0
                    )



                available =
                    available.filter(newShift =>
                        isShiftOrderAllowed(
                            previousShift,
                            newShift
                        )
                    )


                if (!available.length) {
                    continue;
                }


           
            
          

                const selectedShift =
                    available[
                        Math.floor(
                            Math.random() *
                            available.length
                        )
                    ]

 
         
           

                assignShift(
                    cell,
                    selectedShift
                )

 
           
            

                remaining.set(
                    selectedShift.shiftNo,
                    remaining.get(selectedShift.shiftNo) - 1
                )

            }

        }

    })


   getEmployeesTotalHrs()
}


function rosterPeopleForTotalDays() {
    if (!rosterDB?.shifts?.length || !rosterDB?.employees?.length) {
        alert("Please load employees and shifts first.");
        return;
    }

    const maxShiftsPerEmployee = Number(totalNumShiftsPerEmp.value);

    if (
        totalNumShiftsPerEmp.value.trim() === "" ||
        !Number.isInteger(maxShiftsPerEmployee) ||
        maxShiftsPerEmployee < 0
    ) {
        alert("Please enter a valid maximum number of shifts per employee.");
        return;
    }

    clearShiftsBlocks();
    getElem("#allowanceTb")?.remove();

    const tables = [...getElems(".week-roster")];

    if (!tables.length) return;

    const nonFixedShifts = rosterDB.shifts.filter(
        shift => shift.isNonFixedShift === true
    );

    if (!nonFixedShifts.length) return;


    const employeeShiftCounts = new Map(
        rosterDB.employees.map((employee, index) => [index, 0])
    );

    function shuffle(array) {
        const result = [...array];

        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }

        return result;
    }

    function getAllowedShifts(employee, weekIndex, dayIndex) {
        if (!Array.isArray(employee.workdays)) {
            return nonFixedShifts;
        }

        const weekKey = `week${weekIndex}`;

        const weekObj = employee.workdays.find(
            obj => Array.isArray(obj?.[weekKey])
        );

        if (!weekObj) return nonFixedShifts;

        const allowedShiftNos = weekObj[weekKey]?.[dayIndex];

        if (!Array.isArray(allowedShiftNos)) {
            return nonFixedShifts;
        }

        return nonFixedShifts.filter(
            shift => allowedShiftNos.includes(shift.shiftNo)
        );
    }

    function getMaximum(shift, dayIndex, weekIndex) {
        const value = shift.shiftRepeats?.[dayIndex]?.[weekIndex];
        const maximum = Number(value);

        return Number.isFinite(maximum) && maximum > 0
            ? maximum
            : 0;
    }

    function getShiftFromCell(cell) {
        if (!cell) return null;

        return rosterDB.shifts.find(
            shift => cell.classList.contains(shift.shiftNo)
        ) || null;
    }

    function getPreviousShift(employeeIndex, weekIndex, dayIndex) {
        let previousTable;
        let previousDayIndex;

        if (dayIndex > 0) {
            previousTable = tables[weekIndex];
            previousDayIndex = dayIndex - 1;
        } else if (weekIndex > 0) {
            previousTable = tables[weekIndex - 1];
            previousDayIndex = 6;
        } else {
            return null;
        }

        const rowIndex = employeeIndex + 2;
        const row = previousTable?.rows[rowIndex];

        if (!row) return null;

        const cellIndex = previousDayIndex + 2;
        const cell = row.cells[cellIndex];

        if (!cell) return null;

        return getShiftFromCell(cell);
    }

    function isShiftOrderAllowed(previousShift, newShift) {
        if (!previousShift || !newShift) return true;

        const unallowed = rosterDB?.unAllowedShiftOrder || [];

        if (!Array.isArray(unallowed) || !unallowed.length) {
            return true;
        }

        const order = `${previousShift.shift} > ${newShift.shift}`;

        return !unallowed.includes(order);
    }

    function assignShift(cell, shift) {
        for (const { shiftNo } of rosterDB.shifts) {
            cell.classList.remove(shiftNo);
        }

        cell.classList.add(shift.shiftNo);
        cell.textContent = shift.shift;
        cell.style.background = shift.shiftColor || "";
        cell.style.color = shift.fontColor || "#000";
    }

    tables.forEach((table, weekIndex) => {
        for (let dayIndex = 0; dayIndex < 7; dayIndex++) {

            if (
                weekIndex === 0 &&
                dayIndex < Number(rosterConfig.startCellNum) - 1
            ) {
                continue;
            }

            if (
                weekIndex === rosterConfig.totWeeksShown - 1 &&
                dayIndex > Number(rosterConfig.lastCellNum) - 1
            ) {
                continue;
            }

            const cellIndex = dayIndex + 2;
            const randomEmployees = shuffle(rosterDB.employees);
            const remaining = new Map();

            for (const shift of nonFixedShifts) {
                remaining.set(
                    shift.shiftNo,
                    getMaximum(shift, dayIndex, weekIndex)
                );
            }

            for (const employee of randomEmployees) {
                const employeeIndex = rosterDB.employees.indexOf(employee);

                if (employeeIndex === -1) continue;

        
                if (
                    employeeShiftCounts.get(employeeIndex) >=
                    maxShiftsPerEmployee
                ) {
                    continue;
                }

                const rowIndex = employeeIndex + 2;
                const row = table.rows[rowIndex];

                if (!row) continue;

                const cell = row.cells[cellIndex];

                if (!cell) continue;

                const hasFixedShift = rosterDB.shifts.some(shift =>
                    shift.isNonFixedShift !== true &&
                    cell.classList.contains(shift.shiftNo)
                );

                if (hasFixedShift) continue;

                if (cell.textContent.trim() !== "OFF") continue;

                const allowed = getAllowedShifts(
                    employee,
                    weekIndex,
                    dayIndex
                );

                const previousShift = getPreviousShift(
                    employeeIndex,
                    weekIndex,
                    dayIndex
                );

                let available = allowed.filter(
                    shift => (remaining.get(shift.shiftNo) ?? 0) > 0
                );

                available = available.filter(newShift =>
                    isShiftOrderAllowed(previousShift, newShift)
                );

                if (!available.length) continue;

                const selectedShift = available[
                    Math.floor(Math.random() * available.length)
                ];

        
                if (
                    employeeShiftCounts.get(employeeIndex) >=
                    maxShiftsPerEmployee
                ) {
                    continue;
                }

                assignShift(cell, selectedShift);

                employeeShiftCounts.set(
                    employeeIndex,
                    employeeShiftCounts.get(employeeIndex) + 1
                );

                remaining.set(
                    selectedShift.shiftNo,
                    remaining.get(selectedShift.shiftNo) - 1
                );
            }
        }
    });

    getEmployeesTotalHrs();
}


getElem("#other").addEventListener("click", clearShiftsBlocks)


function clearShiftsBlocks() {
    if (!rosterDB?.shifts?.length) return;

    const tables = [...getElems(".week-roster")]
    if (!tables.length) return

    const shiftNos = rosterDB.shifts.map(shift => shift.shiftNo)

    const startDay = Math.max( 0, Number(rosterConfig.startCellNum || 1) - 1 )

    const lastDay = Math.min(6, Number(rosterConfig.lastCellNum || 7) - 1 )

    tables.forEach((table, weekIndex) => {
        for (let rowIndex = 2; rowIndex < table.rows.length; rowIndex++) {
            const row = table.rows[rowIndex]

            for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
                if (weekIndex === 0 && dayIndex < startDay) continue

                if ( weekIndex === tables.length - 1 && dayIndex > lastDay
                ) continue

                const cell = row.cells[dayIndex + 2]
                if (!cell) continue

             
                const hasShift = shiftNos.some(shiftNo =>
                    cell.classList.contains(shiftNo)
                )

                if (!hasShift) continue

             
                shiftNos.forEach(shiftNo => {
                    cell.classList.remove(shiftNo)
                })

                cell.textContent = "OFF"
                cell.style.background = "rgb(65, 221, 125)"
                cell.style.color = "#000"
                cell.style.cursor = ""
            }
        }
    })
}

 
 
function updateShiftSettingTb() {
  const shiftSettTb = getElem("#shift-settings-tb");

  if (!shiftSettTb || !rosterDB?.shifts?.length) {
    return;
  }

  getElems("#shift-settings-tb .dynamic-shift-row")
    .forEach(row => row.remove());

  rosterDB.shifts.forEach(shift => {
    const {
      shift: shiftName,
      shiftNo,
      allowance = false,
      shiftColor = "#000000",
      fontColor = "#ffffff",
      isNonFixedShift = true
    } = shift;

    const className = shiftNo;

    const createWeekInputs = day => {
      return Array.from({ length: 6 }, (_, index) => `
        <div class="${className}">
          W ${index + 1}
          <input type="number" value="2" min="0" class="max-${day}">
        </div>
      `).join("")
    };

    const shiftRow = `
      <tr class="dynamic-shift-row">
        <td class="${className}">${shiftName}</td>
        <td><input type="checkbox" class="allowance" ${allowance ? "checked" : ""}></td>
        <td>
            <input type="color" class="shift-color" value="${shiftColor}">
             <input  type="color" class="font-color" value="${fontColor}">
        </td>
        <td>
          <input type="checkbox" class="non-fixed-shift" ${isNonFixedShift ? "checked" : ""} >
        </td>
        <td>${createWeekInputs("mon")}</td>
        <td>${createWeekInputs("tue")}</td>
        <td>${createWeekInputs("wed")}</td>
        <td>${createWeekInputs("thu")}</td>
        <td>${createWeekInputs("fri")}</td>
        <td>${createWeekInputs("sat")}</td>
        <td>${createWeekInputs("sun")}</td>
      </tr>
    `

    shiftSettTb.insertAdjacentHTML("beforeend", shiftRow);
  })

  getShiftsToColor();
  restoreShiftSettingData();
}


getElem("#close-shift-setting").addEventListener("click", closeShiftSettings) 


function closeShiftSettings() {
  // getElem("#members-box").style.display = "none"
   getElem("#shift-settings").style.display = "none"
 
}

getElem("#settings-option").addEventListener("click", getSettingOpenAction )

function getSettingOpenAction(event) {

    const target = event.target

    if( target.tagName !== "LI") return

    const roster = getElem("main > section:first-child")
     getElem("#settings-option").style.display = "none"
   


    switch(target.textContent) {
      case "Shift Settings":
          if(!rosterDB?.shifts) {
            alert("No shift data detected")
            return
          }
          
          getElem("#shift-settings").style.display = "block"
     
          break
      case "Notes":
        alert("No added yet")
        break;
      case "Birthdays":
        alert("Not added yet")
      break
      case "Save Settings":
        saveSettings()
        break
      case "View Setting templates":
          openSettingsTemplates()
          
        break
      case "View Templates":
           alert("Not added yet")
        break;
        case "Get Timesheet":
          getElem("#timesheet").style.display = "block"
        break;
      
        case "Export Settings":
        exportSettings()
        break
      case "Import Settings":
        showUploaderBox()
      break;
      case "Hide Input/Output":
          inputBox.style.display = "none"
       
            getElem("#utility-icon").style.display = "block"
          target.textContent = "Show Input/Output"
          sessionData.showInputOutput = false
          sessionStorage.setItem("rosterSession", JSON.stringify(sessionData))
        break
      case "Show Input/Output":
          getElem("#utility-icon").style.display = "none"
          inputBox.style.display = "block"
          target.textContent = "Hide Input/Output"
          sessionData.showInputOutput = true
          sessionStorage.setItem("rosterSession", JSON.stringify(sessionData))
        break
      case "Delete Settings":
      deleteSavedDB()
        break
      case "Disable Overflow":
         roster.classList.remove("rosterTables")
         target.textContent = "Enable Overflow"
        break
        case "Enable Overflow":
         roster.classList.add("rosterTables")
         target.textContent = "Disable Overflow"
        break
      case "Show Side Icons":
          
          getElem("#utility-icon").style.display = "block"
          target.textContent = "Hide Side Icons"
        break;
      case "Hide Side Icons":
          getElem("#utility-icon").style.display = "none"
          target.textContent = "Show Side Icons"
        break;
      case "Copy Text":
        copy() 
        break
       case "Paste Text":
         pasteFromClipboard() 
        break
      case "Print":
        
        roster.classList.remove("rosterTables")
        getElem("#utility-icon").style.display = "none"
        window.print()
        roster.classList.add("rosterTables")
        getElem("#utility-icon").style.display = "block"

      break
      case "Support":
        const contact = `
        Contact me on the following:

          Contact name: Chippa Mathebula
          Contact number: 060 587 6813 ( WhatsApp only )
          Email : chippa.itsolutions@gmail.com

          Please do expect delays and be specific when you contact.
          
        `
       alert(contact)
       break
      case "Hide table labels":
        target.textContent = "Show table labels"
        getElems(".week-roster tr:first-child")
        .forEach( row1 => row1.style.height = "0")
        getElems(".week-roster tr td:first-child")
        .forEach( row1 =>{
          row1.style.overflow = "hidden"
          row1.style.width = "0px"
        } 
      )

       break
      case "Show table labels":
        target.textContent = "Hide table labels"
        getElems(".week-roster tr:first-child")
        .forEach( row1 => row1.style.height = "")
        getElems(".week-roster tr td:first-child")
        .forEach( row1 => row1.style.width = "")
       break
      case "Troubleshoot":
       
        alert("1. Right click\n 2. Export your settings\n3. Delete your settings. Import your settings")
        break;

       case "Manually Add Shifts":


          getElems("#yellow-table tr  th")
            .forEach(cell => { cell.addEventListener("click", getShift) })
            addShiftsManual()
            
            
            rosterConfig.stopAddShiftAddition = false 
            target.textContent = "Stop Shifts Additions"
            getElem("#yellow-table th:nth-child(2)").click()
        break;

        case "Save Draft CheckPoint":
            storeShiftTemplates()
        break
        
    
        case "View Roster Drafts":

            if(!rosterDB.shiftTemplates) {
              alert("There are no saved draft.")
              return
            }
            const shiftDraftTemp = getElem("#shift_template")
            for(let s = 0; s <rosterDB.shiftTemplates.length; s++) {
                const optionName = rosterDB.shiftTemplates[s].templateName
                const newItem = new Option( optionName, optionName)

                shiftDraftTemp.options[s] = newItem

            }
            getElem("#shift-values-box").style.display = "block"
        break;
     
        case "Stop Shifts Additions":
           getElems("#yellow-table th")
           .forEach(th => th.classList.remove("selectedYellowHeader"))
          getElems("#yellow-table tr  th")
            .forEach((cell) => {
          
              cell.removeEventListener("click", getShift)
            
            })
            target.textContent = "Manually Add Shifts"
              rosterConfig.stopAddShiftAddition = true 

              addShiftsManual()
        break;


      case "Version":
        alert("                                               Version 3.3.0")
        break
         case "Shift Repeats":
            alert("Not added yet")
      

    }
  
   
}

 
getShiftsToColor()
function getShiftsToColor() {
   const shiftColors = getElems(".shift-color") 

   getElem("#members-box").style.display = "none" 
   shiftColors.forEach( (colorInpt, c) => {

    colorInpt.addEventListener('input', applyShiftColor)
    colorInpt.nextElementSibling.addEventListener('input', applyShiftFontColor)
    colorInpt.parentElement.nextElementSibling.children[0].addEventListener('change', updateShiftTypeChkbox)


   })

 
}

function applyShiftColor(event) {
   const targetElem = event.target
  
   const row = targetElem.closest("tr");
const className = row?.cells[0]?.classList[0]

if (!className) return
const shiftIndex = rosterDB.shifts.findIndex(({ shiftNo }) => shiftNo === className)

 const color = targetElem.value 
 
   getElems(`.${className}:not(:has(input))`).forEach(shift => shift.style.background = color )

 if (shiftIndex === -1) return  
     rosterDB.shifts[shiftIndex].shiftColor = color

}
function applyShiftFontColor(event) {
    getElem("#members-box").style.display = "none"
   const targetElem = event.target
   const className = targetElem.parentElement
   .previousElementSibling.previousElementSibling.classList
   const shiftIndex = rosterDB.shifts.findIndex( ({shiftNo})=> shiftNo == className)
   const color = targetElem.value 


   
   getElems(`.${className}:not(:has(input))`).forEach(shift => shift.style.color = color )
    if (shiftIndex == -1) return  
   rosterDB.shifts[shiftIndex].fontColor = color 


}
function updateShiftTypeChkbox(event) {

  getElem("#members-box").style.display = "none" 
  const checkbox = event.target
  const checkStatus = checkbox.checked
  const shiftName = checkbox.parentElement.parentElement.children[0].textContent

 const shiftIndex = rosterDB.shifts.findIndex( ({shift})=>shift == shiftName)
 if (shiftIndex === -1) return

 rosterDB.shifts[shiftIndex].isNonFixedShift = checkStatus

}
getElem(`#shift-settings`).addEventListener('change', updateShiftRepeatValues)

function updateShiftRepeatValues() {
  if (!rosterDB?.shifts?.length) return;

  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  for (const shift of rosterDB.shifts) {
    const shiftCell = getElem(
      `#shift-settings-tb .dynamic-shift-row td.${shift.shiftNo}`
    );

    if (!shiftCell) {
      console.warn(`Missing settings row for ${shift.shiftNo}`);
      continue;
    }

    const row = shiftCell.closest("tr");

    const allowanceInput = row.querySelector(".allowance");
    const shiftColorInput = row.querySelector(".shift-color");
    const fontColorInput = row.querySelector(".font-color");
    const nonFixedInput = row.querySelector(".non-fixed-shift");

    shift.allowance = allowanceInput?.checked ?? false;
    shift.shiftColor = shiftColorInput?.value ?? "#000000";
    shift.fontColor = fontColorInput?.value ?? "#ffffff";
    shift.isNonFixedShift = nonFixedInput?.checked ?? true;

    shift.shiftRepeats = days.map(day => {
      return [...row.querySelectorAll(`.max-${day}`)].map(input => {
        return Math.max(0, Number(input.value) || 0);
      });
    });
  }

  getEmployeesTotalHrs();
}

function updateShiftSettingTb() {
  const shiftSettTb = getElem("#shift-settings-tb");

  if (!shiftSettTb || !rosterDB?.shifts?.length) {
    return;
  }

  getElems("#shift-settings-tb .dynamic-shift-row")
    .forEach(row => row.remove());

  rosterDB.shifts.forEach(shift => {
    const {
      shift: shiftName,
      shiftNo,
      allowance = false,
      shiftColor = "#000000",
      fontColor = "#ffffff",
      isNonFixedShift = true
    } = shift;

    const className = shiftNo;

    const createWeekInputs = day => {
      return Array.from({ length: 6 }, (_, index) => `
        <div class="${className}">
          W ${index + 1} <input type="number" value="1" min="0" class="max-${day}">
        </div>
      `).join("");
    };

    const shiftRow = `
      <tr class="dynamic-shift-row">
        <td class="${className}">${shiftName}</td>
        <td>
          <input type="checkbox" class="allowance" ${allowance ? "checked" : ""}>
        </td>
        <td> 
          <input type="color" class="shift-color" value="${shiftColor}">
          <input type="color" class="font-color" value="${fontColor}">
        </td>
        <td>
          <input type="checkbox" class="non-fixed-shift" ${isNonFixedShift ? "checked" : ""}>
        </td>

        <td>${createWeekInputs("mon")}</td>
        <td>${createWeekInputs("tue")}</td>
        <td>${createWeekInputs("wed")}</td>
        <td>${createWeekInputs("thu")}</td>
        <td>${createWeekInputs("fri")}</td>
        <td>${createWeekInputs("sat")}</td>
        <td>${createWeekInputs("sun")}</td>
      </tr>
    `;

    shiftSettTb.insertAdjacentHTML("beforeend", shiftRow);
  });

  getShiftsToColor();
  restoreShiftSettingData();
} 

function saveSettings() {
  if (!rosterDB) {
    alert("There is nothing to save.")
    return
  }

 const settID = database?.settings.findIndex(setting => setting.settingID === rosterDB.settingID) 

  if ( settID === -1 ) {


    database.settings.push(rosterDB);
    database.index = database.settings.length - 1
     localStorage.setItem("rosterDB", JSON.stringify(database))
    alert(`Settings saved for "${rosterDB.settingName}"`)
    
  } else {

    database.settings[settID] = rosterDB;
    database.index = settID
    
    localStorage.setItem("rosterDB", JSON.stringify(database))

    rosterDB = database.settings[settID]
   alert(`Settings updated for "${rosterDB.settingName}"`)
  }
  


 database.isNewSetting = false 
 sessionData.currentSetting = rosterDB
 sessionStorage.setItem("rosterSession", JSON.stringify(sessionData))

  restoreShiftSettingData()

 

}




 getElem("#delete-shift-settings").onclick = deleteSavedDB  

 function restoreShiftSettingData() {

    if (!rosterDB?.shifts) return

    const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]

    shiftValue.value = Array.isArray(rosterDB.shifts)
    ? rosterDB.shifts.map(({ shift }) => shift).join("\n"): "";

     hours.value = Number(rosterDB.hours) || 9;
     hourLabel.textContent =  hours.value 
     employeeValue.value = Array.isArray(rosterDB.employees)
     ? rosterDB.employees.map(({ employee }) => employee).join("\n"): "";

    for (const shift of rosterDB.shifts) {

        const {shiftNo, allowance, shiftColor, fontColor, isNonFixedShift, shiftRepeats } = shift

        const shiftCell = getElem(`#shift-settings .${shiftNo}`)

        if (!shiftCell) {
          console.warn(`Shift settings row not found for ${shiftNo}`)
          continue
        }

       const shiftAllowance = shiftCell.nextElementSibling.children[0]
       const colorCell = shiftCell.nextElementSibling.nextElementSibling
       const nonShiftFixed = colorCell.nextElementSibling.children[0]

       if(!shiftAllowance) continue
         shiftAllowance.checked = allowance

        if (!colorCell) continue;

        colorCell.children[0].value = shiftColor || getRandomColor()
        colorCell.children[1].value = fontColor  || "#ffffff"

        
        if ( nonShiftFixed )
            nonShiftFixed.checked = isNonFixedShift;
        
        getElems(`.${shiftNo}:not(:has(input))`).forEach(shiftElement => {

            shiftElement.style.background = shiftColor
            shiftElement.style.color = fontColor

        });

        days.forEach((day, d) => {

            getElems(`.${shiftNo} .max-${day}`).forEach((input, i) => {

                input.value = shiftRepeats?.[d]?.[i] ?? 3

            })

        })
    }
}
    
function exportSettings() {
 
  if ( !rosterDB.shifts) return

    const curToday = new Date()
    const filename = "RosterChipparaserSettings-" + curToday.toLocaleString('en-ZA',{})
         .replace(/:/g,'.')
         .replace(/\//g,'-')
         .replace(', ','_')


     const expFile = new File([JSON.stringify(rosterDB)],`${filename}.json`,{ type: "application/json" })

     const link = document.createElement('a')
     const objectURL = URL.createObjectURL(expFile)

       link.href = objectURL
       link.download = expFile.name
       
       document.body.append(link)
       link.click()
       link.remove()
       
       URL.revokeObjectURL(objectURL)

  
}

 


function importDB() {
   
  const file = getElem("#new-file").files[0]
  
  if(!file) {
    alert("There is nothing to import")
    return
  }
  const reader = new FileReader()
  

  reader.readAsText(file)
  reader.onload = async () =>{
      const newRosterDB = await reader.result
      const db = JSON.parse(newRosterDB)
      rosterDB = db
      if (!rosterDB.settingName) 
        rosterDB.settingName = "Setting" + Date.now()

      if (!rosterDB.settingID) 
        rosterDB.settingID = Date.now()
   
         saveSettings()
         location.reload()
    
  }
  
  reader.onerror=()=>{
    alert("Something went wrong, try again.")
  }

  
  
}
 
function showUploaderBox() {
 getElem("#file-uploader").style.display = "block"
}

getElem("#shift-values-box").addEventListener("click", shiftTemplatesValues)
function shiftTemplatesValues(event) {
    const target = event.target

    const selectMonths = getElem("#template-month")
    const shiftTemplate = getElem("#shift_template")
    const shiftTemplateInp = getElem("#shift_template_name")

  switch(target.textContent) {
    case "Delete All":
     selectMonths.options.length = 0
     shiftTemplate.options.length = 0
    break;
    case "Clear" :
       shiftTemplate.options.length = 0
    break
    default:
      if(
        target.tagName === "BUTTON" ||
        target.tagName === "P" ||
        target.tagName === "H3" ||
        target.tagName === "SPAN"
        
        
      ) return
    
      const id = shiftTemplate.options.selectedIndex || 0
    
      restoreShiftTemplates(id)

    shiftTemplateInp.value = target.textContent    



  }

}



function storeShiftTemplates() {
    const tables = getElems(".week-roster");

    const templates = [];

    tables.forEach(tb => {
        [...tb.rows].forEach((row, rowID) => {
            if (rowID < 2) return;

            [...row.cells].forEach((cell, cellID) => {
                if (cellID < 2 || cellID === 9) return;

                templates.push(cell.textContent.trim());
            });
        });
    });

        
        const now = Date.now();
        const shiftTemplate = {
            month: chosenMonth.textContent,
            templateId: now,
            templateName: `Draft_${chosenMonth.textContent}_${now}`,
            template: templates
        }

        sessionData.draftId = shiftTemplate.templateId
        sessionStorage.setItem("rosterSession", JSON.stringify(sessionData))
      // alert(JSON.stringify(rosterDB.shiftTemplates))
   

      if (!rosterDB.shiftTemplates) {
           rosterDB.shiftTemplates = []
           
      } 
       rosterDB.shiftTemplates.push(shiftTemplate)
       rosterDB.shiftTemplates.sort((a, b)=>b.templateId - a.templateId)
       
       saveSettings()
    
}


function restoreShiftTemplates(pos) {
    const shiftTemplates = rosterDB.shiftTemplates;

    if (!Array.isArray(shiftTemplates) ||
        !shiftTemplates[pos]) {
        alert("Template not found.");
        return;
    }

    const selectedTemplate = shiftTemplates[pos];

    if (
        chosenMonth.textContent.trim() !== selectedTemplate.month
    ) {
        alert(`This roster draft belongs to ${selectedTemplate.month} month.`);
        return;
    }


    clearShiftsBlocks();

    let c = 0;

    const tables = getElems(".week-roster");

    tables.forEach(tb => {
        [...tb.rows].forEach((row, rowID) => {
            if (rowID < 2) return;

            [...row.cells].forEach((cell, cellID) => {
                if (cellID < 2 || cellID === 9) return;

                const shiftValue = selectedTemplate.template[c];

            
                if (shiftValue === undefined) {
                    c++
                    return
                }

        
                rosterDB.shifts.forEach(shift => {
                    cell.classList.remove(String(shift.shiftNo));
                });

           
                const shiftDefinition = rosterDB.shifts.find(
                    shift =>
                        String(shift.shift).trim().toLowerCase() ===
                        String(shiftValue).trim().toLowerCase()
                );

                if (shiftDefinition) {
                    cell.classList.add(String(shiftDefinition.shiftNo));
                }

                cell.textContent = shiftValue;
                c++
            })
        })
    })

    restoreShiftSettingData()
    getEmployeesTotalHrs()
}


function showFormulas() {

  

   const tdCols = getElems(".week-roster:first-child tr:first-child th")
   getElems(".week-roster .row-number").forEach( (rowNo, rowID)=>{
       const tdNum =  rowNo.value
       const target = rowNo.parentElement.parentElement.children[9]
      let tableIndex = null       
        getElems(".week-roster").forEach( (table, tbIndex) => {

          if ([...table.rows].includes(rowNo.parentElement.parentElement)) {
            tableIndex = tbIndex
          }
        })


  let cellPos = ``
 
  if ( tableIndex == 0 ) {

    cellPos = `${rosterConfig.startCellChar}${tdNum}:H${tdNum}`

  } else if (tableIndex >0 && tableIndex < rosterConfig.totWeeksShown-1 ) {
       cellPos = `B${tdNum}:H${tdNum}`

  } else {
    cellPos = `B${tdNum}:${rosterConfig.lastCellChar}${tdNum}`

  }

  const shifts = rosterDB.shifts.map(({shift}) => shift)
  const cellNum = cellPos
  const hr = hours.value 

  shiftValue.value = shifts.join("\n")
  let formula = '';
   for(let shift of shifts)
      formula+=`+countif(${cellNum}${delim.textContent}"${shift}")`

   target.textContent = `=(${formula.replace('+','')})*${hr}`


  })

  //////////////////////////
 
  getElems(".week-roster").forEach((table, tableIndex) => {

    const rows = [...table.rows]

    rows.forEach( (row, rowPos) => {
       if (rowPos < 2) return
        const cellFormula = row.cells[0].children[0].value

        const totWkHr = getElems(`#total-hours-tb tr`)
        totWkHr[rowPos].cells[tableIndex+1].textContent = '=I'+cellFormula
        
    })

    
  })

  
  getElems(`#total-hours-tb tr`).forEach( (row, rowId )=>{

    if (rowId < 2) return
    const cellValue = row.cells[7]
    
    cellValue.textContent ="="+(row.textContent.match(/I\d+/g)||[]).join("+")

  })

  ////////////////////////// Yellow table //////////////////////////////////

  const yellowThCols = [...getElems("#yellow-table tr:nth-child(2) th")]
  .map( th =>th.textContent)

  
  for(let pos = 1 ; pos <yellowThCols.length; pos++  ) {
    
  for(let e = 3; e < rosterDB.employees.length + 3; e++ ) {

    
    
    let formula = ""
    const rows = getElems(`.week-roster tr:nth-child(${e})`)
    

     rows.forEach( (row, rowId) => {
       const rowNum = row.cells[0].children[0].value
       formula +=''
      const tableIndex = [...getElems(".week-roster")].findIndex( tb => tb.contains(row))
      let wk1startchar = "B"
      let lastwkstartchar = "H"

      
      if (tableIndex === 0) {
          wk1startchar = rosterConfig.startCellChar
        }

      if (tableIndex === rosterConfig.totWeeksShown -1) {
           lastwkstartchar = rosterConfig.lastCellChar
      }
        
      if (tableIndex > rosterConfig.totWeeksShown - 1) return

      const cells = [...row.cells]

      switch(yellowThCols[pos].toLowerCase()){
        case "of":

        break;
        case "sat":
             formula += `+countifs(G${rowNum}${delim.textContent} "<>off"${delim.textContent} G${rowNum}${delim.textContent} "<>")`
          break
          case "sun":
        
            formula += `+countifs(H${rowNum}${delim.textContent} "<>off"${delim.textContent} H${rowNum}${delim.textContent} "<>")`

          break
          case "no of shifts":

            for(let shift of rosterDB.shifts.map(({shift})=>shift)) {
              
              formula += `+COUNTIF(${wk1startchar}${rowNum}:${lastwkstartchar}${rowNum}${delim.textContent}"${shift}")`


            }




        break

        default:

          formula += `+COUNTIF(${wk1startchar}${rowNum}:${lastwkstartchar}${rowNum}${delim.textContent}"${yellowThCols[pos]}")`
      
        }




      

  

     })
    

     

     const rowTd = getElem(`#yellow-table tr:nth-child(${e}) td:nth-child(${pos+1})`)
     
     if (rowTd) 
      rowTd.textContent = formula.replace("+", "=")
    

  }
  
}

  

}




function getEmpRowformula(rowNum) {

  
  
}

/////////////////////////////////////

getElem("#shift-values-box").addEventListener("mousedown",moveShiftTempBox )
function moveShiftTempBox(event) {
const shiftTempBox = getElem("#shift-values-box");
///formulaResult.value = event.target.tagName
 if (event.target.tagName === "OPTION" ||
  event.target.tagName === "BUTTON" ||
  event.target.tagName === "SELECT" 

) return
 
 const startX = event.clientX + 200
    const startY = event.clientY + 100

    const rect = shiftTempBox.getBoundingClientRect();

    const startLeft = rect.left;
    const startTop = rect.top;

    function moveSettingsBlock(event) {

        const x = startLeft + (event.clientX - startX);
        const y = startTop + (event.clientY - startY);

        shiftTempBox.style.transform = `translate(${x}px, ${y}px)`;
    }

    function stopMove() {
        document.removeEventListener("mousemove", moveSettingsBlock);
        document.removeEventListener("mouseup", stopMove);
    }

    document.addEventListener("mousemove", moveSettingsBlock);
    document.addEventListener("mouseup", stopMove);
  

}



///////////////////////


getElem("#shift-settings").addEventListener("mousedown",moveSettingsBlock )
function moveSettingsBlock(event) {
const shiftSettings = getElem("#shift-settings");
///formulaResult.value = event.target.tagName
  if( event.target.tagName !== "DIV" &&
    event.target.tagName !== "TABLE" &&
    event.target.tagName !== "TR" &&
    event.target.tagName !== "TD" &&
    event.target.tagName !== "TH" &&
    event.target.tagName !== "SECTION"&&
    event.target.tagName !== "H2"
    
  
  ) return
 
 const startX = event.clientX + 200
    const startY = event.clientY + 100

    const rect = shiftSettings.getBoundingClientRect();

    const startLeft = rect.left;
    const startTop = rect.top;

    function moveSettingsBlock(event) {

        const x = startLeft + (event.clientX - startX);
        const y = startTop + (event.clientY - startY);

        shiftSettings.style.transform = `translate(${x}px, ${y}px)`;
    }

    function stopMove() {
        document.removeEventListener("mousemove", moveSettingsBlock);
        document.removeEventListener("mouseup", stopMove);
    }

    document.addEventListener("mousemove", moveSettingsBlock);
    document.addEventListener("mouseup", stopMove);
  

}
 
const templateBox = getElem("#shift-template-box");

templateBox.addEventListener("mousedown", moveTemplateBlock);

function moveTemplateBlock(event) {

    if (
        event.target.tagName !== "SECTION" &&
        event.target.tagName !== "DIV" &&
        event.target.tagName !== "H2"
    ) {
        return;
    }

   

    const rect = templateBox.getBoundingClientRect();


    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    function move(event) {

        const x = event.clientX - offsetX - rect.width/2;
        const y = event.clientY - offsetY -rect.height/2 + 100;

        templateBox.style.transform =
            `translate(${x}px, ${y}px)`;
    }

    function stopMove() {

        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", stopMove);
    }

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", stopMove);
}
 

//I will do cleanup later 
getElem("#members-box").addEventListener("mousedown",moveMembersBlock )
function moveMembersBlock(event) {
const shiftSettings = getElem("#members-box");
 
 if( event.target.tagName !== "DIV") return
 

 const startX = event.clientX +500
    const startY = event.clientY + 100

    const rect = shiftSettings.getBoundingClientRect();

    const startLeft = rect.left;
    const startTop = rect.top;

    function moveSettingsBlock(event) {

        const x = startLeft + (event.clientX - startX);
        const y = startTop + (event.clientY - startY);

        shiftSettings.style.transform = `translate(${x}px, ${y}px)`;
    }

    function stopMove() {
        document.removeEventListener("mousemove", moveSettingsBlock);
        document.removeEventListener("mouseup", stopMove);
    }

    document.addEventListener("mousemove", moveSettingsBlock);
    document.addEventListener("mouseup", stopMove);
  

}

getElem("#unallowed-shift-order-box").addEventListener("mousedown",moveUnallowedShiftBlock )
function moveUnallowedShiftBlock(event) {
const unallowedShift = getElem("#unallowed-shift-order-box");

 const startX = event.clientX  + document.body.clientWidth - unallowedShift.clientWidth*2- unallowedShift.clientWidth/2
  const startY = event.clientY + 100
 
  formulaResult.value = event.target.tagName
 if (event.target.tagName === "INPUT" || 
  event.target.tagName === "BUTTON" ||
event.target.tagName === "SELECT" ||
event.target.tagName === "TEXTAREA"
) return

    const rect = unallowedShift.getBoundingClientRect();

    const startLeft = rect.left;
    const startTop = rect.top;

    function moveSettingsBlock(event) {

        const x = startLeft + (event.clientX - startX);
        const y = startTop + (event.clientY - startY);

        unallowedShift.style.transform = `translate(${x}px, ${y}px)`;
    }

    function stopMove() {
        document.removeEventListener("mousemove", moveSettingsBlock);
        document.removeEventListener("mouseup", stopMove);
    }

    document.addEventListener("mousemove", moveSettingsBlock);
    document.addEventListener("mouseup", stopMove);
  

}

getElem("#utility-icon").addEventListener("mousedown",moveutilityIconBlock )
function moveutilityIconBlock(event) {
const shiftSettings = getElem("#utility-icon");
 
 
 const startX = event.clientX  + document.body.clientWidth-shiftSettings.clientWidth*2
    const startY = event.clientY + 500

    const rect = shiftSettings.getBoundingClientRect();

    const startLeft = rect.left;
    const startTop = rect.top;

    function moveSettingsBlock(event) {

        const x = startLeft + (event.clientX - startX);
        const y = startTop + (event.clientY - startY);

        shiftSettings.style.transform = `translate(${x}px, ${y}px)`;
    }

    function stopMove() {
        document.removeEventListener("mousemove", moveSettingsBlock);
        document.removeEventListener("mouseup", stopMove);
    }

    document.addEventListener("mousemove", moveSettingsBlock);
    document.addEventListener("mouseup", stopMove);
  

}
 

function addEmptyRowsAfterWeeks() {
  
  const empTables = getElems(".table-low-weeks-tb")
  if (!rosterDB.employees) return
  if ( empTables ) {
    empTables.forEach(tb =>tb.remove())
  }

  const wk1RangeNum = Number(getElem('.week-roster tr:last-child .row-number').value)
  const wk2RangeNum = Number(getElem('.week-roster:nth-child(2) tr .row-number').value)

 if (wk2RangeNum-3 <= wk1RangeNum ) return

  if (wk2RangeNum-3 - wk1RangeNum>10 ) {
    alert("Sorry, limit is 10 rows" )
    return
  }
  let tb = '<table class="table-low-weeks-tb">'

  for( let r = wk1RangeNum; r < wk2RangeNum-3; r++) {
     tb +=`<tr><td>.</td></tr>`

  }
      tb+="</table>"

for(let t = 0; t<5; t++ ) {
  const table = getElems(".week-roster")[t]
  if (table)
      table.insertAdjacentHTML("afterend", tb )
}

  empTables.forEach(tb =>tb.remove())

}

getElem("#view-workers").addEventListener("click", showWorkersBox)

function showWorkersBox() {
   getElem("#members-box").style.display = "block" 
   const memberList = getElem("#members-box td[rowspan] select")

   memberList.length = 0 
   const emps = rosterDB.employees.map(({employee})=>employee)

    memberList.innerHTML = `<option value="Select worker">Select worker</option>`
   for(let worker of emps)
     memberList.innerHTML += `<option value="${worker}">${worker}</option>`

 getElems("#members-tb td:not([rowspan]) ul li").forEach( ul=>ul.remove())
 const ul = getElems("#members-tb td:not([rowspan]) ul:empty")
    const nonFixedShifts = rosterDB.shifts.filter(({isNonFixedShift})=> isNonFixedShift)
    ul.forEach( ul=> {
      
      for(let shift of nonFixedShifts) {

        ul.innerHTML += `<li><label><input type="checkbox" value="${shift.shiftNo}" checked> ${shift.shift}</label></li>`
      }

    })

}

getElem("#members-box").addEventListener("change", updateWorkDays)

function updateWorkDays(event) {

  const employee = getElem("#members-box select").value

    const empIndex = rosterDB.employees
    .findIndex( emp => emp.employee === employee)

    if ( empIndex === -1 ) return

   if (event.target.tagName === "SELECT") {
       
       restoreEmployeeWorkdays()
       return
   }


    const workdays = []

    getElems("#members-box tbody tr").forEach((row, weekIndex) => {
        if (weekIndex < 2) return
        const shiftNosPerRow = []

        row.querySelectorAll("td").forEach((cell, dayIndex) => {

    
            if (dayIndex === 0) return

            const shiftNosPerDay = []

            cell.querySelectorAll("input").forEach(input => {
              if (input.checked)
                shiftNosPerDay.push(input.value)
            })

            shiftNosPerRow.push(shiftNosPerDay)
        })

        const rosterWeekIndex = weekIndex - 2

        workdays.push({
            [`week${rosterWeekIndex}`]: shiftNosPerRow
        })
       
    })

    rosterDB.employees[empIndex].workdays = workdays

    
  
}
function restoreEmployeeWorkdays() {

    const employee = getElem("#members-box select").value

    const empIndex = rosterDB.employees.findIndex(
        emp => emp.employee === employee
    );

    if (empIndex === -1) return

    const inputs = getElems("#members-box input")

    if (!rosterDB.employees[empIndex].workdays) {
        inputs.forEach(input => {
            input.checked = true
        });
        return;
    }

    const workdays = rosterDB.employees[empIndex].workdays;

    if (!Array.isArray(workdays)) return

    getElems("#members-box tr").forEach((row, weekIndex) => {

        if (weekIndex < 2) return

        const weekNo = weekIndex - 2

        const weekData = workdays.find(
            week => week[`week${weekNo}`]
        )

        if (!weekData) return

        const shiftNosPerRow = weekData[`week${weekNo}`]

        row.querySelectorAll("td").forEach((cell, dayIndex) => {

            if (dayIndex === 0) return

            const dayIndexInWeek = dayIndex - 1

            const savedShifts =
                shiftNosPerRow[dayIndexInWeek] ?? []

            cell.querySelectorAll("input").forEach(input => {
                input.checked = savedShifts.includes(input.value)
            })
        })
    })
}

getElem("#file-uploader span").onclick =() =>{

  getElem("#file-uploader").style.display = "none"
}

getElem("#select-employees").addEventListener("change", updateWorkersData)

function updateWorkersData() {
  getElem("#emp-name").textContent = getElem("#select-employees").value 

}
 
getElem("#close-employees-box").addEventListener("click", closeEmployeesBox)

function closeEmployeesBox() {
  getElem("#members-box").style.display = "none"
}

getElem("#check-all-shifts").onclick = () =>{
  getElems("#members-tb input").forEach(inp => inp.checked = true)
}
getElem("#uncheck-all-shifts").onclick = () =>{
  getElems("#members-tb input").forEach(inp => inp.checked = false)
}

function saveEmployeeWorkdays() {

    const employee = getElem("#members-box select").value;

    const empIndex = rosterDB.employees.findIndex(
        emp => emp.employee === employee
    );

    if (empIndex === -1) {
        alert("No employee name selected");
        return
    }

    const workdays = [];

    getElems("#members-box tbody tr").forEach((row, rowIndex) => {

        if (rowIndex < 2) return

        const weekIndex = rowIndex - 2
        const days = []

        row.querySelectorAll("td").forEach((cell, cellIndex) => {

           if (cellIndex === 0) return

            const shifts = []

            cell.querySelectorAll("input").forEach(input => {
                if (input.checked) {
                    shifts.push(input.value)
                }
            });

            days.push(shifts)
        });

        workdays.push({
            [`week${weekIndex}`]: days
        });
    });

    rosterDB.employees[empIndex].workdays = workdays;

    DB.save();

    alert("Workdays have been saved!!!")
}

getElem("#save-worksday").onclick = saveEmployeeWorkdays
function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
}

 
function getEmployeesTotalHrs() {

    const tables = getElems(".week-roster")

    if (!tables?.length || !rosterDB.employees?.length) return;


    const employees = rosterDB.employees.map(({ employee }) => employee);
    const shifts = rosterDB.shifts.map(({ shift }) => shift);

    const hoursPerShift = Number(hours.value) || 9
    const totalHoursTable = getElem("#total-hours-tb")

    tables.forEach((table, weekIndex) => {
      
        for (let c = 2; c < employees.length + 2; c++) {

            let shiftCount = 0;

            [...table.rows[c].cells].forEach(cell => {

                const cellText = cell.textContent.trim();

                if ( shifts.includes(cellText) ) 
                    shiftCount++;

            })

            const totalHr = table.rows[c].cells[9];

            const hrs = shiftCount * hoursPerShift;
            
            totalHr.textContent = hrs;

            const wkHrs = totalHr.textContent;
             if(weekIndex < rosterConfig.totWeeksShown) 
                  totalHoursTable.rows[c].cells[weekIndex+1].textContent = wkHrs;
              else 
                 totalHoursTable.rows[c].cells[weekIndex+1].textContent = 0;




        }

   


    })


    // Calculating employees total huors
    for (let t = 0; t < employees.length; t++) {

        const row = totalHoursTable.rows[t + 2];

        const totalHour = row.cells[7];

        const totalHrs = Array.from(row.cells)
            .slice(1, 7)
            .reduce((total, cell) => {

                return total + (Number(cell.textContent) || 0);

            }, 0);

        totalHour.textContent = totalHrs;
    }

  //count weekends 


  const empLen = rosterDB.employees.length 
  const shiftLen = rosterDB.shifts.length 

 
 

 const weekTables = getElems(".week-roster");
 const yellowTable = getElem("#yellow-table");
 
 if (getElem("#allowanceTb"))
     getElem("#allowanceTb").remove()
    
     const tb = document.createElement("table")
    tb.id="allowanceTb"
    tb.innerHTML += "<tr><th>Employees</th><th>Total HR</th><th>Allowance</th></tr>"
    getElem("#below-yellow-tb").insertAdjacentHTML('afterend', tb.outerHTML)

    const allowanceTb = getElem("#allowanceTb");

 getElem("#allowanceTb").addEventListener("click", getAllowanceTbFormula)

employees.forEach((emp, empIndex) => {

    const startIndex = empIndex + 2;

  
    const rowShifts = [];

    for (let w = 0; w < rosterConfig.totWeeksShown; w++) {

        const table = weekTables[w];

        if (!table) continue;

        const row = table.rows[startIndex];

        if (!row) {
            console.error(
                `Employee ${empIndex}: row ${startIndex} missing in week ${w}`
            );
            continue;
        }

        Array.from(row.cells).forEach((cell, shftIndex) => {
 
            if (shftIndex < 2 || shftIndex > 8) return;




            if (w === 0) {

                if (shftIndex <= rosterConfig.startCellNum + 1) 
                    return;
                

                rowShifts.push(cell.textContent.trim());

                return;
            }


          

            if (w > 0 && w < rosterConfig.totWeeksShown - 1) {

                rowShifts.push(cell.textContent.trim());

                return;
            }




            if (w === rosterConfig.totWeeksShown - 1) {

                if (shftIndex < rosterConfig.lastCellNum + 1) {
                    return;
                }

                rowShifts.push(cell.textContent.trim());

            }

        });
    }




});


  const yellowThCols = [...getElems("#yellow-table tr:nth-child(2) th")].map(th=> th.textContent)
  

  for(let e = 3; e < rosterDB.employees.length + 3; e++) {

  
  yellowThCols.forEach((th, thIndex)=>{

      if ( thIndex === 0 ) return


     const rows = getElems(`.week-roster tr:nth-child(${e})`)

      let totCount = 0
      let formula = ""
     rows.forEach((row, rowID) => {

        const tableIndex = [...tables].findIndex(th=>th.contains(row))


        if (tableIndex > rosterConfig.totWeeksShown - 1) return

         const cells = [...row.cells]
         const rowNum = cells[0].children[0].value 


        cells.forEach( (cell, cellPos) => {

            if (cellPos <= rosterConfig.startCellNum && tableIndex === 0) return
            if (cellPos > rosterConfig.lastCellNum + 1  && tableIndex === rosterConfig.totWeeksShown - 1) return


            if (th.toLowerCase() === "sun" || th.toLowerCase() ==="sat") {

                return
            }
        
            if ( th.toLowerCase() ==="no of shifts") {

              formula += cell.textContent.trim()

              return
            }
            if (cell.textContent.toLowerCase() === th.toLowerCase()) 
                totCount++

       

         
        })

        
        
         if (th.toLowerCase() ==="sat") {
                
             if (cells[7].textContent.toLowerCase() !== "off")
              totCount++


            }
        
        if (th.toLowerCase() === "sun") {
                
             if (cells[8].textContent.toLowerCase() !== "off")
              totCount++


            }

      if (th.toLowerCase() ==="no of shifts") {

        const nonFixedShift = rosterDB.shifts.filter(({isNonFixedShift} )=> isNonFixedShift)
        .map( ({shift})=>shift)

        totCount = 0

        nonFixedShift.forEach( shift => {
          
          const regExp = new RegExp(shift,"gi")
          totCount += (formula.match(regExp, formula) || []).length
          
        })
         
       }
        
        


        
   
     
     })

    
    
    getElem(`#yellow-table tr:nth-child(${e}) td:nth-child(${thIndex+1})`).textContent = totCount
    
    
    
    
    
  })
}


//updateShiftAllowance()

function updateShiftAllowance() {
  const emps = rosterDB.employees.map(({employee})=>employee)
  

  let totCount = 0 
const allowsShifts = rosterDB.shifts.filter(({allowance})=>allowance === true)
.map(({shift})=> shift.toLowerCase() )

formulaResult.value += allowsShifts + ''

emps.forEach( (emp, empPos) => {

  const wkRowPos = empPos+3

  const rows = getElems(`.week-roster tr:nth-child(${wkRowPos})`)
  rows.forEach((row, rowPos) => {
      const tableIndex = [...tables].findIndex(th=>th.contains(row))
      const cells = [row.cells]

      cells.forEach( (cell, cellPos)=> {

        if (cellPos <= rosterConfig.startCellNum && tableIndex === 0) return
        if (cellPos > rosterConfig.lastCellNum + 1  && tableIndex === rosterConfig.totWeeksShown - 1) return


        totCount++ 


      })

  })


  allowanceTb.innerHTML += 
  `<tr>
  <td class="employee-name">${emp}</td>
  <td style="text-align:center">0</td>
  <td>${totCount}</td>
  </tr>`
  
})

}


}

 
getElem("#unallowed-shift-order").addEventListener("click", showUnallowedShiftOrderBox)

function showUnallowedShiftOrderBox() {

  getElem("#unallowed-shift-order-box")
  .style.display = "block"
}

getElem("#close-unallowed-shift").onclick =()=>{
  
  getElem("#unallowed-shift-order-box").style.display = "none"
}

function resetShiftCount() {

  const tables = [...getElems(".week-roster")];

    if (!tables.length) {
        return;
    }

}



function updateUnallowedShifts() {

  if (!rosterDB.shifts) return
  
  const unallowedShiftOrder = getElem("#unallowed-order-shift")
   leftShift.length = 0
   rightShift.length = 0

  rosterDB.shifts.forEach((objShiift, i)=> {
      const shift = objShiift.shift
      
      const newShift0 = new Option(shift, shift)
      leftShift.options[i] = newShift0
      
      const newShift1 = new Option(shift, shift)
      rightShift.options[i] = newShift1


  })



}

getElem("#unallowed-shift-order-box").addEventListener("click", actionUnallowedShift)

function actionUnallowedShift(event) {
  const target = event.target
  if (target.tagName !=="BUTTON") return
  const unallowedShiftOrder = getElem("#unallowed-order-shift")

  const unAllowedShiftOrder = rosterDB?.unAllowedShiftOrder || []

  switch(target.textContent) {
    case "Add":
      const len = unallowedShiftOrder.length
      const optionValue = `${leftShift.value} > ${rightShift.value}` 

      if (unAllowedShiftOrder.includes(optionValue)) {
        alert("Already added")
        return
      }

      if (leftShift.value === rightShift.value) {
         alert("The shift order is fine")
         return
      }
     

      unAllowedShiftOrder.push( optionValue )
      
      break
    case "Delete":
          const selectedIndex = unallowedShiftOrder.selectedIndex;
 
        if (selectedIndex === -1) {
 
          alert("Select an unallowed shift order first.");
         return    
        }
         
 
      unAllowedShiftOrder.splice(selectedIndex, 1);
   
    break
    case "Clear":
    unAllowedShiftOrder.length = 0;
    break

  }

   rosterDB.unAllowedShiftOrder = unAllowedShiftOrder


   updateAllowedShifts()


}

function addTimeSheetRows() {

  const shiftDays = getElems(".shift-day")
  shiftDays.forEach( day => day.remove())
  getElems(".non-fixed-rows").forEach( row => row.remove())


  const activeMonth = chosenMonth.textContent 
 getElem("#timesheet-month").textContent = activeMonth.replace(/[\d\s]/g, "")

 let nonFixedValues = [...new Set(rosterDB.shifts.filter(({isNonFixedShift})=>isNonFixedShift === true))]

let rows = ""
nonFixedValues.map(({shift, shiftNo, allowance}, rowPos)=>{

   rows += `
      <tr class="non-fixed-rows">
        <td></td>
        <td class="center boldness">${rowPos === 0 ? "Shift Key" : ""}</td>
        <td>${shiftNo .replace(/s/, r=>r.toUpperCase()).replace(/\d+/, r=>" "+r)}</td>
        <td class="center">${shift}</td>
        <td class="center">${Number(hours.value)}</td>
        
        <td class="center">${allowance ? 'Yes' :'No'}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>`
      
    })
    getElem("#before-non-fixed-shifts").insertAdjacentHTML("afterEnd", rows)

 


 

  for( let e = 0; e <= rosterDB.employees.length; e++) {
     
    let empName = ''
    if (e === 0) 
      empName = "Select employee name"
    else 
      empName = rosterDB.employees[e-1].employee
      
    const newItem = new Option( empName, empName )
    timesheetEmpName.options[e] = newItem
  }

  let newRow  = ""


 getElems(".activeDate").forEach( (row, rowPos) => {

 const date = new Date(row.textContent)
 const day = date.toLocaleDateString("en-ZA", { weekday:"long"})
 const exactDAY = date.toLocaleDateString("en-ZA", 
  {month:"short", day:"numeric" , year:"numeric"})
  .replaceAll(" ","-").replace(/^0/,"")
     
 
 
 newRow += `
  <tr class="shift-day">
  <td>${day}</td>
  <td>${exactDAY}</td>
  <td>OFF</td>
  <td>OFF</td>
  <td>OFF</td>

  <td>OFF</td>
  <td></td>
  <td></td>
  <td></td>
  <td contenteditable></td>

  </tr>
  `


 })

 getElem("#timesheet-header2").insertAdjacentHTML("afterEnd", newRow)

getTimesheeForEmployee()


}

timesheetEmpName.addEventListener("change", getTimesheeForEmployee )

function getTimesheeForEmployee() {
  const selectedPos = timesheetEmpName.selectedIndex
  if ( selectedPos === 0 ) return

  const rowsPos = selectedPos + 3
  const weeklyRows = getElems(`.week-roster tr:nth-child(${rowsPos}`)
 
 
 
  let workedShifts = []

  weeklyRows.forEach((row, rowPos)=>{
     if (rowPos >rosterConfig.totWeeksShown -1 ) return

      const cells = [...row.cells] 

      cells.forEach((cell, cellPos)=>{
         if(cellPos <2 || cellPos > 8 ) return
         if (rowPos === 0 && cellPos <= rosterConfig.startCellNum ) return
         if (rowPos > rosterConfig.totWeeksShown - 1) return
         if (rowPos > rosterConfig.totWeeksShown - 1 && cellPos >= rosterConfig.lastCellNum - 1) return

         workedShifts.push(cell.textContent)
 


      })

  })

 
  getElems(".shift-day").forEach((row, rowPos)=> {

    let shift = workedShifts[rowPos]

    if (!shift.includes("-") ) {
      shift = shift+ " - "+ shift
    }
    const [startTime, endTime] = shift.split("-")
    const shiftIndex = rosterDB.shifts.findIndex(obj =>obj.shift === shift)
    let Shift_no = shiftIndex >= 0 ? rosterDB.shifts[shiftIndex].shiftNo : ""
    let allawance = shiftIndex >= 0 ? rosterDB.shifts[shiftIndex].allowance : false
    
   

  


    if (shiftIndex >= 0 ) {
    row.cells[2].textContent =  startTime
    row.cells[3].textContent =  endTime
    row.cells[4].textContent =  shiftIndex >= 0 ? Shift_no 
    .replace(/s/, r=>r.toUpperCase())
    .replace(/\d+/, r=>" "+r) : "OFF"
    row.cells[6].textContent =  row.cells[2].textContent.trim()? rosterDB.hours : ""
    row.cells[5].textContent = allawance ? "Night" : "Normal"
    
    row.cells[7].textContent =  allawance ? "Yes" :"No"
    row.cells[8].textContent =  row.cells[2].textContent.trim()? rosterDB.hours : ""

      if (row.cells[0].textContent.toLowerCase()=== "sunday" ) {
        row.style.background = "pink"
         row.cells[5].textContent = "Sunday"
      }
    }

  })


  getElems(".total-count-row td").forEach((cell, cellPos)=>{
    if (cellPos === 0 ) return

    const pos = 1+cellPos

    const cols = [...getElems(`.shift-day td:nth-child(${pos})`)]
    .map((ss, ssPos)=> ss.textContent)

    let cellValue = ""
    switch(cellPos) {
      case 1:
        cellValue = ""
      break
        case 2:
        cellValue = (cols.match(/\w/ig)||[]).length
      break
        case 3:
        cellValue = ""
      break
        case 4:
        cellValue = ""
      break
        case 5:
        cellValue = ""
      break
        case 6:
        cellValue = ""
      break
        case 7:
        cellValue = ""
      break
        case 8:
        cellValue = ""
      break
        case 9:
        cellValue = ""
      break
   default:
    cellValue = ""
      


    }
    cell.textContent = cellValue || 0
  })


}

function getShift(event) {
  const target = event.target
  if ( rosterConfig.stopAddShiftAddition === true ) return 
  


  const selectedShift = rosterDB.shifts.find( shft => shft.shift === target.textContent )

  if ( selectedShift ) {
      rosterConfig.selectedShift = selectedShift;
    } else {

 rosterConfig.selectedShift = 
      {
        shift:"OFF", 
        shiftNo:'shiftNo'+rosterDB.shifts.length,
        shiftColor:"rgb(65, 221, 125)",
        fontColor: "#000"
    }
    
    
    }
      

getElems("#yellow-table th").forEach(th => th.classList.remove("selectedYellowHeader"))
getElems("#yellow-table th").forEach(th => {
  
  if (th.textContent.toLowerCase() === rosterConfig.selectedShift.shift.toLowerCase() ) {
       th.classList.add("selectedYellowHeader")
  }

})




}

function addShiftsManual() {
  

  if ( rosterConfig.stopAddShiftAddition === true ) return 


  getElems(".week-roster")
   .forEach((table, tbIndex) => {
        
    if (tbIndex > rosterConfig.totWeeksShown - 1  ) return
     
     const trows = [...table.rows]; 

     trows.forEach((row, rowId) => {

       if(rowId < 2) return
       
       [...row.cells].forEach((cell, cellId) =>{

         if (cellId < 2 || cellId>8) return;

         if (tbIndex == 0 &&
              cellId <= rosterConfig.startCellNum) return;


            cell.addEventListener("click", changeShift)
            cell.style.cursor = "pointer"


       })

     })
      
     
 
      

   })


   //.forEach( cell => cell.addEventListener("click", changeShift));
    const defaultShift =  
 
    {
        shift:"OFF", 
        shiftNo:'shiftNo'+rosterDB.shifts.length,
        shiftColor:"rgb(65, 221, 125)",
        fontColor: "#000"
    }
 
   function changeShift(event) {
       const target = event.target 
       if (target.tagName !== "TD" || rosterConfig.stopAddShiftAddition ) return
      
        rosterDB.shifts.forEach(({shiftNo})=> {
          target.classList.remove(shiftNo)
        })

 const {shift, shiftNo, shiftColor, fontColor } 
        = rosterConfig.selectedShift || defaultShift

       target.classList.add(shiftNo)
       target.textContent = shift
       target.style.background = shiftColor
       target.style.color = fontColor
     
        getEmployeesTotalHrs()

   }


}


getElem("#view-templates").onclick = () => {
      openSettingsTemplates() 
}



function openSettingsTemplates() {
   const templateList = getElem("#days-weeks-template")
  templateList.length = 0 

 
  for (let o = 0; o < database.settings.length; o++) {

    const settingName = database.settings[o].settingName
    const optionValue = settingName? settingName : `Setting ${ o + 1}`
    const newOption = new Option( optionValue, optionValue)
    templateList.options[o] = newOption

  }
 


  getElem("#shift-template-box").style.display = "block"



}

getElem("#shift-template-box").addEventListener("click", updateSettingTemplates )

totalNumShiftsPerEmp.oninput = () => {
  if (totalNumShiftsPerEmp.value.length > 2) {
    totalNumShiftsPerEmp.value = 20
  }
}

totalNumShiftsPerEmp.onchange =()=>{
   
  if (totalNumShiftsPerEmp.value > 9 && totalNumShiftsPerEmp.value < 30 ) {

    return
  } else {

    totalNumShiftsPerEmp.value = 20
  }

}


function updateSettingTemplates(event) {
  const target = event.target
if (
  target.tagName !=="BUTTON"&&
  target.tagName !=="OPTION"&&
  target.tagName !=="SPAN" 

) return 

  const templateInp = getElem("#template-name")
  const templateList = getElem("#days-weeks-template")
  const templateListLen = templateList.options.length
  let newIndex = database.settings.length > 0 ? database.settings.length - 1 : 0

  switch(target.textContent) {
    case "Add Present setting as Template":

      if (templateListLen >= 20) {
        alert("Maximum number of templates reached.")
        return
      }

      if (!/\w+/g.test(templateInp.value)) {
        alert("The template name must contain alphanumeric")
        return  
      }
       if (/[^\w-\s,\.]/g.test(templateInp.value)) {
        alert("Only alphanumeics, underscore _ ,space, common, dot and dash are allowed")
        return  
      }

       if (templateInp.value.trim()==="") {
        alert("Template name is required")
        return
       }

       
       
       if (isTemplateAvailable(templateInp.value.toLowerCase().replace(/\s*/g,''))) {

          alert("The name already exist, please choose a different name.")
          return
       }

       if (isTemplateAvailable(templateInp.value.toLowerCase().replace(/\s*/g,''))) {

          alert("The name already exist, please a different name.")
          return
       }
 
       
       const len = templateList.options.length
       const newSettTemp = new Option(templateInp.value,templateInp.value )
       templateList.options[len] = newSettTemp
       
      rosterDB.settingName = templateInp.value
      rosterDB.settingID = Date.now()
      sessionData.currentSetting = rosterDB

      database.settings.push(rosterDB)
      database.index = database.settings.length - 1
      sessionStorage.setItem("rosterSession", JSON.stringify(sessionData))
      

      break
       case "Reset":
        templateInp.value =""
      break
       case "Rename Template":

       if (templateList.options.length === 0 ) {
        alert("There is nothing to rename")
        return
       }

      const selectOptID = templateList.selectedIndex
      const selectedOption = templateList.options[templateList.selectedIndex]
      const selectedSettingIndex = database.settings.findIndex(setting=> setting.settingName === selectedOption.value)

       if ( selectOptID === -1 ) {
          alert("You did not select a setting template name to rename.")
          return
       }
   
       if (templateInp.value.trim()==="") {
        alert("Template name is required")
        return
       }

       
       
       if (isTemplateAvailable(templateInp.value.toLowerCase().replace(/\s*/g,''))) {

          alert("The name already exist, please a different name.")
          return
       }

       templateList.options[selectOptID].value = templateInp.value
       templateList.options[selectOptID].textContent = templateInp.value
       database.settings[selectedSettingIndex].settingName = templateInp.value
       database.index = selectedSettingIndex
       rosterDB.settingName = templateInp.value
      sessionData.currentSetting = rosterDB
      sessionStorage.setItem("rosterSession", JSON.stringify(sessionData))
       runAfterPassedValidation()

      
   
      break
       case "Delete Template":
          const curIndex = templateList.selectedIndex
         const selectedSettIndex = database.settings.findIndex(setting=> setting.settingName === templateList.options[curIndex].value)
         if (curIndex === -1) {
          alert("You did not select a setting template name to delete.")
          return
         }
         database.settings.splice(selectedSettIndex, 1)
         templateList.options[curIndex].remove()

        newIndex = database.settings.length > 0 ? database.settings.length - 1 : 0
         rosterDB = database.settings[newIndex]
         database.index = newIndex
       
      break
  
       case "Save Settings":
        if (templateList.options.length === 0 ) {
          alert("There is nothing to save")
          return
        }
        
         saveSettings()
      break
      
      case "Clear Templates":
        templateList.options.length = 0
      break
    
      case "Generate Random Template":
        alert("Not added yet")
      break
   
       case "X":
        getElem("#shift-template-box").style.display = "none"
      break
      default:

    
        templateInp.value = target.textContent
        const selectedSetIndex = database.settings.findIndex(setting=> setting.settingName === target.textContent)
       
        if (selectedSetIndex === -1) {
          alert("The selected template is not found in the database.")
          return
        }
        rosterDB = database.settings[selectedSetIndex]
        database.index = selectedSetIndex
        sessionData.currentSetting = rosterDB
        sessionStorage.setItem("rosterSession", JSON.stringify(sessionData))
       
        runAfterPassedValidation()

        

  }

 
   
          
  function isTemplateAvailable(tempName) {

      const options = [...templateList.options].map( opt => 
        opt.value.toLowerCase().replace(/\s*/g, ""))
     return options.includes(tempName)

  }

}


function updateAllowedShifts() {

if (!rosterDB.unAllowedShiftOrder) return

const unallowedShiftOrder = getElem("#unallowed-order-shift")
    unallowedShiftOrder.length = 0
    rosterDB.unAllowedShiftOrder.forEach((shift, i)=> {
  
    const newItem = new Option(shift, shift)
    unallowedShiftOrder.options[i] = newItem
    
  })

}

getElem("#close-shift-template").onclick = () => {
   getElem("#shift-values-box").style.display = "none"

}

//////////////////////////////////
async function copy() {
   const selectedText = window.getSelection().toString();

    if (!selectedText) {
        alert("Please highlight some text first.");
        return;
    }

    navigator.clipboard.writeText(selectedText)
        .then(() => {
            console.log("Copied:", selectedText);
        })
        .catch(error => {
            console.error("Copy failed:", error);
        });

 
}



let lastFocusedElement = null;

document.addEventListener("focusin", event => {
    if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
    ) {
        lastFocusedElement = event.target;
    }
});

async function pasteFromClipboard() {
    try {
        const text = await navigator.clipboard.readText();

        if (!lastFocusedElement) {
            alert("Click inside an input or textarea first.");
            return;
        }

        const element = lastFocusedElement;

        const start = element.selectionStart ?? element.value.length;
        const end = element.selectionEnd ?? element.value.length;

        element.focus();

        element.setRangeText(
            text,
            start,
            end,
            "end"
        );

        element.dispatchEvent(
            new Event("input", { bubbles: true })
        );

    } catch (error) {
        console.error("Paste failed:", error);
        alert("The browser did not allow clipboard access.");
    }
}



getElem("#save-unallowed-order-shift").onclick = saveSettings
getElem(".terms-c").onclick = () =>{

  alert("Terms and conditions are not added yet")
}

 
getElem("#random-shifts").addEventListener("click", rosterPeople)
getElem("#load-shift").addEventListener("click", rosterPeople)
getElem("#upload-new-btn").addEventListener("click", importDB)

 
if (rosterDB.shifts && rosterDB.employees) {

    runAfterPassedValidation()
 
 
 


    

}
