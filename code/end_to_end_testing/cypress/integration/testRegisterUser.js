export const testRegisterUser = [
    {
        summary: "Register as customer successfully",
        username: "test0",
        password: "123456sS",
        phone: "0402011031",
        email: "test0@gmail.com",
        firstName: "Yue",
        lastName: "Yue",
        birthday: '1996-06-05',
        gender: "Female",
        addressLine: "48 Bouverie St",
        state: 'VIC',
        city: "Melbourne",
        postcode: "3053",
        confirmPSW: "123456sS",
    },
    {
        summary: "Register as customer successfully",
        username: "test9",
        password: "123456sS",
        phone: "0402011031",
        email: "test9@gmail.com",
        firstName: "Yue",
        lastName: "Yue",
        birthday: '1996-06-05',
        gender: "Female",
        addressLine: "48 Bouverie St",
        state: 'VIC',
        city: "Melbourne",
        postcode: "3053",
        confirmPSW: "123456sS",
    },
    {
        summary: "Register failed for the wrong format password",
        username: "test1",
        password: "litesting",
        phone: "0402011031",
        email: "test1@gmail.com",
        firstName: "Yue",
        lastName: "Yue",
        birthday: '1996-06-05',
        gender: "Female",
        addressLine: "48 Bouverie St",
        state: 'VIC',
        city: "Melbourne",
        postcode: "3053",
        confirmPSW: "litesting",
    },
    {
        summary: "Register failed for different password",
        username: "test2",
        password: "123456sS",
        phone: "0402011031",
        email: "test2@gmail.com",
        firstName: "Yue",
        lastName: "Yue",
        birthday: '1996-06-05',
        gender: "Female",
        addressLine: "48 Bouverie St",
        state: 'VIC',
        city: "Melbourne",
        postcode: "3053",
        confirmPSW: "squizzsS",
    },
    {
        summary: "Register failed for the wrong format email",
        username: "test3",
        password: "123456sS",
        phone: "0402011031",
        email: "test3",
        firstName: "Yue",
        lastName: "Yue",
        birthday: '1996-06-05',
        gender: "Female",
        addressLine: "48 Bouverie St",
        state: 'VIC',
        city: "Melbourne",
        postcode: "3053",
        confirmPSW: "123456sS",
    },
    {
        summary: "Register failed for the existed email",
        username: "test4",
        password: "123456sS",
        phone: "0402011031",
        email: "mail2@gmail.com",
        firstName: "Yue",
        lastName: "Yue",
        birthday: '1996-06-05',
        gender: "Female",
        addressLine: "48 Bouverie St",
        state: 'VIC',
        city: "Melbourne",
        postcode: "3053",
        confirmPSW: "123456sS",
    },
    {
        summary: "Register failed for the existed username",
        username: "user1",
        password: "123456sS",
        phone: "0402011031",
        email: "xxx@gmail.com",
        firstName: "Yue",
        lastName: "Yue",
        birthday: '1996-06-05',
        gender: "Female",
        addressLine: "48 Bouverie St",
        state: 'VIC',
        city: "Melbourne",
        postcode: "3053",
        confirmPSW: "123456sS",
    }
];

export const testRegisterStaff = [
    {
        summary: "Register as staff successfully",
        username: "test5",
        phone: "0402011031",
        email: "test5@gmail.com",
        firstName: "Yue",
        lastName: "Yue",
        password: "123456sS",
        confirmPSW: "123456sS",
    },
    {
        summary: "Register failed for the wrong format password",
        username: "test6",
        phone: "0402011031",
        email: "test6@gmail.com",
        firstName: "Yue",
        lastName: "Yue",
        password: "litesting",
        confirmPSW: "litesting",
    },
    {
        summary: "Register failed for the wrong format email",
        username: "test7",
        phone: "0402011031",
        email: "test7",
        firstName: "Yue",
        lastName: "Yue",
        password: "123456sS",
        confirmPSW: "123456sS",
    },
    {
        summary: "Register failed for the existed email",
        username: "test8",
        phone: "0402011031",
        email: "mail1@gmail.com",
        firstName: "Yue",
        lastName: "Yue",
        password: "123456sS",
        confirmPSW: "123456sS",
    },
    {
        summary: "Register failed for the existed username",
        username: "ruby",
        phone: "0402011031",
        email: "test5@gmail.com",
        firstName: "Yue",
        lastName: "Yue",
        password: "123456sS",
        confirmPSW: "123456sS",
    }
];
