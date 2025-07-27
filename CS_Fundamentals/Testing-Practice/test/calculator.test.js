const Calculator = require("../code/calculator");

describe("Calculator basic operations" ,()=>{
    let calculator;

    beforeEach(function(){
       calculator = new Calculator();
    })

    test("Add", ()=>{
        expect(calculator.add(1,2)).toEqual(3);
    })
    test("Substract", ()=>{
        expect(calculator.add(5,2)).toEqual(3);
    })
    test("Divide", ()=>{
        expect(calculator.add(15,3)).toBeCloseTo(3);
    })
    test("Add when is undefined", ()=>{
        expect(calculator.add()).toBe(NaN);
    })
    test("Subtract when is undefined", ()=>{
        expect(calculator.add()).toBe(NaN);
    })
    test("Multiply when is undefined", ()=>{
        expect(calculator.add()).toBe(NaN);
    })
    test("Divide when is undefined", ()=>{
        expect(calculator.add()).toBe(NaN);
    })        
})