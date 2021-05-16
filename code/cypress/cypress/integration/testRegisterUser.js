export const testRegisterUser = [
    {
        summary: "Register as customer successfully",
        username:"test0",
        password:"123456sS",
        phone: "0402011031",
        email:"test0@gmail.com",
        firstName:"Yue",
        lastName:"Yue",
        birthday:"2021-05-15",
        gender:"female",
        addressLine:"48 Bouverie St",
        state:'VIC',
        city:"Melbourne",
        postcode:"3053",
        confirmPSW:"squizzsS",
    },
    {
        summary: "Register failed for the wrong format password",
        username:"test1",
        password:"litesting",
        phone: "0402011031",
        email:"test1@gmail.com",
        firstName:"Yue",
        lastName:"Yue",
        birthday:"2021-05-15",
        gender:"female",
        addressLine:"48 Bouverie St",
        state:'VIC',
        city:"Melbourne",
        postcode:"3053",
        confirmPSW:"litesting",
    },
    {
        summary: "Register failed for different password",
        username:"test1",
        password:"123456sS",
        phone: "0402011031",
        email:"test2@gmail.com",
        firstName:"Yue",
        lastName:"Yue",
        birthday:"2021-05-15",
        gender:"female",
        addressLine:"48 Bouverie St",
        state:'VIC',
        city:"Melbourne",
        postcode:"3053",
        confirmPSW:"squizzsS",
    },
    {
        summary: "Register failed for the wrong format email",
        username:"test1",
        password:"123456sS",
        phone: "0402011031",
        email:"test3",
        firstName:"Yue",
        lastName:"Yue",
        birthday:"2021-05-15",
        gender:"female",
        addressLine:"48 Bouverie St",
        state:'VIC',
        city:"Melbourne",
        postcode:"3053",
        confirmPSW:"123456sS",
    },
    {
        summary: "Register failed for forgetting to write the phone",
        username:"test1",
        password:"123456sS",
        phone: "",
        email:"test4@gmail.com",
        firstName:"Yue",
        lastName:"Yue",
        birthday:"2021-05-15",
        gender:"female",
        addressLine:"48 Bouverie St",
        state:'VIC',
        city:"Melbourne",
        postcode:"3053",
        confirmPSW:"123456sS",
    },
    {
        summary: "Register failed for the existed username",
        username:"user1",
        password:"123456sS",
        phone: "0402011031",
        email:"xxx@gmail.com",
        firstName:"Yue",
        lastName:"Yue",
        birthday:"2021-05-15",
        gender:"female",
        addressLine:"48 Bouverie St",
        state:'VIC',
        city:"Melbourne",
        postcode:"3053",
        confirmPSW:"123456sS",
    },
]

export const testRegisterStaff = [
    {
        summary: "Register as staff successfully",
        username:"test2",
        phone: "0402011031",
        email:"test5@gmail.com",
        password:"123456sS",
        confirmPSW:"123456sS",
    },
    {
        summary: "Register failed for the wrong format password",
        username:"test3",
        phone: "0402011031",
        email:"test5@gmail.com",
        password:"litesting",
        confirmPSW:"litesting",
    },
    {
        summary: "Register failed for the wrong format email",
        username:"test3",
        phone: "0402011031",
        email:"test6",
        password:"123456sS",
        confirmPSW:"123456sS",
    },
    {
        summary: "Register failed for forgetting to write the email",
        username:"test3",
        phone: "0402011031",
        email:"",
        password:"123456sS",
        confirmPSW:"123456sS",
    },
    {
        summary: "Register failed for the existed username",
        username:"ruby",
        phone: "0402011031",
        email:"test5@gmail.com",
        password:"123456sS",
        confirmPSW:"123456sS",
    },
]