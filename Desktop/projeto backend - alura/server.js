import express from 'express';
import routes from './src/routes/postsRoutes.js';


   /* const posts = [
      {
        id: 1,
        descricao: "Uma foto teste",
        imagem: "https://placecats.com/millie/300/150"
      },
      {
        id: 2,
        descricao: "Um lindo gatinho dormindo",
        imagem: "https://placecats.com/millie/300/150"
      },
      {
        id: 3,
        descricao: "Um cachorro brincando no parque",
        imagem: "https://placecats.com/millie/300/150"
      },
    ];*/


const app = express();
app.use(express.static("uploads"))
routes(app)

//Inicia o servidor na porta 3000 e exibe mensagem no console
app.listen(3000, () => {
  console.log("Servidor escutando...");
});





/*function buscarPostPorID(id) {
  return posts.findIndex((post) => {
    return post.id === Number(id);
  })

}

app.get('/posts/:id', (req, res)=> {
  const index = buscarPostPorID(req.params.id)
  res.status(200).json(posts[index]);  
});*/