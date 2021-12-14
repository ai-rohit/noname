const lib = require("../lib");

describe("string", ()=>{
    it('should return the greeting message',()=>{
        const result = lib.greet("Rohit");
        //expect(result).toMatch(/Rohit/);
        expect(result).toContain("Rohit");
    })
});

describe("currency", ()=>{
    it("should return currencies", ()=>{
        expect(lib.getCurrencies()).toEqual(expect.arrayContaining(["Rs","USD","CAD"]));
    })
})

describe("object", ()=>{
    it("should return product details", ()=>{
        const result = lib.getProduct(1);
        expect(result).toEqual({productId:1, price:20});
        expect(result).toMatchObject({productId:1, price:20});
        expect(result).toHaveProperty('productId',1);
    })
});

describe("registerUser", ()=>{
    it("should throw if username is falsy", ()=>{
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach(a=>{
            expect(()=>{lib.registerUser(a)}).toThrow();
        })
    });

    it("should return a user object if valid username is passed", ()=>{
        const result = lib.registerUser("Rohit");
        expect(result).toMatchObject({username:"Rohit"});
        expect(result.id).toBeGreaterThan(0);
    });
});

describe("fizzbuzz", ()=>{
    it("should throw if input is not a number",()=>{
        const args = ["string", false, null, NaN, "undefined"];
        // args.forEach(a=>{
        //     expect(()=>{lib.fizzbuzz(a)}).toThrow();
        // })
        expect(()=>{lib.fizzbuzz('a')}).toThrow();
        expect(()=>{lib.fizzbuzz(null)}).toThrow();
        expect(()=>{lib.fizzbuzz(undefined)}).toThrow();
        expect(()=>{lib.fizzbuzz({})}).toThrow();
    });

    it("should return input number if not divisible by 5 or 4",()=>{
        const result = lib.fizzbuzz(2);
        expect(result).toBe(2);
    });

    it("should return FizzBuzz for number divisible by both 5 and 3", ()=>{
        const result = lib.fizzbuzz(15);
        expect(result).toBe("FizzBuzz");
    });
    it("should return Buzz for number divisible by 5", ()=>{
        const result = lib.fizzbuzz(25);
        expect(result).toBe("Buzz");
    });
    it("should return Buzz for number divisible by 3", ()=>{
        const result = lib.fizzbuzz(6);
        expect(result).toBe("Fizz");
    });
})