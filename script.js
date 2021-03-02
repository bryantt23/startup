class Employee {
  #earnings;
  constructor(name, title) {
    this.name = name;
    this.title = title;
    this.#earnings = 0;
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
console.log(startup_2);

console.log(true, startup_1.isValidTitle('CTO'));
console.log(true, startup_1.isValidTitle('Software Engineer'));
console.log(false, startup_1.isValidTitle('Programmer'));
console.log(false, startup_1.isValidTitle('Designer'));

console.log(true, startup_2.merger(startup_1));
console.log(false, startup_1.merger(startup_2));
console.log(startup_1.hire('Scooby', 'Designer'));
console.log(startup_1);
console.log(startup_1.hire('Scooby', 'CEO'));
console.log(JSON.stringify(startup_1));
startup_1.hire('Velma', 'CTO');
console.log(startup_1.size);
