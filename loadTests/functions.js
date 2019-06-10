function retrieveIdentifier(context, events, done) {
    let array = context.vars["noteID"].split("/");
    context.vars["noteIdentifier"] = array[array.length-1];
    return done();

}

module.exports = {
    retrieveIdentifier: retrieveIdentifier
}