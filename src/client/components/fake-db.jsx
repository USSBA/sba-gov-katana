const delay = (ms) =>
new Promise(resolve => setTimeout(resolve, ms));

export const matchFormData = (formData) =>
    delay(500).then(() =>{
        console.log("Returning data from the server....");
        return 'MATCH';
    });