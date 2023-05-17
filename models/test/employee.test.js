const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');
describe('Employee', () => {
  it('should throw an error if no args', () => {
    const emp = new Employee({}); // create new Employee, but don't set attr values

    emp.validate((err) => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.department).to.exist;
    });
  });
  it('should throw an error if args are not a string', () => {
    const cases = ['', null, undefined, [], {}];
    for (let name of cases) {
      const emp1 = new Employee({ firstName: name, lastName: 'Doe', department: 'Marketing' });
      const emp2 = new Employee({ firstName: 'John', lastName: name, department: 'Marketing' });
      const emp3 = new Employee({ firstName: 'John', lastName: 'Doe', department: name });
      emp1.validate((err) => {
        expect(err.errors.firstName).to.exist;
        expect(err.errors.lastName).to.not.exist;
        expect(err.errors.department).to.not.exist;
      });
      emp2.validate((err) => {
        expect(err.errors.firstName).to.not.exist;
        expect(err.errors.lastName).to.exist;
        expect(err.errors.department).to.not.exist;
      });
      emp3.validate((err) => {
        expect(err.errors.firstName).to.not.exist;
        expect(err.errors.lastName).to.not.exist;
        expect(err.errors.department).to.exist;
      });
    }
  });
  it('should not throw an error if args are okay', () => {
    const cases = [
      { firstName: 'John', lastName: 'Doe', department: 'Marketing' },
      { firstName: 'Jane', lastName: 'Smith', department: 'Sales' },
      { firstName: 'Michael', lastName: 'Johnson', department: 'IT' },
    ];
    for (let name of cases) {
      const emp = new Employee(name);
      emp.validate((err) => {
        expect(err).to.not.exist;
      });
    }
  });
});
