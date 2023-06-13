const express = require("express");
const request = require("supertest");
const videosRoute = require("../routes/video");
const app = express();

app.use(express.json());

app.use("/api/videos", videosRoute);

describe("test videos crud", ()=>{
    it('POST /api/videos - failure on invalid post body', async ()=>{
        const {body, statusCode} = await request(app).post('/api/videos').send({
            src:"",
            ressort:"Freizeit",
            theme:"testVideo",
            title:"Test VideoUpload",
        });
        expect(statusCode).toBe(403);
        expect(body).toEqual({
            errors:[
                {
                    location: 'body',
                    msg:"no file",
                    param:'src',
                    value:'',
                }
            ]
        });
    });

    it('POST /api/videos - success', async ()=>{
        const {body, statuscode} = await (await request(app).post('/api/videos')).set({
            src:"Pexels Videos 2098989.mp4",
            ressort:"Freizeit",
            theme:"testVideo",
            title:"Test VideoUpload"
        });
        expect(statuscode).toBe(200);
        expect(body).toEqual()
    })
});