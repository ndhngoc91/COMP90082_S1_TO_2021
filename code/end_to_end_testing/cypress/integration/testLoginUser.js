export const testLoginUser = [
    {
        summary: "Login as customer successfully",
        username:"test0",
        password:"123456sS"
    },
    {
        summary: "Login failed for the wrong password",
        username:"user1",
        password:"iTesting"
    },
    {
        summary: "Login as staff successfully",
        username:"ruby",
        password:"squizz"
    },
    {
        summary: "Login failed for the unexisted username",
        username:"hello",
        password:"123456"
    },
]