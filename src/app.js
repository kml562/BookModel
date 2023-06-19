import express from 'express';

const app = express();

// global middleware----------------------------------------------------------
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


export default app;
