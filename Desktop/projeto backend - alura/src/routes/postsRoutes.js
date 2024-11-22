import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors"; 

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
//Permite que o servidor interprete requisições com o corpo no 
  app.use(express.json());
  app.use(cors(corsOptions))
//Rota para buscar todos os posts
  app.get('/posts', listarPosts);
  //Rota para criar um post
  app.post('/posts', postarNovoPost); // Chama a função controladora para criação de posts

  //Rota para upload de imagens (assumindo um única imagem chamada "imagem")
  app.post("/upload", upload.single("imagem"), uploadImagem) // Chama a funçao controladora para processamento de imagem.

  app.put("/upload/:id", atualizarNovoPost)


};


export default routes;