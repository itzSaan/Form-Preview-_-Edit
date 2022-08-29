//Multiple inputs

var skillsInput = document.getElementById('skills');
var skills = new Choices(skillsInput, {allowHTML: true})
var locationInput = document.getElementById('location')
var locations = new Choices(locationInput, { allowHTML: true})


let fileInput = document.getElementById('fileInput')
let activities = document.getElementsByName("activities") 
let industriesInput = document.getElementById('industries')
let mobileInput = document.getElementById('mobile')
let zipCodeInput = document.getElementById('zipCode')
let fundingInput = document.getElementsByName('funding')
let budgetInput = document.getElementById('budget')
let companyInput = document.getElementById('company')
let editBtn = document.getElementById('edit')

let formWrap = document.getElementById('formWrap')
let form = document.getElementById('form')

let formHtml = formWrap.innerHTML


  let formData = []
  
form.addEventListener('submit', e => {
      e.preventDefault()
      updateData()
      preveiwData()
    })
    
let updateData = () => {
      
      let activityData = []
      activities.forEach(item => {
        if(item.checked) {
          activityData.push(item.value)
          console.log('button clicked!')
    }   
  })
  // console.log(industriesInput.value)
  let locationArr = []
  locations._prevState.items.forEach(item => {
    locationArr.push(item.value)
  })
  funding = ""
  fundingInput.forEach(item => {
    if(item.checked) {
      funding = item.value
    }
  })
  skillList = []
  skills._prevState.items.forEach(item =>{
    skillList.push(item.value)
  })
  
  formData.push({
      "profileImage": fileInput.files,
      "activities": activityData,
      "industries": industriesInput.value,
      "location": locationArr,
      "mobile": mobileInput.value,
      "zipcode": zipCodeInput.value,
      "funding": funding,
      "budget": budgetInput.value,
      "company": companyInput.value,
      "skills": skillList
  })

  localStorage.setItem('formdata', JSON.stringify(formData))

}

console.log(formData)

let preveiwData = () => {

  let previewForm = `
  <form>
  <div class="profile-img-wrap">
  <img src="" id="profileImage" alt="" class="profile-img">
  
</div>
<h2 class="full-name">Bhavin Bhagat</h2>
<div class="grid-wrap">
  <div class="business-section">
      <h4 class="section-title">Business Intrests</h4>
      <div class="input-wrap">
          <div class="col col-4">
              <span class="label">activities</span>
          </div>
          <div class="col col-6">                                
           <span class="result">${formData[0].activities.join(', ')}</span>        
          </div>
      </div>
      <div class="input-wrap">
          <div class="col col-4">
              <span class="label">industries</span>
          </div>
          <div class="col col-6">
          <span class="result">${formData[0].industries}</span> 
          </div>                            
      </div>
      <div class="input-wrap">
          <div class="col col-4">
              <span class="label">Location</span>                                
          </div>
          <div class="col col-6">
          <span class="result">${formData[0].location.join(', ')}</span> 
      </div>
      </div> 
  </div>
  
  <div class="personal-section">
      <h4 class="section-title">Personal</h4>
      <div class="input-wrap">
          <div class="col col-4">
              <span class="label">Mobile</span>                                 
          </div>
          <div class="col col-6">
          <span class="result">${formData[0].mobile}</span> 
          </div> 
      </div>
      <div class="input-wrap">
          <div class="col col-4">
              <span class="label">Zip Code</span>                               
          </div>
          <div class="col col-6">
          <span class="result">${formData[0].zipcode}</span> 
          </div>                          
      </div>                    
  </div>

  <div class="financial-section">
      <h4 class="section-title">Financial</h4>
      <div class="input-wrap">
          <div class="col col-4">                              
              <span class="label">Funding source</span>
          </div>
          <div class="col col-6">                                                            
          <span class="result">${formData[0].funding}</span> 
          </div>                             
      </div>
      <div class="input-wrap">
          <div class="col col-4">                               
              <span class="label">Budget</span>
          </div>
          <div class="col col-6">
          <span class="result">${formData[0].budget}</span> 
          </div>                            
      </div>
  </div>

  <div class="professional-section">
      <h4 class="section-title">Professional</h4>
      <div class="input-wrap">
          <div class="col col-4">       
              <span class="label">Company name</span>  
          </div>
          <div class="col col-6">
          <span class="result">${formData[0].company}</span> 
          </div>
      </div>
      <div class="input-wrap">
          <div class="col col-4">                                                              
              <span class="label">Skills</span>
          </div>
          <div class="col col-6">
          <span class="result">${formData[0].skills.join(', ')}</span>                          
      </div>
  </div>

</div>
</form>
  `

  formWrap.style.visibility = 'hidden'
  document.getElementById('preview').innerHTML = previewForm
  document.getElementById('preview').style.visibility = 'visible'


}

editBtn.addEventListener('click', () => {

  formWrap.style.visibility = 'visible'
  document.getElementById('preview').style.visibility = 'hidden'
   
  
  let data = JSON.parse(localStorage.getItem('formdata'))
    
  if(formData) {

    
    activities.forEach(item => {
      // debugger
      let a = formData[0].activities
      for(let i = 0; i < a.length; i++) {
        if(item.value == a[i]){
          item.checked = true
        }
      }
    })
    
    industriesInput.value = formData[0].industries
    locations.destroy()
    locations = new Choices(locationInput, {allowHTML: true})
    locations.setValue(formData[0].location)
    mobileInput.value = formData[0].mobile
    zipCodeInput.value = formData[0].zipcode
    fundingInput.forEach(item => {
      if(formData[0].funding == item.value) {
        item.checked = true
      }
    })
    budgetInput.value = formData[0].budget
    companyInput.value = formData[0].company
    skills.destroy()
    skills = new Choices(skillsInput, {allowHTML: true})
    skills.setValue(formData[0].skills)
  }

  // updateData()
  
})

