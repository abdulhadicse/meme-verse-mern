const memesRouter = require('express').Router();
const auth = require('../Middleware/auth');
const memes = require('../Controller/memeController');

memesRouter.route('/all')
.get(auth,memes.allMemes)

memesRouter.route('/')
.get(auth, memes.getMemes)
.post(auth, memes.createMemes)

memesRouter.route('/:id')
.get(auth, memes.getMeme)
.put(auth, memes.updateMeme)
.delete(auth,memes.deleteMeme)

memesRouter.route('/likes/:id')
.put(auth, memes.likeMeme)



module.exports = memesRouter;