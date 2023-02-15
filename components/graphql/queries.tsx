export const getUserData = `query getUserData {
  getUserDetails {
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

export const getVehicleModels = `query getVehicleModels {
  getVehicleModels {
    label
    value
  }
}
`;

export const getVehicleDetails = `query getVehicleDetails {
  getVehicleDetails {
    dataBalance
    model
    trim
    year
    model_url
    regestrationNumber
    servicePlan
    vinNumber
    serviceHistory {
      dateTime
      dealerId
      mileage
    }
  }
}`;

export const getVehicleModelTrims = `query getVehicleModelTrims($modelName: String!) {
  getVehicleModelTrims(modelName: $modelName) {
    label
    value
  }
}`;
