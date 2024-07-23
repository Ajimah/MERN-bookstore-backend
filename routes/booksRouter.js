import express from 'express';
import { Book } from '../models/bookmodels.js';

const router = express.Router();




//router for saving a new book

router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publisherYear ){
            return res.status(400).send({ message: 'send all required fields' });
        };
        const newBook = { title:req.body.title, author:req.body.author, publisherYear:req.body.publisherYear};
        
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    }  
    catch (error) {
        console.log(error)
        res.status(500).send({ message:error.message});
    }
});

//route to Get All book from database


router.get('/', async (req, res) => {

try {
    const books = await Book.find({})
    res.status(200).send({
        count:books.length,data:books
    });
} catch (error) {
    console.log(error.message);
    res.status(500).send({ message:error.message});
}

});

//route get book by :ID

router.get('/:id', async (req, res) => {

try {
    const {id} = req.params;

    const book = await Book.findById(id);
    return res.status(200).json(book);

} catch (error) {
    console.log(error.message);
    res.status(500).send({ message:error.message});
}

});

//route for update book
router.put('/:id', async (req, res) => {
        
try {
    
    if(!req.body.title || !req.body.author || !req.body.publisherYear){
        return res.status(404).send({ message:'send all required fields'});
        }

         const {id} = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).json({ message: 'book not found' });
        }

        return res.status(200).send({message:'Book updated successfully'})

} catch (error) {
    console.log(error.message)
    return res.status(500).send({msg:error.message})


}
});

//Route to delete a book


router.delete('/:id', async (req, res) => {

try {
    const {id} = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
        res.status(404).json({ message: 'book not found' });
    }
    res.status(200).send({message:'deleted successfully'})

} catch (error) {
    console.log(error.message)
    res.status(500).send({msg:error.message});
}
});


export default router;