const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodoverride = require('method-override');
uuidv4(); 
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
let posts = [{
    id:uuidv4(),
    username: 'John Doe',
    content:'This is a sample post'
},
{ id:uuidv4(),
    username: 'Jane Doe',
    content:'This is another sample post'
},
{ id:uuidv4(),
    username: 'James Doe',
    content:'This is yet another sample post'
}];
app.get('/posts', (req, res) => {
    res.render('index.ejs', { posts: posts });
});

app.get('/posts/new', (req, res) => {
    res.render('new.ejs');
    });
app.post('/posts', (req, res) => {
   let { username, content } = req.body;
   let id = uuidv4();
    posts.push({ id,username, content });
    res.redirect('/posts');
});
app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id === id);
    res.render('show.ejs', { post });
});
app.patch('/posts/:id', (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find(p => p.id === id);
    post.content = newContent;
    res.redirect('/posts');
});
app.get('/posts/:id/edit', (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    res.render('edit.ejs', { post });
});
app.delete('/posts/:id', (req, res) => {
    let { id } = req.params;
   posts = posts.filter((p) => p.id !== id);
    res.redirect('/posts');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});