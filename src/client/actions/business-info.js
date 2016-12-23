export function createBusinessInfo(businessInfoData){
    return {
        type: "CREATE_BUSINESS_INFO",
        businessInfoData: businessInfoData
    };
}