import mongoose from  'mongoose';


const bookSchema = mongoose.Schema(
    {
        title:{
            type: 'string',
            required: true,
        },
        author:{
            type: 'string',
            required: true,
        },
        publisherYear:{
            type: Number,
            required: true,
        },
    },

    {
        timestamps: true,
    }
);


export const Book = mongoose.model('Book',bookSchema);

//export const BookSchema = mongoose.model