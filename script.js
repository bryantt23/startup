class Employee {
  #earnings;
  constructor(name, title) {
    this.name = name;
    this.title = title;
    this.#earnings = 0;
  }

  get earnings() {
    return this.#earnings;
  }

  pay(amount) {
    this.#earnings += amount;
  }
}

class Startup {
  constructor(name, funding, salaries) {
    this.name = name;
    this.funding = funding;
    this.salaries = salaries;
    this.employees = [];
  }

  isValidTitle(title) {
    return Object.keys(this.salaries).some(key => {
      return key === title;
    });
  }

  merger(startup) {
    if (this.funding > startup.funding) {
      return true;
    }

    return false;
  }

  hire(name, title) {
    if (!this.isValidTitle(title)) {
      return new Error('Invalid title');
    } else {
      this.employees.push(new Employee(name, title));
    }
  }

  get size() {
    return this.employees.length;
  }

  payEmployee(employee) {
    const employeeEarning = this.salaries[employee.title];
    if (this.funding >= employeeEarning) {
      this.funding -= employeeEarning;
      // debugger;
      employee.pay(employeeEarning);
      return `${employee.name} was paid ${employeeEarning}`;
    } else {
      return new Error('Not enough funding');
    }
  }

  payDay() {
    this.employees.forEach(employee => {
      console.log(this.payEmployee(employee));
    });
  }

  averageSalary() {
    return (
      this.employees.reduce((acc, emp) => {
        return acc + this.salaries[emp.title];
      }, 0) / this.employees.length
    );
  }

  close() {
    this.employees = [];
    this.funding = 0;
  }

  acquire(startup) {
    this.funding += startup.funding;
    Object.entries(startup.salaries).forEach(acquiredSalary => {
      const [title, salary] = acquiredSalary;
      if (!Object.keys(this.salaries).includes(title)) {
        this.salaries[title] = salary;
      }
    });

    startup.employees.forEach(employee => {
      this.hire(employee.name, employee.title);
    });

    startup.close();
  }
}

const employee = new Employee('Shaggy', 'Junior Developer');
console.log(employee);
employee.pay(42);
employee.pay(50);
console.log(employee);

let salaries = {
  CEO: 5000,
  CTO: 4200,
  'Software Engineer': 3000,
  'Junior Developer': 2400
};
const startup_1 = new Startup('Mystry Machinr', 22000, salaries);
console.log(startup_1);

salaries = {
  CEO: 4800,
  CTO: 3800,
  Pilot: 2500
};
const startup_2 = new Startup('Planet Express', 30000, salaries);

/*
console.log(startup_2);

console.log(true, startup_1.isValidTitle('CTO'));
console.log(true, startup_1.isValidTitle('Software Engineer'));
console.log(false, startup_1.isValidTitle('Programmer'));
console.log(false, startup_1.isValidTitle('Designer'));

console.log(true, startup_2.merger(startup_1));
console.log(false, startup_1.merger(startup_2));
// console.log(startup_1.hire('Scooby', 'Designer'));
console.log(startup_1);
const ceo = new Employee('Scooby', 'CEO');
console.log(startup_1.hire(ceo.name, ceo.title));
startup_1.hire('Velma', 'CTO');
console.log(JSON.stringify(startup_1));
console.log(startup_1.size);
startup_1.payEmployee(ceo);
console.log(JSON.stringify(startup_1));
console.log(JSON.stringify(ceo));
console.log(ceo.earnings);
startup_1.payDay();
console.log(JSON.stringify(startup_1));
*/

startup_1.hire('Scooby', 'CEO');
startup_1.hire('Velma', 'CTO');
startup_1.hire('Daphne', 'Software Engineer');
startup_1.hire('Fred', 'Software Engineer');
startup_2.hire('Professor Farnsworth', 'CEO');
startup_2.hire('Fry', 'Pilot');
console.log(3800, startup_1.averageSalary());
// console.log(startup_1.close());

console.log(JSON.stringify(startup_1));
console.log(JSON.stringify(startup_2));

startup_1.acquire(startup_2);
console.log(52000, startup_1.funding);

console.log(`
          "CEO"=>5000,
          "CTO"=>4200,
          "Software Engineer"=>3000,
          "Junior Developer"=>2400,
          "Pilot"=>2500
        `);

console.log(JSON.stringify(startup_1));
console.log(JSON.stringify(startup_2));
