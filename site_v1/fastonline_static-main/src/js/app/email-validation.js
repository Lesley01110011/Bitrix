const input = document.querySelector("input")
const maskEmail = new RegExp('^([A-Za-z0-9_-]+\\.)*[A-Za-z0-9_-]+@[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*\\.[A-Za-z]{2,6}$')
input.addEventListener('change', () => {
  if(maskEmail.test(input.value)) {
    console.log("valid")
  }
  else {
    console.log("you are such a dump")
  }
})