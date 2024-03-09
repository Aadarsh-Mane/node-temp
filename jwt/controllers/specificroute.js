import noteModel from "../models/note.js";
import userModel from "../models/user.js";
import QRCode from "qrcode";

export const getAllTags = async (req, res) => {
    try {
        const tags = await noteModel.distinct("tags");
        res.status(200).json({tags});
    } catch (error) {
        res.status(500).json(error);
    }
};
export const updateStatus = async(req, res) => {
    const {id}=req.params;
    const userId = req.userId; // Extract userId
    console.log("bhvhvh",userId)


    try {
        // Check if the note belongs to the specified user
        const note = await noteModel.findOne({ _id: id, userId: userId });
        
        if (!note) {
            throw new Error('Note not found for the specified user.');
        }

        // Update the status of the note
        // note.status = newStatus;
        note.status = 'submitted';
        
        // Save the updated note
        await note.save();
        
        res.status(200).json({
         note
         
    })
            
    } catch (error) {
        res.status(500).json({
            
                message:"user not found",
        
        })
        // throw new Error('Failed to update note status: ' + error.message);
}


}
export const getFilter = async (req, res) => {
    const { status, search } = req.query;
    const queryObject = {
        createdBy: req.userId
    };

    if (status && status !== 'all') {
        queryObject.status = status;
    }

    try {
        let jobs;
        
        // Executing the query to retrieve notes
        if (search) {
            jobs = await noteModel.find(queryObject);
            jobs = jobs.filter(job => job.tags.includes(search));
        } else {
            jobs = await noteModel.find(queryObject);
        }

        res.status(200).json({
            totalJobs: jobs.length,
            jobs: jobs
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
// export const getFilter=async(req,res)=>{
// const {status,search} = req.query;
// const queryObject={
//     createdBy:req.userId
// }
// if(status && status!=='all'){
//   queryObject.status=status
// }

// const queryResult=noteModel.find(queryObject)
// const jobs=await queryResult;
// // const jobs = await noteModel.find(queryObject).select('title').exec();

// // const titles = jobs.map(job => job.title);
// if(search){
//     // queryObject.tags={$regex:search,$options:'i'}
//     const filteredJobs = jobs.filter(search => {
//         return search.some(tag => search.tags.includes(tag));
//     });

// res.status(200).json({
//     totalJobs: jobs.length,
//     jobs:filteredJobs


// })
// }
// res.status(200).json({
//     totalJobs: jobs.length,
//     jobs


// })
export const getAllPosts=async(req, res) => {

        try {
            // Retrieve all posts from the database
            const posts = await noteModel.find();
//     const withTitle=posts.map((sex)=>{
//   return sex.title;
//     })
            res.status(200).json({
                totalPosts: posts.length,
                posts
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    // try {
    //     // Retrieve all notes from the database and populate the 'userId' field
    //     const posts = await noteModel.find().populate('userId', 'username');

    //     // Map each note to an object containing title and the username of the user who created it
    //     const withUsername = posts.map((note) => ({
    //         title: note.title,
    //         username: note.userId.username // Assuming 'username' is a field in the 'User' model
    //     }));

    //     res.status(200).json({
    //         totalPosts: posts.length,
    //         posts: withUsername
    //     });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'Internal Server Error' });
    // }
};

export const basedonType = async (req, res) => {
    const userId = req.userId; 
    console.log(userId);

    try {
        // Fetch user from the database
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userCollege = user.college;

        // Fetch all users with the same college
        const usersWithSameCollege = await userModel.find({ college: userCollege });

        // Fetch all notes from users with the same college
        const notes = await noteModel.find({ userId: { $in: usersWithSameCollege.map(user => user._id) } });

        res.status(200).json({ notes: notes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const sortBy = async (req, res) => {
    const { sort } = req.query;

    try {
        let notes;

        if (sort === 'latest') {
            // Sort by latest (descending order of createdAt)
            notes = await noteModel.find().sort({ createdAt: -1 });
        } else if (sort === 'oldest') {
            // Sort by oldest (ascending order of createdAt)
            notes = await noteModel.find().sort({ createdAt: 1 });
        } else if (sort === 'byTags') {
            // Sort by tags (alphabetically)
            notes = await noteModel.find().sort({ tags: 1 });
        } else if (sort === 'titleAZ') {
            // Sort by title alphabetically (ascending order)
            notes = await noteModel.find().sort({ title: 1 });
        } else {
            // Default sorting or invalid sorting parameter
            // You can define your default sorting logic here
            notes = await noteModel.find();
        }

        res.status(200).json({ notes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const pagination=()=>{
const {page}=Number(req.query) || 1
const {limit}=Number(req.query) || 10
const {skip}=(page-1) * 10

}


export const addComment=async(req,res)=>{
    const { postId } = req.params;
    const { content } = req.body;

    try {
        // Fetch the user's username based on userId
        const user = await userModel.findById(req.userId);
        const username = user.username;

        // Update the note with the new comment
        const updatedNote = await noteModel.findByIdAndUpdate(postId, {
            $push: {
                comments: { content: content, username: username }
            }
        }, { new: true });

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }

}


