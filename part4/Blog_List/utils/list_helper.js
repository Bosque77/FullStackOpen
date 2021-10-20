const dummy = (blogs) => {
    return 1
}

const numberOfLikes = (blog) => {
    let number_of_likes = blog.likes
    if (number_of_likes){
        return number_of_likes
    }else{
        return 0
    }
}


const totalLikes = (blogs) => {

    let total_likes = blogs.reduce((previous_value,current_value) =>{
        return previous_value+current_value.likes
    },0)

    return total_likes
}


const mostLikes = (blogs) => {
    

    if (blogs.length === 0) {
        return -1;
    }

    let max = blogs[0].likes;
    let maxIndex = 0;

    for (let i = 1; i < blogs.length; i++) {
        if (blogs[i].likes > max) {
            maxIndex = i;
            max = blogs[i].likes;
        }
    }


    let favorite_blog = blogs[maxIndex]

    return favorite_blog;

}

module.exports = {dummy, totalLikes, mostLikes, numberOfLikes}