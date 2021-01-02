const Memes = require('../Model/memeModel');

const notes = {

    allMemes: async (req, res) => {
        try {
            const notes = await Memes.find({});
            res.json(notes);

        } catch (err) {
            res.status(500).json({ msg: err.message });
        }

    },
  
    getMemes: async (req, res) => {
        try {
            const notes = await Memes.find({ user_id: req.user.id });
            res.json(notes);

        } catch (err) {
            res.status(500).json({ msg: err.message });
        }

    },

    createMemes: async (req, res) => {
        try {
            let title, image;

            if (req.files) {

                title = req.body.title;
                image = req.files.image;

                req.files.image.mv('./upload/'+ image.name, err => {
                    
                    if (err) {
                        return res.status(500).send(err);
                    }

                    else{
                        
                        const userContent = {
                            title,
                            image:image.name,
                            user_id: req.user.id,
                            name: req.user.username
                        }
                        const data = Memes(userContent);
                        data.save();
                        console.log('file save');
                        res.send('File uploaded!');
                    }
                })
            }

        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },

    deleteMeme: async (req, res) => {
        try {

            await Memes.findByIdAndDelete(req.params.id);
            res.json({ msg: 'Delete a Note' });

        } catch (err) {
            res.status(400).json({ msg: err.message });
        }
    },

    updateMeme: async (req, res) => {
        try {
            let title, image;

            if (req.files) {

                title = req.body.title;
                image = req.files.image;

                req.files.image.mv('./upload/'+ image.name, err => {
                    
                    if (err) {
                        return res.status(500).send(err);
                    }
                })

                await Memes.findOneAndUpdate({ _id: req.params.id }, {
                    title,
                    image:image.name
                })
                
                res.json({ msg: 'Update a meme' }); 
            }
           
        } catch (err) {
            res.status(400).json({ msg: err.message });
        }
    },

    getMeme: async (req, res) => {
        try {
            const note = await Memes.findById({ _id: req.params.id });
            res.json(note);

        } catch (err) {
            res.status(400).json({ msg: err.message });
        }
    },

    likeMeme:async (req,res)=>{
        try{

            await Notes.findOneAndUpdate({_id:req.params.id},{
                $push:{likes:req.user._id}
            },{
                new: true
            })
            res.json({msg: 'You Like'});
            
            console.log('you liked here');

        }catch(err){
            res.status(400).json({msg: err.message});
        }
    },

}

module.exports = notes;

