const Nummber = "545395734"
const Nummer_Regex = /^\d+$/ //only valid to nummbers like "53454932057483" not working on .9
const Uppercase_Letter_Regex = /^[A-Z]+$/
const Lowercase_Letter_Regex = /^[a-z]+$/

if (Nummer_Regex.test(Nummber)) {
    console.log("valid")
} else {
    console.log("invalid")
}