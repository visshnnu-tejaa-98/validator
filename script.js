let inputEmail = document.getElementById("inputEmail")
let inputMobile = document.getElementById("inputMobile")
let inputCountry = document.getElementById("inputCountry")
let email = document.getElementById("email")
let carrier = document.getElementById("carrier")
let countryCode = document.getElementById("country-code")
let countryPrefix = document.getElementById("country-prefix")
let type = document.getElementById("type")
let internationalFormat = document.getElementById("international-format")
let localFormat = document.getElementById("local-format")
let locationState = document.getElementById("location-state")
console.log(inputEmail)
console.log(inputCountry)
async function getData(){
    let apiResponse = await fetch("https://restcountries.eu/rest/v2/all")
    let apiData = await apiResponse.json()
    // console.log(apiData)
    for(let i=0;i<apiData.length;i++){
        let option = document.createElement("option")
        option.value = apiData[i].alpha2Code
        option.innerHTML = apiData[i].name
        inputCountry.appendChild(option)
        // console.log(apiData[i].alpha2Code)
    }
}

getData()

let button = document.getElementById("submit")
button.addEventListener("click",function(e){
    e.preventDefault()
    console.log(inputEmail.value)
    // console.log(inputCountry.value)
    // console.log(inputMobile.value)
    async function getData(){
        let apiemailResponse = await fetch(`https://apilayer.net/api/check?access_key=8aad99f6ef0f0daf1357fcd550f5c8a0&email=${inputEmail.value}&smtp=1&format=1`)
        let apiemailData = await apiemailResponse.json()
        let emailStatus;
        if(apiemailData.format_valid===true && apiemailData.mx_found===true && apiemailData.smtp_check===true){
            emailStatus = true
        }else{
            emailStatus = false
        }
        // console.log(apiemailData)
        let apiMobileResponse = await fetch(`https://apilayer.net/api/validate?access_key=3b0839cb885371c57b9fcdd9a6c0e31d&number=${inputMobile.value}&country_code=${inputCountry.value}`)
        let apiMobileData = await apiMobileResponse.json()
        let mobileStatus = apiMobileData.valid
        console.log(mobileStatus)
        console.log(apiMobileData)

        let result = document.getElementById("result")
        if(emailStatus===true && mobileStatus===true){
            result.classList.add("text-success")
            result.innerHTML = "Email and Mobile are Valid"
        }else if(emailStatus && mobileStatus===false){
            result.classList.add("text-danger")
            result.innerHTML = "Email Valid But not Mobile"
        }else if(emailStatus===false && mobileStatus){
            result.classList.add("text-danger")
            result.innerHTML = "Mobile Valid but not Email"
        }
        
        email.innerHTML = inputEmail.value
        carrier.innerHTML = apiMobileData.carrier
        countryCode.innerHTML = apiMobileData.country_code
        countryPrefix.innerHTML = apiMobileData.country_prefix
        type.innerHTML = apiMobileData.line_type
        internationalFormat.innerHTML = apiMobileData.international_format
        localFormat.innerHTML = apiMobileData.local_format
        locationState.innerHTML = apiMobileData.location
    }
    getData()

})
