var user = function (login, password) {
    //conver to lowercase and trip spaces from start ad from the end of login as user my do such errors
    login = login.toLowerCase().trim();

    if (login == 'arshak' & password == 123654) {
        return "You are Logged in";
    } else {
        return "LogIn or Password is wrong";
    }

}

module.exports = user;