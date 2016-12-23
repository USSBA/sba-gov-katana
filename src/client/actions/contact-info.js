export function createContactInfo(contactInfoData){
    return {
        type: "CREATE_CONTACT_INFO",
        contactInfoData: contactInfoData
    };
}