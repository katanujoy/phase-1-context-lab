function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateStamp) {
    try {
        const [date, hour] = dateStamp.split(' ');
        if (!date || !hour) throw new Error();
        
        employee.timeInEvents.push({
            type: "TimeIn",
            hour: parseInt(hour, 10),
            date
        });
        return employee;
    } catch(e) {
        throw new Error("Invalid dateStamp provided");
    }
}

function createTimeOutEvent(employee, dateStamp) {
    try {
        const [date, hour] = dateStamp.split(' ');
        if (!date || !hour) throw new Error();
        
        employee.timeOutEvents.push({
            type: "TimeOut",
            hour: parseInt(hour, 10),
            date
        });
        return employee;
    } catch(e) {
        throw new Error("Invalid dateStamp provided");
    }
}

function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(e => e.date === date);
    const timeOut = employee.timeOutEvents.find(e => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, e) => 
        total + wagesEarnedOnDate(employee, e.date), 0);
}

function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(employee => 
        employee.firstName === firstNameString);
}

function calculatePayroll(employees) {
    return employees.reduce((total, emp) => 
        total + allWagesFor(emp), 0);
}