db.runCommand({ collMod: "students",
   validator: { $jsonSchema: {
      bsonType: "object",
      required: [ "id", "lastname", "firstname", "email", "phone", "validated", "admin" ],
      properties: {
         id: {
            bsonType: "int",
            description: "must be an int and is required"
         },
         lastname: {
            bsonType: "string",
            description: "must be a string and is required"
         },
         firstname: {
            bsonType: "string",
            description: "must be a string and is required"
         },
         email: {
            bsonType : "string",
            pattern : "^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$",
            description: "must be a string and match the regular expression pattern and is required"
         },
         phone: {
            bsonType : "string",
            pattern : "^(0[1-68])(?:[ _.-]?(\d{2})){4}$",
            description: "must be a string and match the regular expression pattern and is required"
         },
         validated: {
            enum: [ "in progress", "validated", "rejected" ],
            description: "can only be one of the enum values and is required"
         },
         admin: {
            bsonType : "bool",
            description: "can only be a boolean and is required"
         }
      }
   } },
   validationLevel: "strict",
   validationAction: "error"
})