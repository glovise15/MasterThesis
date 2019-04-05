const viewDescriptor = {
    views: {
        bonjour: {
            map: function(doc) {
                if (doc.title)
                    emit(doc.title)
            }
        }
    }
}
module.exports = { viewDescriptor }