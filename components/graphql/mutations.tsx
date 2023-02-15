export const updateUserData = `mutation updateUserData($address: inputAddressDetails, $contact: inputContactDetails, $firstname: String, $lastname: String, $preferences: inputUserPreferences) {
  updateUserDetails(address: $address, contact: $contact, firstname: $firstname, lastname: $lastname, preferences: $preferences) {
    address {
      postcode
      province
      streetAddress
      streetNumber
      suburb
    }
    contact {
      email
      phoneNumber
      telephoneNumber
    }
    firstname
    lastname
    preferences {
      mfa
      sendAppNotification
      sendEmail
      sendSms
    }
  }
}`;

export const addNewVehicle = `mutation updateVehicleDetails($model: String, $model_id: String, $regestrationNumber: String, $servicePlan: String, $vinNumber: String!) {
  updateVehicleDetails(vehicles: {model: $model, model_id: $model_id, regestrationNumber: $regestrationNumber, servicePlan: $servicePlan, vinNumber: $vinNumber}) {
    model
    model_id
    model_url
    regestrationNumber
    servicePlan
    vinNumber
  }
}`;
