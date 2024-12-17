const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AZZJ0DoZOWKQGEBrv3jPWJ-uCe8E5_SeIaixf9yUbf_hxPsjo6nKmtjTtjll1WowJZw7ps-ot8K6ps91",
  client_secret:
    "ENZdywhzC_UH1zQALg39ZF_1f33t2S1y7i8JgEQzz6gNrLDf6Y82T1a5gCQpKdY7lf89KPSopGchERnz",
});

module.exports = paypal;
