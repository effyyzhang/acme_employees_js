const employees = [
    { id: 1, name: 'moe'},
    { id: 2, name: 'larry', managerId: 1},
    { id: 4, name: 'shep', managerId: 2},
    { id: 3, name: 'curly', managerId: 1},
    { id: 5, name: 'groucho', managerId: 3},
    { id: 6, name: 'harpo', managerId: 5},
    { id: 8, name: 'shep Jr.', managerId: 4},
    { id: 99, name: 'lucy', managerId: 1}
  ];

const spacer = (text)=> {
if(!text){
    return console.log('');
}
const stars = new Array(5).fill('*').join('');
console.log(`${stars} ${text} ${stars}`);
}

const findEmployeeByName = (name, arr) => {
    const targetEmployee = arr.filter(employee => employee.name.toLowerCase() === name.toLowerCase());
    return targetEmployee[0];
}

const findEmploeeById = (id, arr) => {
    const targetEmployee = arr.filter(ele => ele.id === id);
    return targetEmployee[0];
}

const findManagerFor = (employee, arr) => {
    const targetManagerId = employee.managerId;
    return findEmploeeById(targetManagerId, arr);
}

const findCoworkersFor = (employee, arr) => {
    const targetManagerId = employee.managerId;
    const coworkers = [];
    arr.map(ele => {
        if(ele.managerId === targetManagerId && ele.name !== employee.name){
            coworkers.push(ele);
        };
    });
    return coworkers;
}

const findManagementChainForEmployee = (employee, arr) => {
    let managers = [];
    function findManagerChain(employee, arr){
        if(!employee.managerId){
            return managers;
        }
        const manager = findManagerFor(employee, arr)
        managers.push(manager)
        return findManagerChain(manager, arr) 
    }

    if(!employee.managerId){
        return [];
    }
    else{
        return findManagerChain(employee, arr)
    }
}
    
    


  spacer('findEmployeeByName Moe')
// given a name and array of employees, return employee
console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
spacer('')

spacer('findManagerFor Shep')
//given an employee and a list of employees, return the employee who is the manager
console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }
spacer('')

spacer('findCoworkersFor Larry')

//given an employee and a list of employees, return the employees who report to the same manager
console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));/*
[ { id: 3, name: 'curly', managerId: 1 },
  { id: 99, name: 'lucy', managerId: 1 } ]
*/

spacer('');

spacer('findManagementChain for moe')
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager 
console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));//[  ]
spacer('');

spacer('findManagementChain for shep Jr.')
console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));/*
[ { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 }]
*/
spacer('');


