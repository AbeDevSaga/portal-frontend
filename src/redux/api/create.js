// curl --location 'http://168.231.109.155:8083/api/v1/marriage/create' \
// --form 'data="
const data={
  \"wifeWetnessTwo\": \"d0a09819-4b8a-4a8f-8552-31d79e3302cb\",
  \"marriageLocalization\": [
    {
      \"languageCode\": \"en\",
      \"marriageDate\": \"2025-08-28\",
      \"marriageType\": \"NATIONAL\",
      \"reason\": \"string\"
    }
  ],
  \"husbandWetnessOne\": \"d0a09819-4b8a-4a8f-8552-31d79e3302cb\",
  \"registryOfficeId\": \"3fa85f64-5717-4562-b3fc-2c963f66afa6\",
  \"husbandWetnessTwo\": \"d0a09819-4b8a-4a8f-8552-31d79e3302cb\",
  \"vitalEventsRequest\": {
    \"requesterId\": \"d0a09819-4b8a-4a8f-8552-31d79e3302cb\",
    \"eventType\": \"MARRIAGE\",
    \"status\": \"NEW\",
    \"oldRequesterId\": null,
    \"localisation\": [
      {
        \"languageCode\": \"en\",
        \"submissionDate\": \"2025-08-29\"
      }
    ]
  },
  \"wifeId\": \"d0a09819-4b8a-4a8f-8552-31d79e3302cb\",
  \"husbandId\": \"d0a09819-4b8a-4a8f-8552-31d79e3302cb\",
  \"wifeWetnessOne\": \"d0a09819-4b8a-4a8f-8552-31d79e3302cb\"
}
  // "
// ;type=application/json' \
// --form 'supportingDoc=@"/home/feyisso/Downloads/PT20726~.pdf"'