const User = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timestamp = new Date().toLocaleDateString()
  const method = req.method
  const url = req.originalUrl
  console.log(`${timestamp} ${method} to ${url}`)
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
 try {
   const user = await User.getById(req.params.id)
   if (!user) {
     next({status:404, message: 'user not found'})
   } else {
     req.user = user
     next()
   }
 } catch (err) {
   console.log(err)
 }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const {username} = req.body
  if(!username) {
    res.status(400).json({
      message: 'missing required username'}) 
    }else {
      next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const {post} = req.body
  if(!post || !post.trim()) {
    res.status(400).json({message: 'missing required texts'})
  } else {
    req.post = post.trim()
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = { logger,validateUserId,validateUser,validatePost}