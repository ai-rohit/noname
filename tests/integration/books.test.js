const request = require("supertest");
const Category = require("../../models/category")
let server;

describe("/api/categories", ()=>{
    
    //calls function before each test
    beforeEach(()=> {server = require("../../app")});

    //calls function after each test
    afterEach(async ()=> {
        server.close();
        await Category.remove();
    })
    describe("GET /", ()=>{
        it('should return all categories', async ()=>{
            await Category.collection.insertMany([{name:"category 1", description:"desc 1"},{name:"category 2", description:"desc 2"},{name:"category 3", description:"desc 3"}])
            const res = await request(server).get("/api/categories");
            console.log(res.status);
            expect(res.status).toBe(200);
           
            expect(res.body.data.categories.length).toBe(3);
            expect(res.body.data.categories.some(b=> b.name==="category 1")).toBeTruthy();
            expect(res.body.data.categories.some(b=> b.name==="category 2")).toBeTruthy();
            expect(res.body.data.categories.some(b=> b.name==="category 3")).toBeTruthy();
        })
    });

    describe("GET /:id", ()=>{
        it("should return category with passed id", async ()=>{
            const category = new Category({name:"cat1", description:"desc1"});
            await category.save();

            const res = await request(server).get("/api/categories/"+category._id);
            console.log(res.body);
            expect(res.body.data.category).toHaveProperty("name",category.name);
        })
    })
})