import { Connections } from "../data/data.js";

const follow = (req, res) => {
    const { follower_id} = req.params;
    const { followed_id } = req.body;

    // Logic to handle following a user

    res.status(200).json({ message: `User followed: ${followed_id}` });
}


const unfollow = (req, res) => {
    const { follower_id} = req.params;
    const { followed_id } = req.body;

    // Logic to handle unfollowing a user

    res.status(200).json({ message: `User unfollowed: ${followed_id}` });
}


const getFollower = (req, res) => {
    const { followed_id } = req.params;

    // Logic to retrieve followers of a user

    const followers = Connections.filter(connection => connection.followed_id === parseInt(followed_id));

    res.status(200).json({ followers: followers });
}


const getFollowing = (req, res) => {
    const { follower_id } = req.params;

    // Logic to retrieve users followed by a user

    const following = Connections.filter(connection => connection.follower_id === parseInt(follower_id));

    res.status(200).json({ following: following });    
}

export { follow, unfollow, getFollower, getFollowing };