let currentStep = 0;
const formSteps = document.querySelectorAll('.form-step')
const form = document.querySelector("form");



/* steps */

form.addEventListener('click', (event) => {
  if(!event.target.matches('[data-action]')){
    return
  }

  const actions = {
    next() {
      if(!isValidInputs()) {
        return
      }
      currentStep++
      
    },
    prev() {

      currentStep--

    }
  }

  const action = event.target.dataset.action 
  actions[action]()



  updatedActiveStep()
  updatedProgressStep()
})



/* form submit */
form.addEventListener('submit', (event) => {
  event.preventDefault();


  const data = new FormData(form)

  for(let [key, value] of data) {
    console.log(key, value)
  }

  alert(`Obrigado ${data.get('name')}!`)
});

function updatedActiveStep() {
  formSteps.forEach(step => {
    step.classList.remove('active');
  })
  formSteps[currentStep].classList.add('active');
}

const progressStep = document.querySelectorAll('.step-progress [data-step]')
function updatedProgressStep() {
  progressStep.forEach((step, index) => {
    step.classList.remove('active');
    step.classList.remove('done');

    

    if(index < currentStep + 1 ) {
      step.classList.add('active')
    }

    if(index < currentStep) {
      step.classList.add('done')
    }
  })
}

/* validation */

function isValidInputs() {
  const currentFormStep = formSteps[currentStep];
  const formFields = [...currentFormStep.querySelectorAll('input'), ...currentFormStep.querySelectorAll('textarea')]

  return formFields.every((input) => input.reportValidity())
}


/* animation */

formSteps.forEach(formStep => {
  function addHide() {
    formStep.classList.add('hide')
  }

  formStep.addEventListener('animationend', () => {
    addHide()
    formSteps[currentStep].classList.remove('hide')
  })
})