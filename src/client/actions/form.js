export function submitFormData(formData){
    console.log(formData)
    return {
        type: "SUBMIT_FORM_DATA",
        formData: formData
    }
}

