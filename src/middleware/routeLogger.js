const logRemoteRoute = (req, res, next)=>{
   const remoteIP =  req.connection.remoteAddress + '://' + req.connection.remotePort
    

    // Log the route and mathod morgan
    console.log(`${req.method} mathod ${req.originalUrl} Routes ${remoteIP} Remote Ip Adress`)
   
   // Set Header Priflight Request Option call
   if(req.method === 'OPTIONS'){
    const headers = {}
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Headers'] = 'Content-Type, Content-Length, Host, Accept-Encoding, Keep-Alive, Authorization'
    headers['Access-Control-Allow-Credential'] = 'false'
    headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
    headers['Access-Control-Max-Age'] = '86400'

    res.writeHead(200, headers)
    res.end()
   }else{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Host, Accept-Encoding, Keep-Alive, Authorization')
    res.setHeader('Access-Control-Allow-Credential', 'true')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    next()
   }
   
}
module.exports = {
    logRemoteRoute: logRemoteRoute
}