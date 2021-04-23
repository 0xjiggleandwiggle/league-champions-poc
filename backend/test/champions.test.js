const { contains } = require("cheerio");
const request = require("supertest");
const app = require("../app");

// Champions from database test
describe('Database champions test', () => {
    it('return champions list', async () => {
      const res = await request(app)
        .get('/api/champions/all');
        expect(res.statusCode).toEqual(200);
        expect(typeof(res.body)).toEqual("object");

    })


    it('Add new champion in database', async () => {
      const res = await request(app)
        .post("/api/champions/add")
        .send({
          name: "Yasuo",
          picture: "https://i.pinimg.com/564x/3e/6a/dd/3e6add361c9b91b763fe5c3ffaaeb89e.jpg",
          scrap_url: "https://leagueoflegends.fandom.com/wiki/Yasuo" 
        })

        expect(res.statusCode).toEqual(201)
        expect(res.text).toEqual("ADDED")
    })

  })

// Champions from json test
describe('JSON champions test', () => {
  it('return champions list', async () => {
    const res = await request(app)
      .get('/api/champions/json/all');
      expect(res.statusCode).toEqual(200);
      expect(typeof(res.body)).toEqual("object");

  })


  it('Add new champion in json', async () => {
    const res = await request(app)
      .post("/api/champions/json/add")
      .send({
        name: "Yasuo",
        picture: "https://i.pinimg.com/564x/3e/6a/dd/3e6add361c9b91b763fe5c3ffaaeb89e.jpg",
        scrap_url: "https://leagueoflegends.fandom.com/wiki/Yasuo" 
      })

      expect(res.statusCode).toEqual(200)
      expect(res.text).toEqual("ADDED")
  })

  it('delete champions from json', async () => {
    const res = await request(app)
      .delete("/api/champions/json/delete/lux")

      expect(res.statusCode).toEqual(200)
      expect(res.text).toEqual("DELETED")
  })
  
})