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

const employee = new Employee('Shaggy', 'Junior Developer');
console.log(employee);
employee.pay(42);
employee.pay(50);
console.log(employee);
