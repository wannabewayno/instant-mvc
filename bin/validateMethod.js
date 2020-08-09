module.exports = method => {
    const recognisedMethods = ['GET','POST','PUT','PATCH','DELETE']
    method = method.toUpperCase();
    const match = recognisedMethods.find(recognisedMethod => method === recognisedMethod)

    if (match) return match 
    else throw new Error(`${method}: is not a recoginised REST API method, GET|POST|PUT|PATCH|DELETE are`)
}