
const getElem = (ele) => document.querySelector(ele);
const getElems = (ele) => document.querySelectorAll(ele);
const getEleByID = (ele) => document.getElementById(ele);
const getClassElem = (ele) =>document.getElementsByClassName(ele);

let rosterDB = {}
const rosterConfig = {}
const birthday = [{employee:"Chippa", date:"03-03"}]

const DB = {
  save: () => {localStorage.setItem("rosterDB", JSON.stringify(rosterDB))},
  get: () => JSON.parse(localStorage.getItem("rosterDB")),
  delete: () => {localStorage.removeItem("rosterDB"), location.reload()}
}

const cols = getElem(".week-roster tr:first-child").textContent.replace(/\s|Row No/g,"").split("")
const delim = getElem("span#delim")
const splitterBox = getElem("#splitter-box")
const delims = getElems("span.splitter")

const cellValue = getElem("#cell-number")
const hours = getElem("#standard-hours")
const shiftValue = getElem("#shift-values")
const employeeValue = getElem("#employee-name")
const totalNumShiftsPerEmp = getElem("#total-shifts-per-employee")
const formulaResult = getElem("#result-formula")
const rangeElems = getClassElem("range")
const hourLabel = getElem("#hour-label")
let weekOneStartRowNum = rangeElems[0]
let weekTwoStartRowNum = rangeElems[(rangeElems.length%6)+1]

const leftShift = getElem("#leftShift")
const rightShift = getElem("#shiftRight")

try {
  const savedDB = DB.get();

  if (savedDB && typeof savedDB === "object") {
    rosterDB = savedDB;
  }

  shiftValue.value = Array.isArray(rosterDB.shifts)
    ? rosterDB.shifts.map(({ shift }) => shift).join("\n")
    : "";

  hours.value = Number(rosterDB.hours) || 9;
  hourLabel.textContent =  hours.value 
  employeeValue.value = Array.isArray(rosterDB.employees)
    ? rosterDB.employees
        .map(({ employee }) => employee)
        .join("\n")
    : "";


} catch (error) {
  console.error("Unable to load roster data:", error);

  rosterDB = {};
  localStorage.removeItem("rosterDB");

  alert(
    "The saved roster data was invalid and has been reset."
  );
}



let yellowTable = null; 

const chosenMonth = getElem(".active-month")
 
const weekRoster = getElem('.week-roster')
const newEmpRow_1 = `
     <tr>
          <td>
            <span class="add-emp-row">+</span>
            <span class="remove-emp-row">-</span>
            <input type="number" class="row-number" min="1" value="2" max="999">
          </td>
          <td class="shift-cell employee-name">Emp 1</td>
          <td class="shift-cell">OFF</td>
          <td class="shift-cell">OFF</td>
          <td class="shift-cell">OFF</td>
          <td class="shift-cell">OFF</td>
          <td class="shift-cell">OFF</td>
          <td class="shift-cell">OFF</td>
          <td class="shift-cell">OFF</td>
          <td>0</td>
          <td class="range" title="One click to get one cell number, double click to get multiple cell number">1</td>
      </tr>
`

weekRoster.insertAdjacentHTML("beforeEnd", newEmpRow_1)

addWeekTable()


const curDate = new Date();
chosenMonth.textContent = curDate.toLocaleDateString("en-ZA", {month:"long", year:"numeric"})




splitterBox.addEventListener("click", updateDelimiter)

function updateDelimiter(event) {
   const splt = event.target
    
if (splt.tagName !== "SPAN") return
  delim.textContent = splt.textContent
  const tempDelim = splt.textContent == delims[0].textContent ?delims[1].textContent : delims[0].textContent
 
  cellValue.value = cellValue.value.replaceAll(tempDelim, splt.textContent)
  formulaResult.value = formulaResult.value.replaceAll(`${tempDelim}`, `${splt.textContent}`)
  if(formulaResult.value)
  copyFormula()
}
function updateRosterDays() {
  const dayCells = getElems(".day-cell")
  let date = new Date(chosenMonth.textContent)

  getElem("#selected-month").innerHTML = chosenMonth.textContent.split(" ").join("<br>")
  .replace(/(?<=[a-z]{3})[a-z]/ig,'')


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

   rosterConfig.startCellChar = `${cols[startDayPos+1]}`
   rosterConfig.startCellNum = startDayPos+1
   rosterConfig.lastCellChar = `${cols[ lastDayPos+1]}`
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

const recentActivityBox = getElem("#active-history")
recentActivityBox.textContent = ''
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
  

updateRanges() 


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
 
function updateRanges() {
  
  const tables = getElems("table:has(.activeDate)")
  const empRows = getElems(`.week-roster:first-child tr:has(.range)`)
  weekOneStartRowNum = getElem('.week-roster:nth-child(1) .row-number')
  weekTwoStartRowNum = getElem('.week-roster:nth-child(2) .row-number')
   let rowNum = 2

   for(let e = 0; e < empRows.length; e++ ) {
    const cellVal = rosterConfig.startCellChar.split(":").map( c => c + Number(rowNum + e) ).join(":")
    getElems(`.week-roster:first-child .range`)[e].textContent = cellVal
  }

  updateWeekOneRowNo()
  updateWeekSecondRowNo()

 
}
 


function updateWeekOneRowNo() {
    const startCellNum =  getElem(`.week-roster:nth-child(1) .row-number`).value 

  const empRows = getElems(`.week-roster:first-child tr:has(.range)`)
  let startNo = startCellNum -1

  getElems(`.week-roster:first-child .range`).forEach((rangeCell, e)=> {

    const cellVal = rosterConfig.startCellChar.split(":").map( c=>c+Number(startNo+1)).join(":")
    rangeCell.textContent = cellVal
    startNo++
  })



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
  .map(shift => shift.trim().toLowerCase().replace(/\s{2,}/g," "))

 for(let shift of shiftData) { 
    if (shift.length > 25) {
      alert(`The shift "${shift}" is "${shift.length}" long, reduce to 25 or less characters.`)
    
      return false
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

if (empl.length < 2) {
  alert("At least 2 employee names are required")
  employeeValue.focus()
  return false
}

shiftValue.value = shiftData.join("\n")

const oldShifts = new Map(
    (rosterDB.shifts || []).map(shift => [shift.shift, shift])
);

rosterDB.shifts = shiftData.map((shift, index) => {

    const old = oldShifts.get(shift);

    return {
        shift,
        shiftNo: `shift${index + 1}`,

        allowance: old?.allowance ?? false,
        shiftColor: old?.shiftColor ?? getRandomColor(),
        fontColor: old?.fontColor ?? "#ffffff",
        isNonFixedShift: old?.isNonFixedShift ?? /\d/.test(shift),
        shiftRepeats: old?.shiftRepeats ?? []
    };
});


rosterDB.hours = hours.value
const workers = empl.map( name => {
  const objEmp = {employee: name.substring(0, 10)}

  return objEmp
 
})

const oldEmployees = new Map(
    (rosterDB.employees || []).map(emp => [emp.employee, emp])
);

rosterDB.employees = empl.map(name => {

    const employee = name.trim();

    const old = oldEmployees.get(employee);

    return {
        employee,
        workdays: old?.workdays ?? undefined
    };
});

//rosterDB.totalNumberShiftsPerEmp = totalNumShiftPerEmp.value || 18
rosterDB.weekOneStartRowNo =  getElem('.week-roster:nth-child(1) .row-number').value || 2
rosterDB.weekTwoStartRowNo =  getElem('.week-roster:nth-child(2) .row-number').value || 19


 renderNecessaryItems()
getElems(".dynamic-shift-row").forEach(row => row.remove())
autoAddSavedEmpls()
updateShiftSettingTb()
restoreShiftSettingData()
updateShiftRepeatValues()
updateUnallowedShifts() 
updateAllowedShifts()
rosterPeople()
 restoreShiftSettingData()

 
  return true

}
renderNecessaryItems()
function renderNecessaryItems() {

  
  if (rosterDB.shifts) {
    getElems("main>section").forEach(sec => sec.style.display = "block")
    getElems("#settings-option>ul>li")
    .forEach( (li, liId) => {

      if (liId > 6 ) return
      li.style.display = "block" 
    })
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


getElem("#save-data").addEventListener("click", saveData)
getElem("#save-settings").addEventListener("click", saveSettings)
function saveData() {

if (!cleanShifts()) return 
  restoreShiftSettingData()
  DB.save()
  alert("                Successfully saved!!!")
 

}


function deleteSavedDB() {
  if(Object.keys(rosterDB).length == 0) {
    alert("There is nothing to delete.")
    return
  }
  const conf = confirm("All shift settings data will be deleted. Do you want to continue?")
  if (conf) 
    DB.delete()
}
function updateWeekSecondRowNo() {

 
    const tables = getElems("table:has(.activeDate)")
    const startCellNum = Number(getElem(`.week-roster:nth-child(1) .row-number`).value)
    const secondCellNum =  Number(getElem(`.week-roster:nth-child(2) .row-number`)?.value)
 
  const empRows = getElems(`.week-roster:first-child tr:has(.range)`)
 
  getElems(`.range`).forEach(range => range.textContent = "")
  updateWeekOneRowNo()
  const rangeDiff = secondCellNum - startCellNum 


    const charThs = getElems(".week-roster tr:first-child th")
    const startChar = charThs[2].textContent
    const endChar = charThs[8].textContent

 
   let presRowNum = startCellNum
   //Number( getElem(`.week-roster:nth-child(${1+tb}) .range`).textContent.match(/\d+/g)[0]||0)

  for(let tb = 0; tb < tables.length-1; tb++) {

    empRows.forEach((row, e) =>{
   
      const rowNum = presRowNum + e
      const cellVal = `${tb > 0 ? cols[1]:rosterConfig.startCellChar }${rowNum}:${endChar}${ rowNum}`
      getElems(`.week-roster:nth-child(${1+tb}) .range`)[e].textContent = "="+cellVal
      getElems(`.week-roster:nth-child(${1+tb}) .row-number`)[e].value = rowNum
     
      if ( rosterDB?.employees ) {
        const workers = rosterDB?.employees.map(({employee}) => employee )
        getElems(`.week-roster:nth-child(${1+tb}) .employee-name`)[e].textContent = workers[e]|| "Employee "+ Number(e+1)
    
        
      }
       const weekOneRange = getElem(`.week-roster .row-number`)
      const weekTwoRange = getElem(`.week-roster:nth-child(2) .row-number`)
    
      if(  weekOneRange.value != rowNum && weekTwoRange.value != rowNum)
        getElems(`.week-roster:nth-child(${1+tb}) tr td:has(.add-emp-row)`)[e].style.setProperty("--before-content", `"${rowNum}"`)
      
        getElems(`.week-roster:nth-child(${1+tb}) tr:has(.add-emp-row)`)[e].setAttribute("class", `rowId${e}`)

    })
    presRowNum =  rangeDiff + Number( getElem(`.week-roster:nth-child(${1+tb}) .range`).textContent.match(/\d+/g)[0]||0)
    
   
  }
  
   empRows.forEach((row, e) =>{
   
      const rowNum = presRowNum + e
      const cellVal = `${startChar}${rowNum}:${rosterConfig.lastCellChar}${ rowNum}`
      getElems(`.week-roster:nth-child(${tables.length}) .range`)[e].textContent = "="+ cellVal
      getElems(`.week-roster:nth-child(${tables.length}) .row-number`)[e].value = rowNum
       
   
     
       getElems(`.week-roster:nth-child(${tables.length}) tr td:has(.add-emp-row)`)[e].style.setProperty("--before-content", `"${rowNum}"`)

   
       getElems(`.week-roster:nth-child(${tables.length}) tr:has(.add-emp-row)`)[e].setAttribute("class", `rowId${e}`)
        if ( rosterDB?.employees ) {
          const workers = rosterDB.employees.map(({employee})=> employee )
            getElems(`.week-roster:nth-child(${tables.length}) .employee-name`)[e]
            .textContent = workers[e] || "Employee "+ Number(e+1)

        }
    })
  

} 

getElem("#reset-shifts").addEventListener("click",clearShiftInput)

function clearShiftInput() {
  cellValue.value = ""
  shiftValue.value = ""
  clearShiftsBlocks();

}

 


function getOneCellNum(event) {
 const cellNum = event.target.nextElementSibling.textContent 
 cellValue.value = cellNum.replace(/=/g,"")

   getStandardShiftFormula()
}


function addWeekTable() {

getElem("#roster-tables").insertAdjacentHTML('beforeEnd', weekRoster.outerHTML)
getElem("#roster-tables").insertAdjacentHTML('beforeEnd', weekRoster.outerHTML)
getElem("#roster-tables").insertAdjacentHTML('beforeEnd', weekRoster.outerHTML)
getElem("#roster-tables").insertAdjacentHTML('beforeEnd', weekRoster.outerHTML)
getElem("#roster-tables").insertAdjacentHTML('beforeEnd', weekRoster.outerHTML)

getElem('.week-roster:nth-child(1) .row-number').value = rosterDB?.weekOneStartRowNo || 2
 getElem('.week-roster:nth-child(2) .row-number').value = rosterDB?.weekTwoStartRowNo || 18
 
 updateRosterDays()
 updateYellow()
 getElems("#shift-settings .dynamic-shift-row")
    .forEach(row => row.remove())
 updateShiftSettingTb()
 


}


function formatCellDate(date) {
  return date.toString().replace(/(?<=\d{4}).+/, "")
 .replace(/(\w+) (\w+) (\d+) (\d+)/, `$1, $3 $2 $4`)
 .replace(/\d{2}(?=\d{2})/, "")
}

getElem(".next-month").addEventListener("click", getNextMonth)
getElem("#next-month").addEventListener("click", getNextMonth)
getNextMonth()
getPresMonth()
function getNextMonth() {
  
  const newDate = new Date(chosenMonth.textContent)
  
  newDate.setMonth(newDate.getMonth()+1)
  chosenMonth.textContent = newDate.toLocaleDateString("en-ZA", {month:"long", year:"numeric"})
  resetShiftCount()
  clearShiftsBlocks();
  updateRosterDays()
  highlight()



 
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

getElem('.week-roster:nth-child(1) .row-number').addEventListener("input", updateWeekOneStartRowNum)
function updateWeekOneStartRowNum() {
  const rangeOne = getElem('.week-roster:nth-child(1) .row-number')
  if(rangeOne.value >999 || rangeOne.value == 0) {
      rangeOne.value = 2
      return
  }


  rosterDB.weekOneStartRowNo = rangeOne.value
  updateNewEmpRow()
  updateRanges()
  
}

weekTwoStartRowNum.addEventListener("input", updateWeekTwoStartRowNum) 

function updateWeekTwoStartRowNum() {
  rosterDB.weekTwoStartRowNo = getElem('.week-roster:nth-child(2) .row-number').value
 
}

function addEmpRow(event) {
 
 updateNewEmpRow()
 const rows = getElems(".week-roster:first-child .add-emp-row")
 const weekOneLastRowNo = getElem(".week-roster:first-child tr:last-child .row-number")


if ( weekOneLastRowNo.value >=  weekTwoStartRowNum.value-1) {

  alert(`Row ${weekTwoStartRowNum.value} cannot be less or equal to row ${weekOneLastRowNo.value}.The gap must be more than 2.`)

  return
}

 if (rows.length >= 20 ) {
    alert("Sorry, a limit has been to 20 rows")
    return
 }

//weekRoster
 const target = event.target.parentElement.parentElement
  target.insertAdjacentHTML("afterEnd", newEmpRow_1)
 
  const trIndex = [...getElems('.week-roster tr')].indexOf(target)
 for(let r = 1; r <getElems(".week-roster").length ; r++)     
     getElems(`.week-roster`)[r].rows[trIndex].insertAdjacentHTML("afterEnd", newEmpRow_1)

 updateNewEmpRow()

 const totalHoursTb = getElem("#total-hours-tb")
 const totalHoursRow = getElem("#total-hours-tb tr:has(.employee-name)").outerHTML

totalHoursTb.insertAdjacentHTML('beforeEnd', totalHoursRow)
updateYellow()
updateTotalHoursTb()



}

hours.onchange =()=> rosterDB.hours = hours.value
 
function updateYellow() {  

 if (!rosterDB?.shifts?.length) return;
  const totalHoursRow = getElems("#total-hours-tb tr:has(.employee-name)")
  const yellowTbBox = getElem("#yellow-tb-box")
 getElem("#yellow-tb-box").innerHTML = ""
  const yellowTB = `
        <table id="yellow-table">
          <tr>
             <th>Employee</th>
             <th>Sat</th>
             <th>Sun</th>
             <th class="off">OFF</th>
             <th>No. of Shifts</th>
          </tr>
         </table>`

   
   yellowTbBox.innerHTML = yellowTB
   yellowTable = getElem("#yellow-table")
  for(let s = rosterDB.shifts.length-1; s >=0 ; s-- ) {
    getElem("#yellow-table th:nth-child(1)")
    .insertAdjacentHTML('afterEnd',`<th>${rosterDB.shifts.map( ({shift}) => shift )[s]}</th>`)
  }



const YellowTbCols =  getElems("#yellow-table tr:first-child th")
const yellowTBtd ='<tr><td class="employee-name">emp</td>' +'<td>0</td>'.repeat(YellowTbCols.length-1)+'</tr>'

for(let y = 0; y < totalHoursRow.length; y++)
  yellowTable.insertAdjacentHTML("beforeEnd", yellowTBtd)
  yellowTable.insertAdjacentHTML('afterbegin', `<tr><th colspan="${getElems("#yellow-table tr:first-child th").length}">Yellow Table</th></tr>`)

YellowTbCols.forEach((th, x) => {

    if (x === 0) return;

    if (x > rosterDB.shifts.length) return;

    th.classList.add(`shift${x}`)
})

 updateTotalHoursTb()

 
}

function updateTotalHoursTb() {

  if ( !rosterDB.shifts.length ) return
  const totHrsRowEmps = getElems("#total-hours-tb .employee-name")
  const yellowTbEmps = getElems("#yellow-table .employee-name")
  
   for (let e = 0; e < totHrsRowEmps.length; e++) {
       const employee = getElems('.employee-name')[e].textContent
        totHrsRowEmps[e].textContent = employee
        yellowTbEmps[e].textContent = employee
      }

   getElem("#yellow-table").addEventListener("click", getYellowTableFormulas )
   
 
}
 
function removeEmpRow(event) {
 
  if(getElems(".week-roster:first-child .remove-emp-row").length == 1) {
     
    alert("Atleast one row is required.")
    
    return
  }
  const target = event.target.parentElement.parentElement

  const trIndex = [...getElems('.week-roster tr')].indexOf(target)

 for(let r = 1; r < getElems(".week-roster").length; r++) 
     getElems(`.week-roster`)[r].rows[trIndex].remove()
 target.remove()

  getElem("#total-hours-tb tr:has(.employee-name):last-child").remove()
  getElem('.row-number').value = rosterDB.weekOneStartRowNo 
  getElem('.week-roster:nth-child(2) .row-number').value = rosterDB.weekTwoStartRowNo
  updateNewEmpRow()
  updateTotalHoursTb()
}
updateNewEmpRow()
function updateNewEmpRow() {
    getElems(".add-emp-row").forEach( newEmpRow => newEmpRow.addEventListener("click", addEmpRow))
    getElems(".remove-emp-row").forEach( newEmpRow => newEmpRow.addEventListener("click", removeEmpRow))
    getElems(".range").forEach(rangeCell => rangeCell.previousElementSibling.addEventListener('click', getOneCellNum))
    getElem(`.week-roster:first-child .row-number`).addEventListener('input',  updateWeekSecondRowNo )
    getElem(`.week-roster:nth-child(2) .row-number`).addEventListener('input', updateWeekSecondRowNo)
    weekOneStartRowNum = getElem('.week-roster:nth-child(1) .row-number')
    weekTwoStartRowNum = getElem('.week-roster:nth-child(2) .row-number')
    updateRanges()
   
}

hours.addEventListener('change', validateHours)
 
function validateHours(event) {
  const hour = event.target
 
  const hr = hour.value 
    if (!/^(?:[1-9]|1[0-2])$/.test(hour.value)) {
          hour.value = 10;
    }
}
function getStandardShiftFormula() {

 if ( verifyMonth() ) return 
  const shifts = rosterDB.shifts.map(({shift}) => shift)
  const cellNum = cellValue.value
  const hr = hours.value 

  shiftValue.value = shifts.join("\n")
  let formula = '';
   for(let shift of shifts)
      formula+=`+countif(${cellNum}${delim.textContent}"${shift}")`

formulaResult.value = `=(${formula.replace('+','')})*${hr}`
copyFormula()
}

 

function getYellowTableFormulas(event) {
  if ( verifyMonth() ) return 
  const cell = event.target 
  if (cell.tagName !== "TD" ) return 

  const rowPos = {trNo: cell.parentElement.rowIndex, tdNo: cell.cellIndex}
  const yellowTbs = getElems(".week-roster:has(tr th.activeDate)")
  const tdCols = getElems(`#yellow-table tr:last-child td`)
  const yellowTb = (".week-roster:has(.activeDate)")
  let formula = '';
  formulaResult.value = '';
  cellValue.value = ""
  shiftValue.value = ""
  let cellRanges = ""



  if (rowPos.tdNo == 0 || cell.textContent == "SUM" ) return
     const shiftHeader = getElems("#yellow-table tr:first-child th")[rowPos.tdNo + 1]

if (!shiftHeader) return;
    const shift = shiftHeader.textContent
     shiftValue.value = shift

  if ( /Sat|Sun|No. of Shifts/.test(shift) ) {

     if(shift === "Sat") {
            
       shiftValue.value =  "Saturday"
        for( let r = 0; r < rosterConfig.totWeeksShown ; r++) {
           const posY = rowPos.trNo - 1
           const rangeY = getElems(`.week-roster tr:nth-child(${posY}) .range`)[r].textContent
           
           const firstChar = rangeY.match(/[A-Z]/)[0]
           const firstNum = rangeY.match(/[0-9]{1,}/g)[0]

           if (cols.indexOf(firstChar) <= 6 && r < rosterConfig.totWeeksShown-1)
              cellRanges += cols[6]+rangeY.match(/\d+/)[0]+','

           if ( rosterConfig.lastCellNum >=6 && r == rosterConfig.totWeeksShown-1)
               cellRanges += cols[6]+rangeY.match(/\d+/)[0]+','
            
          }
      }

    if(shift === "Sun") {
      shiftValue.value =  "Sunday"
          for( let r = 0; r < rosterConfig.totWeeksShown ; r++) {
           const posY = rowPos.trNo - 1
           const rangeY = getElems(`.week-roster tr:nth-child(${posY}) .range`)[r].textContent
           
           const firstChar = rangeY.match(/[A-Z]/)[0]
           const firstNum = rangeY.match(/[0-9]{1,}/g)[0]

           if (r < rosterConfig.totWeeksShown-1)
              cellRanges += cols[7]+rangeY.match(/\d+/)[0]+','

           if ( rosterConfig.lastCellNum >=7 && r === rosterConfig.totWeeksShown - 1)
               cellRanges += cols[7]+rangeY.match(/\d+/)[0]+','

       }
       
        
     }

  if(shift === "No. of Shifts") {
    const employee = getElem(`#yellow-table`).rows[rowPos.trNo].cells[0].textContent
     shiftValue.value += `\n1. In "No. of Shifts" cell for employee "${employee}", enter =sum( \n`
     shiftValue.value += `2. Press and hold ctrl key \n`
     shiftValue.value += `3. Click all cells (one by one) that have payable shifts (including Sick, leave) \n`
     shiftValue.value += `4. When you you are done, release ctrl key \n`
     shiftValue.value += `5. Close your = sum function by adding ) then press enter key\n`
     shiftValue.value += `eg. =sum(K16;L16;M16;N16;O16), your formula will differ based on the possition of your Yellow table  `
      
    return
   
    }
     
    cellRanges = cellRanges.replace(/\,$/,"")
    cellValue.value ="="+cellRanges

    cellRanges = cellRanges.split(',')

    for(let cellV of cellRanges)
        formula+=`+countifs(${cellV}${delim.textContent}"<>off"${delim.textContent} ${cellV}${delim.textContent} "<>")`


 }else{
     
  for( let r = 0; r < rosterConfig.totWeeksShown ; r++) {
      const posY = rowPos.trNo-1
      cellRanges += getElems(`.week-roster tr:nth-child(${posY}) .range`)[r].textContent
  }
  
    cellRanges = cellRanges.replace(/=/g, `${delim.textContent}`).replace(/\W/,"").split(delim.textContent)
    cellValue.value = cellRanges

    for(let cellV of cellRanges)
      formula+=`+countif(${cellV}${delim.textContent}"${shift}")`
}

  
  formulaResult.value = formula.replace('+','=')  
  copyFormula()

 

  
}
 

async function copyFormula() {
  const formula = formulaResult.value.trim();

  if (!formula) {
    alert("There is no formula to copy.");
    return;
  }

  try {
    await navigator.clipboard.writeText(formula);
     formula.select();
  } catch (error) {
     formulaResult.select()
     document.execCommand("copy")
  
  

  }
}

autoAddSavedEmpls()
function autoAddSavedEmpls() {
  if(!rosterDB?.employees) return

const existCols =getElems(`.week-roster:nth-child(1) tr:has(.row-number)`).length
const employeeLen = rosterDB?.employees.length  || 0
  for(let e = 0; e <employeeLen-existCols; e++)
    getElem("span.add-emp-row:first-child").click()
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
highlight()
function highlight() {

//startCellChar,C,startCellNum,2,lastCellChar,D,lastCellNum,3
for(let u = 2; u <= 10 ; u++ ) {
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
          table.rows[r].cells[u].style.background = "lightgrey"
   }  

}

for(let u = rosterConfig.lastCellNum+2; u < 9 ; u++ ) {
   for(let r = 2 ; r< getElems(`.week-roster:first-child tr`).length; r++)  
    getElem(`.week-roster:nth-child(${rosterConfig.totWeeksShown})`).rows[r].cells[u].style.background = "lightgrey"

}
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

  

    getElem("#allowanceTb")?.remove();

    const tables = [...getElems(".week-roster")];

    if (!tables.length) {
        return;
    }

    const nonFixedShifts = rosterDB.shifts.filter(
        shift => shift.isNonFixedShift === true
    );

    if (!nonFixedShifts.length) {
        alert("No non-fixed shifts available.");
        return;
    }

    clearShiftsBlocks();

 
 
 

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

        const value =
            shift.shiftRepeats?.[dayIndex]?.[weekIndex];

        const maximum = Number(value);

        return Number.isFinite(maximum) && maximum > 0
            ? maximum
            : 0;
    }


 
 

    function getShiftFromCell(cell) {

        if (!cell) {
            return null;
        }

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

        }

  

        else if (weekIndex > 0) {

            previousTable = tables[weekIndex - 1];
            previousDayIndex = 6;

        }


        else {

            return null;
        }


        const rowIndex = employeeIndex + 2;

        const row = previousTable?.rows[rowIndex];

        if (!row) {
            return null;
        }

        const cellIndex = previousDayIndex + 2;

        const cell = row.cells[cellIndex];

        if (!cell) {
            return null;
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
                );
            }


            for (const employee of randomEmployees) {

                const employeeIndex =
                    rosterDB.employees.indexOf(employee);

                if (employeeIndex === -1) {
                    continue;
                }


                const rowIndex =
                    employeeIndex + 2;

                const row =
                    table.rows[rowIndex];

                if (!row) {
                    continue;
                }


                const cell =
                    row.cells[cellIndex];

                if (!cell) {
                    continue;
                }


              
                // Don't overwrite fixed shifts
             

                const hasFixedShift =
                    rosterDB.shifts.some(shift =>
                        shift.isNonFixedShift !== true &&
                        cell.classList.contains(shift.shiftNo)
                    );

                if (hasFixedShift) {
                    continue;
                }


       

                if (cell.textContent.trim() !== "OFF") {
                    continue;
                }


                const allowed =
                    getAllowedShifts(
                        employee,
                        weekIndex,
                        dayIndex
                    );

                const previousShift =
                    getPreviousShift(
                        employeeIndex,
                        weekIndex,
                        dayIndex
                    );


         
                // Only shifts with available capacity
             
                let available =
                    allowed.filter(shift =>
                        (remaining.get(shift.shiftNo) ?? 0) > 0
                    );



                available =
                    available.filter(newShift =>
                        isShiftOrderAllowed(
                            previousShift,
                            newShift
                        )
                    );


                if (!available.length) {
                    continue;
                }


           
                // Randomly select valid shift
          

                const selectedShift =
                    available[
                        Math.floor(
                            Math.random() *
                            available.length
                        )
                    ];

 
                // Assign shift
           

                assignShift(
                    cell,
                    selectedShift
                );

 
                // Decrease remaining capacity
            

                remaining.set(
                    selectedShift.shiftNo,
                    remaining.get(selectedShift.shiftNo) - 1
                );

            }

        }

    });


    getEmployeesTotalHrs()
}
getElem("#other").addEventListener("click", clearShiftsBlocks)

function clearShiftsBlocks() {

    if (!rosterDB?.shifts?.length) {
        return;
    }

    const tables = [...getElems(".week-roster")];

    if (!tables.length) {
        return;
    }

  
 
    const nonFixedShiftNos = new Set(
        rosterDB.shifts
            .filter(shift => shift.isNonFixedShift === true)
            .map(shift => shift.shiftNo)
    );

 
    tables.forEach((table, weekIndex) => {
  

        for ( let rowIndex = 2; rowIndex < table.rows.length; rowIndex++ ) {

            const row = table.rows[rowIndex];

           

            if (!row) {
                continue;
            }

            for ( let dayIndex = 0; dayIndex < 7; dayIndex++ ) {

                

                if (weekIndex === 0 && dayIndex < Number(rosterConfig.startCellNum) - 1) {


                    continue;
                }


       
                if ( weekIndex === rosterConfig.totWeeksShown - 1 && dayIndex >  Number(rosterConfig.lastCellNum) - 1 ) {
  
                    continue;
                }


                const cellIndex = dayIndex + 2;

                const cell = row.cells[cellIndex];

                if (!cell) {
                    continue;
                } 

                    cell.textContent = "OFF";

                    cell.style.background = "rgb(65, 221, 125)";
                        

                    cell.style.color = "#000";
                     cell.style.cursor = ""

                    rosterDB.shifts.forEach( shift => cell.classList.remove(shift.shiftNo))
                           
              

             
            
            }
        }
    });
 
  
}

function getRandomNum(len) {
  return Math.floor(Math.random() * len)
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
          <input
            type="number"
            value="1"
            min="0"
            class="max-${day}"
          >
        </div>
      `).join("");
    };

    const shiftRow = `
      <tr class="dynamic-shift-row">
        <td class="${className}">${shiftName}</td>

        <td>
          <input
            type="checkbox"
            class="allowance"
            ${allowance ? "checked" : ""}
          >
        </td>

        <td>
          <input
            type="color"
            class="shift-color"
            value="${shiftColor}"
          >
          <input
            type="color"
            class="font-color"
            value="${fontColor}"
          >
        </td>

        <td>
          <input
            type="checkbox"
            class="non-fixed-shift"
            ${isNonFixedShift ? "checked" : ""}
          >
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
    const inputBox = getElem("#input-data")


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
      case "Shift Numbers":
          getElem("#shift-template-box").style.display = "block"
        break
      case "View Templates":
           alert("Not added yet")
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
        break
      case "Show Input/Output":
          getElem("#utility-icon").style.display = "none"
          inputBox.style.display = "block"
          target.textContent = "Hide Input/Output"
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
      case "Add Missing rows":
          addEmptyRowsAfterWeeks()
          target.remove()
        break;
       case "Manually Add Shifts":


          getElems("#yellow-table tr  th")
            .forEach(cell => { cell.addEventListener("click", getShift) })
            addShiftsManual()
            
            
            rosterConfig.stopAddShiftAddition = false 
            target.textContent = "Stop Shifts Additions"
            getElem("#yellow-table th:nth-child(2)").click()
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
        alert("                                               Version 3.1.1")
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
const className = row?.cells[0]?.classList[0];
 
if (!className) return;
 
const shiftIndex = rosterDB.shifts.findIndex(
({ shiftNo }) => shiftNo === className
);


 
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
          W ${index + 1}
          <input
            type="number"
            value="1"
            min="0"
            class="max-${day}"
          >
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
  if ( !rosterDB.shifts ) {
    alert("There is nothing to save.")
    return
  }


  restoreShiftSettingData()
  DB.save()
  alert("                Successfully saved!!!")
 
  }
 getElem("#delete-shift-settings").onclick = deleteSavedDB  

 function restoreShiftSettingData() {

    if (!rosterDB?.shifts) return

    const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]

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

        
        if (nonShiftFixed)
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
      const validateFileDate = Object.keys(db).includes("shifts")
      if (!validateFileDate) {
       alert("You selected incorrect file")
        return
      }
    rosterDB = db
    updateDB()
    
  }
  
  reader.onerror=()=>{
    alert("Something went wrong, try again.")
  }

  
  
}
 
function showUploaderBox() {
 getElem("#file-uploader").style.display = "block"
}
function updateDB() {

 restoreShiftSettingData()
 DB.save()
 location.reload()


}

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


    // Calculate employee huors
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
  for(let e = 0; e <rosterDB.employees.length; e++) {
    let satsCount = 0
    let sunsCount = 0
  
    const tbRowIndex = e + 2 
  tables.forEach((table, weekIndex) => {
        
        const satCell = table.rows[tbRowIndex].cells[7].textContent
        const sunCell = table.rows[tbRowIndex].cells[8].textContent

        satsCount += Number( weekendCount(satCell) ) 
        sunsCount += Number( weekendCount(sunCell) )
       
        
      })
      const rowStart = e
      const yellowTb = getElem("#yellow-table") 

      const cellIndex = yellowTb.rows[2].cells.length 
      yellowTb.rows[tbRowIndex].cells[cellIndex - 4 ].textContent = satsCount 
      yellowTb.rows[tbRowIndex].cells[cellIndex - 3].textContent = sunsCount 


  }
    function weekendCount(shiftValue) {

      const shifts = rosterDB.shifts.map(({shift})=>shift)

      return shifts.includes(shiftValue) ? 1 : 0 


 }
 
 const weekTables = getElems(".week-roster");
 const yellowTable = getElem("#yellow-table");
 
 if (getElem("#allowanceTb"))
     getElem("#allowanceTb").remove()
    
     const tb = document.createElement("table")
    tb.id="allowanceTb"
    tb.innerHTML += "<tr><th>Employees</th><th>Total HR</th><th>Allowance</th></tr>"
    yellowTable.insertAdjacentHTML('afterend', tb.outerHTML)
    const allowanceTb = getElem("#allowanceTb");



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


    let totalShiftCount = 0;

    shifts.forEach((shiftName, shiftIndex) => {

        const count = rowShifts.filter( shift => shift === shiftName).length;

    const cell = yellowTable.rows[startIndex].cells[shiftIndex + 1];

        if (cell) cell.textContent = count;
        

        totalShiftCount += count;
    });

    

    const cells = yellowTable.rows[startIndex].cells;
    const offCell = cells[cells.length-2]
    offCell.textContent = rowShifts.filter(shift => shift === "OFF").length

    const lastCell = cells[cells.length - 1];

    lastCell.textContent = totalShiftCount;



    updateShiftAllowance(emp, rowShifts)

});

function updateShiftAllowance(employee, rowShifts) {


  const allowanceShifts = rosterDB.shifts.filter(({allowance})=> allowance)
                         .map(({shift})=> shift ) 
  const allowanceCount = rowShifts.filter( shift => allowanceShifts.includes(shift)).length 

    const totalHoursTable = getElem("#total-hours-tb")
    const allowRowLen = getElem("#allowanceTb").rows.length
    const sumCell = totalHoursTable.rows[1+allowRowLen].cells[7].textContent
    

   allowanceTb.innerHTML += 
   `<tr>
      <td class="employee-name">${employee}</td>
      <td style="text-align:center">${sumCell}</td>
      <td>${allowanceCount}</td>
    </tr>`

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


updateUnallowedShifts() 
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




getElem("#view-templates").onclick =()=>{

  getElem("#shift-template-box").style.display = "block"
}

getElem("#shift-template-box").addEventListener("click", updateTemplates )

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

function updateTemplates(event) {
  const target = event.target
if (
  target.tagName !=="BUTTON"&&
  target.tagName !=="OPTION"&&
  target.tagName !=="SPAN"

) return 

  const templateInp = getElem("#template-name")
  const templateList = getElem("#days-weeks-template")
 // templateInp.value = target.tagName
  switch(target.textContent) {
    case "Add Present data as Template":

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
 
      const len = templateList.options.length 
      const newTemp = new Option(templateInp.value,templateInp.value )
      templateList.options[len] = newTemp
    
      break
       case "Reset":
        templateInp.value =""
      break
       case "Rename Template":

       const selectedID = templateList.selectedIndex



       if (templateList.options.length === 0 ) {
        alert("There is nothing to rename")
        return
       }

       if ( selectedID === -1 ) {
          alert("You did not selected template name to rename.")
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
       templateList.options[selectedID].value = templateInp.value
       templateList.options[selectedID].textContent = templateInp.value
   
      break
       case "Delete Template":
        const selectedId = templateList.selectedIndex
         templateList.options[selectedId].remove()
      break
       case "Use Selected Template":
      break
       case "Export Template":
      break
       case "Save Settings":
        saveData()
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

  }

  function isTemplateAvailable(tempName) {

      const options = [...templateList.options].map( opt => 
        opt.value.toLowerCase().replace(/\s*/g, ""))
     return options.includes(tempName)

  }

}

updateAllowedShifts()
function updateAllowedShifts() {

if (!rosterDB.unAllowedShiftOrder) return

const unallowedShiftOrder = getElem("#unallowed-order-shift")
    unallowedShiftOrder.length = 0
    rosterDB.unAllowedShiftOrder.forEach((shift, i)=> {
  
    const newItem = new Option(shift, shift)
    unallowedShiftOrder.options[i] = newItem
    
  })

}

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

if(rosterDB.shifts) {
  restoreShiftSettingData()
  rosterPeople()
 

}
 

 
